<template>
  <template v-if="props.viewType === 'select'">
    <el-select v-model="selectIds" multiple collapse-tags collapse-tags-tooltip ref="SelectInputRef"
      :placeholder="props.placeholder || '请选择'" v-bind="props.viewComponentProps" @click.stop="handleSelectInputClick">
      <el-option v-for="item in selectData" :key="item[keyProps.valueKey]" :label="item[keyProps.labelKey]"
        :value="item[keyProps.valueKey]" />
    </el-select>
  </template>
  <!--表格选择-->
  <div class="w-full h-full" v-else>
    <el-button class="select-btn" @click="handleSelectInputClick" type="primary">{{ modalProps.title }}</el-button>
    <div class="w-full h-full">
      <!-- <MyTableNew v-bind="props.viewComponentProps" :tableProps="props.viewComponentProps?.tableProps"
        :table-data="selectData" :show-index-fn="showIndex">
        <template #operation="{ scope }">
          <el-button link type="danger" size="small" @click="handleDeleteItem(scope.row)">
            删除
          </el-button>
        </template>
      </MyTableNew> -->
    </div>
  </div>
  <FormTableSelectModal ref="FormTableSelectModalRef" v-bind="props" v-model="selectIds" @initComp="initComp">
  </FormTableSelectModal>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import FormTableSelectModal from './components/FormTableSelectModal.vue';
import { formTableSelectProps } from './props';
import MyTableNew from '@/components/my/MyTableNew.vue';
// import { usePage } from '@/composables';

const props = defineProps(formTableSelectProps);

const emits = defineEmits(['update:modelValue', 'update:selectedData']);

/* hook */
// const { showIndex } = usePage();

/* data */
const selectIds = ref<any>([]);
const selectData = ref<any[]>([]);
const FormTableSelectModalRef = ref();
const SelectInputRef = ref();
const isFirst = ref(true);

/* computed */
const keyProps = computed(() => {
  return props.keyProps;
});
const selectedDataIds = computed({
  get() {
    return selectIds.value;
  },
  set(value) {
    emits('update:modelValue', value);
  }
});
const selectedData = computed({
  get() {
    return selectData.value;
  },
  set(value) {
    emits('update:selectedData', value);
  }
});

const modelValue = computed({
  get() {
    return props.modelValue;
  },
  set() { }
});

/* methods */
const handleSelectInputClick = () => {
  if (props.disabled) return;
  if (props.viewType === 'select') SelectInputRef.value.blur();
  FormTableSelectModalRef.value.openDialog();
};

const setDefaultValue = async () => {
  selectData.value = [];
  if (!props?.defaultValueLoad) return;
  selectData.value = await props?.defaultValueLoad(selectIds.value);
  await nextTick();
};

const handleDeleteItem = (row: any) => {
  selectIds.value = selectIds.value.filter((item: any) => item !== row.id);
  selectData.value = selectData.value.filter((item: any) => item.id !== row.id);
};

const initComp = (data: any) => {
  selectData.value = data;
};

/* watch */
watch(selectIds, val => {
  emits('update:modelValue', val.join(','));
});

watch(
  modelValue,
  val => {
    console.log(val);
    if (isFirst.value && !val) return;
    isFirst.value = false;
    if (!val) {
      selectIds.value = [];
      selectData.value = [];
    }
  },
  { immediate: true }
);

onMounted(() => {
  // TODO 存在异步问题暂用定时器解决
  setTimeout(() => {
    if (props?.modelValue) {
      selectIds.value = props.modelValue.split(',');
      setDefaultValue();
    }
  }, 50);
});
</script>

<style lang="less" scoped>
.select-btn {
  position: absolute;
  top: -36px;
  right: 0;
  z-index: 10;
}
</style>
