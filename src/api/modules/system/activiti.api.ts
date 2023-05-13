
import { API_URL, http } from '@/utils/request';

const PREFIX = API_URL.ADMIN;
const PREFIX_2 = API_URL.ACTIVITY; // '/common-activiti';


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
    url: `${PREFIX_2}/activiti/task/operationTask`,
    method: 'post',
    data
  })
}

/* 办理任务-启动流程实例 */
export function taskStart(data: {
  userId: string;
  userName: string;
  processDefinitionKey: string;
  businessKey: string;
  variableMap: { [key: string]: any };
}) {
  return http({
    url: `${PREFIX}/activiti/task/start`,
    method: 'post',
    data
  });
}

/* 保存-流程数据接口 */
export function saveTaskVariables(data: {
  taskId: string;
  variableMap: { [key: string]: any };
}) {
  return http({
    url: `${PREFIX_2}/activiti/task/saveTaskVariables`,
    method: 'post',
    data
  });
}

/* 获取流程数据节点 */
export function getProcessNode(data: any) {
  return http({
    url: `${PREFIX_2}/activiti/task/historyAssignee/${data}`,
    method: 'get'
  });
}
