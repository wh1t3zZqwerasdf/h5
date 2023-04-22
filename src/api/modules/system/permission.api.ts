import { API_URL, http } from '@/utils/request';
import {
  PermissionType,
  PermissionItemType,
  PermissionInfoType
} from '@/types/modules/permission.type';
const PREFIX = `${API_URL.ADMIN}/upm/resource`;
const PREFIX2 = `${API_URL.UPM}`;

export function getPermission() {
  return http<PermissionType>({
    url: `${PREFIX2}/user/role/menu`,
    method: 'get'
  });
}

export function getPermissionTree() {
  return http<PermissionItemType[]>({
    url: `${PREFIX2}/resource/tree/menu`,
    method: 'get'
  });
}

/* 角色菜单获取 */
export function roleMenuGetById(data: { roleId: string }) {
  return http<PermissionInfoType>({
    url: `${PREFIX2}/role/resource/list/menu/${data.roleId}`,
    method: 'get'
  });
}

// 获取对应角色的树
export function setRolePermissionTree(
  data: { resourceId: string; roleId: string }[]
) {
  return http<PermissionType>({
    url: `${PREFIX2}/role/resource/create/menu`,
    method: 'post',
    data
  });
}

// 查询详情
export function queryInfo(data: { id: string }) {
  return http<PermissionItemType>({
    url: `${PREFIX2}/resource/get/${data.id}`,
    method: 'get'
    // params: data
  });
}

// 新增
export function add(data: PermissionItemType[]) {
  return http({
    url: `${PREFIX2}/resource/create/menu`,
    method: 'post',
    data
  });
}

// 更新接口
export function update(data: PermissionItemType) {
  return http({
    url: `${PREFIX2}/resource/update/menu`,
    method: 'post',
    data
  });
}

// 删除接口
export function deleteItem(data: { id: string }) {
  return http({
    url: `${PREFIX2}/resource/remove/menu?id=${data.id}`,
    method: 'post'
  });
}

// 刷新缓存
export function refreshMenu() {
  return http({
    url: `${PREFIX2}/resource/refresh/menu`,
    method: 'get'
  });
}
