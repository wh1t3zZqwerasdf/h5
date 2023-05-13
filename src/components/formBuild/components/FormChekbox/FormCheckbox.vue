<template>
  <van-checkbox-group v-model="checkData" :disabled="isDisabled(prop, scopeData, config)"
                      direction="horizontal">
    <van-checkbox
        v-for="option in getOptions(prop, scopeData, config)"
        :disabled="option.disabled"
        :label="option.value"
        :name="option.value"
    >
      {{ option.label }}
    </van-checkbox>
  </van-checkbox-group>
</template>

<script lang="ts" setup>
import {useDate, useFormNew} from '@/composables';
import {FormConfigType, FormPropType} from '@/types';

const props = defineProps({
  modelValue: {
    type: String as PropType<string | number>,
  },
  prop: {
    type: Object as PropType<FormPropType>,
    required: true
  },
  scopeData: {
    type: Object as PropType<any>,
    required: true
  },
  config: {
    type: Object as PropType<FormConfigType>,
    required: true
  },
  disabled: {
    type: Boolean as PropType<boolean>
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();

const {shortcuts, shortcutsRange, disabledDate} = useDate();
const {isDisabled, getOptions, isReadonly, isRequired, setFormConfig} =
    useFormNew(props.config);

const checkData = ref<string[] | number[]>([])

const _modelValue = computed(() => props.modelValue || '')


watch(checkData, val => {
  const value = typeof val === 'string' ? val : val.join(',')
  emit('update:modelValue', value)
})

watch(_modelValue, val => {
  if (!val) {
    checkData.value = []
    return
  }
  checkData.value = typeof val === 'string' ? val.split(',') : val
})


onMounted(() => {
  console.log(props.modelValue);
})

</script>
