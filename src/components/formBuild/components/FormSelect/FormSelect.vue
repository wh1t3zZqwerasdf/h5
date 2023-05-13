<template>
  <van-field v-model="_selectValueLabel" :class="['form-item', `form-item-${prop.type}`]"
             :label="!prop.hiddenLabel && prop.label" :name="prop.name" :placeholder="prop.placeholder || '请选择'"
             :readonly="true"
             :required="isRequired(prop, scopeData, config)" :rules="prop.rules?.map((rule: any) => {
        if (rule.required) {
          rule.message = rule.message || `${prop.label}不能为空`;
        }
        return rule
      })" clearable @click="show"/>
  <van-popup v-model:show="showPicker" position="bottom" round>
    <van-picker :columns="_options" :columns-field-names="customFieldName" :loading="loading"
                @cancel="showPicker = false"
                @confirm="onConfirm">
      <template v-if="prop.search" #columns-top>
        <van-search v-model="searchValue" class="search-input" placeholder="请输入搜索关键词"/>
      </template>
      <template v-if="prop.apiSearch" #columns-top>
        <van-search v-model="apiSearchValue" class="search-input" placeholder="请输入搜索关键词"/>
      </template>
    </van-picker>
  </van-popup>
</template>

<script lang="ts" setup>
import _ from 'lodash';
import {useFormNew, useState} from '@/composables'
import {FormConfigType, FormPropType} from "@/types";

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

const searchValue = ref('');
const apiSearchValue = ref('');
const {isDisabled, getOptions, isReadonly, isRequired, setFormConfig} =
    useFormNew(props.config);

const {loading} = useState()

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
  // console.log(props.prop, props.scopeData, props.config)
  return getOptions(props.prop, props.scopeData, props.config).filter(item =>
      item.label.indexOf(searchValue.value) !== -1
  )
})

const _selectValueLabel = computed(() => {
  const item = _options.value?.filter(item => item.value === componentValue.value)[0];
  if (!item) {
    return apiValueOptions.value?.label
  }
  return item?.label
})


const _apiSearchKey = computed(() => {
  return props.prop.apiSearchKey || 'name'
})

const showPicker = ref(false)
// 回显数据源
const apiValueOptions = ref()
const customFieldName = {
  text: 'label'
}

const onConfirm = (val: any) => {
  const selectedValues = val.selectedValues
  showPicker.value = false
  componentValue.value = selectedValues[0]
  // emit('update:modelValue', val)
}

const show = () => {
  if (props.disabled) return
  showPicker.value = true;
}

async function handleSelectApi(item: FormPropType) {
  if (item.apiFn === undefined) return;
  loading.value = true
  let params = Array.isArray(item.apiParams)
      ? [...item.apiParams]
      : item.apiParams;
  if (typeof item.apiParams === 'function')
    params = item.apiParams(props.scopeData);
  const res = await item.apiFn({...params, [_apiSearchKey.value]: apiSearchValue.value});
  // if (!handleResponse(res)) return;
  if (item.apiCbFn === undefined) {
    item.options = Array.isArray(res.data) ? res.data : [];
  } else {
    const cbData = item.apiCbFn(res.data);
    item.options = Array.isArray(cbData) ? cbData : [];
  }
  if (item.apiDefaultValue)
    componentValue.value = item.apiDefaultValue(item.options);
  loading.value = false
}

const onApiSearch = _.throttle(handleSelectApi, 200, {
  leading: true,
  trailing: false
});

const loadDefaultApiValue = async () => {
  const data = await props.prop.defaultValueLoad(props.modelValue)
  apiValueOptions.value = data || {}
}

watch(apiSearchValue, val => {
  onApiSearch(props.prop)
})

onMounted(() => {
  handleSelectApi(props.prop)
  if (props.prop.defaultValueLoad) {
    loadDefaultApiValue()
  }
})

defineExpose({
  show
})

</script>

<style lang="less" scoped>
.search-input {
  :deep(.van-field__label--top) {
    width: 10px;
  }
}
</style>
