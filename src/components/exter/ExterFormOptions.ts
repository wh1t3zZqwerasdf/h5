import { cityList, allDict, getExterClass } from "../../data/AllDicts";
import { LineEntity } from "../../types/ActivityEntity";
import LineUtils from "../../utils/LineUtils";
import UserManager from "../../utils/UserManager";
import {
  CollapseFormInfo,
  FormInfo,
  FormType,
  LineType
} from "../form/useDynamicForm";

const readonly = true;
const formInfos1 = function (): Array<FormInfo> {
  return [
    {
      lineType: LineType.EXTER,
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
      lineType: LineType.EXTER,
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
      lineType: LineType.EXTER,
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
      lineType: LineType.EXTER,
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
      lineType: LineType.EXTER,
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
      lineType: LineType.EXTER,
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
      lineType: LineType.EXTER,
      type: FormType.SELECT,
      key: "exterLevel",
      title: "外破等级",
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
      lineType: LineType.EXTER,
      type: FormType.SELECT,
      key: "exterType",
      title: "外破类型",
      value: "",
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        customFieldName: {
          text: "name",
          values: "id"
        },
        columns: getExterClass()
      }
    },
    {
      lineType: LineType.EXTER,
      type: FormType.SELECT,
      key: "licenses",
      title: "作业许可",
      value: "",
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        columns: allDict.value.yes_no
      }
    },
    {
      lineType: LineType.EXTER,
      type: FormType.SELECT,
      key: "powerCut",
      title: "停电",
      value: "",
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        columns: allDict.value.yes_no
      }
    },
    {
      lineType: LineType.EXTER,
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
      lineType: LineType.EXTER,
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
        columns: LineUtils.getVipFormOptions(LineType.EXTER)
      }
    },
    {
      lineType: LineType.EXTER,
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
      lineType: LineType.EXTER,
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
      lineType: LineType.EXTER,
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
      lineType: LineType.EXTER,
      type: FormType.CHECKBOX,
      key: "siteSituation",
      title: "现场情况简述",
      value: [],
      valueName: "",
      placeholder: "",
      isRequired: false,
      readonly: readonly,
      isShow: true,
      options: {
        checkbox: [
          "反馈调控部门",
          "提报公安机关",
          "提报电力执法机构",
          "查找责任人",
          "现场拍照留证",
          "组织抢修",
          "追回经济赔偿金",
          "肇事方登报检讨"
        ]
      }
    },
    {
      lineType: LineType.EXTER,
      type: FormType.EDIT,
      key: "siteRemark",
      title: "现场情况备注",
      value: "",
      valueName: "",
      placeholder: "请输入内容",
      isRequired: false,
      readonly: readonly,
      isShow: false,
      isDynamicShow: true,
      options: {
        fieldType: "textarea",
        maxLenght: 1000,
        showWordLimit: true,
        clearable: true,
        rows: 3
      }
    },
    {
      lineType: LineType.EXTER,
      type: FormType.HEADER,
      key: "",
      title: "外破类型",
      value: "",
      valueName: "",
      placeholder: "",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      options: {}
    },
    {
      lineType: LineType.EXTER,
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
      lineType: LineType.EXTER,
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
      lineType: LineType.EXTER,
      type: FormType.EDIT,
      key: "accidentOrg",
      title: "肇事单位（人）",
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
      lineType: LineType.EXTER,
      type: FormType.EDIT,
      key: "accidentPhone",
      title: "肇事方联系电话",
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
      lineType: LineType.EXTER,
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
      lineType: LineType.EXTER,
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
      lineType: LineType.EXTER,
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
      lineType: LineType.EXTER,
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
      lineType: LineType.EXTER,
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
      lineType: LineType.EXTER,
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
      lineType: LineType.EXTER,
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
      lineType: LineType.EXTER,
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
      lineType: LineType.EXTER,
      type: FormType.HEADER,
      key: "",
      title: "外破现场附件",
      value: "",
      valueName: "",
      placeholder: "",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {}
    },
    {
      lineType: LineType.EXTER,
      type: FormType.PHOTO,
      key: "sitePhoto",
      title: "允许上传各种照片佐证",
      value: [],
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        maxCount: 9
      }
    }
  ];
};
const formInfos2 = function (): Array<FormInfo> {
  return [
    {
      lineType: LineType.EXTER,
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
        columns: LineUtils.getFiveIsAcceptFormOptions(LineType.EXTER)
      }
    },
    {
      lineType: LineType.EXTER,
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
      lineType: LineType.EXTER,
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
const formInfos3 = function (): Array<FormInfo> {
  return [
    {
      lineType: LineType.EXTER,
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
        columns: LineUtils.getSixIsAgreeFormOptions(LineType.EXTER)
      }
    },
    {
      lineType: LineType.EXTER,
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
const formInfos4 = function (): Array<FormInfo> {
  return [
    {
      lineType: LineType.EXTER,
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
      lineType: LineType.EXTER,
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
        columns: LineUtils.getSevenDisposeWayFormOptions()
      }
    },
    {
      lineType: LineType.EXTER,
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
      lineType: LineType.EXTER,
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
          "协助 赔偿金",
          "针对性普法宣传",
          "约谈责任方",
          "协调督促整改",
          "联合执法",
          "行政立案"
        ]
      }
    },
    {
      lineType: LineType.EXTER,
      type: FormType.EDIT,
      key: "siteRemarkWork",
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
      lineType: LineType.EXTER,
      type: FormType.PHOTO,
      key: "sevenSitePhoto",
      title: "现场照片",
      value: [],
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        maxCount: 9
      }
    },
    {
      lineType: LineType.EXTER,
      type: FormType.SELECT,
      key: "isNext",
      title: "协调结束",
      value: "",
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      options: {
        columns: allDict.value.yes_no
      }
    },
    {
      lineType: LineType.EXTER,
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
        columns: LineUtils.getSevenIsAdviceFormOptions(LineType.EXTER)
      }
    },
    {
      lineType: LineType.EXTER,
      type: FormType.DATE,
      key: "sendAdviceTime",
      title: "发放时间",
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
      lineType: LineType.EXTER,
      type: FormType.PHOTO,
      key: "sevenAdviceFile",
      title: "整改通知书附件",
      value: [],
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      options: {
        maxCount: 9
      }
    }
  ];
};
const formInfos5 = function (): Array<FormInfo> {
  return [
    {
      lineType: LineType.EXTER,
      type: FormType.SELECT,
      key: "sevenPoliceIsAccept",
      title: "公安机关是否受理",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        columns: allDict.value.yes_no
      }
    }
  ];
};
const formInfos6 = function (): Array<FormInfo> {
  return [
    {
      lineType: LineType.EXTER,
      type: FormType.UPLOADFILE,
      key: "sevenJbajdjb",
      title: "举报案件登记表",
      value: [],
      valueName: "",
      placeholder: "请选择",
      isRequired: false,
      readonly: readonly,
      isShow: true,
      options: {
        maxCount: 1,
        template: "/omp-web/docs-template/举报案件登记表.docx"
      }
    },
    {
      lineType: LineType.EXTER,
      type: FormType.UPLOADFILE,
      key: "sevenXzcflaspb",
      title: "行政处罚立案审批表",
      value: [],
      valueName: "",
      placeholder: "请选择",
      isRequired: false,
      readonly: readonly,
      isShow: true,
      options: {
        maxCount: 1,
        template: "/omp-web/docs-template/行政处罚立案审批表.docx"
      }
    },
    {
      lineType: LineType.EXTER,
      type: FormType.PHOTO,
      key: "sevenOtherFile",
      title: "其他附件",
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
const formInfos7 = function (): Array<FormInfo> {
  return [
    {
      lineType: LineType.EXTER,
      type: FormType.UPLOADFILE,
      key: "sevenJsdctzs",
      title: "接受调查通知书",
      value: [],
      valueName: "",
      placeholder: "请选择",
      isRequired: false,
      readonly: readonly,
      isShow: true,
      options: {
        maxCount: 1,
        template: "/omp-web/docs-template/接受调查通知书.docx"
      }
    },
    {
      lineType: LineType.EXTER,
      type: FormType.UPLOADFILE,
      key: "sevenXcjcjlky",
      title: "现场检查（勘察）记录",
      value: [],
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        maxCount: 1,
        template: "/omp-web/docs-template/现场检查（勘察）笔录.docx"
      }
    },
    {
      lineType: LineType.EXTER,
      type: FormType.UPLOADFILE,
      key: "sevenDcbl",
      title: "调查（询问）笔录",
      value: [],
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        maxCount: 1,
        template: "/omp-web/docs-template/调查（询问）笔录.docx"
      }
    },
    {
      lineType: LineType.EXTER,
      type: FormType.UPLOADFILE,
      key: "sevenAjdczjbg",
      title: "案件调查终结报告",
      value: [],
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        maxCount: 1,
        template: "/omp-web/docs-template/案件调查终结报告.docx"
      }
    },
    {
      lineType: LineType.EXTER,
      type: FormType.DATE,
      key: "sevenRecordDate",
      title: "立案日期",
      value: "",
      valueName: "",
      placeholder: "请选择",
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
      lineType: LineType.EXTER,
      type: FormType.SELECT,
      key: "sevenPoliceIsTransfer",
      title: "移交公安机关",
      value: "",
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        columns: LineUtils.getSevenPoliceIsTransferFormOptions()
      }
    },
    {
      lineType: LineType.EXTER,
      type: FormType.UPLOADFILE,
      key: "sevenAjysspb",
      title: "案件移送审批表",
      value: [],
      valueName: "",
      placeholder: "请选择",
      isRequired: false,
      readonly: readonly,
      isShow: false,
      options: {
        maxCount: 1,
        template: "/omp-web/docs-template/案件移送审批表.docx"
      }
    },
    {
      lineType: LineType.EXTER,
      type: FormType.UPLOADFILE,
      key: "sevenAjysh",
      title: "案件移送函",
      value: [],
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      options: {
        maxCount: 1,
        template: "/omp-web/docs-template/案件移送函.docx"
      }
    },
    {
      lineType: LineType.EXTER,
      type: FormType.UPLOADFILE,
      key: "sevenGafh",
      title: "公安复函",
      value: [],
      valueName: "",
      placeholder: "请选择",
      isRequired: false,
      readonly: readonly,
      isShow: false,
      options: {
        maxCount: 1
      }
    }
  ];
};
const formInfos8 = function (): Array<FormInfo> {
  return [
    {
      lineType: LineType.EXTER,
      type: FormType.EDIT,
      key: "sevenCaseParty",
      title: "案件当事人",
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
      lineType: LineType.EXTER,
      type: FormType.EDIT,
      key: "sevenCaseOrigin",
      title: "案由",
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
      lineType: LineType.EXTER,
      type: FormType.UPLOADFILE,
      key: "sevenXzcfgzs",
      title: "行政处罚告知书",
      value: [],
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        maxCount: 1,
        template: "/omp-web/docs-template/行政处罚事先告知书.docx"
      }
    },
    {
      lineType: LineType.EXTER,
      type: FormType.UPLOADFILE,
      key: "sevenWssdhz",
      title: "文书送达回证",
      value: [],
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        maxCount: 1,
        template: "/omp-web/docs-template/行政执法文书送达回证.docx"
      }
    },
    {
      lineType: LineType.EXTER,
      type: FormType.UPLOADFILE,
      key: "sevenXzcfjds",
      title: "行政处罚决定书",
      value: [],
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        maxCount: 1,
        template: "/omp-web/docs-template/行政处罚决定书.docx"
      }
    },
    {
      lineType: LineType.EXTER,
      type: FormType.SELECT,
      key: "sevenPunishWay",
      title: "处罚方式",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        columns: LineUtils.getPunishWayFormOptions()
      }
    },
    {
      lineType: LineType.EXTER,
      type: FormType.STEPPER,
      key: "sevenMoneyLoss",
      title: "造成经济损失（元）",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      options: {}
    },
    {
      lineType: LineType.EXTER,
      type: FormType.STEPPER,
      key: "sevenPunishMoney",
      title: "行政处罚金额（元）",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      options: {}
    },
    {
      lineType: LineType.EXTER,
      type: FormType.PHOTO,
      key: "sevenOtherFile",
      title: "其他资料附件",
      value: [],
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: false,
      options: {
        maxCount: 9
      }
    }
  ];
};
const formInfos9 = function (): Array<FormInfo> {
  return [
    {
      lineType: LineType.EXTER,
      type: FormType.EDIT,
      key: "sevenFolderNumber",
      title: "案卷号",
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
      lineType: LineType.EXTER,
      type: FormType.EDIT,
      key: "sevenFolderUser",
      title: "立卷人",
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
      lineType: LineType.EXTER,
      type: FormType.EDIT,
      key: "sevenCaseUser",
      title: "案件办理人",
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
      lineType: LineType.EXTER,
      type: FormType.UPLOADFILE,
      key: "sevenXzcfajjabg",
      title: "行政处罚案件结案报告",
      value: [],
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        maxCount: 1,
        template: "/omp-web/docs-template/行政处罚案件结案表.docx"
      }
    },
    {
      lineType: LineType.EXTER,
      type: FormType.PHOTO,
      key: "sevenFile",
      title: "其他附件",
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
      lineType: LineType.EXTER,
      type: FormType.DATE,
      key: "sevenCloseCaseDate",
      title: "结案日期",
      value: "",
      valueName: "",
      placeholder: "请选择",
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
      lineType: LineType.EXTER,
      type: FormType.STEPPER,
      key: "sevenStoragePeriod",
      title: "保管期限（年）",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {}
    }
  ];
};
const formInfos10 = function (): Array<FormInfo> {
  return [
    {
      lineType: LineType.EXTER,
      type: FormType.EDIT,
      key: "eightRedeemLoss",
      title: "挽回经济损失",
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
      lineType: LineType.EXTER,
      type: FormType.READONLY,
      key: "eightHandlingUser",
      title: "经办人",
      value: UserManager.getUserInfo().userInfo.id,
      valueName: UserManager.getUserInfo().userInfo.name!,
      placeholder: "请输入",
      isRequired: true,
      readonly: true,
      isShow: true,
      options: {
        fieldType: "text",
        maxLenght: 100,
        showWordLimit: false,
        clearable: true,
        key: "eightHandlingUsername"
      }
    },
    {
      lineType: LineType.EXTER,
      type: FormType.DATE,
      key: "eightHandlingTime",
      title: "经办时间",
      value: "",
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        type: "datetime",
        formatter: "yyyy-MM-ddThh:mm:ss",
        maxDate: new Date(),
        minDate: new Date(2020, 0, 1),
        defaultDate: new Date()
      }
    },
    {
      lineType: LineType.EXTER,
      type: FormType.STEPPER,
      key: "powerLoss",
      title: "电量损失",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {}
    },
    {
      lineType: LineType.EXTER,
      type: FormType.PHOTO,
      key: "eightSitePhoto",
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
      lineType: LineType.EXTER,
      type: FormType.EDIT,
      key: "eightResult",
      title: "处理结果",
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
      lineType: LineType.EXTER,
      type: FormType.PHOTO,
      key: "eightJudgementFile",
      title: "附件（判决书）",
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
      lineType: LineType.EXTER,
      type: FormType.SELECT,
      key: "isNext",
      title: "是否整改",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        columns: allDict.value.yes_no
      }
    }
  ];
};

const allCollapse = function () {
  return new Map<String, CollapseFormInfo>([
    ["userTask1", { title: "电力设施产权人提报", formInfos: formInfos1() }],
    ["userTask2", { title: "执法办经办审核", formInfos: formInfos2() }],
    ["userTask3", { title: "执法办负责人审核", formInfos: formInfos3() }],
    ["userTask4", { title: "执法办经办处置", formInfos: formInfos4() }],
    ["userTask5", { title: "公安受理反馈", formInfos: formInfos5() }],
    ["userTask6", { title: "行政立案申请", formInfos: formInfos6() }],
    ["userTask7", { title: "行政立案调查", formInfos: formInfos7() }],
    ["userTask8", { title: "行政立案处罚", formInfos: formInfos8() }],
    ["userTask9", { title: "行政立案结案", formInfos: formInfos9() }],
    [
      "userTask10",
      { title: "电力设施产权人处置", formInfos: formInfos10() }
    ]
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
        content: "执法办经办",
        timestamp: "",
        icon: "more",
        color: "#F1AA2E"
      }
    ],
    [
      "userTask3",
      {
        title: "执法办负责人审核",
        content: "执法办负责人",
        timestamp: "",
        icon: "more",
        color: "#F1AA2E"
      }
    ],
    [
      "userTask4",
      {
        title: "执法办经办处置",
        content: "执法办经办",
        timestamp: "",
        icon: "more",
        color: "#F1AA2E"
      }
    ],
    [
      "userTask5",
      {
        title: "执法办经办处置",
        content: "执法办经办",
        timestamp: "",
        icon: "more",
        color: "#F1AA2E"
      }
    ],
    [
      "userTask6",
      {
        title: "行政立案申请",
        content: "执法办经办",
        timestamp: "",
        icon: "more",
        color: "#F1AA2E"
      }
    ],
    [
      "userTask7",
      {
        title: "行政立案调查",
        content: "执法办经办",
        timestamp: "",
        icon: "more",
        color: "#F1AA2E"
      }
    ],
    [
      "userTask8",
      {
        title: "行政立案处罚",
        content: "执法办经办",
        timestamp: "",
        icon: "more",
        color: "#F1AA2E"
      }
    ],
    [
      "userTask9",
      {
        title: "行政立案结案",
        content: "执法办经办",
        timestamp: "",
        icon: "more",
        color: "#F1AA2E"
      }
    ],
    [
      "userTask10",
      {
        title: "电力设施产权人处置",
        content: "电力设施产权人",
        timestamp: "",
        icon: "more",
        color: "#F1AA2E"
      }
    ]
  ]);
};

export default {
  formInfos1,
  formInfos2,
  formInfos3,
  formInfos4,
  formInfos5,
  formInfos6,
  formInfos7,
  formInfos8,
  formInfos9,
  formInfos10,
  allCollapse,
  lineMap
};
