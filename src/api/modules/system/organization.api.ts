import type {
  ApiPage,
  OrgInfoType,
  OrgTreeType,
  OrgSelectOptionType
} from '@/types';
import { API_URL, http } from '@/utils/request';

const PREFIX = `${API_URL.ADMIN}/system/organization`;

export function orgTree(data: { id: string }) {
  return http<OrgTreeType>({
    url: `${PREFIX}/tree`,
    method: 'post',
    data
  });
}

export function orgTreeChildren(data: { id: string }) {
  return http<OrgTreeType[]>({
    url: `${PREFIX}/tree/_children`,
    method: 'post',
    data
  });
}

export function orgTreeExcludeChildren(data: {
  id: string;
  disableOrgIds?: string[];
}) {
  return http<OrgTreeType[]>({
    url: `${PREFIX}/exclude/tree/_children`,
    method: 'post',
    data
  });
}

// 废弃接口
// export function orgGet(data: { id: string }) {
//   return http<OrgInfoType>({
//     url: `${PREFIX}/get`,
//     method: 'post',
//     data
//   });
// }

export function orgInfo(data: { id: string }) {
  return http<OrgInfoType>({
    url: `${PREFIX}/query/info`,
    method: 'post',
    params: data
  });
}

export function orgFilter(data: {
  page: number;
  size: number;
  name: string;
  parentId: string;
}) {
  return http<ApiPage<OrgInfoType>>({
    url: `${PREFIX}/query/list`,
    // url: `${PREFIX}/filter`,
    method: 'post',
    data
  });
}

export function orgCreate(data: any) {
  return http<OrgInfoType>({
    // url: `${PREFIX}/create`,
    url: `${PREFIX}/add`,
    method: 'post',
    data
  });
}

export function orgUpdate(data: any) {
  return http<OrgInfoType>({
    url: `${PREFIX}/update`,
    method: 'post',
    data
  });
}

// 获取当前用户完整的组织树结构（本级+下级）
export function orgByCurU() {
  return http<OrgSelectOptionType[]>({
    url: `${PREFIX}/tree/byCurU`,
    method: 'post'
  });
}

// 批量删除分类
export function orgBatchDelete(ids: string[]) {
  return http<OrgInfoType>({
    url: `${PREFIX}/deletes`,
    method: 'post',
    data: ids
  });
}

// 判断当前用户所在的机构是否有父机构
export function hasFatherNode() {
  return http<boolean>({
    url: `${PREFIX}/hasFatherNode`,
    method: 'get'
  });
}

// 获取当前用户所在的机构的父机构
export function getFatherNode() {
  return http<OrgInfoType>({
    url: `${PREFIX}/getFatherNode`,
    method: 'get'
  });
}

// 判断当前用户所在的机构是否有子机构
export function hasChildrenNode() {
  return http<boolean>({
    url: `${PREFIX}/hasChildrenNode`,
    method: 'get'
  });
}

export function getRootNode() {
  return http<OrgInfoType[]>({
    url: `${PREFIX}/root`,
    method: 'post'
  });
}
