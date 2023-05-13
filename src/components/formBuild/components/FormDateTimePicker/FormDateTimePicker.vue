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
    <van-picker-group
        :tabs="['选择日期', '选择时间']"
        :title="prop.label"
        next-step-text="下一步"
        @cancel="hide"
        @confirm="dateChange"
    >
      <van-date-picker
          v-model="dateData"
          :columns-type="dateFormat"
          :disabled="isDisabled(prop, scopeData)"
          :disabledDate="prop?.disabledDate"
          :formatter="formatter"
          title="选择日期"
      ></van-date-picker>
      <van-time-picker v-model="currentTime"/>
    </van-picker-group>
  </van-popup>
</template>

<script lang="ts" setup>
import {useDate, useFormNew} from '@/composables';
import {FormConfigType, FormPropType} from '@/types';
import {currDateArray, getDateString} from "@/utils";
import type {PickerGroupProps} from 'vant';
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
    if (!props.modelValue) return props.modelValue
    return getDateString(props.modelValue as unknown as Date, 'YYYY-MM-DD HH:mm');
  },
  set(data) {
    // 异步触发自定义字段的表单校验
    emit('update:modelValue', data);
  }
});

const _selectValueLabel = computed(() => {
  return componentValue.value
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
const currentTime = ref()

const dateChange = (val: PickerGroupProps) => {
  const dateSelectedValues = val[0].selectedValues
  const timeSelectedValues = val[1].selectedValues
  componentValue.value = `${dateSelectedValues.join('-')} ${timeSelectedValues.join(':')}`
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
