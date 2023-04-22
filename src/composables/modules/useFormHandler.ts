import { ValidateCbNameType, FormConfigType } from '@/types';
import { FormInstance } from 'element-plus';
import { FORM_CONFIG } from '@/composables';

export function useFormHandler() {
  const formData = ref<any>({});

  const formInstance = ref<FormInstance>();

  const formConfig = ref<FormConfigType>(FORM_CONFIG);

  /* 校验表单 */
  const validateFlag = ref(false);

  const validateConfig = ref<{
    cbName: ValidateCbNameType;
    cbParams: any;
  }>({
    cbName: 'submit',
    cbParams: {}
  });
  function validateRender(fnName?: ValidateCbNameType, params?: any) {
    validateFlag.value = true;
    validateConfig.value.cbName = fnName || 'submit';
    validateConfig.value.cbParams = params ?? {};

    console.log('validateRender--params-------', params);
  }
  async function validateForm(formEl?: FormInstance) {
    if (!formEl) return false;

    if (formEl) formInstance.value = formEl;
    // 先清除验证信息
    formEl.clearValidate();
    return formEl.validate((valid, fields) => {
      if (!valid) {
        // TODO: 滚动到错误行，fields为对象，无序
        // scrollToField(fields![0].name, formEl);
        return false;
      } else {
        return true;
      }
    });
  }
  /* 重置表单 */
  function resetForm(formEl?: FormInstance) {
    formEl?.resetFields();
  }
  /* 清除表单验证信息 */
  function clearValidate(formEl?: FormInstance, name?: string) {
    formEl?.clearValidate(name);
  }
  /* 滚动到某个字段 */
  function scrollToField(name: string) {
    formInstance.value?.scrollToField(name);
  }
  /* 设置表单数据 */
  function setFormData(data: any) {
    formData.value = data;
  }
  function assignFormData(data: any) {
    Object.assign(formData.value, data);
  }

  return {
    formData,
    formConfig,
    validateFlag,
    validateConfig,
    validateRender,
    validateForm,
    resetForm,
    clearValidate,
    scrollToField,
    setFormData,
    assignFormData,
    handleValidate: validateForm
  };
}
