import { LineType } from "../../form/useDynamicForm";
import { allDict, cityList } from "../../../data/AllDicts";
import LineUtils from "../../../utils/LineUtils";
import {
  CollapseFormInfo,
  FormInfo,
  FormType
} from "../../form/useDynamicForm";
import { LineEntity } from "../../../types/ActivityEntity";

const readonly = true;
const formInfos1: Array<FormInfo> = [
  {
    lineType: LineType.REPORT,
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
    lineType: LineType.REPORT,
    type: FormType.EDIT,
    key: "reportName",
    title: "举报人",
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
    lineType: LineType.REPORT,
    type: FormType.EDIT,
    key: "reportPhone",
    title: "举报电话",
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
    lineType: LineType.REPORT,
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
    lineType: LineType.REPORT,
    type: FormType.EDIT,
    key: "hidExterAddr",
    title: "隐患外破详细地址",
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
    lineType: LineType.REPORT,
    type: FormType.EDIT,
    key: "reportContent",
    title: "举报内容",
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
    lineType: LineType.REPORT,
    type: FormType.PHOTO,
    key: "sitePhoto",
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

const formInfos2: Array<FormInfo> = [
  {
    lineType: LineType.REPORT,
    type: FormType.SELECT,
    key: "isNext",
    title: "是否受理",
    value: "",
    valueName: "",
    placeholder: "请选择",
    isRequired: true,
    readonly: readonly,
    isShow: true,
    options: {
      columns: LineUtils.getReportIsNextFormOptions()
    }
  },
  {
    lineType: LineType.REPORT,
    type: FormType.EDIT,
    key: "reportContent",
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

const formInfos3: Array<FormInfo> = [
  {
    lineType: LineType.REPORT,
    type: FormType.SELECT,
    key: "isTrue",
    title: "情况属实",
    value: "",
    valueName: "",
    placeholder: "请选择",
    isRequired: true,
    readonly: readonly,
    isShow: true,
    options: {
      columns: LineUtils.getReportIsTrueFormOptions()
    }
  },
  {
    lineType: LineType.REPORT,
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
    lineType: LineType.REPORT,
    type: FormType.PHOTO,
    key: "sitePhoto",
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
    lineType: LineType.REPORT,
    type: FormType.SELECT,
    key: "isOneself",
    title: "自行处置",
    value: "",
    valueName: "",
    placeholder: "请选择",
    isRequired: true,
    readonly: readonly,
    isShow: false,
    options: {
      columns: LineUtils.getReportIsOneselfFormOptions()
    }
  },
  {
    lineType: LineType.REPORT,
    type: FormType.SELECT,
    key: "disposeWay",
    title: "事件类型",
    value: "",
    valueName: "",
    placeholder: "请选择",
    isRequired: true,
    readonly: readonly,
    isShow: false,
    options: {
      columns: LineUtils.getReportDisposeWayfFormOptions()
    }
  }
];

const formInfos4: Array<FormInfo> = [
  {
    lineType: LineType.REPORT,
    type: FormType.EDIT,
    key: "disposeResult",
    title: "反馈结果",
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
    lineType: LineType.REPORT,
    type: FormType.DATE,
    key: "disposeTime",
    title: "反馈时间",
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
  }
];

const allCollapse = new Map<String, CollapseFormInfo>([
  ["userTask1", { title: "电力设施产权人提报", formInfos: formInfos1 }],
  ["userTask2", { title: "执法办经办审核", formInfos: formInfos2 }],
  ["userTask3", { title: "电力设施产权人核实", formInfos: formInfos3 }],
  ["userTask5", { title: "执法办经办反馈", formInfos: formInfos4 }]
]);

const lineMap = function (): Map<String, LineEntity> {
  return new Map<String, LineEntity>([
    [
      "userTask1",
      {
        title: "发起申请",
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
        title: "电力设施产权人核实",
        content: "电力设施产权人核实",
        timestamp: "",
        icon: "more",
        color: "#F1AA2E"
      }
    ],
    [
      "userTask5",
      {
        title: "执法办经办反馈",
        content: "执法办经办反馈",
        timestamp: "",
        icon: "more",
        color: "#F1AA2E"
      }
    ]
  ]);
};

export default { allCollapse, formInfos1, lineMap };
