import { List } from 'vant';
import http, { ApiResponse } from './request';

interface News {
	title: string;
	content: string;
	newsType: number;
	externalInfoType?: number;
	externalInfoRefUrl?: string;
	attachmentList?: string[];
	openFlag: number;
	lawNewsFlag?: number | string;
	topFlag?: number | string;
	headFlag?: number | string;
	recommendHeadFlag?: number | string;
}

interface AddNewsResponse {
	id: string;
}

// uploadFile
async function uploadFile(url: any) {
	return await http<ApiResponse<string>>({
		method: 'post',
		url: 'device/info/query/power',
		data: { url },
	});
}

/**
 * 获取新闻列表
 */
async function getNewsList(params: any, queryType = 'LIST') {
	return await http<ApiResponse<string>>({
		method: 'post',
		url: 'news/query/list',
		data: { ...params },
	});
}

/**
 * 获取编辑新闻列表
 */
async function getNewsDrafts(params: any, queryType = 'ALTERLIST') {
	return await http<ApiResponse<string>>({
		method: 'post',
		url: 'news/query/list',
		data: { ...params, queryType },
	});
}

/**
 * 获取下级新闻列表
 */
async function getSubordinate(params: any, queryType = 'COLLECTLIST') {
	return await http<ApiResponse<string>>({
		method: 'post',
		url: 'news/query/list',
		data: {
			...params,
			queryType,
		},
	});
}

/**
 * 新闻查看详情
 * post  news/query/info
 */
async function queryNewsList(id: any) {
	return await http<ApiResponse<string>>({
		method: 'post',
		url: 'news/query/info',
		params: { id },
	});
}

/**
 * 新增新闻 - 内部新闻 newsType = 1
 * @param data 新闻数据
 * @param type type：1 - 存草稿箱；type 2 - 新增并提交审核
 * @returns 新闻 ID
 */
async function addNews(data: any, type = 2): Promise<any> {
	data.newsType = 1;
	// 发送 POST 请求，获取响应结果
	const response = await http<ApiResponse<{ id: any }>>({
		method: 'post',
		url: `news/add/${type}`,
		data,
	});

	// 处理响应结果，提取出新闻 ID
	if (response.code === 200) {
		return response.data;
	} else {
		throw new Error('Failed to add news');
	}
}

async function addNewsDrafts(data: any, type = 1): Promise<any> {
	data.newsType = 1;
	const response = await http<ApiResponse<{ id: any }>>({
		method: 'post',
		url: `news/add/${type}`,
		data,
	});

	// 处理响应结果，提取出新闻 ID
	if (response.code === 200) {
		return response.data;
	} else {
		throw new Error('Failed to add news');
	}
}

/**
 * 新闻新增 - 外部新闻  newsType = 2
 * @returns  type：1 - 存草稿箱；type 2 - 新增并提交审核
 */
async function addExternalNews(data: any, type = 2): Promise<any> {
	data.newsType = 2;
	const response = await http<ApiResponse<{ id: any }>>({
		method: 'post',
		url: `news/add/${type}`,
		data,
	});
	// 处理响应结果，提取出新闻 ID
	if (response.code === 200) {
		return response.data;
	} else {
		throw new Error('Failed to add news');
	}
}

async function addExternalDrafts(data: any, type = 1): Promise<any> {
	data.newsType = 2;
	const response = await http<ApiResponse<{ id: any }>>({
		method: 'post',
		url: `news/add/${type}`,
		data,
	});

	// 处理响应结果，提取出新闻 ID
	if (response.code === 200) {
		return response.data;
	} else {
		throw new Error('Failed to add news');
	}
}

async function organization() {
	return await http<ApiResponse<string>>({
		method: 'get',
		url: 'system/organization/getFatherNode',
	});
}

/**
 * 获取城市
 */
async function cityQueryList() {
	return http<ApiResponse<string>>({
		url: `system/organization/getAllCityList`,
		method: 'get',
	});
}

export default {
	uploadFile,
	queryNewsList,
	getNewsList,
	getSubordinate,
	addNews,
	addNewsDrafts,
	getNewsDrafts,
	organization,
	addExternalNews,
	addExternalDrafts,
	cityQueryList,
};
