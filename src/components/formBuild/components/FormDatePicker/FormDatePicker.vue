<template>
  <van-field
      v-model="_selectValueLabel"
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
      @click="show"
  />
  <van-popup v-model:show="showPicker" position="bottom" round>
    <van-date-picker
        v-model="dateData"
        :columns-type="dateFormat"
        :disabled="isDisabled(prop, scopeData)"
        :disabledDate="prop?.disabledDate"
        :formatter="formatter"
        title="选择日期"
        @cancel="hide"
        @confirm="dateChange"
    ></van-date-picker>
  </van-popup>
</template>

<script lang="ts" setup>
import {useDate, useFormNew} from '@/composables';
import {FormConfigType, FormPropType} from '@/types';
import {currDateArray} from "@/utils";
import {PropType} from "vue";

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

const componentValue = computed<any>({
  get() {
    return props.modelValue;
  },
  set(data) {
    // 异步触发自定义字段的表单校验
    emit('update:modelValue', data);
  }
});

const _selectValueLabel = computed(() => {
  return componentValue.value?.slice(0, 10)
})

const dateFormat = computed(() => {
  return ['year', 'month', 'day']
});

const formatter = (type, option) => {
  if (type === 'year') {
    option.text += '年';
  }
  if (type === 'month') {
    option.text += '月';
  }
  if (type === 'day') {
    option.text += '日';
  }
  return option;
};


const showPicker = ref(false)
const dateData = ref(currDateArray())

const dateChange = (val) => {
  const selectedValues = val.selectedValues
  componentValue.value = selectedValues.join('-');
  hide()
}

const show = () => {
  if (props.disabled) return
  showPicker.value = true;
}

const hide = () => {
  showPicker.value = false
}

</script>
