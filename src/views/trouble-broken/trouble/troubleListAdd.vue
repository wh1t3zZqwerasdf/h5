<script setup lang="ts">
import FormBuild from '@/components/formBuild';
import { troubleListAdd } from './composables/troubleListAdd'

import { useMessage, useFormNew } from '@/composables'
import api from '@/api';
import { useTroubleBrokenFieldsSet } from '@/views/trouble-broken/trouble/composables/useTroubleBrokenFieldsSet';
/* const */
const { dialogPropsGroup, loadFieldsData, setCheckFormFields, checkValueList } = troubleListAdd(getFormData)
const formData = ref({})
const formBuildRef = ref()
const isFirst = ref(true);
const typeId = ref('');
const { handleSuccess } = useMessage()
const { validateForm } = useFormNew()
const { resetCheckFormFields, resetFormData } = useTroubleBrokenFieldsSet();


/* methods */
// const onSubmit = async () => {
//   const valid = await validateForm(formData.value)
//   if (!valid) return;
//   console.log(formData.value, 'formData.value');
//   handleSuccess('点击按钮');
//   return formData.value;
// }

function getFormData() {
  console.log(formBuildRef.value._formData);
  return formBuildRef.value._formData;
}

async function onSubmit() {
  await formBuildRef.value.onSubmit()
  api.hid.addData(formData.value)
  handleSuccess('新增成功')
}

function resetFormFieldsAndData() {
  resetCheckFormFields(dialogPropsGroup);
  if (!isFirst.value)
    formBuildRef.value.setFormData(resetFormData(formData.value));
}

/* watch */
watch(
  () => formData.value?.hiddenTroubleType,
  val => {
    if (!val || val === typeId.value) return;
    if (!isFirst.value) resetFormFieldsAndData();

    typeId.value = val;
    loadFieldsData(val);
    isFirst.value = false;
  }
);

watch(
  () => formData.value?.hiddenTroubleHarmonize,
  val => {
    checkValueList.value = val?.split(',') || [];
    setCheckFormFields();
  }
);
</script>

<template>
  <div>
    <FormBuild ref="formBuildRef" :modelValue="formData" :formPropsGroup="dialogPropsGroup" :formConfig="{ op: 'add' }">
    </FormBuild>
    <div class="trouble-add">
      <div class="trouble-add-left">
        <img src="@/assets/images/zancun.png" alt="">
        <span>暂存</span>
      </div>
      <van-button type="primary" size="large" @click="onSubmit">提交
      </van-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.trouble-add {
  display: flex;
  margin-top: 10px;
  padding: 15px;
  background-color: #fff;
}

.trouble-add-left {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 120px;

  span {
    font-size: 13px;
    line-height: 20px;
  }
}
</style>