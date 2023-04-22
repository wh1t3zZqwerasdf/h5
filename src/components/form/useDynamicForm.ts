import { FieldType, PickerFieldNames } from "vant";

/**
 * 新需求
 * 需要在一个表单里面，添加另一个表单
 * 问题
 * 1、原表单有动态显示隐藏的状态，在添加到另外一个表单时，会丢失这个状态，需要多添加一个状态，判断如果是需要动态显示隐藏的，则应该不设置为显示，由动态业务逻辑判断
 */

/**
 * 表单概要信息
 */
export type FormInfo = {
  lineType: number;
  type: number; //1编辑，2列表选择,3时间选择，
  key: string; //对应表单字段名称
  title: string; //表单标题
  value: any; //表单默认值，不填就会显示占位符
  valueName: string; //表单默认值的名称，不填就显示value，有时候显示的和实际传给后端的值不是同一个，比如广东：10000， valueName=广东，value=10000,后端需要的是value
  placeholder: string; //占位符
  isRequired: boolean; //是否必填项
  readonly: boolean; //是否只读
  isShow: boolean;
  isDynamicShow?: boolean; //是否通过配置显示隐藏，优先级大于isShow,因为如果是通过配置显示隐藏的，初始化一定是隐藏
  options: FormOptions; //表单填充的数据，在选择列表、图片列表之类的时候需要用到,或者对字数的限制，正则式等，可定制扩展
};

//可展开收起的表单
export type CollapseFormInfo ={
  title: string;
  formInfos: Array<FormInfo>;

  //左侧显示的图标
  icon?: string;
  //图标颜色
  iconColor?: string;
  //图片是否显示
  iconShow?: boolean;
}

export class FormInfoItem {}

export const FormType = {
  HEADER: 0, //每个节点的头部
  EDIT: 1, //编辑
  SELECT: 2, //选择
  DATE: 3, //时间
  PHOTO: 4, //照片
  STEPPER: 5, //步进器
  CHECKBOX: 6, //复选框
  UPLOADFILE: 7, //上传文件
  READONLY: 8, //只读类型，不能修改的文本框
  SELECT2: 9, //选择+搜索
  CUSTOMFORM: 10 //自定义内容
};

export const LineType = {
  REPORT: 0, //举报
  HID: 1, //隐患
  EXTER: 2, //外破
  PROTECT: 3 //保护区
};

export type FormOptions = {
  // photos?: any;
  fieldType?: FieldType;
  maxLenght?: number;
  showWordLimit?: boolean;
  clearable?: boolean;
  rows?: number;
  autosize?: boolean;
  showPicker?: boolean;
  /**
   * {formOptions, hideFormOptions, checkboxOptions}
   * formOptions要动态显示的表单，hideFormOptions要动态隐藏的表单
   * 如果只有formOptions的情况下，默认会隐藏所有的表单，再显示formOptions的对应表单
   * checkboxOptions动态配置checkbox的多选项
   */
  columns?: Array<ColumnOption>;
  defaultIndex?: number;
  customFieldName?: PickerFieldNames;
  defaultDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  maxCount?: number;
  type?: string;
  formatter?: string;
  checkbox?: Array<string>;
  condition?: Object;
  template?: string;
  key?: string; //获取值对应的字典的key
  data?: Array<any>;
};

/**
 * 动态表单配置
 */
export type DynamicFormOption = {
  isShow: boolean;
  title: string;
  lineType: number;
  isHideOldForm?: boolean;
};

/**
 * 选项类型配置
 */
export type ColumnOption = {
  dynamicFormOptions?: Array<DynamicFormOption>;
  // formOptions?: Array<string>;
  // hideFormOptions?: Array<string>;
  neverHighFormOptions?: Array<string>;
  checkboxOptions?: Array<string>;
  condition?: Object;
  [key: string]: any;
};
