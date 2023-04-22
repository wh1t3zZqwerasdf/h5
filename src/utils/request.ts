/**
 * axios 封装
 */

import globalConfig from '@/config';
import type { ApiResponse } from '@/types';
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import router from '@/router';

/* 环境变量 */
const baseURL = import.meta.env.VITE_APP_PROXY_URL;
const adminService = import.meta.env.VITE_APP_ADMIN_SERVICE;
const uploadURL = import.meta.env.VITE_APP_UPLOAD_URL;

/* 服务分类 */
export const API_URL = {
  ADMIN: adminService, // 线上对内服务
  // ADMIN: '/omp-admin-dev', // 本地伟东环境
  // ADMIN: '/omp-admin-dev2', // 本地刘陈环境
  WEB: '/omp-guest', // 对外服务
  ACTIVITY: '/common-activiti', // 流程服务 common-activite ？
  UPLOAD: `/storage/object`, // 上传服务
  // UPLOAD: `${uploadURL}/storage/object` // 上传服务
  // OAUTH: '/omp-oauth2', // 认证服务 调整到admin
  UPM: '/omp-upm', // 角色服务 调整到admin
  OMPSL: '/omp-sl/sl'
};
/* ========== 业务服务 ========== */

const service = axios.create({
  // 基础路径，
  baseURL,
  // method: "post",
  timeout: globalConfig.API_TIMEOUT,
  headers: {},
  withCredentials: true
});

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // const authStore = useAuthStore();
    // authStore.addApi(config);
    // !!! 每次请求重新获取
    const token = localStorage.getItem('token') ?? '';
    if (!config.headers) config.headers = {};
    config.headers.Authorization = token;
    return config;
  },
  error => {
    // TODO：请求超时
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const { status } = error.response;
    if (status === 401) {
      console.log('🛠 -> status', status);
      localStorage.removeItem('token');
      // const router = useRouter();

      router.push({
        name: 'Login',
        query: {
          redirect: history.state.current.includes('login')
            ? '/'
            : history.state.current
        }
      });
    }

    return Promise.reject(error);
  }
);

export async function http<T = any, R = false>(
  config: AxiosRequestConfig
): Promise<R extends true ? T : ApiResponse<T>> {
  const response = await service.request<R extends true ? T : ApiResponse<T>>(
    config
  );
  const resData = response.data;
  // 基本类型 number boolean string 直接返回
  if (typeof resData !== 'object') return resData;

  if ((resData as ApiResponse<T>).code === 401) {
    console.log('🛠 -> http - 401 ');
    // token 过期
    router.push({
      name: 'Login',
      query: {
        redirect: history.state.current.includes('login')
          ? '/'
          : history.state.current
      }
    });
  }
  return resData;
}
