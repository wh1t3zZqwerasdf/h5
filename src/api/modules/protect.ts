import type {ApiPage, FacilityInfoType} from '@/types';
import {UploadType} from '@/types';
import {API_URL, http} from '@/utils/request';
// const PREFIX = '/omp-admin/protect';
const PREFIX = `${API_URL.ADMIN}/protect`;
// export function addFacility(data: any = {}) {
//   return http<ApiPage<FacilityInfoType>>({
//     url: `${PREFIX}/facility/add`,
//     method: 'post',
//     data
//   });
// }

export function facilityImport(data: FormData) {
    return http<UploadType, true>({
        url: `${PREFIX}/facility/data/import`,
        method: 'post',
        data
    });
}

export function addFacility(data: { [key: string]: any }, type: number) {
    return http({
        url: `${PREFIX}/facility/add/`,
        // url: `${PREFIX}/facility/add/${type}`,
        method: 'post',
        data
    }).then(resData => {
        // const workbenchStore = useWorkbenchStore();
        // workbenchStore.getTodoCount();
        return resData;
    });
}

export function facilityQueryList(data: any = {}) {
    return http<ApiPage<FacilityInfoType>>({
        url: `${PREFIX}/facility/query/list`,
        method: 'post',
        data
    });
}

/**
 * 获取划定线路列表
 * @param data 和线路列表一致
 * @returns 和线路列表一致
 */
export function facilityQueryListComplete(data: any = {}) {
    return http<ApiPage<FacilityInfoType>>({
        url: `${PREFIX}/facility/query/list/complete`,
        method: 'post',
        data
    });
}

export function facilityQueryInfo(data: { id: string }) {
    return http({
        url: `${PREFIX}/facility/query/info`,
        method: 'post',
        params: data
    });
}

// #region  保护区抽检管理 接口

// 保存接口 1保存 2提交
export function protectCheckDataAdd(data: { [key: string]: any }) {
    return http({
        // url: `${PREFIX}/check/add/${type}`,
        url: `${PREFIX}/check/add/`,
        method: 'post',
        data
    }).then(resData => {
        // const workbenchStore = useWorkbenchStore();
        // workbenchStore.getTodoCount();
        return resData;
    });
}

// 保护区抽检管理 抽检计划 添加（保存）
export function protectCheckAdd(data: { [key: string]: any }) {
    return http({
        url: `${PREFIX}/check/add/`,
        method: 'post',
        data
    }).then(resData => {
        // const workbenchStore = useWorkbenchStore();
        // workbenchStore.getTodoCount();
        return resData;
    });
}

// 保护区抽检管理 抽检计划 提交
export function protectCheckSubmit(data: { [key: string]: any }) {
    return http({
        url: `${PREFIX}/check/submit/`,
        method: 'post',
        data
    }).then(resData => {
        // const workbenchStore = useWorkbenchStore();
        // workbenchStore.getTodoCount();
        return resData;
    });
}

export function protectCheckQueryList(data: any = {}) {
    return http({
        url: `${PREFIX}/check/query/list`,
        method: 'post',
        data
    }).then(resData => {
        console.log('protectCheckQueryList:', resData);
        return resData;
    });
}

// 获取保护区历史列表
export function protectCheckQueryHistoryList(data: any = {}) {
    return http({
        url: `${PREFIX}/check/query/list/history`,
        method: 'post',
        data
    }).then(resData => {
        console.log('protectCheckQueryHistoryList:', resData);
        return resData;
    });
}

export function protectCheckPlanQueryInfo(data: { id: string }) {
    return http({
        url: `${PREFIX}/check/query/info?id=${data.id}`,
        method: 'post'
    });
}

// 根据id获取 抽检记录的详情
export function protectCheckQueryInfo(id: number) {
    return http({
        url: `${PREFIX}/check/query/info?id=${id}`,
        method: 'post'
    });
}

export function protectTaskQueryInfo(id: number) {
    return http({
        url: `${PREFIX}/task/query/info?id=${id}`,
        method: 'post'
    });
}

// 保护区抽检任务流程 计划详情查看
export function protectTaskQueryInfoActiviti(
    id: string,
    type: number,
    position: string
) {
    return http({
        url: `${PREFIX}/task/query/info/activiti`,
        method: 'post',
        data: {
            id,
            type,
            position
        }
    });
}

// export function protectCheckQueryInfo(data: {
//   id: number;
//   [key: string]: any;
// }) {
//   return http({
//     url: `${PREFIX}/check/query/info`,
//     method: 'post',
//     params: data
//   }).then(resData => {
//     console.log('protectCheckQueryInfo:', resData);
//     return resData;
//   });
// }

// 保护区抽检 批量删除接口
export function protectCheckDeletes(data: any = {}) {
    return http({
        url: `${PREFIX}/check/deletes`,
        method: 'post',
        data
    }).then(resData => {
        console.log('protectCheckQueryInfo:', resData);
        return resData;
    });
}

// 保护区抽检 更新 接口
export function protectCheckDataUpdate(data: { [key: string]: any }) {
    return http({
        url: `${PREFIX}/check/update`,
        // url: `${PREFIX}/check/update/${type}`, // 1更新保存 2更新提交
        method: 'post',
        data
    }).then(resData => {
        return resData;
    });
}

// #endregion

// #region 保护区管理接口部分

/** 经办划定信息，草稿保存接口 */
export function protectManagerDelimitCache(data: any = {}) {
    return http({
        url: `${PREFIX}/manager/delimit/cache`, // cache
        method: 'post',
        data
    }).then(resData => {
        console.log('delimit:', resData);
        return resData;
    });
}

// export function protectionManagerApply(data: any = {}) {
//   return http({
//     url: `${PREFIX}/manager/delimit`, // apply
//     method: 'post',
//     data
//   }).then(resData => {
//     console.log('delimit:', resData);
//     const workbenchStore = useWorkbenchStore();
//     workbenchStore.getTodoCount();
//     return resData;
//   });
// }

// 查询保护区信息的列表
export function protectionQueryList(data: any = {}) {
    return http({
        url: `${PREFIX}/manager/query/list`,
        method: 'post',
        data
    }).then(resData => {
        // const workbenchStore = useWorkbenchStore();
        // workbenchStore.getTodoCount();
        return resData;
    });
}

// 查询保护区抽检信息的列表
// 获取划定列表数据 1215
export function protectionQueryCheckList(data: any = {}) {
    return http({
        // url: `${PREFIX}/manager/query/check/list`,
        url: `${PREFIX}/manager/query/list`,
        method: 'post',
        data
    }).then(resData => {
        return resData;
    });
}

// 查询保护区草稿列表
// 获取草稿箱列表数据 1215
export function protectionQueryCheckDraftList(data: any = {}) {
    return http({
        // url: `${PREFIX}/manager/query/check/list`,
        url: `${PREFIX}/manager/query/draft/list`,
        method: 'post',
        data
    }).then(resData => {
        return resData;
    });
}

// export function protectManagerQueryInfo(data: { id: string }) {
export function protectManagerQueryInfo(data: any = {}) {
    return http({
        url: `${PREFIX}/manager/query/info`,
        method: 'post',
        params: data
    });
}

// 删除电力设施的保护区划定
export function protectionDelete(data: any = {}) {
    return http({
        url: `${PREFIX}/manager/deletes`,
        method: 'post',
        data
    }).then(resData => {
        console.log('protectionDelete:', resData);
        return resData;
    });
}

// 更改保护区划定接口
export function protectManagerUpdate(data: any = {}) {
    return http({
        url: `${PREFIX}/manager/update`,
        method: 'post',
        data
    }).then(resData => {
        console.log('protectManagerUpdate:', resData);
        // const workbenchStore = useWorkbenchStore();
        // workbenchStore.getTodoCount();
        return resData;
    });
}

// #endregion

export function protectFacilityQueryList(data: {
    page: number;
    size: number;
    [key: string]: any;
}) {
    return http<ApiPage<any>>({
        url: `${PREFIX}/facility/query/list`,
        method: 'post',
        data
    });
}

// 新版线路划定列表请求
export function protectFacilityQueryListManage(data: {
    page: number;
    size: number;
    [key: string]: any;
}) {
    return http<ApiPage<any>>({
        url: `${PREFIX}/facility/query/manage/list`,
        method: 'post',
        data
    });
}

// 保护区划定线路列表 1221
export function getFacilityList(data: {
    manageId: string;
    [key: string]: any;
}) {
    return http<ApiPage<any>>({
        url: `${PREFIX}/facility/query/list/manage`,
        method: 'post',
        params: data
    });
}

// 保护区抽检管理条件查询接口 获取所有数据列表
// export function protectCheckQueryList(data: {
//   page: number;
//   size: number;
//   // offset: number;
//   // sort: string;
//   [key: string]: any;
// }) {
//   return http<ApiPage<any>>({
//     url: `${PREFIX}/check/query/list`,
//     method: 'post',
//     data
//   });
// }

// 保护区抽检管理条件查询接口 查询设施的抽检计划详细列表

export function protectManagerQueryCheckNumber(data: {
    id: string;
    [key: string]: any;
}) {
    return http<ApiPage<any>>({
        url: `${PREFIX}/manager/query/check/number`,
        method: 'GET',
        params: data
    });
}

// 电力设施管理部分接口
// 删除 传入ID数组
export function deleteData(data: any = {}) {
    return http({
        url: `${PREFIX}/facility/deletes`,
        method: 'post',
        data
    }).then(resData => {
        console.log('resdata：', resData);
        // const workbenchStore = useWorkbenchStore();
        // workbenchStore.getTodoCount();
        return resData;
    });
}

// #region 电力设施管理（保护区划定管理）流程状态相关接口

// 1 工作台 - 查询流程数据列表
// /* 流程详情接口 */
export function queryInfoActiviti(data: { instanceId: string }) {
    return http({
        url: `${API_URL.ADMIN}/support/activiti/query/info`,
        // url: `${PREFIX}/manager/query/info/activiti`,
        method: 'get',
        params: data
    });
}

export function queryInfo(data: { id: string }) {
    return http({
        url: `${PREFIX}/manager/query/info`,
        method: 'post',
        params: data
    });
}

// 保护区库详情
export function queryCompleteInfo(data: { id: string }) {
    return http({
        url: `${PREFIX}/facility/query/complete/info`,
        method: 'post',
        params: data
    });
}

/**
 * update
 * @param data
 * @param type 1:更新业务数据 2:更新业务数据&提交流程 3:更新业务数据&提交流程&返回流程ID
 * @returns
 */
export function updateData(data: { [key: string]: any }) {
    return http<{ instanceId?: string }>({
        url: `${PREFIX}/manager/update`,
        method: 'post',
        data
    }).then(resData => {
        const workbenchStore = useWorkbenchStore();
        workbenchStore.getTodoCount();
        return resData;
    });
}

// export function updateData(data: { [key: string]: any }, type: number) {
//   return http<{ instanceId?: string }>({
//     url: `${PREFIX}/manager/update/${type}`,
//     // url: `${PREFIX}/manager/update`,
//     method: 'post',
//     data
//   }).then(resData => {
//     const workbenchStore = useWorkbenchStore();
//     workbenchStore.getTodoCount();
//     return resData;
//   });
// }

export function queryListActiviti(data: {
    page: number;
    size: number;
    sort?: string;
    type: string; // "BACKLOG" | HAVE_FINISHED
    businessId?: number;
    instanceId?: string;
}) {
    return http<ApiPage<any>>({
        url: `${PREFIX}/manager/query/list/activiti`,
        method: 'post',
        data
    }).then(resData => {
        // const workbenchStore = useWorkbenchStore();
        // workbenchStore.getTodoCount();
        return resData;
    });
}

// #endregion

// #region 保护区抽检

// 查看保护区抽检详情
export function queryInfoCheck(
    checkId: number, // 抽检ID
    manageId: number // 保护区ID
) {
    return http<ApiPage<any>>({
        url:
            `${PREFIX}/manager/query/info/check?checkId=${checkId}` +
            `&manageId=${manageId}`,
        method: 'post'
    });
}

// 查看保护区的详情
export function queryProtectInfo(id: string) {
    return http<any>({
        url: `${PREFIX}/protect/manager/query/id=${id}`,
        method: 'post'
    });
}

// #endregion

// #region 保护区标识流程接口 1220

// 查看保护区划定标识流程数据查询 1220
export function queryListMarkActiviti(data: {
    page: number;
    size: number;
    sort?: string;
    offset?: number;
    type?: string; // "BACKLOG" | HAVE_FINISHED
    businessId?: number;
    instanceId?: string;
}) {
    return http<ApiPage<any>>({
        url: `${PREFIX}/manager/query/list/mark/activiti`,
        method: 'post',
        data
    });
}

// 获取标识信息
export function facilityQueryFacilityList(data: any) {
    return http<ApiPage<any>>({
        url: `${PREFIX}/facility/query/facility/list`,
        method: 'post',
        data
    });
}

// 提交标识信息
export function protectManagerMarkUpdate(data: any) {
    return http<ApiPage<any>>({
        url: `${PREFIX}/manager/mark/update`,
        method: 'post',
        data
    });
}

// 获取已标识信息
export function protectManagerMarkQueryList(data: any) {
    return http<ApiPage<any>>({
        url: `${PREFIX}/manager/mark/query/list`,
        method: 'post',
        params: data
    });
}

// 获取已标识信息流程
export function protectManagerMarkQueryAllList(data: any) {
    return http<ApiPage<any>>({
        url: `${PREFIX}/manager/mark/query/all/list`,
        method: 'post',
        params: data
    });
}

// 更新标识的线路信息（经办审核标识信息）
export function protectFacilityUpdate(data: any) {
    return http<ApiPage<any>>({
        url: `${PREFIX}/facility/update`,
        method: 'post',
        data
    });
}

// #endregion

// #region 保护区划定公示流程接口 1220

// 查看保护区划定公示流程数据查询 1220
export function queryListPublicActiviti(data: {
    page: number;
    size: number;
    sort?: string;
    offset?: number;
    type: any; // "BACKLOG" | HAVE_FINISHED
    businessId?: number;
    instanceId?: string;
}) {
    return http<ApiPage<any>>({
        url: `${PREFIX}/manager/query/list/notice/activiti`,
        method: 'post',
        data
    });
}

/**
 *
 */
export function deleteFacility(id: string) {
    return http({
        url: `${PREFIX}/manager/delimit/cache/facility/delete`,
        method: 'post',
        params: {id}
    });
}

export function getTaskCount() {
    return http({
        url: `${PREFIX}/task/query/workbench/count`,
        method: 'post'
    });
}

//新保护区管理的新接口

export function facilityEnrolmentAdd(data: any) {
    return http({
        url: `${PREFIX}/manager/apply`,
        method: 'post',
        data
    });
}

// 查看保护区划定批复审核流程数据查询 1220
export function queryListApplyActiviti(data: any) {
    return http<ApiPage<any>>({
        url: `${PREFIX}/manager/query/list/apply/activiti`,
        method: 'post',
        data
    });
}

//保护区划定查询列表接口
export function managerQueryApplyList(data: any) {
    return http({
        url: `${PREFIX}/manager/query/apply/list`,
        method: 'post',
        data
    });
}

//保护区划定查询列表接口
export function managerQueryApplyInfo(data: any) {
    return http({
        url: `${PREFIX}/manager/query/apply/info`,
        method: 'post',
        params: data
    });
}

//保护区划定线路查询列表接口
export function facilityQueryInfoList(data: any) {
    return http({
        url: `${PREFIX}/facility/query/info/list`,
        method: 'post',
        data
    });
}

export function protectionManagerApply(data: any = {}) {
    return http({
        url: `${PREFIX}/manager/delimit`, // apply
        method: 'post',
        data
    }).then(resData => {
        console.log('delimit:', resData);
        // const workbenchStore = useWorkbenchStore();
        // workbenchStore.getTodoCount();
        return resData;
    });
}

//保护区划定工作台info数据update
export function managerApplyUpdate(data: any) {
    return http({
        url: `${PREFIX}/manager/apply/update`,
        method: 'post',
        data
    });
}

// #endregion
