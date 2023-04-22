/**
 * 生成基础axios对象，并对请求和响应做处理
 * 前后端约定接口返回解构规范
 * {
 *    code:0,
 *    data:"成功",
 *    message:""
 * }
 */
import axios, { AxiosRequestConfig } from 'axios';
import UserManager from '../utils/UserManager';
const baseURL = import.meta.env.VITE_APP_API_BASE;

// 创建一个独立的axios实例
const service = axios.create({
	// 设置baseUr地址,如果通过proxy跨域可直接填写base地址
	baseURL,
	// 定义统一的请求头部
	headers: {
		'Access-Control-Allow-Credentials': 'true',
		'Access-Control-Allow-Headers': '*',
		'Access-Control-Allow-Methods': '*',
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	},
	// 配置请求超时时间
	timeout: 15000,
	// 如果用的JSONP，可以配置此参数带上cookie凭证，如果是代理和CORS不用设置
	withCredentials: true,
});
// 请求拦截
service.interceptors.request.use((config) => {
	// 自定义header，可添加项目token
	if (config && config.headers) {
		const userEntity = UserManager.getUserInfo();
		if (userEntity) {
			let token = userEntity.token;
			if (token) {
				config.headers['Authorization'] = token;
			}
		}
	}
	return config;
});
// 返回拦截
service.interceptors.response.use(
	(response) => {
		return response;
	},
	() => {
		// Toast({ value: "网络请求异常，请稍后重试!" });
	}
);

interface ApiResponse<T> {
	code: number;
	message: string;
	success: boolean;
	data: T;
}

const http2 = async <T>(config: AxiosRequestConfig): Promise<T> => {
	const response = await service.request<T>(config);
	return response.data;
};
export default http2;
