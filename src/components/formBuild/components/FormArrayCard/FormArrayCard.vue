<template>
  <div style="width: 100%">
    <div
        v-if="prop.label"
        class="form-group-header content-header group-title p-0"
    >
      <div class="content-sub-title">{{ prop.label }}</div>
    </div>
    <template v-for="(item, index) in formDataList" :key="index">
      <FormBuild
          :ref="setItemRef"
          v-model="formDataList[index]"
          :formConfig="getItemConfig(item)"
          :formPropsGroup="getItemProps(itemProp)"
          class="array-card-item"
      >
        <template #groupTitle="{ prop }">
          <span>{{ prop.title }}</span
          ><span v-if="formDataList.length != 1">{{ index + 1 }}</span>
        </template>
        <template #btnGroup>
          <div v-if="arrayCardConfig.addBtn && !disabled">
            <el-button size="small" @click="addItem">+</el-button>
            <el-button size="small" @click="delItem(index)">-</el-button>
          </div>
        </template>
      </FormBuild>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {useEventBus} from '@/composables';
import FormBuild from '../../core/FormBuild.vue';
import {FormConfigType, FormPropGroupType, FormPropType, OpStatus} from '@/types';
import type {FormInstance} from 'vant';

const props = defineProps({
  // 双向绑定数据
  modelValue: {
    type: Array as PropType<any[]>,
    default: () => {
      return [];
    }
  },
  itemProp: {
    type: Object as PropType<FormPropType>,
    required: true
  },
  formConfig: {
    type: Object as PropType<FormConfigType>,
    required: true
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    required: true
  }
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();
const itemRef = ref<any[]>([]);

// const { handleWarning } = useMessage();
const eventBus = useEventBus();

const prop = computed(() => props.itemProp);
const arrayCardConfig = computed(
    () => prop.value?.arrayCardConfig || {addBtn: true}
);

const formDataList = computed<any>({
  get: () => {
    return props.modelValue || [];
  },
  set: data => {
    emit('update:modelValue', data);
  }
});

const formDataListLength = computed(() => formDataList.value.length);

// watch(
//   formDataList,
//   val => {
//     emit('update:modelValue', val);
//   },
//   { deep: true }
// );

const setItemRef = (el: any) => {
  itemRef.value.push(el);
};

const getItemProps = (item: any) => {
  return item.items as FormPropGroupType[];
};

const addItem = () => {
  if (
      arrayCardConfig.value?.max &&
      formDataListLength.value >= arrayCardConfig.value.max
  ) {
    // handleWarning(`最多只能添加${arrayCardConfig.value?.max}条`);
    return;
  }
  formDataList.value.push({});
};
const delItem = (index: number) => {
  if (
      arrayCardConfig.value?.min &&
      formDataListLength.value <= arrayCardConfig.value.min
  ) {
    // handleWarning(`最少保留${arrayCardConfig.value?.min}条`);
    return;
  }
  formDataList.value.splice(index, 1);
};

const getItemConfig = (item: any) => {
  const config: { op: OpStatus; disabled: boolean; inline: boolean } = {
    op: item.disabled ? 'view' : props.disabled ? 'view' : 'edit',
    disabled: item.disabled ? item.disabled : props.disabled,
    inline: props.formConfig?.inline ? props.formConfig?.inline : false
  };
  return config;
};

const validateForm = async (formRef: FormInstance) => {
  try {
    await formRef.validate()
    return true
  } catch (e) {
    return false
  }
};

const submitChildrenForm = async () => {
  const formRefList = itemRef.value.map((item: any) => item.getFormRef());
  const resList = [];
  for (let i = 0; i < formRefList.length; i++) {
    const result = await validateForm(formRefList[i].value);
    if (!result) console.log(`第${i + 1}项校验未通过`);

    resList.push(result);
  }
  eventBus.emit('CHILDREN_FORM_SUBMIT', !resList.includes(false));
};

onMounted(() => {
  eventBus.on('FORM_SUBMIT', () => {
    submitChildrenForm();
  });
});
onBeforeUpdate(() => {
  itemRef.value = [];
});
onUnmounted(() => {
  eventBus.off('FORM_SUBMIT');
});
</script>

<style lang="less" scoped>
.array-card-item {
  padding-bottom: 20px;
  border-bottom: 1px solid var(--hy-border-color);
}
</style>
