import { DialogConfigType, OpStatus } from '@/types';
import { useFormHandler } from './useFormHandler';
import { useState } from './useState';
export const DIALOG_CONFIG: DialogConfigType = {
  width: '1200px',
  top: '5vh',
  mini: false,
  title: '',
  op: 'add'
};
export function useDialogNew(config?: DialogConfigType) {
  const dialogVisible = ref(false);

  const dialogData = ref<any>({});

  const dialogConfig = ref<DialogConfigType>(DIALOG_CONFIG);
  if (config) Object.assign(dialogConfig.value, config);

  const { loading: dialogLoading } = useState();

  function setDialogConfig(config: DialogConfigType) {
    dialogConfig.value = config;
  }
  function setDialogData(data: any = {}) {
    dialogData.value = data;
  }

  // BUG: 初始化调用2次，且参数为整个ShowDialog挂载的属性和方法
  // FIXME: 方法名和组件名字相同，导致将组件属性作为参数传入同名方法
  function _showDialog(visible = true) {
    dialogVisible.value = visible;
  }

  const { validateFlag, validateConfig, validateRender } = useFormHandler();

  function validateFinished() {
    validateFlag.value = false;
  }

  function openDialog(op: OpStatus, data: any = {}) {
    setDialogData(data);
    _showDialog();
    dialogConfig.value.op = op;
  }
  function closeDialog() {
    setDialogData({});
    _showDialog(false);
  }
  return {
    validateFlag,
    validateConfig,
    validateRender,
    validateFinished,
    dialogVisible,
    dialogConfig,
    dialogData,
    dialogLoading,
    setDialogData,
    setDialogConfig,
    openDialog,
    closeDialog
  };
}
