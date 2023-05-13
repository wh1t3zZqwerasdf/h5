import { DictCityType } from '@/types';
import { API_URL, http } from '@/utils/request';
const PREFIX = API_URL.ADMIN;

export function cityQueryList() {
  return http<DictCityType[]>({
    url: `${PREFIX}/system/organization/getCityList`,
    method: 'get'
  });
}

export function cityAllQueryList() {
  return http({
    url: `${PREFIX}/system/organization/getAllCityList`,
    method: 'get'
  });
}
