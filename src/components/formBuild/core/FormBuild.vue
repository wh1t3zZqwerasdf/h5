<script lang="ts" setup>
import {useEventBus, useFormHandler, useFormNew} from '@/composables';
import type {FormConfigType, FormPropGroupType} from '@/types';
import type {FormInstance} from 'vant';
import FormItem from './FormItem.vue'

const props = defineProps({
  // 双向绑定数据
  modelValue: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  },
  /* 表单属性group */
  formPropsGroup: {
    type: Array as PropType<FormPropGroupType[]>,
    required: true
  },
  /* 表单配置 */
  formConfig: {
    type: Object as PropType<FormConfigType>
  }
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();

const formData = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});
const eventBus = useEventBus();
const {handlePropsGroupFilter, validateForm} = useFormNew();

const formRef = ref<FormInstance>();
const formVerifyRes = reactive<boolean[]>([]);

const {
  // formData,
  clearValidate
} = useFormHandler();

/* ========== 表单配置 ========== */
/**
 * op 会覆盖 formConfig 中的 disabled
 * 并不会
 */
const config = computed<FormConfigType>(() => {
  const _config = Object.assign(
      {
        inline: false,
        labelWidth: '124px',
        disabled: false,
        isPreview: false
      },
      props.formConfig
  );

  // return _config;
  // 如果 view 操作，表单不可编辑
  const _disabled = _config.op ? ['view'].includes(_config.op) : false;

  return Object.assign(_config, {
    disabled: _disabled
  });
});

function clearValidForm(name?: string) {
  clearValidate(formRef?.value, name);
}

/* propsGroup */
const filterPropsGroupList = computed(() => {
  return handlePropsGroupFilter(
      props.formPropsGroup,
      formData.value,
      props.formConfig
  );
});

const getFormRef = () => {
  return formRef;
};

const onSubmit = async () => {
  const valid = await validateForm(formRef?.value);
  eventBus.emit('FORM_SUBMIT');
  return await new Promise((resolve, reject) => {
    if (!valid) return reject(false);
    // TODO暂用定时器解决
    setTimeout(() => {
      const result = formVerifyRes.every(item => item);
      console.log(result);
      formVerifyRes.length = 0;
      resolve(result);
    }, 200);
  });
};

onMounted(() => {
  eventBus.on('CHILDREN_FORM_SUBMIT', (res: boolean) => {
    formVerifyRes.push(res);
  });
});

defineExpose({onSubmit, getFormRef, clearValidForm});
</script>

<template>
  <van-form
      ref="formRef"
      :class="
      config.op === 'view' && config.isPreview && config.disabled
        ? 'form-preview'
        : ''
    "
      :disabled="config.disabled"
      :inline="config.inline"
      :label-align="config.inline ? 'right' : 'top'"
      :model="formData"
      class="form-box"
      scroll-to-error
  >
    <slot name="formHeader"></slot>
    <div class="form-content form-body">
      <div class="scroll-box">
        <div
            v-for="(list, index) in filterPropsGroupList"
            :key="index"
            class="my-form-group content-dialog form-group-box"
        >
          <van-cell-group :title="list.title" inset>
            <van-row :gutter="20" class="form-row">
              <FormItem
                  v-for="prop in list.group"
                  :key="prop.name"
                  v-model="formData"
                  :complexData="props.complexData"
                  :formConfig="config"
                  :formRef="formRef"
                  :itemProp="prop"
              ></FormItem>
            </van-row>
          </van-cell-group>
        </div>
      </div>
      <slot name="container"></slot>
    </div>

    <slot :formRef="formRef" name="formFooter"></slot>
  </van-form>
</template>
<style lang="less" scoped>
.form-box {
  :deep(.van-cell-group) {
    margin: 0;
  }
}

</style>
