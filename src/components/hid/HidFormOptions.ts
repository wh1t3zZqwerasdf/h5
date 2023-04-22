import { LineType } from "../form/useDynamicForm";
import { cityList, allDict, getHidClass } from "../../data/AllDicts";
import LineUtils from "../../utils/LineUtils";
import UserManager from "../../utils/UserManager";
import { FormInfo, FormType, CollapseFormInfo } from "../form/useDynamicForm";
import { LineEntity } from "../../types/ActivityEntity";

let mReadonly = true;

const formInfos1 = function (readonly?: boolean): Array<FormInfo> {
  if (readonly == null || readonly == undefined) {
    readonly = mReadonly;
  }
  return [
    {
      lineType: LineType.HID,
      type: FormType.HEADER,
      key: "",
      title: "基本信息",
      value: "",
      valueName: "",
      placeholder: "",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {}
    },
    {
      lineType: LineType.HID,
      type: FormType.SELECT2,
      key: "facilityId",
      title: "电站/线路名称",
      value: "",
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: true,
      isShow: true,
      options: {
        customFieldName: {
          text: "name",
          values: "id",
          children: "childList"
        }
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.SELECT,
      key: "cityId",
      title: "行政地理位置",
      value: "",
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        customFieldName: {
          text: "name",
          values: "id",
          children: "childList"
        },
        columns: cityList.value
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.EDIT,
      key: "adminAddr",
      title: "行政位置详细",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        fieldType: "text",
        maxLenght: 100,
        showWordLimit: false,
        clearable: true
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.DATE,
      key: "discoverDate",
      title: "发现日期",
      value: "",
      valueName: "",
      placeholder: "请选择日期",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        type: "date",
        formatter: "yyyy-MM-dd",
        maxDate: new Date(),
        minDate: new Date(2020, 0, 1),
        defaultDate: new Date()
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.EDIT,
      key: "sitePhone",
      title: "现场电话",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: false,
      readonly: readonly,
      isShow: true,
      options: {
        fieldType: "tel",
        maxLenght: 15,
        showWordLimit: false,
        clearable: true
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.SELECT,
      key: "hiddenTroubleLevel",
      title: "隐患等级",
      value: "",
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        columns: allDict.value.hidden_trouble_level
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.SELECT,
      key: "hiddenTroubleType",
      title: "隐患类型",
      value: "",
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        customFieldName: {
          text: "name",
          values: "id",
          children: "children"
        },
        columns: getHidClass()
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.DATE,
      key: "lastDate",
      title: "上一次巡视日期",
      value: "",
      valueName: "",
      placeholder: "请选择日期",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        type: "date",
        formatter: "yyyy-MM-dd",
        maxDate: new Date(),
        minDate: new Date(2020, 0, 1),
        defaultDate: new Date()
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.SELECT,
      key: "isVip",
      title: "重要用户",
      value: "",
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        columns: LineUtils.getVipFormOptions(LineType.HID)
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.SELECT,
      key: "vipType",
      title: "重要用户类型",
      value: "",
      valueName: "",
      placeholder: "请选择",
      isRequired: false,
      readonly: readonly,
      isShow: false,
      isDynamicShow: true,
      options: {
        columns: allDict.value.vip_type
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.EDIT,
      key: "vipName",
      title: "重要用户名称",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: false,
      readonly: readonly,
      isShow: false,
      isDynamicShow: true,
      options: {
        fieldType: "text",
        maxLenght: 100,
        showWordLimit: false,
        clearable: true
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.SELECT,
      key: "source",
      title: "来源",
      value: "",
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        columns: allDict.value.source.slice(1, allDict.value.source.length)
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.HEADER,
      key: "",
      title: "隐患类型",
      value: "",
      valueName: "",
      placeholder: "",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      isDynamicShow: true,
      options: {}
    },
    {
      lineType: LineType.HID,
      type: FormType.EDIT,
      key: "ownerName",
      title: "林权人",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      isDynamicShow: true,
      options: {
        fieldType: "text",
        maxLenght: 100,
        showWordLimit: false,
        clearable: true
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.EDIT,
      key: "ownerPhone",
      title: "林权人联系电话",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      isDynamicShow: true,
      options: {
        fieldType: "tel",
        maxLenght: 100,
        showWordLimit: false,
        clearable: true
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.EDIT,
      key: "ownerOrg",
      title: "业主单位",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      isDynamicShow: true,
      options: {
        fieldType: "text",
        maxLenght: 100,
        showWordLimit: false,
        clearable: true
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.EDIT,
      key: "ownerPhone",
      title: "业主联系电话",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      isDynamicShow: true,
      options: {
        fieldType: "tel",
        maxLenght: 100,
        showWordLimit: false,
        clearable: true
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.EDIT,
      key: "constructionOrg",
      title: "施工单位",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      isDynamicShow: true,
      options: {
        fieldType: "text",
        maxLenght: 100,
        showWordLimit: false,
        clearable: true
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.EDIT,
      key: "constructionPhone",
      title: "施工单位联系电话",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      isDynamicShow: true,
      options: {
        fieldType: "text",
        maxLenght: 100,
        showWordLimit: false,
        clearable: true
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.SELECT,
      key: "licenses",
      title: "作业许可",
      value: "",
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      isDynamicShow: true,
      options: {
        columns: allDict.value.yes_no
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.STEPPER,
      key: "horizontal",
      title: "水平距离",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      isDynamicShow: true,
      options: {}
    },
    {
      lineType: LineType.HID,
      type: FormType.STEPPER,
      key: "vertical",
      title: "垂直距离",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      isDynamicShow: true,
      options: {}
    },
    {
      lineType: LineType.HID,
      type: FormType.STEPPER,
      key: "dropHeight",
      title: "落差高度",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      isDynamicShow: true,
      options: {}
    },
    {
      lineType: LineType.HID,
      type: FormType.STEPPER,
      key: "baseArea",
      title: "基面占用面积",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      isDynamicShow: true,
      options: {}
    },
    {
      lineType: LineType.HID,
      type: FormType.EDIT,
      key: "treeQuantity",
      title: "林木棵树",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      isDynamicShow: true,
      options: {
        fieldType: "text",
        maxLenght: 100,
        showWordLimit: false,
        clearable: true
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.SELECT,
      key: "ownerType",
      title: "林权类型",
      value: "",
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      isDynamicShow: true,
      options: {
        columns: allDict.value.forest_type
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.HEADER,
      key: "",
      title: "隐患现场情况",
      value: "",
      valueName: "",
      placeholder: "",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {}
    },
    {
      lineType: LineType.HID,
      type: FormType.EDIT,
      key: "siteSituation",
      title: "现场情况简述",
      value: "",
      valueName: "",
      placeholder: "请输入内容",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        fieldType: "textarea",
        maxLenght: 1000,
        showWordLimit: true,
        clearable: true,
        rows: 3
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.PHOTO,
      key: "hiddenTroublePhoto",
      title: "上传照片",
      value: [],
      valueName: "",
      placeholder: "请选择",
      isRequired: false,
      readonly: readonly,
      isShow: true,
      options: {
        maxCount: 9
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.HEADER,
      key: "",
      title: "隐患处置情况",
      value: "",
      valueName: "",
      placeholder: "",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {}
    },
    {
      lineType: LineType.HID,
      type: FormType.CHECKBOX,
      key: "hiddenTroubleHarmonize",
      title: "隐患协调情况",
      value: [],
      valueName: "",
      placeholder: "",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      options: {}
    },
    {
      lineType: LineType.HID,
      type: FormType.EDIT,
      key: "siteRemark",
      title: "协调情况备注",
      value: "",
      valueName: "",
      placeholder: "请输入内容",
      isRequired: false,
      readonly: readonly,
      isShow: false,
      options: {
        fieldType: "textarea",
        maxLenght: 1000,
        showWordLimit: true,
        clearable: true,
        rows: 3
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.PHOTO,
      key: "hiddenTroubleFile",
      title: "隐患告知书附件",
      value: [],
      valueName: "",
      placeholder: "请选择",
      isRequired: false,
      readonly: readonly,
      isShow: true,
      options: {
        maxCount: 9
      }
    }
  ];
};
const formInfos2 = function (readonly?: boolean): Array<FormInfo> {
  if (readonly == null || readonly == undefined) {
    readonly = mReadonly;
  }
  return [
    {
      lineType: LineType.HID,
      type: FormType.SELECT,
      key: "fiveIsAccept",
      title: "是否受理",
      value: "",
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        columns: LineUtils.getFiveIsAcceptFormOptions(LineType.HID)
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.EDIT,
      key: "fiveHandleOpinion",
      title: "初步处置意见",
      value: "",
      valueName: "",
      placeholder: "请输入内容",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      options: {
        fieldType: "textarea",
        maxLenght: 1000,
        showWordLimit: true,
        clearable: true,
        rows: 3
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.EDIT,
      key: "fiveReason",
      title: "不受理原因",
      value: "",
      valueName: "",
      placeholder: "请输入内容",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      options: {
        fieldType: "textarea",
        maxLenght: 1000,
        showWordLimit: true,
        clearable: true,
        rows: 3
      }
    }
  ];
};
const formInfos3 = function (readonly?: boolean): Array<FormInfo> {
  if (readonly == null || readonly == undefined) {
    readonly = mReadonly;
  }
  return [
    {
      lineType: LineType.HID,
      type: FormType.SELECT,
      key: "sixIsAgree",
      title: "是否同意",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        columns: LineUtils.getSixIsAgreeFormOptions(LineType.HID)
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.EDIT,
      key: "sixOpinion",
      title: "意见",
      value: "",
      valueName: "",
      placeholder: "请输入内容",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      options: {
        fieldType: "textarea",
        maxLenght: 1000,
        showWordLimit: true,
        clearable: true,
        rows: 3
      }
    }
  ];
};
const formInfos4 = function (readonly?: boolean): Array<FormInfo> {
  if (readonly == null || readonly == undefined) {
    readonly = mReadonly;
  }
  return [
    {
      lineType: LineType.HID,
      type: FormType.DATE,
      key: "sevenDisposeTime",
      title: "处置时间",
      value: "",
      valueName: "",
      placeholder: "请选择日期",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        type: "date",
        formatter: "yyyy-MM-dd",
        maxDate: new Date(),
        minDate: new Date(2020, 0, 1),
        defaultDate: new Date()
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.SELECT,
      key: "sevenDisposeWay",
      title: "处置方式",
      value: "",
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        columns: LineUtils.getHiddenTroubleDisposeWayFormOptions()
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.SELECT,
      key: "sevenCoercive",
      title: "采取强制措施",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      options: {
        columns: allDict.value.coercive
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.CHECKBOX,
      key: "sevenDisposeSituation",
      title: "处置情况",
      value: [],
      valueName: "",
      placeholder: "",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        checkbox: [
          "现场核查",
          "签发安全隐患整改通知书",
          "针对性普法宣传",
          "约谈责任方",
          "协调督促整改",
          "联合执法",
          "签发责令整改文书",
          "行政立案"
        ]
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.EDIT,
      key: "hiddenTroubleHarmonize",
      title: "协调情况备注",
      value: "",
      valueName: "",
      placeholder: "请输入内容",
      isRequired: false,
      readonly: readonly,
      isShow: true,
      options: {
        fieldType: "textarea",
        maxLenght: 1000,
        showWordLimit: true,
        clearable: true,
        rows: 3
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.PHOTO,
      key: "hiddenTroublePhoto",
      title: "现场照片",
      value: [],
      valueName: "",
      placeholder: "请选择",
      isRequired: false,
      readonly: readonly,
      isShow: true,
      options: {
        maxCount: 9
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.SELECT,
      key: "sevenIsAdvice",
      title: "发放整改通知书",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        columns: LineUtils.getSevenIsAdviceFormOptions(LineType.HID)
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.DATE,
      key: "sevenAdviceTime",
      title: "整改通知书发放时间",
      value: "",
      valueName: "",
      placeholder: "请选择日期",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      options: {
        type: "date",
        formatter: "yyyy-MM-dd",
        maxDate: new Date(),
        minDate: new Date(2020, 0, 1),
        defaultDate: new Date()
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.PHOTO,
      key: "sevenAdviceFile",
      title: "整改通知书附件",
      value: [],
      valueName: "",
      placeholder: "请选择",
      isRequired: false,
      readonly: readonly,
      isShow: true,
      options: {
        maxCount: 9
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.EDIT,
      key: "sevenProof",
      title: "法律依据",
      value: "",
      valueName: "",
      placeholder: "请输入内容",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        fieldType: "textarea",
        maxLenght: 1000,
        showWordLimit: true,
        clearable: true,
        rows: 3
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.SELECT,
      key: "isNext",
      title: "协调结束",
      value: "",
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        columns: allDict.value.yes_no
      }
    }
  ];
};
const formInfos5 = function (readonly?: boolean): Array<FormInfo> {
  if (readonly == null || readonly == undefined) {
    readonly = mReadonly;
  }
  return [
    {
      lineType: LineType.HID,
      type: FormType.READONLY,
      key: "eightVerifyUser",
      title: "核实人",
      value: UserManager.getUserInfo().userInfo.name,
      valueName: "",
      placeholder: "请输入内容",
      isRequired: true,
      readonly: true,
      isShow: true,
      options: {
        fieldType: "text",
        maxLenght: 100,
        clearable: true
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.DATE,
      key: "eightVerifyTime",
      title: "核实时间",
      value: "",
      valueName: "",
      placeholder: "请选择日期",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        type: "date",
        formatter: "yyyy-MM-dd",
        maxDate: new Date(),
        minDate: new Date(2020, 0, 1),
        defaultDate: new Date()
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.EDIT,
      key: "eightVerifySituation",
      title: "核实情况",
      value: "",
      valueName: "",
      placeholder: "请输入内容",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        fieldType: "textarea",
        maxLenght: 1000,
        showWordLimit: true,
        clearable: true,
        rows: 3
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.CHECKBOX,
      key: "eightDisposeEffect",
      title: "处置成效",
      value: [],
      valueName: "",
      placeholder: "",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        checkbox: ["避免设备损坏", "避免人员伤亡", "避免线路跳闸", "其他"]
      }
    },
    {
      lineType: LineType.HID,
      type: FormType.PHOTO,
      key: "eightPhoto",
      title: "现场照片",
      value: [],
      valueName: "",
      placeholder: "请选择",
      isRequired: false,
      readonly: readonly,
      isShow: true,
      options: {
        maxCount: 9
      }
    }
  ];
};

const allCollapse = function (): Map<String, CollapseFormInfo> {
  return new Map<String, CollapseFormInfo>([
    ["userTask1", { title: "电力设施产权人提报", formInfos: formInfos1() }],
    ["userTask2", { title: "执法办经办审核", formInfos: formInfos2() }],
    ["userTask3", { title: "执法办负责人审核", formInfos: formInfos3() }],
    ["userTask4", { title: "执法办经办处置", formInfos: formInfos4() }],
    ["userTask5", { title: "电力设施产权人核实", formInfos: formInfos5() }]
  ]);
};

const lineMap = function (): Map<String, LineEntity> {
  return new Map<String, LineEntity>([
    [
      "userTask1",
      {
        title: "电力设施产权人提报",
        content: "执法办经办",
        timestamp: "",
        icon: "more",
        color: "#F1AA2E"
      }
    ],
    [
      "userTask2",
      {
        title: "执法办经办审核",
        content: "执法办经办审核",
        timestamp: "",
        icon: "more",
        color: "#F1AA2E"
      }
    ],
    [
      "userTask3",
      {
        title: "执法办负责人审核",
        content: "执法办负责人审核",
        timestamp: "",
        icon: "more",
        color: "#F1AA2E"
      }
    ],
    [
      "userTask4",
      {
        title: "执法办经办处置",
        content: "执法办经办处置",
        timestamp: "",
        icon: "more",
        color: "#F1AA2E"
      }
    ],
    [
      "userTask5",
      {
        title: "电力设施产权人核实",
        content: "电力设施产权人核实",
        timestamp: "",
        icon: "more",
        color: "#F1AA2E"
      }
    ]
  ]);
};

export default {
  formInfos1,
  allCollapse,
  lineMap
};
