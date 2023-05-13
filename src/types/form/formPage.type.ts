import api from '@/api';
import { FormPropGroupType, OpStatus } from '@/types';

export type FormPageType =
  | 'form'
  | 'saveSuccess'
  | 'submitSuccess'
  | 'editSuccess';

export enum FormResultStatusEnum {
  form,
  saveSuccess,
  submitSuccess = 1,
  editSuccess = 1
}

// TODO类型需要调整
export type ApiFnMapType = {
  add?: (data: any, type?: any) => any;
  submit?: (data: any, type?: any) => any;
  delete?: (data: any) => any;
  update?: (data: any, type?: any) => any;
  list?: (data: any) => any;
  draftsList?: (data: any) => any;
  queryInfo?: (data: any) => any;
};

// 钩子
export type HookFnMapType = {
  // 列表接口赋值前数据处理
  beforeListFn?: (data: any) => any;
  // 保存接口提交前的参数处理钩子
  beforeSaveFn?: (data: any) => any;
  // 保存接口提交后的钩子
  afterSaveFn?: (data: any) => any;
  // 提交接口之前的参数处理钩子
  beforeSubmitFn?: (data: any) => any;
  // 提交接口之后的钩子
  afterSubmitFn?: (data: any) => any;
  // 查看详情前详情数据处理钩子
  beforeDetailFn?: (data: any) => any;
  // 更新数据前的钩子
  beforeUpdateFn?: (data: any) => any;
  // 更新数据接口之后的钩子
  afterUpdateFn?: (data: any) => any;
  beforeDeleteFn?: (data: any) => any;
};

export type FormPagePropsType = {
  formProps: FormPropGroupType[];
  stepProps?: FormPageStepPropsType;
  apiFnMap: ApiFnMapType;
  hookFnMap?: HookFnMapType;
  saveBtn?: Boolean;
  // 表单状态
  formOp?: OpStatus;
  // 业务id
  businessId?: string;
  // 编辑是否校验表单
  updateValidate?: boolean;
  title: string;
  listRouter: {
    submitSuccess?: { name: string };
    saveSuccess?: { name: string };
    editSuccess?: { name: string };
  };
  subAfterBtn?: {
    add: boolean;
    toList: boolean;
    details: boolean;
  };
  defaultFormData?: { [key: string]: string | number | any[] };
  bodyStyle?: { [key: string]: string | number };
};

export type StepDataSourceType = {
  title: string;
  description: string;
  active?: boolean;
  step?: number;
};

export type FormPageStepPropsType = {
  dataSource: StepDataSourceType[];
};
