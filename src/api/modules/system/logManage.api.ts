import { ApiPage } from '@/types';
import { API_URL, http } from '@/utils/request';
const PREFIX = API_URL.ADMIN;

// 登录日志 start
// 条件查询接口
export function queryList(data: { page: number; size: number }) {
  return http<ApiPage<any>>({
    url: `${PREFIX}/system/login/log/query/list`,
    method: 'post',
    data
  });
}
// 批量删除接口
export function deleteData(data: any = {}) {
  return http({
    url: `${PREFIX}/system/login/log/deletes`,
    method: 'post',
    data
  }).then(resData => {
    console.log('resdata：', resData);
    return resData;
  });
}
// 查看详情接口
export function queryInfoLog(data: { id: string }) {
  return http({
    url: `${PREFIX}/system/login/log/query/info`,
    method: 'post',
    params: data
  });
}
// 清空接口
export function cleanData() {
  return http({
    url: `${PREFIX}/system/login/log/clean`,
    method: 'get'
  });
}
// 登录日志 end

// 访问日志 start
export function queryListAccess(data: { page: number; size: number }) {
  return http<ApiPage<any>>({
    url: `${PREFIX}/system/access/log/query/list`,
    method: 'post',
    data
  });
}
// 批量删除接口
export function deleteDataAccess(data: any = {}) {
  return http({
    url: `${PREFIX}/system/access/log/deletes`,
    method: 'post',
    data
  }).then(resData => {
    console.log('resdata：', resData);
    return resData;
  });
}
// 查看详情接口
export function queryInfoLogAccess(data: { id: string }) {
  return http({
    url: `${PREFIX}/system/access/log/query/info`,
    method: 'post',
    params: data
  });
}
// 清空接口
export function cleanDataAccess() {
  return http({
    url: `${PREFIX}/system/access/log/clean`,
    method: 'get'
  });
}
// 访问日志 end

// 根据字典code查询
export function queryCode(data: { code: string }) {
  return http({
    url: `${PREFIX}/system/dictData/query/code`,
    method: 'get',
    params: data
  });
}
