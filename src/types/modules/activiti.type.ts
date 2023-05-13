export type TaskProcessType = {
  procDefKey: string;
  procDefName: string;
  procDefCount: number;
};
export type QueryActivitiInfoActivityInfosType = {
  activityId: string;
  activityName: string;
  activityType: string;
  assignee: string;
  calledProcessInstanceId: string;
  comments: any[];
  deleteReason: string;
  endTime: string;
  executionId: string;
  id: string;
  processDefinitionId: string;
  processInstanceId: string;
  startTime: string;
  taskId: string;
  tenantId: string;
  time: string;
};
export type QueryActivitiInfoTaskInfosType = {
  assignee: string;
  claimTime: null;
  comments: any[];
  dueDate: null;
  endTime: null;
  executionId: string;
  id: string;
  name: string;
  startTime: string;
  activityId?: string;
  variableMap: { [key: string]: any };
};

export type QueryInfoActivitiType = {
  activityInfos: QueryActivitiInfoActivityInfosType[];
  businessKey: string;
  processDefinitionId: string;
  processDefinitionKey: string;
  processDefinitionName: string;
  startTime: string;
  startUserId: string;
  taskInfos: QueryActivitiInfoTaskInfosType[];
};

export type QueryInfoActivitiWrapType = {
  actData: QueryInfoActivitiType;
  assigneeMap: { [key: string]: string };
};

export type AticivitiOperationTaskType = {
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
};
