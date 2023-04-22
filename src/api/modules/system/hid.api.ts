import { ApiPage, hidQueryType } from '@/types';
import { API_URL, http } from '@/utils/request';
const PREFIX = API_URL.ADMIN;

export function queryList(data: {
	page: number;
	size: number;
	[key: string]: any;
}) {
	return http<ApiPage<hidQueryType>>({
		url: `${PREFIX}/hid/query/list`,
		method: 'post',
		data,
	});
}
