import { ApiPage, DictType } from '@/types';
import { API_URL, http } from '@/utils/request';
const PREFIX = API_URL.ADMIN;

/**
 * /system/dict
 */

export function dictQueryAll() {
	return http<{ [key: string]: DictType[] }>({
		url: `${PREFIX}/system/dict/query/all`,
		method: 'get',
	});
}

// 字典管理 start
// 条件查询接口
export function queryList(data: {
	page: number;
	size: number;
	code: string;
	name: string;
	[key: string]: any;
}) {
	return http<ApiPage<any>>({
		url: `${PREFIX}/system/dict/query/list`,
		method: 'post',
		data,
	});
}
// 批量删除接口
export function deleteData(data: any = {}) {
	return http({
		url: `${PREFIX}/system/dict/deletes`,
		method: 'post',
		data,
	}).then((resData) => {
		console.log('resdata：', resData);
		return resData;
	});
}
/* 字典新增 */
export function dictCreate(data: {
	code: string; // 编码
	name: string; // 名称
	ordinal: number; // 排序
	status: number; // 1启用 0禁用
}) {
	return http({
		url: `${PREFIX}/system/dict/add`,
		method: 'post',
		data,
	});
}
/* 字典修改 */
export function dictUpdate(data: {
	id: string; // 字典id
	name: string; // 字典名称,
	code: string; // 编码
	ordinal: number; // 排序
	status: string; // 1启用 0禁用
}) {
	return http({
		url: `${PREFIX}/system/dict/update`,
		method: 'post',
		data,
	});
}
// 字典管理 end

/**
 * /system/dictData
 */
// 字典配置 start
export function dictData(data: any) {
	return http<ApiPage<any>>({
		url: `${PREFIX}/system/dictData/query/list`,
		method: 'post',
		data,
	});
}

// 字典值添加
export function dictDataAdd(data: any) {
	return http<ApiPage<any>>({
		url: `${PREFIX}/system/dictData/add`,
		method: 'post',
		data,
	});
}
// 字典值更新添加
export function dictDataUpdate(data: any) {
	return http<ApiPage<any>>({
		url: `${PREFIX}/system/dictData/update`,
		method: 'post',
		data,
	});
}
// 字典值批量删除
export function dictDataDeletes(data: any) {
	return http<ApiPage<any>>({
		url: `${PREFIX}/system/dictData/deletes`,
		method: 'post',
		data,
	});
}

// 服务端 redis 数据子弹刷新缓存
export function dictDataRefleshCache(data: any) {
	return http<ApiPage<any>>({
		url: `${PREFIX}/system/dict/refleshCache`,
		method: 'post',
		data,
	});
}

export function usersPasswordUpdate(parms: { id: string; password: string }) {
	throw new Error('Function not implemented.');
}
// 字典配置 end
