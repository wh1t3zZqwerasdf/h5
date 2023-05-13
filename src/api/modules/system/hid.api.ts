//  import { useWorkbenchStore } from '@/store';
import type {
  hidQueryType,
  ApiPage,
  QueryInfoActivitiWrapType,
  PageParams_hj
} from '@/types';
import { API_URL, http } from '@/utils/request';
const PREFIX = API_URL.ADMIN;

/* 流程详情接口 */
export function queryInfoActiviti(data: { instanceId: string }) {
  return http<QueryInfoActivitiWrapType>({
    url: `${PREFIX}/support/activiti/query/info`,
    // url: `${PREFIX}/hid/query/info/activiti`,
    method: 'get',
    params: data
  });
}

/* 流程条件查询接口 */
export function queryListActiviti(data: PageParams_hj & { type?: string }) {
  return http<ApiPage<any>>({
    url: `${PREFIX}/hid/query/list/activiti`,
    method: 'post',
    data
  }).then(resData => {
    // const workbenchStore = useWorkbenchStore();
    // workbenchStore.getTodoCount();
    return resData;
  });
}

export function queryList(data: {
  page: number;
  size: number;
  [key: string]: any;
}) {
  return http<ApiPage<hidQueryType>>({
    url: `${PREFIX}/hid/query/list`,
    method: 'post',
    data
  });
}

export function queryInfo(data: { id: string | string[] }) {
  return http<hidQueryType>({
    url: `${PREFIX}/hid/query/info`,
    method: 'post',
    params: data
  });
}

/* 转办流程 */
export function addActiviti(data: { [key: string]: any }) {
  return http<any>({
    url: `${PREFIX}/hid/add/activiti`,
    method: 'post',
    data
  }).then(resData => {
    // const workbenchStore = useWorkbenchStore();
    // workbenchStore.getTodoCount();
    return resData;
  });
}

/* 保存 */
export function addRaftsList(data: any) {
  return http({
    url: `${PREFIX}/hid/add`,
    method: 'post',
    data
  }).then(resData => {
    // const workbenchStore = useWorkbenchStore();
    // workbenchStore.getTodoCount();
    return resData;
  });
}
/* 新增 */
export function addData(data: any) {
  return http({
    url: `${PREFIX}/hid/submit`,
    method: 'post',
    data
  }).then(resData => {
    // const workbenchStore = useWorkbenchStore();
    // workbenchStore.getTodoCount();
    return resData;
  });
}
export function updateData(data: { [key: string]: any }) {
  return http({
    url: `${PREFIX}/hid/update`,
    method: 'post',
    data
  }).then(resData => {
    // const workbenchStore = useWorkbenchStore();
    // workbenchStore.getTodoCount();
    return resData;
  });
}

export function deleteData(data: { id: string }) {
  return http({
    url: `${PREFIX}/hid/delete`,
    method: 'post',
    params: data
    // data,
  }).then(resData => {
    // const workbenchStore = useWorkbenchStore();
    // workbenchStore.getTodoCount();
    return resData;
  });
}

export function deletesData(data: { [key: string]: any }) {
  return http({
    url: `${PREFIX}/hid/deletes`,
    method: 'post',
    data
  }).then(resData => {
    // const workbenchStore = useWorkbenchStore();
    // workbenchStore.getTodoCount();
    return resData;
  });
}

export function getId(data: { [key: string]: any }) {
  return http({
    url: `${PREFIX}/hid/get/id`,
    method: 'post',
    data
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
    url: `${PREFIX}/hid/dispense`,
    method: 'post',
    data
  }).then(resData => {
    // const workbenchStore = useWorkbenchStore();
    // workbenchStore.getTodoCount();
    return resData;
  });
}
