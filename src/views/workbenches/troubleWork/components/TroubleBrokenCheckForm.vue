<template>
  <div class="w-full">
    <FormBuild ref="formRef" v-model="reactiveData.formData" :form-config="_formConfig" :form-props-group="formProps">
    </FormBuild>
  </div>
</template>

<script lang="ts" setup>
import { useTroubleBrokenFieldsSet } from '@/views/trouble-broken/composables/useTroubleBrokenFieldsSet';

import { TroubleBrokenCheckFormProps } from '../composables/props';
import { FormPropGroupType, OpStatus, StructureClassInfo } from '@/types';
import FormBuild from '@/components/formBuild/core/FormBuild.vue';
import api from '@/api';
import { useEventBus } from '@/composables';
import { FormInstance } from 'element-plus';

const props = defineProps(TroubleBrokenCheckFormProps);
const emit = defineEmits(['update:modelValue']);

/* hook */
const eventBus = useEventBus();
const {
  submitDataFilter,
  viewDataFilter,
  getFormFieldsAndCheckData,
  checkOptionsMap,
  checkValueList,
  resetCheckFormFields,
  getCheckFormFields
} = useTroubleBrokenFieldsSet();

/* data */
const formRef = ref();
const reactiveData = reactive<{
  parentId: string;
  checkOptions: any[];
  formData: { sevenDisposeSituation?: string[] };
}>({
  parentId: '',
  checkOptions: [],
  formData: {}
});

const formProps = reactive<FormPropGroupType[]>([
  {
    name: 'zone1',
    title: '',
    group: [
      {
        name: 'sevenDisposeSituation',
        label: '处置情况',
        type: 'checkbox',
        checkLayout: 'block',
        options: (data: any, op?: OpStatus) => {
          return reactiveData.checkOptions;
        },
        // rules: [{ required: true }],
        layoutProps: {
          span: 24
        }
      }
    ]
  }
]);

/* computed */
const _props = computed(() => props);
const _formConfig = computed(() => props.formConfig);
const _formData = computed({
  get: () => {
    return props.modelValue;
  },
  set: val => {
    emit('update:modelValue', val);
  }
});

/* watch */
watch(
  () => reactiveData.formData.sevenDisposeSituation,
  (val: any) => {
    if (typeof val === "string") {
      val = val.split(',')
    }
    checkValueList.value = val || [];
    setCheckFormFields();
  },
  { deep: true }
);

watch(
  () => reactiveData.formData,
  val => {
    emit('update:modelValue', val);
  },
  { deep: true }
);

async function loadFieldsData(id: string) {
  const { success, data } = await api.structure.structureClassQueryInfo({
    id,
    roleType: props.roleType
  });
  setFormFields(data);
}

function setFormFields(data: StructureClassInfo) {
  const childrenData = getFormFieldsAndCheckData(data);
  // 产权人处置情况勾选项
  reactiveData.checkOptions = childrenData.checkOptions;
}

function setCheckFormFields() {
  if (JSON.stringify(checkOptionsMap) === '{}') {
    setTimeout(() => {
      setCheckFormFields();
    }, 200);
    return;
  }
  console.log(checkValueList.value)
  const checkDataList = checkValueList.value?.map(
    item => checkOptionsMap[item]
  );
  resetCheckFormFields(formProps);
  formProps.splice(
    1,
    0,
    ...(getCheckFormFields(checkDataList) as FormPropGroupType[])
  );
}

const submitChildrenForm = async () => {
  const formRefNode = formRef.value.getFormRef();
  const result = await validateForm(formRefNode.value);
  eventBus.emit('CHILDREN_FORM_SUBMIT', result);
};

const validateForm = async (formRef: FormInstance) => {
  try {
    await formRef.validate()
    return true
  } catch (e) {
    return false
  }
};

onUnmounted(() => {
  eventBus.off('FORM_SUBMIT');
});
onMounted(() => {
  eventBus.on('FORM_SUBMIT', () => {
    submitChildrenForm();
  });
  reactiveData.formData = props.modelValue || {};
  console.log(reactiveData.formData.sevenDisposeSituation)
  if (!reactiveData.formData.sevenDisposeSituation) {
    reactiveData.formData.sevenDisposeSituation = []
  }
  reactiveData.parentId = props.parentId;
  loadFieldsData(reactiveData.parentId);
});
</script>

<style lang="scss" scoped></style>
