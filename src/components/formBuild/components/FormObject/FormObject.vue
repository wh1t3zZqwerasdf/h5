<!-- TODO 校验有问题-->
<template>
  <MyFormItemNew
    v-for="prop in itemProp.items"
    :key="prop.name"
    v-model="objectFormData"
    :itemProp="prop"
    :formConfig="formConfig"
  ></MyFormItemNew>
</template>
<script lang="ts" setup>
import { PropType, reactive } from 'vue';
import { FormConfigType, FormPropType } from '@/types';

const objectFormData = reactive({});

const props = defineProps({
  // 双向绑定数据
  modelValue: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  },
    formConfig: {
    type: Object as PropType<FormConfigType>,
    required: true
  },
  itemProp: {
    type: Object as PropType<FormPropType>,
    required: true
  }
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();

const scopeData = computed<any>({
  get() {
    return props.modelValue;
  },
  set(data) {
    console.log(data);
    emit('update:modelValue', data);
  }
});

watch(objectFormData, val => {
  emit('update:modelValue', val);
});

onMounted(() => {
  emit('update:modelValue', {});
});
</script>
