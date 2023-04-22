import { SpotCheckAuditItemEntity } from "../../../types/SpotCheckEntity";
import {
  CollapseFormInfo,
  FormInfo,
  FormType,
  LineType
} from "../../form/useDynamicForm";
import LineUtils from "../../../utils/LineUtils";
const readonly = true;
const formInfos1 = function (): Array<FormInfo> {
  return new Array<FormInfo>(
    {
      lineType: LineType.PROTECT,
      type: FormType.HEADER,
      key: "",
      title: "基本信息",
      value: "",
      valueName: "",
      placeholder: "",
      isRequired: false,
      readonly: readonly,
      isShow: true,
      options: {}
    },
    {
      lineType: LineType.PROTECT,
      type: FormType.READONLY,
      key: "formulate",
      title: "计划制定人",
      value: "",
      valueName: "",
      placeholder: "请输入",
      isRequired: false,
      readonly: readonly,
      isShow: true,
      options: {
        key: "formulateName"
      }
    },
    {
      lineType: LineType.PROTECT,
      type: FormType.DATE,
      key: "planStartTime",
      title: "计划开始时间",
      value: "",
      valueName: "",
      placeholder: "请选择日期",
      isRequired: false,
      readonly: readonly,
      isShow: true,
      options: {
        type: "date",
        formatter: "yyyy-MM-dd",
        maxDate: new Date(2023, 12, 31),
        minDate: new Date(2020, 0, 1),
        defaultDate: new Date()
      }
    },
    {
      lineType: LineType.PROTECT,
      type: FormType.DATE,
      key: "planEndTime",
      title: "计划完成时间",
      value: "",
      valueName: "",
      placeholder: "请选择日期",
      isRequired: false,
      readonly: readonly,
      isShow: true,
      options: {
        type: "date",
        formatter: "yyyy-MM-dd",
        maxDate: new Date(2023, 12, 31),
        minDate: new Date(2020, 0, 1),
        defaultDate: new Date()
      }
    },
    {
      lineType: LineType.PROTECT,
      type: FormType.CUSTOMFORM,
      key: "",
      title: "抽检对象",
      value: "",
      valueName: "",
      placeholder: "",
      isRequired: false,
      readonly: readonly,
      isShow: true,
      options: {
        data: new Array<SpotCheckAuditItemEntity>()
      }
    }
  );
};

const formInfos2 = function (): Array<FormInfo> {
  return new Array<FormInfo>(
    {
      lineType: LineType.PROTECT,
      type: FormType.SELECT,
      key: "fiveIsAccept",
      title: "是否同意",
      value: "",
      valueName: "",
      placeholder: "请选择",
      isRequired: true,
      readonly: readonly,
      isShow: true,
      options: {
        columns: LineUtils.getSpotCheckFiveIsAcceptFormOptions()
      }
    },
    {
      lineType: LineType.PROTECT,
      type: FormType.EDIT,
      key: "fiveReason",
      title: "说明原因",
      value: "",
      valueName: "",
      placeholder: "请输入",
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
  );
};

const allCollapse = function () {
  return new Map<String, CollapseFormInfo>([
    ["userTask1", { title: "执法办经办提报", formInfos: formInfos1() }],
    ["userTask2", { title: "执法办负责人审核", formInfos: formInfos2() }]
  ]);
};

export default {
  allCollapse
};
