import { DynamicFormOption } from "../components/form/useDynamicForm";

export class ActivityEntity {
  actData: ActData = new ActData();
  assigneeMap: AssigneeMap = new AssigneeMap();
}

export class ActData {
  processDefinitionId: string = "";
  processDefinitionName: string = "";
  processDefinitionKey: string = "";
  description: string = "";
  businessKey: string = "";
  startUserId: string = "";
  startTime: string = "";
  endTime: string = "";
  activityInfos: Array<ActivityInfo> = Array();
  taskInfos: Array<TaskInfo> = Array();
}

export class TaskInfo {
  id: string = "";
  name: string = "";
  assignee: string = "";
  claimTime: string = "";
  dueDate: string = "";
  startTime: string = "";
  endTime: string = "";
  executionId: string = "";
  comments: Array<Comment> = Array();
  variableMap: VariableMap = new VariableMap();
}

export class ActivityInfo {
  id: string = "";
  processInstanceId: string = "";
  activityName: string = "";
  assignee: string = "";
  startTime: string = "";
  endTime: string = "";
  activityId: string = "";
  activityType: string = "";
  calledProcessInstanceId: string = "";
  deleteReason: string = "";
  executionId: string = "";
  processDefinitionId: string = "";
  taskId: string = "";
  tenantId: string = "";
  time: string = "";
  comments: Array<Comment> = Array();
}

export class VariableMap {
  operation: string = "";
  acceptTime: string = "";
  nextStep: boolean = false;
  isNext: number = 0;
  status: number = 0;
  isTrue: number = 0;
  handleTime: string = "";
  handleSituation: string = "";
  isOneself: number = 0;
  threeSiteSituation: string = "";
  disposeTime: string = "";
  disposeResult: string = "";
  [key: string]: any;
}

export class Comment {
  id: string = "";
  userId: string = "";
  time: string = "";
  taskId: string = "";
  processInstanceId: string = "";
  fullMessage: string = "";
}

export class AssigneeMap {}

/**
 * 流程头部区域数据
 */
export type LineHeaderType = {
  title: string;
  placeholder: string;
  // constructor(title: string, placeholder: string) {
  //   this.title = title;
  //   this.placeholder = placeholder;
  // }
};

export class LineEntity {
  title: string = "";
  content: string = "";
  timestamp: string = "";
  icon: string = "";
  color: string = "";
  activityId?: string = "";
}

/**
 * 隐患和外破类型
 */
export class ClassTypeEntity {
  id: string = "";
  parentId: string = "";
  name: string = "";
  level: number = 0;
  type: number = 0;
  ordinal: number = 0;
  formOptions?: Array<string>;
  checkboxOptions?: Array<string>;
  dynamicFormOptions?: Array<DynamicFormOption>;
  children: Array<ClassTypeEntity> | null | undefined;
}

//电站线路列表
export class FacilityEntity {
  rows: Array<FacilityRow> = [];
  total: number = 1;
}

export class FacilityRow {
  id: string = "";
  create: boolean = false;
  version: number = 0;
  createBy: string = "";
  createTime: string = "";
  updateBy: string = "";
  updateTime: string = "";
  objId: string = "";
  name: string = "";
  voltageLevel: number = 0;
  deviceType: number = 0;
  specialty: string = "";
  companyType: number = 0;
  companyOperation: number = 0;
  propertyOrg: string = "";
  region: number = 0;
  adminRegion: string = "";
  submitOrg: string = "";
  operationTime: string = "";
  pipeLength: string = "";
  position: string = "";
  status: string = "";
  result: string = "";
  description: string = "";
  new: boolean = false;
  voltageLevel_: string = "";
  deviceType_: string = "";
  companyType_: string = "";
  submitOrg_: string = "";
}
