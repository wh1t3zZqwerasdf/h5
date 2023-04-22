import type { ApiPage, UserInfoType } from '@/types';
import { API_URL, http } from '@/utils/request';

const PREFIX = `${API_URL.ADMIN}/system/users`;
const PREFIX2 = `${API_URL.ADMIN}/system`;

export function usersGet(data: any) {
  return http({
    url: `${PREFIX}/get`,
    method: 'post',
    data
  });
}

export function addData(data: any) {
  return http({
    url: `${PREFIX}/add`,
    method: 'post',
    data
  });
}

export function usersCreate(data: any) {
  return http({
    url: `${PREFIX}/create`,
    method: 'post',
    data
  });
}

export function usersUpdate(data: any) {
  return http({
    url: `${PREFIX}/update`,
    method: 'post',
    data
  });
}

export function usersFilter(data: any) {
  return http<ApiPage<UserInfoType>>({
    url: `${PREFIX}/query/list`,
    method: 'post',
    data
  });
}

export function queryDispenseUser(data: any) {
  return http<ApiPage<UserInfoType>>({
    url: `${PREFIX}/query/dispense/list`,
    method: 'post',
    data
  });
}

// 批量删除
export function usersDelete(data: any) {
  return http({
    url: `${PREFIX}/deletes`,
    method: 'post',
    data
  });
}

export function usersGetCurrentUser() {
  return http({
    url: `${PREFIX}/get/this`,
    method: 'get'
  });
}

// 根据用户id获取用户信息
export function getUserMsg(data: {
  id: string; // 角色id
}) {
  return http({
    url: `${PREFIX}/query/info?id=${data.id}`,
    method: 'post'
  });
}

// 密码修改接口
export function usersPasswordUpdate(data: any) {
  return http({
    url: `${PREFIX}/password/update`,
    method: 'post',
    data
  });
}

// 获取机构用户数量
export function getOrgUserCount() {
  return http({
    url: `${PREFIX}/get/count`,
    method: 'get'
  });
}

// 传入用户ids获取用户数据
export function getUserListByIds(ids: string[]) {
  return http({
    url: `${PREFIX}/query/info/ids`,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: ids
  });
}

// 获取对应机构的机构负责人
export function getOrgUserHead(data: { id: string }) {
  return http({
    url: `${PREFIX}/query/role/head`,
    method: 'post',
    params: data
  });
}

// 获取对应机构的机构负责人
export function getVirtuallyUser(data: { id: string }) {
  return http({
    url: `${PREFIX2}/mock/login?id=${data.id}`,
    // url: `system/mock/login?id=${data.id}`,
    method: 'post'
  });
}

// 根据机构获取对应机构对应角色的用户
export function getRoleUserListByOrg(data: { orgId?: string; role: string }) {
  return http<UserInfoType[]>({
    url: `${PREFIX2}/users/query/role`,
    method: 'post',
    data
  });
}
