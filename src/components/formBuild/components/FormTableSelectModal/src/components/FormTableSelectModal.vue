<template>
  <span></span>
  <el-dialog
    v-model="dialogVisible"
    top="5vh"
    :width="modalProps.width"
    destroy-on-close
    @close="handleCancelSelect"
  >
    <div class="table-dialog-body" :style="modalProps.dialogBodyStyle">
      <div class="inline-block w-4/12" v-if="multiple">
        <SelectDataList
          :keyProps="keyProps"
          :dataSource="selectData"
          @deleteItem="handleDeleteItem"
        ></SelectDataList>
      </div>
      <div class="inline-block" :class="multiple ? 'w-8/12' : 'w-12/12'">
        <SearchTableByClass
          v-model:selectedDataIds="selectIds"
          v-model:selectedData="selectData"
          v-bind="searchTableByDepProps"
        ></SearchTableByClass>
      </div>
    </div>

    <template #header>
      <div class="p-10px text-lg">{{ modalProps?.title || '选择' }}</div>
    </template>

    <template #footer>
      <div class="p-10px select-footer">
        <el-button @click="handleCancelSelect">取消</el-button>
        <el-button type="primary" @click="onSelect">确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { useDialogNew } from '@/composables';
import SearchTableByClass from '@/components/searchTableByClass';
import SelectDataList from './SelectDataList.vue';
import { formTableSelectModalProps } from '../props';
import { computed } from 'vue';
import type { ValueKey } from '../typing';
import { OpStatus } from '@/types';

const props = defineProps(formTableSelectModalProps);
const emits = defineEmits(['update:modelValue', 'initComp']);

/* hooks */
const {
  dialogVisible,
  dialogConfig,
  dialogData,
  dialogLoading,
  setDialogConfig
} = useDialogNew();

/* data */
const selectIds = ref();
const selectData = ref<any[]>([]);

/* computed */
const searchTableByDepProps = computed(() => {
  const _searchTableProps = Object.assign({}, props.searchTableProps);
  const apiParams = props.searchTableProps?.tableProps.apiParams;
  _searchTableProps.tableProps.defaultParams =
    typeof apiParams === 'function' ? apiParams(props.formData) : apiParams;
  return {
    searchTableProps: _searchTableProps,
    treeProps: props.treeProps,
    multiple: props.multiple
  };
});
const keyProps = computed(() => props.keyProps);
const modelValue = computed(() => props.modelValue || []);
const modalProps = computed(() => props.modalProps || {});

/* methods */
function openDialog(op: OpStatus, data: any = {}) {
  dialogVisible.value = true;
}
const onSelect = () => {
  emits('update:modelValue', selectIds.value);
  emits('initComp', selectData.value);
  dialogVisible.value = false;
};

const setDefaultValue = async () => {
  selectData.value = [];
  if (props.selectedData) {
    selectData.value = props.selectedData;
    selectIds.value = props.selectedData.map(item => item.id);
    await nextTick();
    return;
  }
  if (!props.defaultValueLoad) return;
  selectData.value = await props.defaultValueLoad(selectIds.value);
  await nextTick();
};

// 取消选择清空已勾选项
const handleCancelSelect = () => {
  selectIds.value = props.modelValue || [];
  dialogVisible.value = false;
};

const handleDeleteItem = (value: ValueKey) => {
  selectIds.value = selectIds.value.filter((item: ValueKey) => item !== value);
  selectData.value = selectData.value.filter(
    (item: any) => item[keyProps.value.valueKey] !== value
  );
};

/* watch */
watch(dialogVisible, (val: boolean) => {
  if (val) setDefaultValue();
});

watch(modelValue, val => {
  selectIds.value = props.modelValue;
});

onMounted(async () => {
  selectIds.value = props.modelValue || [];
  await setDefaultValue();
  emits('initComp', selectData.value);
});

defineExpose({ openDialog });
</script>

<style lang="scss" scoped>
.table-dialog-body {
  display: flex;
  overflow-y: hidden;
}

.select-footer {
  border-top: 1px solid #f2f2f2;
  padding-bottom: 0;
}
</style>
