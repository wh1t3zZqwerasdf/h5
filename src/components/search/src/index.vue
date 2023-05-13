<template>
  <van-icon name="filter-o" size="18" @click="showDialog" />
  <van-popup v-model:show="dialogVisible" :style="{ width: '80%', height: '100%' }" :z-index="9999" position="right"
    teleport="body">
    <!--    <p class="pl-5px">条件筛选</p>-->
    <FormBuild ref="formBuildRef" v-model="searchData" :formConfig="{ op: 'search' }" :formPropsGroup="[
        {
          title: '',
          name: 'searchProps',
          group: _searchFormProps
        }
      ]" class="form-build"></FormBuild>
    <div class="btn-box w-full">
      <van-button class="mr-5px" size="large" type="default" @click="onReset">重置</van-button>
      <van-button size="large" type="primary" @click="onSearch">确认</van-button>
    </div>
  </van-popup>
</template>

<script lang="ts" setup>
import { useDialogNew } from '@/composables'
import { useFormProps } from '@/components/formBuild/composables'
import { FormPropType } from '@/types';
import FormBuild from '@/components/formBuild'

const props = defineProps({
  modelValue: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  },
  orgSearch: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  formProps: {
    type: Array as PropType<FormPropType[]>,
    required: true
  },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
  (e: 'onSearch', value: any): void;
}>();

const searchData = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});

const { getOrgFilterSelectProp } = useFormProps();

const _searchFormProps = computed(() => {
  if (props.orgSearch) return [...getOrgFilterSelectProp(), ...props.formProps];

  return props.formProps;
});

const {
  dialogVisible,
  dialogConfig,
  dialogData,
  dialogLoading,
  setDialogConfig,
  closeDialog,
  openDialog
} = useDialogNew();

const showDialog = () => {
  openDialog('add')
}

const onSearch = () => {
  emit('onSearch', searchData.value)
  closeDialog()
}

const onReset = () => {
  searchData.value = {}
  emit('onSearch', searchData.value)
  closeDialog()
}


</script>

<style lang="less" scoped>
.popup-box {
  position: relative;
  width: 70%;
  height: 100%;
}

.form-build {
  height: calc(100% - 54px);
  overflow-y: auto;
}

.btn-box {
  position: fixed;
  bottom: 0;
  padding: 5px 0;
  display: flex;
  justify-content: center;

  button {
    width: 47%;
    //margin: 5px;
  }
}
</style>
