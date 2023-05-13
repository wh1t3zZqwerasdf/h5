import { ApiPage, DictType } from '@/types';
import { API_URL, http } from '@/utils/request';
import type { PageParams_hj } from '@/types';
const PREFIX = API_URL.ADMIN;

/**
 * 获取新闻列表
 */
export function getNewsList(params: any, queryType = 'LIST') {
	return http({
		method: 'post',
		url: `${PREFIX}/news/query/list`,
		data: { ...params },
	});
}

	/**
 * 获取编辑新闻列表
 */
export function getNewsDrafts(params: any, queryType = 'ALTERLIST') {
	return  http({
		method: 'post',
		url: `${PREFIX}news/query/list`,
		data: { ...params, queryType },
	});
}

	/**
 * 新闻查看详情
 * post  news/query/info
 */
export function queryNewsList(id: any) {
	return  http({
		method: 'post',
		url: `${PREFIX}/news/query/info`,
		params: { id },
	});
}


/**
 * 获取城市
 */
export function cityQueryList() {
	return http({
		url: `${PREFIX}system/organization/getAllCityList`,
		method: 'get',
	});
}

export function importantNewsList(data:any) {
  return http<ApiPage<any>>({
    url: PREFIX + '/news/query/listForHome',
    data,
    method: 'post'
  });
}