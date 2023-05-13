import {
  ProcessOperationType,
  QueryInfoActivitiWrapType,
  QueryActivitiInfoActivityInfosType,
  QueryActivitiInfoTaskInfosType,
  IBusinessInfo,
} from "@/process/types";
import api from "@/process/api";
import { useAuthStore } from "@/store";
import { TASK_OPERATION, TASK_OPERATION_TEXT } from "@/data";

export function useProcess() {
  const authStore = useAuthStore();
  // 业务数据对象
  const businessInfoData = ref<IBusinessInfo>();
  // Activiti 流程对象
  const processInfoActivitiWrap = ref<QueryInfoActivitiWrapType>();
  // 流程历史标签map
  const processStatusMap = {
    1: {
      text: "已创建",
      color: "#95d475",
    },
    2: {
      text: "已受理",
    },
  };

  // 当前流程id
  const instanceId = computed(() => businessInfoData.value?.instanceId || "");
  /* 流程详情 */
  const processDetailData = computed(() => {
    return processInfoActivitiWrap.value?.actData;
  });
  /* 流程节点 */
  const activityInfos = computed<QueryActivitiInfoActivityInfosType[]>(() => {
    return processInfoActivitiWrap.value?.actData.activityInfos ?? [];
  });

  const taskIdMap = computed<{ [key: string]: string }>(() => {
    const map = {};
    activityInfos.value.forEach((activityInfo) => {
      if (activityInfo.taskId) {
        // userTaskX 节点，可能重复，使用任务ID作为key， taskId: userTaskX
        map[activityInfo.taskId] = activityInfo.activityId;
      }
    });
    return map;
  });

  // 流程节点map
  const activityIdMap = computed<{ [key: string]: string }>(() => {
    const map = {};
    activityInfos.value.forEach((activityInfo) => {
      // userTaskX 节点，可能重复
      map[activityInfo.activityId] = activityInfo;
    });
    return map;
  });
  /* 任务信息，时间序正确，缺少 start,end 节点 */
  const taskInfos = computed<QueryActivitiInfoTaskInfosType[]>(() => {
    return processInfoActivitiWrap.value?.actData.taskInfos ?? [];
  });

  const currTaskId = computed(() => {
    const lastTask = taskInfos.value[taskInfos.value.length - 1];
    return taskIdMap.value[lastTask.id];
  });

  // 当前最新的任务节点
  const lastTaskInfo = computed(
    () => taskInfos.value[taskInfos.value.length - 1]
  );
  // activityInfos.value
  // 当前最新的流程节点
  const lastActivityInfo = computed(() => {
    return activityInfos.value[activityInfos.value.length - 1];
  });

  // 流程是否结束
  const isProcessEnd = computed(() => {
    return lastActivityInfo.value?.activityId === "end";
  });

  // 当前登录用户对该流程任务的最后一条处理记录
  const currUserLastDealTaskItem = computed(() => {
    // 最后一项有值，为保存流程的节点
    if (
      JSON.stringify(lastTaskInfo.value?.variableMap) !== "{}" &&
      !isProcessEnd.value
    )
      return lastTaskInfo.value;

    const userId = authStore.userId;
    const lastUserDealTaskFilter = taskInfos.value.filter((item) => {
      return userId === item.assignee;
    });
    return lastUserDealTaskFilter[lastUserDealTaskFilter.length - 1];
  });

  // 获取taskInfo的第N项
  const getTaskInfoItemByBackIndex = (backIndex = 1) => {
    return taskInfos.value[taskInfos.value.length - backIndex];
  };

  /* 审批前处理 */
  function handleBeforeDeal(data: any) {
    // 当前流程数据

    // 当前操作类型
    const _operation =
      data?.isNext === 0 ? TASK_OPERATION.REJECT : TASK_OPERATION.EXECUTE;

    const _currentTaskInfo = taskInfos.value.slice(-1)[0];
    const params = {
      // 提交人id
      userId: authStore.userInfo?.id ?? "",
      // 提交人名字
      userName: authStore.userInfo?.name ?? "",
      // 操作类型 1、执行任务、2、转办任务 3、移交任务 4、撤回任务 5、驳回任务 6、作废任务
      operation: "1", // _operation,
      // 操作类型消息
      msg: TASK_OPERATION_TEXT[_operation] ?? "",
      // 任务id list
      taskIdList: taskInfos.value.slice(-1).map((item) => item.id) ?? [],
      // 流程提交数据
      condition: Object.assign(
        {
          // 流程操作类型,默认为已受理可覆盖
          processOperationType: ProcessOperationType.COMPLETE,
        },
        data,
        {
          nextStep: TASK_OPERATION.REJECT !== _operation, //
        }
      ),
      // 业务key列表 (撤回必填)
      businessKeyList: [], // TASK_OPERATION.RECALL === _operation ? [] : [],
      // 转办id集合（转办任务必填）
      candidateIdList: [], // TASK_OPERATION.TRANSFER === _operation ? [] : [],
      // 移交人ID（移交任务必填）
      acceptorId: "", // TASK_OPERATION.TRANSFER === _operation ? "" : "",
      // 驳回的节点（驳回任务必填）
      activityId: "", // TASK_OPERATION.REJECT === _operation ? data?.nextActivityId ?? "" : ""
      instanceId: data.instanceId, // '' // 流程ID
    };

    return params;
  }

  async function handleDeal(data: any, extraParams = {}) {
    console.log(extraParams);
    const params = handleBeforeDeal(data);
    const assignParams = Object.assign({}, params, extraParams);
    console.log("handleBeforeDeal-end: ", assignParams);
    const result = await api.activiti.taskOperationTask(assignParams);
    return {
      success: result.code === 200,
      msg: result.message || result.data,
    };
    // return {
    //   success: true,
    //   msg: 'result.message || result.data'
    // };
  }

  // 终止流程
  async function handleReturn() {}

  return {
    instanceId,
    businessInfoData,
    processInfoActivitiWrap,
    processStatusMap,
    currUserLastDealTaskItem,
    getTaskInfoItemByBackIndex,
    taskInfos,
    taskIdMap,
    activityInfos,
    currTaskId,
    isProcessEnd,
    handleDeal,
    handleReturn,
    lastActivityInfo,
    lastTaskInfo,
    handleBeforeDeal,
  };
}
