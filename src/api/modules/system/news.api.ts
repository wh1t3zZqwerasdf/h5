import { ApiPage, DictType } from '@/types';
import { API_URL, http } from '@/utils/request';
const PREFIX = API_URL.ADMIN;

/**
 * 获取新闻列表
 */
export function getNewsList(params: any) {
	return http<ApiPage<any>>({
		method: 'post',
		url: `${PREFIX}/news/query/list`,
		data: { ...params },
	});
}
