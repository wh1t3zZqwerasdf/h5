//任务流程的工具类
import { DynamicFormOption, LineType } from "../components/form/useDynamicForm";
import { PickerFieldNames } from "vant";
import {
  CollapseFormInfo,
  ColumnOption,
  FormInfo,
  FormType
} from "../components/form/useDynamicForm";
import {
  ActivityEntity,
  ActivityInfo,
  LineEntity,
  TaskInfo
} from "../types/ActivityEntity";
import DateUtils from "./DateUtils";
import { useCollapseFormInfoStore } from "../components/form/DynamicFormStore";
import ExterFormOptions from "../components/exter/ExterFormOptions";
import HidFormOptions from "../components/hid/HidFormOptions";
import { allDict } from "../data/AllDicts";
import JSONUtils from "./JSONUtils";
import StringUtils from "./StringUtils";
import { type } from "os";
import UserManager from "./UserManager";
/**
 * 获取当前正在执行的流程状态
 * @param activityEntity
 * @returns
 */
function getTargetActivityInfo(activityEntity: ActivityEntity): ActivityInfo {
  return activityEntity.actData.activityInfos[
    activityEntity.actData.activityInfos.length - 1
  ];
}

/**
 * 获取当前正在执行的流程状态
 * @param activityEntity
 * @returns
 */
function getTargetTaskInfo(activityEntity: ActivityEntity): TaskInfo {
  // const lastActivityInfo = getTargetActivityInfo(activityEntity);
  // console.log("LineUtils========>", activityEntity);
  // if (lastActivityInfo && lastActivityInfo.taskId) {
  //   if (activityEntity.actData.taskInfos) {
  //     for (const item of activityEntity.actData.taskInfos) {
  //       if (lastActivityInfo.taskId === item.id) {
  //         return item;
  //       }
  //     }
  //   }
  // }
  return activityEntity.actData.taskInfos[
    activityEntity.actData.taskInfos.length - 1
  ];
}

/**
 * 通过taskId查找出对应的TaskInfo
 * @param activityEntity
 * @param taskId
 * @returns
 */
function getTaskInfoByTaskId(
  activityEntity: ActivityEntity,
  taskId: string
): TaskInfo {
  for (const item of activityEntity.actData.taskInfos) {
    if (item.id === taskId) {
      return item;
    }
  }
  return new TaskInfo();
}

/**
 * 通过taskId查找出对应的ActivityInfo
 * @param activityEntity
 * @param taskId
 * @returns
 */
function getActivityInfoByTaskId(
  activityEntity: ActivityEntity,
  taskId: string
): ActivityInfo {
  for (const activityInfo of activityEntity.actData.activityInfos) {
    if (activityInfo.taskId === taskId) {
      return activityInfo;
    }
  }
  return new ActivityInfo();
}

/**
 * 根据value,递归查询列表中的对于值，针对SELECT类型的键值对
 * @param data SELECT列表
 * @param value 对应的键值对的value
 * @param customFieldName 自定义SELECT的字段映射
 * @returns
 */
function getSelectItem(
  data: any,
  value: any,
  customFieldName?: PickerFieldNames
): any {
  if (!customFieldName) {
    customFieldName = { text: "text", values: "value", children: "children" };
  } else {
    if (!customFieldName.children) {
      customFieldName.children = "children";
    }
    if (!customFieldName.text) {
      customFieldName.text = "text";
    }
    if (!customFieldName.values) {
      customFieldName.values = "value";
    }
  }
  // const customText = customFieldName.text as string;
  const customValues = customFieldName.values as string;
  const customChildren = customFieldName.children as string;
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    // console.log("遍历查找=====>1", oItem, value);
    // console.log(
    //   "遍历查找=====>4",
    //   Object.create(oItem)[customValues] === value
    // );
    if (Object.create(item)[customValues] === value) {
      return [item];
    } else {
      const childList = Object.create(item)[customChildren];
      // console.log("遍历查找=====>2", childList);
      if (childList && childList.length) {
        const result = getSelectItem(childList, value, customFieldName);
        // console.log("遍历查找=====>3", result);
        if (result) {
          return [item].concat(result);
        }
      }
    }
  }
}

/**
 * 流程中已经完成的表单，设置对应的值
 * @param obj 值的对象
 * @param list 表单对应的配置项
 * @returns
 */
function setFormValue(obj: Object, list: Array<FormInfo>) {
  if (!obj) {
    return;
  }

  console.log("setFormValue-keys======>", obj);
  const entries = Object.entries(obj);
  for (const entry of entries) {
    const key = entry[0];
    const value = entry[1];
    // console.log("表单对应的配置项的值=====>1", key, value);
    //如果值是空的，就不需要设置了，直接跳过
    if (StringUtils.isEmpty(value)) {
      continue;
    }
    //筛选出字段对应的配置项，一般情况下，只会查出一个，因为配置项不会重复
    //有一种情况是转办的配置项会重复，但转办直接转到别的流程了，不会走进相同的表单
    //所以不需要判断是否重复情况
    const formEntitys = list.filter((formEntity: FormInfo) => {
      // console.log("setFormValue-key======>", key, formEntity);
      return key === formEntity.key;
    });
    // console.log("setFormValue-key-value======>", key, value, formEntitys);
    if (formEntitys) {
      for (const formEntity of formEntitys) {
        // console.log("setFormValue-Item======>", formEntity, key, value);
        if (formEntity.key === key) {
          switch (formEntity.type) {
            case FormType.SELECT:
              //通过getSelectItem递归出对应的SELECT
              //取到从父到子的一整条链数据
              const currentColumn = getSelectItem(
                formEntity.options.columns,
                value,
                formEntity.options.customFieldName
              );

              let customFieldName = formEntity.options.customFieldName;
              if (!customFieldName) {
                customFieldName = {
                  text: "text",
                  values: "value",
                  children: "children"
                };
              }
              const customTextKey = customFieldName.text as string;
              // const customValues = formEntity.options.customFieldName?.values;
              // const customChildren = formEntity.options.customFieldName?.children;

              const columnLabels = [];
              if (currentColumn) {
                //取出对应的label，因为是一整条链的，需要遍历取出全部
                for (const column of currentColumn) {
                  const customText = Object.create(column)[customTextKey];
                  columnLabels.push(customText);
                }
                // console.log(
                //   "setFormValue-SELECT======>",
                //   currentColumn,
                //   formEntity
                // );
                //从最后一个子项中取出dynamicFormOptions，约定是在最后一个子项中配置dynamicFormOptions
                //然后设置对应dynamicFormOptions的动态表单显示隐藏
                if (
                  currentColumn[currentColumn.length - 1].dynamicFormOptions
                ) {
                  for (const formOption of currentColumn[
                    currentColumn.length - 1
                  ].dynamicFormOptions) {
                    for (const formEntity of list) {
                      if (
                        formEntity.title === formOption.title &&
                        formEntity.lineType === formOption.lineType
                      ) {
                        formEntity.isShow = formOption.isShow;
                      }
                    }
                  }
                }

                formEntity.valueName = columnLabels.join("/");
              } else {
                formEntity.valueName = value;
              }
              formEntity.value = value;
              break;
            case FormType.DATE:
              formEntity.value = DateUtils.DateFormat(value, "yyyy-MM-dd");
              // console.log("表单对应的配置项的值=====>", formEntity);
              break;
            case FormType.CHECKBOX:
              if (formEntity.title === "处置成效") {
                const checkboxs = [];
                const checkBoxStrArray: Array<string> = value.split(",");
                for (const name of checkBoxStrArray) {
                  if (formEntity.options.checkbox) {
                    const checkbox =
                      formEntity.options.checkbox[Number(name) - 1];
                    checkboxs.push(checkbox);
                  }
                }
                formEntity.value = checkboxs;
              } else {
                formEntity.value = value.split(",");
              }
              // console.log("setFormValue-CHECKBOX======>", value);
              break;
            case FormType.PHOTO:
            case FormType.UPLOADFILE:
              console.log("照片", value);
              const photoValue: Array<any> = JSON.parse(value);
              // const photoList = [];
              // for (const item of photoValue) {
              //   console.log("照片2", item);
              //   photoList.push({
              //     url: item.url,
              //     name: item.fileName,
              //     deletable: false
              //   });
              // }

              formEntity.value = photoValue.map(item => {
                return {
                  url: item.url,
                  name: item.fileName,
                  deletable: false,
                  isImage: item.type.indexOf("image") !== -1
                };
              });
              break;
            case FormType.READONLY:
              if (formEntity.options.key) {
                const valueName = Object.create(obj)[formEntity.options.key];
                if (valueName) {
                  formEntity.valueName = valueName;
                }
              }
              formEntity.value = value;
              break;
            case FormType.SELECT2:
              formEntity.value = value;
              formEntity.valueName = value;
              break;
            default:
              formEntity.value = value;
              break;
          }
        }
      }
    }
  }
}

/**
 * 根据任务流程动态生成时间线
 * @param defaultLineMap 默认时间线，当流程还没开始时
 * @param activityEntity 流程数据
 * @returns
 */
function getLines(
  defaultLineMap: Map<String, LineEntity>,
  activityEntity: ActivityEntity
): Array<LineEntity> {
  let lines = new Array<LineEntity>();
  if (activityEntity.actData.activityInfos.length !== 0) {
    const taskInfos = activityEntity.actData.taskInfos;
    for (let i = 0; i < taskInfos.length; i++) {
      const taskInfo = taskInfos[i];
      const activityInfo = getActivityInfoByTaskId(activityEntity, taskInfo.id);
      const lineInfo = defaultLineMap.get(activityInfo.activityId);
      if (lineInfo) {
        lineInfo.activityId = activityInfo.activityId;
        lineInfo.title = taskInfo.name;
        if (taskInfo.assignee) {
          lineInfo.content = Object.create(activityEntity.assigneeMap)[
            taskInfo.assignee
          ];
        }
        lineInfo.timestamp = taskInfo.endTime;
        if (taskInfo.endTime) {
          lineInfo.icon = "checked";
          lineInfo.color = "#31B87A";
        } else {
          lineInfo.icon = "more";
          lineInfo.color = "#F1AA2E";
        }
        let oldLineInfos = lines.filter((value: LineEntity) => {
          return value.activityId === lineInfo.activityId;
        });
        if (oldLineInfos.length > 0) {
          oldLineInfos[0] = lineInfo;
        } else {
          lines.push(lineInfo);
        }
      }
    }
  } else {
    for (const value of defaultLineMap.values()) {
      lines.push(value);
    }
  }
  return lines;
}

/**
 * 初始化表单数据
 * @param activityEntity //流程信息
 * @param allCollapse 所有流程的配置项集合
 * @param lineDetailInfo  发布任务的详细数据
 */
function initCollapseForm(
  activityEntity: ActivityEntity,
  allCollapse: Map<String, CollapseFormInfo>,
  lineDetailInfo: any
) {
  const collapseFormInfosStore = useCollapseFormInfoStore();
  const lastActivityInfo = getTargetActivityInfo(activityEntity);
  // LineUtils.setFormValue(exterInfoEntity.value, ExterFormOptions.formEntitys1);
  const collapseFormInfos = new Array<CollapseFormInfo>();

  for (
    let index = 0;
    index < activityEntity.actData.taskInfos.length;
    index++
  ) {
    const taskInfo = activityEntity.actData.taskInfos[index];
    const activityInfo = getActivityInfoByTaskId(activityEntity, taskInfo.id);
    console.log(activityInfo);
    //原数据
    const rawCollapse = allCollapse.get(activityInfo.activityId);
    let currentCollapse: CollapseFormInfo | undefined;
    if (rawCollapse) {
      //通过深拷贝的数据，为了防止修改元数据
      currentCollapse = JSONUtils.JSONParseForDate(rawCollapse);
    }
    if (currentCollapse) {
      if (activityInfo.activityId === "userTask1" && index === 0) {
        setFormValue(lineDetailInfo, currentCollapse.formInfos);
      } else {
        setFormValue(taskInfo?.variableMap, currentCollapse.formInfos);
      }
      currentCollapse.title = activityInfo.activityName;
      collapseFormInfos.push(currentCollapse);
    }
  }
  collapseFormInfosStore.collapseFormInfos = collapseFormInfos.reverse();
  if (lastActivityInfo?.activityId !== "end") {
    //判断如果流程没有结束，就设置第一个流程是可写入操作的
    //因为流程默认是倒叙的，页面展示的第一个流程也就是最后一个流程
    const isMyTask: boolean =
      lastActivityInfo.assignee.indexOf(
        UserManager.getUserInfo().userInfo.id ?? ""
      ) !== -1;
    if (isMyTask) {
      for (const formInfo of collapseFormInfosStore.collapseFormInfos[0]
        .formInfos) {
        formInfo.readonly = false;
      }
    }
  }
}

/**
 * 获取表单配置项里填入的数据，然后赋值给提交的数据
 * @param formInfos
 * @returns
 */
function getSubmitFormValues(formInfos: Array<FormInfo>) {
  let condition = Object.create(null);
  for (const formInfo of formInfos) {
    if (formInfo.key && formInfo.isShow) {
      // console.log("getSubmitFormValues=====>1", formInfo);
      //判断数据为空或者是数组为0就跳过，不往下执行
      if (
        StringUtils.isEmpty(!formInfo.value) ||
        (Array.isArray(formInfo.value) && formInfo.value.length === 0)
      ) {
        continue;
      }
      // console.log("getSubmitFormValues=====>2", formInfo);
      switch (formInfo.type) {
        case FormType.PHOTO:
        case FormType.UPLOADFILE:
          const indexValues = new Array<string>();
          for (const item of formInfo.value) {
            indexValues.push(item.url);
          }
          condition[formInfo.key] = indexValues.join(",");
          console.log("提交了啥=====>", formInfo, indexValues);
          break;
        case FormType.CHECKBOX:
          if (formInfo.title === "处置成效") {
            const indexValues = new Array<number>();
            for (const name of formInfo.value) {
              if (formInfo.options.checkbox) {
                indexValues.push(formInfo.options.checkbox.indexOf(name));
              }
            }
            condition[formInfo.key] = indexValues.join(",");
          } else {
            condition[formInfo.key] = formInfo.value.join(",");
          }
          break;
        case FormType.SELECT:
          if (formInfo.options.condition) {
            for (const key in formInfo.options.condition) {
              condition[key] = (formInfo.options.condition as any)[key];
            }
          }
          condition[formInfo.key] = formInfo.value;
          break;
        case FormType.READONLY:
          if (formInfo.options.key) {
            condition[formInfo.options.key] = formInfo.valueName;
          }
          condition[formInfo.key] = formInfo.value;
          break;
        default:
          condition[formInfo.key] = formInfo.value;
          break;
      }
    }
  }
  return condition;
}

/**
 * 重要用户
 * @returns
 */
function getVipFormOptions(lineType: number) {
  let yes_no = JSON.parse(JSON.stringify(allDict.value.yes_no));
  Object.assign(yes_no[0], <ColumnOption>{
    dynamicFormOptions: [
      {
        isShow: true,
        title: "重要用户类型",
        lineType: lineType
      },
      {
        isShow: true,
        title: "重要用户名称",
        lineType: lineType
      }
    ]
  });
  Object.assign(yes_no[1], <ColumnOption>{
    dynamicFormOptions: [
      {
        isShow: false,
        title: "重要用户类型",
        lineType: lineType
      },
      {
        isShow: false,
        title: "重要用户名称",
        lineType: lineType
      }
    ]
  });
  return yes_no;
}

/**
 * 是否受理（举报）
 * @returns
 */
function getReportIsNextFormOptions() {
  let yes_no = JSON.parse(JSON.stringify(allDict.value.yes_no));
  const date = DateUtils.getNowDate();
  Object.assign(yes_no[0], <ColumnOption>{
    condition: {
      acceptTime: date,
      status: 4,
      isNext: 1,
      nextStep: true
    },
    dynamicFormOptions: [
      {
        isShow: false,
        title: "不受理原因",
        lineType: LineType.REPORT
      }
    ]
  });
  Object.assign(yes_no[1], <ColumnOption>{
    condition: {
      acceptTime: date,
      status: 7,
      isNext: 0,
      disposeTime: date,
      disposeResult: "",
      nextStep: false
    },
    dynamicFormOptions: [
      {
        isShow: true,
        title: "不受理原因",
        lineType: LineType.REPORT
      }
    ]
  });
  return yes_no;
}

/**
 * 情况属实（举报）
 * @returns
 */
function getReportIsTrueFormOptions() {
  let yes_no = JSON.parse(JSON.stringify(allDict.value.yes_no));
  Object.assign(yes_no[0], <ColumnOption>{
    dynamicFormOptions: [
      {
        isShow: true,
        title: "自行处置",
        lineType: LineType.REPORT
      }
    ]
  });
  Object.assign(yes_no[1], <ColumnOption>{
    dynamicFormOptions: [
      {
        isShow: false,
        title: "自行处置",
        lineType: LineType.REPORT
      }
    ]
  });
  return yes_no;
}

/**
 * 自行处置（举报）
 * @returns
 */
function getReportIsOneselfFormOptions() {
  let yes_no = JSON.parse(JSON.stringify(allDict.value.yes_no));
  // const date = DateUtils.getNowDate();
  Object.assign(yes_no[0], <ColumnOption>{
    dynamicFormOptions: [
      {
        isShow: true,
        title: "电力设施产权人反馈",
        lineType: LineType.REPORT
      },
      {
        isShow: true,
        title: "处置时间",
        lineType: LineType.REPORT
      },
      {
        isShow: true,
        title: "处置情况",
        lineType: LineType.REPORT
      },
      {
        isShow: false,
        title: "事件类型",
        lineType: LineType.REPORT
      }
    ]
  });
  Object.assign(yes_no[1], <ColumnOption>{
    dynamicFormOptions: [
      {
        isShow: false,
        title: "电力设施产权人反馈",
        lineType: LineType.REPORT
      },
      {
        isShow: false,
        title: "处置时间",
        lineType: LineType.REPORT
      },
      {
        isShow: false,
        title: "处置情况",
        lineType: LineType.REPORT
      },
      {
        isShow: true,
        title: "事件类型",
        lineType: LineType.REPORT
      }
    ]
  });
  return yes_no;
}

/**
 * 事件类型
 * @returns
 */
function getReportDisposeWayfFormOptions() {
  let report_dispose_way = JSON.parse(
    JSON.stringify(allDict.value.report_dispose_way)
  );
  const showHidFormOptions = new Array<DynamicFormOption>();
  const showExterFormOptions = new Array<DynamicFormOption>();
  const hideHidFormOptions = new Array<DynamicFormOption>();
  const hideExterFormOptions = new Array<DynamicFormOption>();
  const hidFormInfos: Array<FormInfo> = JSONUtils.JSONParseForDate(
    HidFormOptions.formInfos1()
  );
  const exterFormInfos: Array<FormInfo> = JSONUtils.JSONParseForDate(
    ExterFormOptions.formInfos1()
  );
  for (const formEntity of hidFormInfos) {
    if (formEntity.isDynamicShow) {
      continue;
    }
    showHidFormOptions.push({
      isShow: true,
      title: formEntity.title,
      lineType: LineType.HID
    });
    hideHidFormOptions.push({
      isShow: false,
      title: formEntity.title,
      lineType: LineType.HID
    });
  }
  for (const formEntity of exterFormInfos) {
    if (formEntity.isDynamicShow) {
      continue;
    }
    showExterFormOptions.push({
      isShow: true,
      title: formEntity.title,
      lineType: LineType.EXTER
    });
    hideExterFormOptions.push({
      isShow: false,
      title: formEntity.title,
      lineType: LineType.EXTER
    });
  }
  Object.assign(report_dispose_way[0], <ColumnOption>{
    dynamicFormOptions: showHidFormOptions.concat(hideExterFormOptions)
  });
  Object.assign(report_dispose_way[1], <ColumnOption>{
    dynamicFormOptions: showExterFormOptions.concat(hideHidFormOptions)
  });
  return report_dispose_way;
}

/**
 * 是否受理（隐患、外破）
 * @returns
 */
function getFiveIsAcceptFormOptions(lineType: number) {
  let yes_no = JSON.parse(JSON.stringify(allDict.value.yes_no));
  Object.assign(yes_no[0], <ColumnOption>{
    condition: {
      isNext: 1,
      status: 4,
      nextStep: true,
      acceptTime: DateUtils.getNowDate()
    },
    dynamicFormOptions: [
      {
        isShow: true,
        title: "初步处置意见",
        lineType: lineType
      },
      {
        isShow: false,
        title: "不受理原因",
        lineType: lineType
      }
    ]
  });
  Object.assign(yes_no[1], <ColumnOption>{
    condition: { isNext: 0, status: 2, nextStep: false },
    dynamicFormOptions: [
      {
        isShow: false,
        title: "初步处置意见",
        lineType: lineType
      },
      {
        isShow: true,
        title: "不受理原因",
        lineType: lineType
      }
    ]
  });
  return yes_no;
}

/**
 * 处置方式-外破
 * @returns
 */
function getSevenDisposeWayFormOptions() {
  let external_dispose_way = JSON.parse(
    JSON.stringify(allDict.value.external_dispose_way)
  );
  Object.assign(external_dispose_way[0], <ColumnOption>{
    condition: { way: 1, nextStep: true },
    dynamicFormOptions: [
      {
        isShow: true,
        title: "协调结束",
        lineType: LineType.EXTER
      }
    ]
  });
  Object.assign(external_dispose_way[1], <ColumnOption>{
    condition: { way: 2, nextStep: true },
    dynamicFormOptions: [
      {
        isShow: false,
        title: "协调结束",
        lineType: LineType.EXTER
      }
    ]
  });
  Object.assign(external_dispose_way[2], <ColumnOption>{
    condition: { way: 3, nextStep: false },
    dynamicFormOptions: [
      {
        isShow: false,
        title: "协调结束",
        lineType: LineType.EXTER
      }
    ]
  });
  return external_dispose_way;
}

/**
 * 处置方式-隐患
 * @param lineType
 * @returns
 */
function getHiddenTroubleDisposeWayFormOptions() {
  let hidden_trouble_dispose_way = JSON.parse(
    JSON.stringify(allDict.value.hidden_trouble_dispose_way)
  );
  for (let i = 0; i < hidden_trouble_dispose_way.length; i++) {
    const element = hidden_trouble_dispose_way[i];
    if (i === 2) {
      Object.assign(element, <ColumnOption>{
        dynamicFormOptions: [
          {
            isShow: true,
            title: "采取强制措施",
            lineType: LineType.HID
          }
        ]
      });
    } else {
      Object.assign(element, <ColumnOption>{
        dynamicFormOptions: [
          {
            isShow: false,
            title: "采取强制措施",
            lineType: LineType.HID
          }
        ]
      });
    }
  }
  return hidden_trouble_dispose_way;
}

/**
 * 移交公安机关
 * @returns
 */
function getSevenPoliceIsTransferFormOptions() {
  let yes_no = JSON.parse(JSON.stringify(allDict.value.yes_no));
  Object.assign(yes_no[0], <ColumnOption>{
    dynamicFormOptions: [
      {
        isShow: true,
        title: "案件移送审批表",
        lineType: LineType.EXTER
      },
      {
        isShow: true,
        title: "案件移送函",
        lineType: LineType.EXTER
      },
      {
        isShow: true,
        title: "公安复函",
        lineType: LineType.EXTER
      }
    ]
  });
  Object.assign(yes_no[1], <ColumnOption>{
    dynamicFormOptions: [
      {
        isShow: false,
        title: "案件移送审批表",
        lineType: LineType.EXTER
      },
      {
        isShow: false,
        title: "案件移送函",
        lineType: LineType.EXTER
      },
      {
        isShow: false,
        title: "公安复函",
        lineType: LineType.EXTER
      }
    ]
  });
  return yes_no;
}
/**
 * 发放整改通知书
 * @returns
 */
function getSevenIsAdviceFormOptions(lineType: number) {
  let yes_no = JSON.parse(JSON.stringify(allDict.value.yes_no));
  Object.assign(yes_no[0], <ColumnOption>{
    dynamicFormOptions: [
      {
        isShow: true,
        title: "整改通知书发放时间",
        lineType: lineType
      },
      {
        isShow: true,
        title: "发放时间",
        lineType: lineType
      },
      {
        isShow: true,
        title: "整改通知书附件",
        lineType: lineType
      }
    ]
  });
  Object.assign(yes_no[1], <ColumnOption>{
    dynamicFormOptions: [
      {
        isShow: false,
        title: "整改通知书发放时间",
        lineType: lineType
      },
      {
        isShow: false,
        title: "发放时间",
        lineType: lineType
      },
      {
        isShow: false,
        title: "整改通知书附件",
        lineType: lineType
      }
    ]
  });
  return yes_no;
}
/**
 * 是否同意
 * @returns
 */
function getSixIsAgreeFormOptions(lineType: number) {
  let yes_no = JSON.parse(JSON.stringify(allDict.value.yes_no));
  Object.assign(yes_no[0], <ColumnOption>{
    condition: { isNext: 1, status: 5, nextStep: true },
    dynamicFormOptions: [
      {
        isShow: false,
        title: "意见",
        lineType: lineType
      }
    ]
  });
  Object.assign(yes_no[1], <ColumnOption>{
    condition: { isNext: 0, status: 2, nextStep: false },
    dynamicFormOptions: [
      {
        isShow: true,
        title: "意见",
        lineType: lineType
      }
    ]
  });
  return yes_no;
}

function getIsNextFormOptions() {
  let yes_no = JSON.parse(JSON.stringify(allDict.value.yes_no));
  Object.assign(yes_no[0], <ColumnOption>{
    condition: { isNext: 1, status: 6, nextStep: true }
  });
  Object.assign(yes_no[1], <ColumnOption>{
    condition: { isNext: 0, status: 5, nextStep: false }
  });
  return yes_no;
}

function getSpotCheckFiveIsAcceptFormOptions() {
  let yes_no = JSON.parse(JSON.stringify(allDict.value.yes_no));
  Object.assign(yes_no[0], <ColumnOption>{
    condition: { isNext: 1, status: 3, nextStep: true },
    dynamicFormOptions: [
      {
        isShow: false,
        title: "说明原因",
        lineType: LineType.PROTECT
      }
    ]
  });
  Object.assign(yes_no[1], <ColumnOption>{
    condition: { isNext: 0, nextStep: false },
    dynamicFormOptions: [
      {
        isShow: true,
        title: "说明原因",
        lineType: LineType.PROTECT
      }
    ]
  });
  return yes_no;
}

/**
 * 处罚方式
 */
function getPunishWayFormOptions() {
  let punish_way = JSON.parse(JSON.stringify(allDict.value.punish_way)).slice(
    0,
    2
  );
  Object.assign(punish_way[0], <ColumnOption>{
    dynamicFormOptions: [
      {
        isShow: true,
        title: "造成经济损失（元）",
        lineType: LineType.EXTER
      },
      {
        isShow: true,
        title: "行政处罚金额（元）",
        lineType: LineType.EXTER
      }
    ]
  });

  Object.assign(punish_way[1], <ColumnOption>{
    dynamicFormOptions: [
      {
        isShow: false,
        title: "造成经济损失（元）",
        lineType: LineType.EXTER
      },
      {
        isShow: true,
        title: "行政处罚金额（元）",
        lineType: LineType.EXTER
      }
    ]
  });
  return punish_way;
}

export default {
  getTargetActivityInfo,
  getTargetTaskInfo,
  getSelectItem,
  setFormValue,
  getTaskInfoByTaskId,
  getActivityInfoByTaskId,
  getLines,
  initCollapseForm,
  getSubmitFormValues,
  getVipFormOptions,
  getReportIsNextFormOptions,
  getReportIsTrueFormOptions,
  getReportIsOneselfFormOptions,
  getReportDisposeWayfFormOptions,
  getFiveIsAcceptFormOptions,
  getSevenDisposeWayFormOptions,
  getSevenPoliceIsTransferFormOptions,
  getSevenIsAdviceFormOptions,
  getSixIsAgreeFormOptions,
  getIsNextFormOptions,
  getPunishWayFormOptions,
  getHiddenTroubleDisposeWayFormOptions,
  getSpotCheckFiveIsAcceptFormOptions
};
