<template>
  <van-field
      :class="['form-item', `form-item-${prop.type}`]"
      :label="!prop.hiddenLabel && prop.label"
      :name="prop.name"
      :placeholder="prop.placeholder || '请选择' "
      :readonly="true"
      :required="isRequired(prop, scopeData, config)"
      :rules="prop.rules?.map((rule:any) => {
          if (rule.required) {
            rule.message = rule.message || `${prop.label}不能为空`;
          }
          return rule
        })"
      clearable
  >
    <template #input>
      <TagSelect v-model="componentValue" :disabled="disabled" :mult="_isMult" :options="_options"></TagSelect>
    </template>
  </van-field>
</template>

<script lang="ts" setup>
import TagSelect from "./TagSelect.vue";
import {useFormNew} from '@/composables'
import {FormConfigType, FormPropType} from "@/types";

type Options = { label: string, value: string | number }

const props = defineProps({
  modelValue: {
    type: String as PropType<string | number | string[] | number[]>,
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

const searchValue = ref('');

const {isDisabled, getOptions, isReadonly, isRequired, setFormConfig} =
    useFormNew(props.config);

const componentValue = computed<any>({
  get() {
    return props.modelValue;
  },
  set(data) {
    // 异步触发自定义字段的表单校验
    emit('update:modelValue', data);
  }
});

const _options = computed(() => {
  return getOptions(props.prop, props.scopeData, props.config).filter(item =>
      item.label.indexOf(searchValue.value) !== -1
  )
})


const _isMult = computed(() => {
  return props.prop.mult || false
})

async function handleSelectApi(item: FormPropType) {
  if (item.apiFn === undefined) return;
  let params = Array.isArray(item.apiParams)
      ? [...item.apiParams]
      : item.apiParams;
  if (typeof item.apiParams === 'function')
    params = item.apiParams(props.scopeData);
  console.log(params);
  const res = await item.apiFn(params);
  // if (!handleResponse(res)) return;
  if (item.apiCbFn === undefined) {
    item.options = Array.isArray(res.data) ? res.data : [];
  } else {
    const cbData = item.apiCbFn(res.data);
    item.options = Array.isArray(cbData) ? cbData : [];
  }
  if (item.apiDefaultValue)
    componentValue.value = item.apiDefaultValue(item.options);
}


onMounted(() => {
  handleSelectApi(props.prop)
})


</script>
