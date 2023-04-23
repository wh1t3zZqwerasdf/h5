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

/**
 * 获取电站/线路列表
 * @param page
 * @param callback
 */
export function protectFacilityQueryList(data: {
  page: number;
  size: number;
  [key: string]: any;
},
roles:"ROLE_ADMIN",
) {
  return http<ApiPage<any>>({
    url: `${PREFIX}/protect/facility/query/list`,
    method: 'post',
    data:{  roles }
  });
}

export function addData(data: any) {
  return http({
    url: `${PREFIX}/hid/submit`,
    method: 'post',
    data
  })
}