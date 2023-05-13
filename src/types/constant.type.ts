/**
 * 常量类型
 *
 * 弹窗config
 * 表单下拉框选项 options
 */
import type {
  CascaderOption,
  CascaderProps,
  FormItemRule,
  ColSizeObject
} from 'element-plus';
import { RouteRecordRaw } from 'vue-router';
import {  FormPropType } from '@/types';

export const HTTP_STATUS = {};

export const CODE_STATUS = {
  SUCCESS: 200,
  EXPIRED: 4011
} as const;

export type MenuType = {
  name: string | any;
  title: string | any;
  path: string;
  icon?: string;
  iconActive?: string;
  key?: string;
  allow?: string | string[]; // 权限-允许
  meta?: { showMenu: boolean };
  children?: MenuType[];
};

type RouteExtraData = {
  componentPath?: string;
  parentId?: string;
  title: string;
  [key: string]: any;
  children: OmpRouteRecordRaw[];
};

export type OmpRouteRecordRaw = RouteExtraData & RouteRecordRaw;

type processStatus =
  | 'wait' // 灰色
  | 'process' // 黑色
  | 'finish' // 蓝色
  | 'error' // 红色
  | 'success'; // 绿色

export type StepsConfigType = {
  direction?: 'vertical' | 'horizontal';
  active?: number;
  simple?: boolean;
  alignCenter?: boolean;
  processStatus?: processStatus;
  finishStatus?: processStatus;
};

export type ProcessStepType = {
  key?: string;
  title: string;
  status?: processStatus;
  description?: { username: string; endTime: string };
  icon?: string;
  // groupSteps?: FormPropGroupType[];
};

export type TabPaneType = {
  name: string;
  label: string;
  count: number;
};

export enum OpStatusText {
  wait = '等待',
  process = '处理中',
  finish = '完成',
  search = '搜索',
  add = '新增',
  view = '查看',
  edit = '编辑',
  deal = '处理',
  draft = '草稿',
  delimit = '划定',
  import = '导入',
  check = '检查', // 新增检查项
  review = '审查'
}

export type ValidateCbNameType = 'submit' | 'update' | 'deal';
export type DialogConfigType = {
  title: string;
  // 非表单操作标题
  notFormAction?: boolean;
  top?: string;
  width?: string | number;
  height?: string | number;
  op?: OpStatus;
  customClass?: string;
  mini?: boolean;
};
export type DialogType = 'dialog' | 'drawer';

export type SelectOptionType = {
  label: string;
  value: string | number;
  disabled?: boolean;
  default?: string;
  text?: string;
  title?: string;
};

export type TablePropType = {
  name: string;
  label: string;
  type?:
    | 'selection'
    | 'index'
    | 'expand'
    | 'button'
    | 'input'
    | 'date'
    | 'select'; // 0820 添加button类型
  fixed?: boolean | 'left' | 'right';
  format?: string;
  width?: number;
  align?: string;
  keyMap?: { [key: string]: string }; // 针对options数据进行映射
  fun?: any;
  customFun?: (data: any, name: string) => string | number; // 自定义函数处理属性值并返回
};

// 附件上传接口返回类型
export interface UploadResponse {
  fileName: string;
  objectName: string;
  size: number;
  suffix: string;
  type: string;
  url: string;
}


/* 任务流程 */
export type ActivityProcessStepsType = {
  id: string;
  title: string;
  status: number;
};
/* ========== utils ========== */
// export type BooleanAndFn =
//   | boolean
//   | ((data: any, op?: OpStatus, other?: any) => boolean);
// export type StringAndFn =
//   | string
//   | ((data: any, op?: OpStatus, other?: any) => string);
// export type NumberAndFn =
//   | number
//   | ((data: any, op?: OpStatus, other?: any) => number);
export type Fn<T = void, P = any> = (params?: P) => T;
export type BooleanAndFn = AnyAndFn<boolean>;
export type StringAndFn = AnyAndFn<string>;
export type NumberAndFn = AnyAndFn<number>;

export type AnyAndFn<T = any> =
  | T
  | ((data: any, op?: OpStatus, other?: Record<string, any>) => T);


  export type GroupSetType = {
  dealSituation: string[];
  dealWorkbench: string[];
  fieldList: FormPropType[];
  name: string;
};