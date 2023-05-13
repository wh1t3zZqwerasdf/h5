import {AnyAndFn, BooleanAndFn, SelectOptionType} from "./../constant.type";

export type UploadReturnType = "string" | "fileObject";
export type UploadType = {
    size: number;
    fileName: string;
    objectName: string;
    suffix: string;
    type: string;
    url: string;
};
export type PropType =
    | 'text' // 文本框
    | 'textarea' // 多行文本框
    | 'password' // 密码框
    | 'number' // 数字输入框
    | 'number-stepper' // 数字输入框
    | 'number-range' // 数字范围输入框
    | 'select' // 下拉框
    | 'select-tag' // 标签选择
    | 'select-multiple' // 下拉框-多选
    // | "select-location" // 下拉框-位置
    | 'select-api' // 下拉框-远程
    | 'select-api-tree' // 下拉框-远程-树
    | 'select-api-filter' // 下拉框-远程-筛选
    | 'select-api-cascade' // 下拉框-远程-级联
    | 'radio' // 单选框
    | 'switch' // 开关
    | 'checkbox' // 多选框
    | 'checkbox-multiple' // 多选框
    | 'button' // 按钮
    | 'upload' // 上传
    | "hidden"
    // | 'upload-phone' // 上传照片
    | 'upload-file' // 上传附件
    | 'date-picker' // 日期选择
    | 'daterange-picker' // 日期范围选择
    | 'datetime-picker' // 时间选择
    | 'datetimerange-picker' // 时间范围选择
    | 'arrayCard' // 数组卡片
    | 'custom'; // 自定义组件
export type FormPropType = {
    name: string;
    alias?: string; //  | string[]; // 别名
    label: string;
    labelWidth?: string;
    // 是否隐藏label
    hiddenLabel?: boolean;
    type: PropType;

    defaultValue?: AnyAndFn;
    defaultValueLoad?: AnyAndFn;
    display?: BooleanAndFn;
    disabled?: BooleanAndFn;
    readonly?: BooleanAndFn;
    required?: BooleanAndFn;
    rules?: any[];

    layoutProps?: any;

    /* input[text|textarea|password] */
    placeholder?: string;
    clearable?: boolean;
    // maxlength?: number; // 使用 range.max
    // minlength?: number; // 使用 range.min
    beforeSubmit?: (data: any) => void; // 提交前处理
    /* input[textarea] */
    autosize?: { minRows?: number; maxRows?: number };

    /* date */
    disabledDate?: (date?: any, formData?: any) => boolean;

    /* number */
    range?: { max?: number; min?: number };
    step?: number;
    precision?: number;
    controlsPosition?: "right";

    /* select */
    filterable?: boolean;
    options?: AnyAndFn<SelectOptionType[]>;
    search?: boolean;
    apiSearch?: boolean;
    apiSearchKey?: string;
    cascadeOptions?: any[];
    apiFn?: (params?: any) => any; // Promise<ApiResponse<T>>;
    apiParams?: { [key: string]: any } | any;
    apiDefaultValue?: (params?: any) => any;
    apiCbFn?: (res: any) => any;
    noCache?: boolean;
    apiProps?: AnyAndFn<any>;
    optionsGroup?: {
        label: string;
        options: SelectOptionType[];
    }[];
    optionCbFn?: (data: any, option: any) => void;
    mult?: boolean; // 是否多选

    /* tree-select */
    // props?: Record<string, any>;
    treeConfig?: {
        lazy: boolean;
        onlySelectLeafNode?: boolean;
        lazyLoad?: (node: any, resolve: any) => void;
        lazyDefaultValueLoad?: (val: any) => void;
    };

    /* upload */
    uploadConfig?: {
        limit?: number;
        returnType?: UploadReturnType;
        fileTemplateUrl?: string;
        tipText?: string;
        accept?: Array<string>;
    };

    // arrayCard
    arrayCardConfig?: {
        addBtn?: boolean;
        max?: number;
        min?: number;
    };

    group?: FormPropType[];
    /* custom */
    customComponent?: any;
    customProps?: any;
    /* object */
    items?: FormPropGroupType[];
    /* 组的限制个数 */
    minimum?: number; //
    showPropKey?: string;
    minLimit?: number;

    /* daterange */
    daterangeConfig?: {
        startTimeKey?: string;
        endTimeKey?: string;
        // 开始时间禁用规则
        startDisabledDate?: (date?: any, formData?: any) => Date;
        // 结束时间禁用规则
        endDisabledDate?: (date?: any, formData?: any) => Date;
    };

    /* tip */
    tip?: string;

    checkLayout?: "block" | "inline-block";
};
export type FormPropGroupType = {
    name: string; // 用于分组 map 中的 key
    title: string; // 标题，可为空字符串""，即不展示分组标题，eg. search
    group: FormPropType[];
    display?: BooleanAndFn;
    disabled?: BooleanAndFn;
    type?: string;
    minLimit?: number; // 需要配置几项该组数据
    [key: string]: any;
};

export type OpStatus =
// | "" // 空字符串
    | "search" // 搜索
    | "add" // 新增
    | "view" // 查看
    | "edit" // 编辑
    | "deal" // 处理
    | "delimit" // 划定
    | "import" // 导入
    | "draft" // 草稿
    | "check" // 检查
    | "review" // 审查 可编辑所有
    | ""; // 留空

export type FormOptionsType = {
    op?: OpStatus;
};

export type FormConfigType = {
    inline?: boolean; // 是否行内
    labelWidth?: string; // label宽度
    op?: OpStatus; // 操作类型
    disabled?: boolean; // 是否禁用整个表单
    isPreview?: boolean; //开启表单预览态
    nodeDisabled?: (params: any) => boolean;
};
