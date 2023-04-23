<template>
  <van-field v-model="_selectValueLabel" :class="['form-item', `form-item-${prop.type}`]"
    :label="!prop.hiddenLabel && prop.label" :name="prop.name" :placeholder="prop.placeholder || '请选择'" :readonly="true"
    :required="isRequired(prop, scopeData, config)" :rules="prop.rules?.map((rule: any) => {
        if (rule.required) {
          rule.message = rule.message || `${prop.label}不能为空`;
        }
        return rule
      })" clearable @click="show" />
  <van-popup v-model:show="showPicker" position="bottom" round>
    <van-cascader v-model="componentValue" :field-names="_fieldNames" :options="options" :title="prop.label"
      @change="onChange" @close="hide" @finish="onFinish" />
  </van-popup>
</template>

<script lang="ts" setup>
import { useFormNew } from '@/composables'
import { FormConfigType, FormPropType } from "@/types";
import { CascaderOption } from 'vant'
import { useSystemStore } from "@/store";

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
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
  (e: 'setCascaderArrName', value: string): void;
}>();


const { isDisabled, getOptions, isReadonly, isRequired, setFormConfig } =
  useFormNew(props.config);
const systemStore = useSystemStore()

const componentValue = computed<any>({
  get() {
    return props.modelValue;
  },
  set(data) {
    console.log(data);
    // 异步触发自定义字段的表单校验
    emit('update:modelValue', data);
  }
});

const _options = computed(() => {
  return getOptions(props.prop, props.scopeData, props.config)
})

const _selectValueLabel = computed(() => {
  return props.scopeData[`${props.prop.name}ArrName`]
})

const _fieldNames = computed(() => {
  return {
    text: props.prop.apiProps?.label || defaultFieldNames.text,
    value: props.prop.apiProps?.value || defaultFieldNames.value,
    children: props.prop.apiProps?.children || defaultFieldNames.children,
  }
})


const defaultFieldNames = {
  text: 'name',
  value: 'id',
  children: 'children',
};
const options = ref<any[]>([])

const showPicker = ref(false)

const onConfirm = (val: any) => {
  hide()
  componentValue.value = val.value
  // emit('update:modelValue', val)
}

const show = () => {
  if (props.prop.disabled) return
  showPicker.value = true
}

const hide = () => {
  showPicker.value = false
}


/* 执行下拉框请求 - 级联 */
async function handleSelectCascadeApi(item: FormPropType) {
  if (item.cascadeOptions?.length) return; // 已请求
  if (item.apiFn === undefined) return;
  let params = Array.isArray(item.apiParams)
    ? [...item.apiParams]
    : [item.apiParams];
  if (typeof item.apiParams === "function")
    params = item.apiParams(componentValue.value);

  const res = await item.apiFn(...params);
  // if (!handleResponse(res)) return;
  if (item.apiCbFn === undefined) {
    options.value = Array.isArray(res.data) ? res.data : [];
  } else {
    const cbData = item.apiCbFn(res.data)
    options.value = Array.isArray(cbData) ? cbData : [];
  }
  // 数据缓存
  systemStore.saveDictApi(item.name, item.cascadeOptions);
}

const onChange = (value) => {
  // console.log(value);
  // if (value.selectedOptions[value.selectedOptions.length - 1].children.length === 0) {
  //   delete value.selectedOptions[value.selectedOptions.length - 1].children
  // }
};

const onFinish = ({ selectedOptions }: { selectedOptions: CascaderOption[] }) => {
  hide()
  emit('setCascaderArrName', selectedOptions.map(item => item[props.prop.apiProps?.label || defaultFieldNames.text]).join('/'))
  // fieldValue.value = selectedOptions.map((option) => option.text).join('/');
}

onMounted(() => {
  handleSelectCascadeApi(props.prop)
  setTimeout(() => {

  })
})

defineExpose({
  show
})

</script>
