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
  <van-calendar
      v-model="dateData"
      v-model:show="showPicker"
      :disabled="isDisabled(prop, scopeData)"
      :disabledDate="prop?.disabledDate"
      title="选择起始日期"
      type="range"
      @cancel="hide"
      @confirm="dateChange"
  ></van-calendar>
</template>

<script lang="ts" setup>
import {useDate, useFormNew} from '@/composables';
import {FormConfigType, FormPropType} from '@/types';
import {currDateArray, getDateString} from "@/utils";
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
  (e: 'setDateRangeData', data: any): void;
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
  return componentValue.value
})

const startTimeKey = props.prop.daterangeConfig
    ? props.prop.daterangeConfig.startTimeKey ||
    `${props.prop.name}StartTime`
    : `${props.prop.name}StartTime`;

const endTimeKey = props.prop.daterangeConfig
    ? props.prop.daterangeConfig.endTimeKey || `${props.prop.name}EndTime`
    : `${props.prop.name}EndTime`;

const showPicker = ref(false)
const dateData = ref(currDateArray())

const dateChange = (val) => {
  const startTime = val[0];
  const endTime = val[1]
  const selectedValues = val.selectedValues
  componentValue.value = `${getDateString(startTime)} 至 ${getDateString(endTime)}`
  emit('setDateRangeData', {
    [startTimeKey]: `${getDateString(startTime)} 00:00:00`,
    [endTimeKey]: `${getDateString(endTime)} 00:00:00`,
  });
  hide()
}

const show = () => {
  if (props.disabled) return
  showPicker.value = true;
}

const hide = () => {
  showPicker.value = false
}

watch(props.scopeData, (val) => {
  if (val[startTimeKey] && val[endTimeKey]) {
    componentValue.value = `${getDateString(val[startTimeKey])} 至 ${getDateString(val[endTimeKey])}`
  }
})

</script>
