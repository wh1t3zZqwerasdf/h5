export class ReportEntity {
  id: string = "";
  create: boolean = false;
  version: number = 0;
  createBy: string = "";
  createTime: string = "";
  userId: string = "";
  reportNumber: string = "";
  reportName: string = "";
  reportPhone: string = "";
  reportOrg: string = "";
  reportContent: string = "";
  cityId: string = "";
  hidExterAddr: string = "";
  source: number = 0;
  status: number = 0;
  instanceId: string = "";
  submitOrg: string = "";
  submitName: string = "";
  updateTime: string = "";
  new: boolean = false;
  sitePhoto: string | string[] = "";
}

export interface FinishActiviEntity {
  id: string;
  reportNumber: string;
  reportName: string;
  reportContent: string;
  cityName: string;
  hidExterAddr: string;
  reportTime: string;
  source: number;
  status: number;
  instanceId: string;
  taskId: string;
  source_: string;
  status_: string;

  updateTime: string;
  submitOrg: string;
  name: string;
  hiddenTroubleTypeName: string;
  discoverDate: string;
}

export interface FinishActivityList {
  rows: Array<FinishActiviEntity>;
  total: number;
}

//举报页面的传参
export interface ReportOptions {
  isEdit: boolean; //是否可以编辑
}

// export default ActiviList
// export default ActiviEntity
