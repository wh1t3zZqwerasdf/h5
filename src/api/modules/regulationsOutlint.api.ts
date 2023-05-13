
import { http, API_URL } from '@/utils/request';

 type SuperviseOutlineItemType = {
    id: string;
    name: string;
    edition: string;
    level?: number;
    ordinal: number;
    parentId?: string;
    description?: string;
    basis?: string;
    children: SuperviseOutlineItemType[];
  };
  

const PREFIX = `${API_URL.ADMIN}/base/regulations`;

// 获取全部树形数据
export function queryAllData(data: { type: number }) {
    return http<SuperviseOutlineItemType[]>({
      url: `${PREFIX}/query/all/regulations`,
      method: 'post',
      data
    });
  }