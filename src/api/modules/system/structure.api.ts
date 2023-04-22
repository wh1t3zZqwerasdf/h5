import { API_URL, http } from '@/utils/request';
import {
  ApiPage,
  StructureClassTree,
  StructureBusinessType,
  StructureClassInfo
} from '@/types';
const PREFIX = `${API_URL.ADMIN}/system/structure/class`;

// 获取全部树形分类数据
export function structureClassQueryAll(
  type: StructureBusinessType,
  data: { roles?: string[] } = {}
) {
  return http<StructureClassTree[]>({
    url: `${PREFIX}/query/all/${type}`,
    method: 'post',
    data
  });
}

// 类型新增接口
export function structureClassAdd(
  data: {
    name: string;
    level: number;
    parentId: string;
    type: number;
  },
  type: StructureBusinessType
) {
  return http<StructureClassTree[]>({
    url: `${PREFIX}/add/${type}`,
    method: 'post',
    data
  });
}

// 获取根数据
export function structureClassQueryRootData(type: StructureBusinessType) {
  return http<StructureClassTree>({
    url: `${PREFIX}/query/root/${type}`,
    method: 'get'
  });
}

// 编辑接口
export function structureClassUpdate(data: StructureClassTree) {
  return http<StructureClassTree[]>({
    url: `${PREFIX}/update`,
    method: 'post',
    data
  });
}

// 批量删除分类
export function structureClassDeletes(ids: string[]) {
  return http<StructureClassTree[]>({
    url: `${PREFIX}/deletes`,
    method: 'post',
    data: ids
  });
}

// 隐患类型详情数据查询
export function structureClassQueryInfo(data: {
  id: string;
  roleType?: number;
}) {
  return http<StructureClassInfo>({
    url: `${PREFIX}/query/info`,
    method: 'post',
    data
  });
}

// 获取对应结构表的配置条件查询列表
export function structureClassDisposeQueryList(data: { classId: string }) {
  return http<ApiPage<StructureClassTree[]>>({
    url: `${PREFIX}/dispose/query/list`,
    method: 'post',
    data
  });
}

export function structureClassDisposeDataTypeInfoList(data: { id: string }) {
  return http<ApiPage<StructureClassTree[]>>({
    url: `${PREFIX}/data/sort/list`,
    method: 'post',
    data
  });
}

// 类型子配置项新增接口
export function structureClassDisposeAdd(data: {
  name: string;
  level: number;
  parentId: string;
  type: number;
}) {
  return http<StructureClassTree>({
    url: `${PREFIX}/dispose/add`,
    method: 'post',
    data
  });
}

// 类型子配置项编辑接口
export function structureClassDisposeUpdate(data: {
  name: string;
  level: number;
  parentId: string;
  type: number;
}) {
  return http<StructureClassTree>({
    url: `${PREFIX}/dispose/update`,
    method: 'post',
    data
  });
}

// 批量删除分类
export function structureClassDisposeDeletes(ids: string[]) {
  return http<StructureClassTree[]>({
    url: `${PREFIX}/dispose/deletes`,
    method: 'post',
    data: ids
  });
}
