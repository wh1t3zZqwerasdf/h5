import type { ApiPage, QueryInfoActivitiWrapType } from '@/types';
import { API_URL, http } from '@/utils/request';
const PREFIX = API_URL.ADMIN;

/* 流程详情接口 */
export function queryInfoActiviti(data: { instanceId: string }) {
  return http<QueryInfoActivitiWrapType>({
    url: `${PREFIX}/support/activiti/query/info`,
    // url: `${PREFIX}/exter/query/info/activiti`,
    method: 'get',
    params: data
  });
}

/* 流程条件查询接口 */
export function queryListActiviti(data: {
  page: number;
  size: number;
  type?: string; // "BACKLOG" | HAVE_FINISHED
}) {
  return http<ApiPage<any>>({
    url: `${PREFIX}/exter/query/list/activiti`,
    method: 'post',
    data
  })
}

export function queryList(data: {
  page: number;
  size: number;
  [key: string]: any;
}) {
  return http<ApiPage<any>>({
    url: `${PREFIX}/exter/query/list`,
    method: 'post',
    data
  });
}

export function queryInfo(data: { id: string }) {
  return http({
    url: `${PREFIX}/exter/query/info`,
    method: 'post',
    params: data
  });
}

export function queryCaseInfo(data: { id: string }) {
  return http({
    url: `${PREFIX}/exter/query/case/info`,
    method: 'post',
    params: data
  });
}

type CaseInfoType = {
  id: string;
  name: string;
  number: string;
  submitName: string;
  submitOrg: string;
};
export function queryCase(data: {
  page: number;
  size: number;
  [key: string]: any;
}) {
  return http<ApiPage<CaseInfoType>>({
    url: `${PREFIX}/exter/query/case`,
    method: 'post',
    data
  });
}
export function addActiviti(data: { [key: string]: any }) {
  return http({
    url: `${PREFIX}/exter/add/activiti`,
    method: 'post',
    data
  })
}
//保存
export function saveData(data: { [key: string]: any }, type: number) {
  return http({
    url: `${PREFIX}/exter/add`,
    method: 'post',
    data
  })
}
//新增
export function addData(data: { [key: string]: any }, type: number) {
  return http({
    url: `${PREFIX}/exter/submit`,
    method: 'post',
    data
  })
}
export function updateData(data: { [key: string]: any }, type: number) {
  return http({
    url: `${PREFIX}/exter/update`,
    method: 'post',
    data
  })
}

export function deleteData(data: { id: string }) {
  return http({
    url: `${PREFIX}/exter/delete`,
    method: 'post',
    params: data
  })
}
export function deletesData(data: { [key: string]: any }) {
  return http({
    url: `${PREFIX}/exter/deletes`,
    method: 'post',
    data
  })
}

// 全卷宗列表保存接口
export function saveFolder(data: { [key: string]: any }) {
  return http({
    url: `${PREFIX}/exter/save/folder`,
    method: 'post',
    data
  });
}
// 全卷宗生成接口
export function generatefolder(data: { [key: number]: any }) {
  return http({
    url: `${PREFIX}/exter/generate/folder?id=${data}`,
    method: 'GET'
  });
}

// 全卷宗列表查询接口
export function queryFolderLis(data: { [key: string]: any }) {
  return http({
    url: `${PREFIX}/exter/query/folder/list`,
    method: 'GET',
    params: data
  });
}

// export function dispense(data: { [key: string]: any }) {
export function dispense(data: {
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
  instanceId: string; // 流程ID
  [key: string]: any;
}) {
  return http({
    url: `${PREFIX}/exter/dispense`,
    method: 'post',
    data
  })
}
