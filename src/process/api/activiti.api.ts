import { API_URL, http } from "@/utils/request";
import {
  QueryInfoActivitiType,
  QueryInfoActivitiWrapType,
} from "@/process/types";

const PREFIX = `${API_URL.ADMIN}`;
const PREFIX_ACTIVITI = `${API_URL.ACTIVITY}/activiti`; // '/common-activiti';
const baseApiUrl = import.meta.env.VITE_APP_BASE_URL;

/* 根据流程id获取流程历史人物详情 */
export function getProcessHistory(data: { processInstanceId: string }) {
    return http<QueryInfoActivitiType, true>({
        url: `${PREFIX_ACTIVITI}/task/historicQuery/${data.processInstanceId}`,
        method: 'get'
    });
}


/* 流程任务列表 */
export function getProcessTaskList(data: {
    userId: string;
    procDeKey?: string;
    requestType?: string;
    page?: number;
    size?: number
}) {
    return http<QueryInfoActivitiType, true>({
        url: `${PREFIX_ACTIVITI}/task/page`,
        method: 'post',
        data
    });
}


// 流程详情接口
export function queryInfo(data: { instanceId: string }) {
    return http<QueryInfoActivitiWrapType>({
        url: `${PREFIX}/support/activiti/query/info`,
        method: 'get',
        params: data
    });
}

// 获取流程图
export function getProcessImg(data: { processInstanceId: string }) {
  return `${baseApiUrl}${PREFIX_ACTIVITI}/task/viewImage?processInstanceId=${data.processInstanceId}`;
}

/* 办理任务-处理任务 */
export function taskOperationTask(data: {
  userId: string; // 用户id（提交时的发起人，审批时的审批人）
  userName: string; // 用户名称（提交时的发起人，审批时的审批人）
  operation: string; // 操作类型（1：执行任务, 2:转办任务, 3:移交任务, 4:撤回任务, 5:驳回任务, 6:作废任务）
  msg: string; // 【执行】、【转办】、【移交】、【撤回】、【驳回】、【作废】：审批意见或者备注
  taskIdList: string[]; // 任务id列表
  businessKeyList: string[]; // 业务key列表 (撤回必填)
  condition: { [key: string]: any };
  candidateIdList: string[]; // 转办id集合（转办任务必填）
  acceptorId: string; // 移交人ID（移交任务必填）
  activityId: string; // 驳回的节点（驳回任务必填）
}) {
  return http({
    url: `${PREFIX}/support/activiti/operationTask`,
    method: "post",
    data,
  });
}

/* 保存-流程数据接口 */
export function saveTaskVariables(data: {
    taskId: string;
    variableMap: { [key: string]: any };
}) {
    return http({
        url: `${PREFIX_ACTIVITI}/task/saveTaskVariables`,
        method: 'post',
        data
    });
}

/* 获取首页当前登录用户流程任务数 */
export function getCurrUserProcessCount() {
    return http({
        url: `${PREFIX}/support/activiti/home`,
        method: 'get'
    });
}
