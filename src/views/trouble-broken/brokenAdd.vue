<template>
  <div class="contentBox">
    <FormPage v-bind="{ ...formPageProps, ...extraData }" :save-btn="true" ref="formPageRef" @onResetData="onResetData">
    </FormPage>
  </div>
</template>

<script lang="ts" setup >
import { useRoute } from 'vue-router';
import { useBroken } from './composables';
import { useTroubleBrokenFieldsSet } from './composables'
import FormPage from '@/components/formPage/FormPage.vue';
import { OpStatus } from '@/types';
import api from '@/api';
/* props */

/* emits */

/* hook */
const route = useRoute();
const {
  formPageProps,
  dialogPropsGroup,
  loadFieldsData,
  setCheckFormFields,
  checkValueList,
  fieldGroup
} = useBroken(getFormData);
const { resetCheckFormFields, resetFormData, businessType } =
  useTroubleBrokenFieldsSet();
businessType.value = 'exter';
/* data */
const formPageRef = ref();
const typeId = ref('');
const isFirst = ref(true);
const extraData = reactive<{
  formOp: OpStatus;
  businessId: string;
  updateValidate: boolean;
}>({
  formOp: 'add',
  businessId: '',
  // 编辑是否校验
  updateValidate: true
});

/* computed */
const _formData = computed(() => {
  if (!formPageRef.value) return null;
  return formPageRef.value._formData;
})
/* watch */
watch(
  () => _formData.value?.exterType,
  val => {
    if (!val || val === typeId.value) return;
    if (!isFirst.value) resetFormFieldsAndData();

    typeId.value = val;
    loadFieldsData(val);
    isFirst.value = false;
  }
);

watch(
  () => _formData.value?.facilityId,
  async (val: any) => {
    if (!val) return;
    const res = await api.protect.facilityQueryInfo({
      id: val
    });
    formPageRef.value.setFormFieldData('isVip', res.data.importantStatus);
  }
);

watch(
  () => _formData.value?.siteSituation,
  val => {
    const valueList = Array.isArray(val) ? val : [val];
    checkValueList.value = valueList;
    setCheckFormFields();
  }
);

/* methods */
function getFormData() {
  return formPageRef.value._formData;
}

function onResetData() {
  fieldGroup.title = '';
  fieldGroup.group = [];
}

function resetFormFieldsAndData() {
  resetCheckFormFields(dialogPropsGroup);
  if (!isFirst.value)
    formPageRef.value.setFormData(resetFormData(_formData.value));
}

function init() {
  const query = route.query;
  if (query.cache === '1') return;
  formPageRef.value.onReset();
  if (query.businessId) {
    extraData.formOp = 'edit';
    extraData.businessId = query.businessId as string;
    extraData.updateValidate = Boolean(Number(query.updateValidate));
  } else {
    extraData.formOp = 'add';
    extraData.businessId = '';
    extraData.updateValidate = true;
  }
}

onMounted(() => {
  init();
});

onActivated(() => {
  init();
});
</script>

<style lang="scss" scoped></style>
