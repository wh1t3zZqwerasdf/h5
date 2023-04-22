/**
 * 接口返回数据结构 (自定义，与后端协定)
 * 明确定义返回的泛型的类型
 */
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  success: boolean;
  data: T;
  rows: any;
  total: any;
}

export interface ApiPage<T = any> {
  rows: T[];
  total: number;
}

export type PageParams = {
  page: number;
  pageSize: number;
};

export type PageParams_hj = {
  page: number;
  size: number;
};

export type TimeType = {
  createTime?: string;
  createBy?: string;
  updateTime?: string;
  updateBy?: string;
};

export interface MockRequest {
  url: string;
  type: string;
  body: string;
}
