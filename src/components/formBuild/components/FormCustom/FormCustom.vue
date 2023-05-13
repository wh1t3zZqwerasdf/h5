<template>
  <component
      :is="prop?.customComponent"
      v-model="componentValue"
      :disabled="disabled"
      :formConfig="props.formConfig"
      :formData="props.formData"
      :itemProp="props.itemProp"
      :placeholder="props.placeholder || ''"
      v-bind="prop?.customProps"
  ></component>
</template>

<script lang="ts" setup>
import {FormConfigType, FormPropType} from '@/types';
import {useCustomFieldValue} from '@vant/use';

const props = defineProps({
  modelValue: {
    type: [String, Number, Array, Object],
    default: ''
  },
  itemProp: {
    type: Object as PropType<FormPropType>
  },
  formConfig: {
    type: Object as PropType<FormConfigType>
  },
  formRef: {
    type: Object as PropType<any>
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  placeholder: {
    type: String as PropType<string>,
    default: ''
  },
  formData: {
    type: Object as PropType<any>,
    default: () => {
    }
  }
});
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();

const prop = computed(() => props.itemProp);

const componentValue = computed<any>({
  get() {
    return props.modelValue;
  },
  set(data) {
    setTimeout(() => {
      props.formRef?.resetValidation(props.itemProp?.name);
    }, 50);
    // 异步触发自定义字段的表单校验
    emit('update:modelValue', data);
  }
});
useCustomFieldValue(() => componentValue.value)

onMounted(() => {
});
</script>
