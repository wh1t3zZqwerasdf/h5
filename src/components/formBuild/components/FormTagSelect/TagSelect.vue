<template>
  <div>
    <div v-for="(item, index) in options" :key="index" :class="{'activity-item': isActivity(item)}"
         class="tag-option-item" @click="onSelect(item)">{{ item.label }}
    </div>
  </div>
</template>

<script lang="ts" setup>
type Options = { label: string, value: string | number }
const props = defineProps({
  modelValue: {
    type: String as PropType<string | number | string[] | number[]>,
  },
  options: {
    type: Array as PropType<Options[]>,
    required: true
  },
  mult: {
    type: Boolean as PropType<boolean>,
    defaultValue: false
  },
  disabled: {
    type: Boolean as PropType<boolean>
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();


const componentValue = computed<any>({
  get() {
    return props.modelValue;
  },
  set(data) {
    // 异步触发自定义字段的表单校验
    emit('update:modelValue', data);
  }
});

const _isMult = computed(() => {
  return props?.mult || false
})


const onSelect = (item: Options) => {
  if (_isMult.value) {
    componentValue.value ? componentValue.value.push(item.value) : componentValue.value = [item.value]
    return
  }

  componentValue.value = item.value
}

const isActivity = (item: Options) => {
  if (!componentValue.value) return false
  if (_isMult.value) {
    return componentValue.value.includes(item.value)
  }
  return componentValue.value === item.value
}


</script>
<style lang="less" scoped>
.tag-option-item {
  padding: 0 10px;
  border: 1px solid var(--hy-border-color);
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  display: inline-block;
}

.activity-item {
  color: #fff;
  background: var(--hy-primary-color);
}
</style>
