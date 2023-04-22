import {
	SpotCheckAuditDetailEntity,
	SpotCheckAuditItemEntity,
} from '../types/SpotCheckEntity';
import { FinishActivityList, ReportEntity } from '../types/ReportEntity';
import { Toast } from 'vant';
import http, {
	ApiResponse,
	operationTaskApi,
	upload,
	UploadResponse,
	http1,
} from './request';
import http2 from './request2';
import AppJs from '@/utils/AppJs';
import UserManager from '../utils/UserManager';
import { HidInfoEntity } from '../types/HidEntity';
import { TaskInfo, ActivityEntity } from '../types/ActivityEntity';
import { ExterInfoEntity } from '../types/ExterEntity';
import { SpotCheckAuditEntity } from '../types/SpotCheckEntity';

/**
 * 绑定获取id
 * http://192.168.1.28:17002/omp-admin-cq/device/info/check/bind
 */
async function getDeviceInfo(id: any) {
	return await http1<ApiResponse<string>>({
		method: 'get',
		url: 'device/info/check/bind?id=' + id,
	});
}
/**
 *
 * 设备绑定接口
 * http://192.168.1.28:17002/omp-admin-cq/device/info/bind
 */
async function bindDeviceInfo(data: any) {
	return await http1<ApiResponse<string>>({
		method: 'post',
		url: 'device/info/bind',
		data,
	});
}
/**
 * 设备拍照
 */
async function takePhoto() {
	return await http1<ApiResponse<string>>({
		method: 'get',
		url: 'device/info/capture',
	});
}

/**
 * 查询电量
 */
async function getBattery() {
	return await http<ApiResponse<string>>({
		method: 'get',
		url: 'device/info/query/power',
	});
}

/**
 * 开始录音
 */
async function startRecord() {
	const res = await http<ApiResponse<string>>({
		method: 'get',
		url: 'device/info/audio/record/start',
	});
	if (res.success) {
		Toast(res.message);
		return res.data;
	} else {
		Toast(res.message);
	}
}

/**
 * 停止录音
 */
async function stopRecord() {
	const res = await http<ApiResponse<string>>({
		method: 'get',
		url: 'device/info/audio/record/stop',
	});
	if (res.success) {
		Toast(res.message);
		return res.data;
	} else {
		Toast(res.message);
	}
}

/**
 * 开始录像
 */
async function startCamera() {
	const res = await http<ApiResponse<string>>({
		method: 'get',
		url: 'device/info/video/record/start',
	});
	if (res.success) {
		Toast(res.message);
		return res.data;
	} else {
		Toast(res.message);
	}
}

/**
 * 停止录像
 */
async function stopCamera() {
	const res = await http<ApiResponse<string>>({
		method: 'get',
		url: 'device/info/video/record/stop',
	});
	if (res.success) {
		Toast(res.message);
		return res.data;
	} else {
		Toast(res.message);
	}
}

/**
 * 调节音量 /device/info/adjust/volume/{size}
 */
async function adjustVolume(size: number) {
	const res = await http<ApiResponse<string>>({
		url: `device/info/adjust/volume/${size}`,
	});
	if (res.success) {
		Toast(res.message);
		return res.data;
	} else {
		Toast(res.message);
	}
}

/**
 * 提交举报
 * @param params
 * @returns
 */
async function submitReport(params: any) {
	const res = await http<string>({
		method: 'post',
		url: 'report/submit',
		data: params,
	});
	if (res.success) {
		Toast(res.message);
		return res.data;
		// setTimeout(() => {
		//   AppJs.closeJS();
		// }, 1000);
	} else {
		Toast(res.message);
	}
	console.log(res);
}

async function refuseReport(params: any) {
	const res = await http<''>({
		method: 'post',
		url: 'report/refuse',
		data: params,
	});
	if (res.success) {
		AppJs.closeJS();
	}
	console.log(res);
}

/**
 *
 * @param taskInfo
 * @param condition
 */
async function operationTask(taskInfo: TaskInfo, condition: any) {
	operationTaskCallback(
		taskInfo,
		condition,
		function (res: ApiResponse<string>) {
			if (res.success) {
				Toast(res);
				setTimeout(() => {
					AppJs.closeJS();
				}, 1000);
			}
		}
	);
}

async function operationTaskCallback(
	taskInfo: TaskInfo,
	condition: any,
	callback: Function
) {
	const userInfo = UserManager.getUserInfo();
	const res = await operationTaskApi<string>({
		method: 'post',
		url: 'common-activiti/activiti/task/operationTask',
		data: {
			userId: userInfo.userInfo.id,
			userName: userInfo.userInfo.name,
			// userId: "13",
			// userName: "执法办负责人",
			operation: '1',
			msg: '执行任务',
			taskIdList: [taskInfo.id],
			condition: condition,
			businessKeyList: [],
			candidateIdList: [],
			acceptorId: '',
			activityId: '',
		},
	});
	callback(res);
}

async function getFinishActivi(
	page: number
): Promise<ApiResponse<FinishActivityList>> {
	const res = await http<FinishActivityList>({
		method: 'post',
		url: 'report/query/list/activiti',
		data: {
			page: page,
			size: 15,
			type: 'HAVE_FINISHED',
		},
	});
	return res;
}

/**
 * 获取已完成的隐患列表
 */
async function getHidFinishActivi(
	page: number
): Promise<ApiResponse<FinishActivityList>> {
	const res = await http<FinishActivityList>({
		method: 'post',
		url: 'hid/query/list/activiti',
		data: {
			page: page,
			size: 15,
			type: 'HAVE_FINISHED',
		},
	});
	return res;
}

async function addHid(formValue: any) {
	const res = await http<any>({
		method: 'post',
		url: 'hid/add/2',
		data: formValue,
	});
	console.log(res);
	Toast(res.message);
	if (res.success) {
		setTimeout(() => {
			AppJs.closeJS();
		}, 1000);
	}
}

/**
 * 举报转隐患调用
 * @param formValue
 */
async function addHidActiviti(formValue: any, callback: Function) {
	const res = await http<any>({
		method: 'post',
		url: 'hid/add/activiti',
		data: formValue,
	});
	console.log(res);
	Toast(res.message);
	if (res.success) {
		callback(res);
		// setTimeout(() => {
		//   AppJs.closeJS();
		// }, 1000);
	}
}

/**
 * 举报转外破调用
 * @param formValue
 */
async function addExterActiviti(formValue: any, callback: Function) {
	const res = await http<any>({
		method: 'post',
		url: 'exter/add/activiti',
		data: formValue,
	});
	console.log(res);
	Toast(res.message);
	if (res.success) {
		callback(res);
		// setTimeout(() => {
		//   AppJs.closeJS();
		// }, 1000);
	}
}

/**
 * 添加外破
 * @param formValue
 */
async function addExter(formValue: any) {
	const res = await http<any>({
		method: 'post',
		url: 'exter/add/2',
		data: formValue,
	});
	console.log(res);
	Toast(res.message);
	if (res.success) {
		setTimeout(() => {
			AppJs.closeJS();
		}, 1000);
	}
}

async function updateReport(
	formValue: any,
	taskInfo: TaskInfo,
	condition: any
) {
	const res = await http<any>({
		method: 'post',
		url: 'report/update',
		data: formValue,
	});
	if (res.success) {
		operationTask(taskInfo, condition);
	}
}

/**
 * 更新外破
 * @param formValue
 * @param taskInfo
 * @param condition
 */
async function updateExter(formValue: any, taskInfo: TaskInfo, condition: any) {
	const res = await http<any>({
		method: 'post',
		url: 'exter/update/1',
		data: formValue,
	});
	console.log(res);
	Toast(res.message);
	if (res.success) {
		operationTask(taskInfo, condition);
	}
}

/**
 * 更新隐患
 * @param formValue
 * @param taskInfo
 * @param condition
 */
async function updateHid(formValue: any, taskInfo: TaskInfo, condition: any) {
	const res = await http<any>({
		method: 'post',
		url: 'hid/update/1',
		data: formValue,
	});
	console.log(res);
	Toast(res.message);
	if (res.success) {
		operationTask(taskInfo, condition);
	}
}

/**
 * 获取举报信息
 */
async function getReportInfo(id: string): Promise<ApiResponse<ReportEntity>> {
	const res = await http<any>({
		method: 'post',
		url: 'report/query/info?id=' + id,
		data: {},
	});
	return res;
}

//获取隐患信息
async function getHidInfo(id: string): Promise<ApiResponse<HidInfoEntity>> {
	const res = await http<any>({
		method: 'post',
		url: 'hid/query/info?id=' + id,
		data: {},
	});
	return res;
}

//获取外破信息
async function getExterInfo(id: string): Promise<ApiResponse<ExterInfoEntity>> {
	const res = await http<any>({
		method: 'post',
		url: 'exter/query/info?id=' + id,
		data: {},
	});
	return res;
}

/**
 * 获取流程详情
 * @param instanceId
 * @returns
 */
async function getActivity(
	instanceId: string
): Promise<ApiResponse<ActivityEntity>> {
	const res = await http<any>({
		method: 'get',
		url: 'support/activiti/query/info?instanceId=' + instanceId,
		data: {},
	});
	return res;
}

/**
 * 获取电站/线路列表
 * @param page
 * @param callback
 */
async function getFacilityList(page: number, name: string, callback: Function) {
	const res = await http<any>({
		method: 'post',
		url: 'protect/facility/query/list',
		data: { page: page, size: 15, name: name },
	});
	callback(res);
}

/**
 * 获取抽检审核列表
 * @param page
 * @param name
 * @param callback
 */
async function getProtectTaskQueryInfoActiviti(id: string, callback: Function) {
	const res = await http<SpotCheckAuditEntity>({
		method: 'post',
		url: 'protect/task/query/info/activiti?id=' + id,
		data: {},
	});
	callback(res);
}

/**
 * 获取抽检审核任务详细信息
 * @param id
 * @param callback
 */
async function getProtectTaskQueryInfo(id: string, callback: Function) {
	const res = await http<SpotCheckAuditDetailEntity>({
		method: 'post',
		url: 'protect/task/query/info?id=' + id,
		data: {},
	});
	callback(res);
}

//protect/task/audit
/**
 * 提交保护区抽检审核
 * @param spotCheckAuditItemEntity
 * @param callback
 */
async function protectTaskAudit(
	spotCheckAuditItemEntity: SpotCheckAuditItemEntity,
	callback: Function
) {
	const res = await http<SpotCheckAuditEntity>({
		method: 'post',
		url: 'protect/task/audit',
		data: spotCheckAuditItemEntity,
	});
	callback(res);
}

//protect/check/query/info
/**
 * 保护区任务抽检流程详情
 * @param id
 * @param callback
 */
async function protectCheckInfo(id: string, callback: Function) {
	const res = await http<SpotCheckAuditEntity>({
		method: 'post',
		url: 'protect/check/query/info?id=' + id,
		data: {},
	});
	callback(res);
}

//protect/check/audit
/**
 * 抽检流程更新抽检人员
 * @param spotCheckUsers
 * @param callback
 */
async function protectCheckAudit(
	id: string,
	spotCheckUsers: Array<{
		manageId: string;
		userId: String;
		id: String;
	}>,
	callback: Function
) {
	const res = await http<SpotCheckAuditEntity>({
		method: 'post',
		url: 'protect/check/audit',
		data: {
			id: id,
			data: spotCheckUsers,
		},
	});
	callback(res);
}

//system/users/get/this
/**
 * 获取用户列表
 * @param id
 * @param callback
 */
async function getSystemUsersGetThis(callback: Function) {
	const res = await http<SpotCheckAuditEntity>({
		method: 'get',
		url: 'system/users/get/this',
		data: {},
	});
	callback(res);
}

/**
 * 上传文件
 * @param file
 * @returns
 */
async function uploadImage(file: File): Promise<UploadResponse> {
	const res = await upload({
		method: 'post',
		url: 'storage/object/upload',
		data: {
			file: file,
		},
	});
	console.log('上传文件返回数据=====>', res);
	return res;
}

export default {
	updateReport,
	submitReport,
	refuse: refuseReport,
	getFinishActivi,
	addHid,
	updateHid,
	getActivity,
	getHidInfo,
	getHidFinishActivi,
	uploadImage,
	addExter,
	updateExter,
	getExterInfo,
	operationTask,
	operationTaskCallback,
	getReportInfo,
	addHidActiviti,
	addExterActiviti,
	getFacilityList,
	getProtectTaskQueryInfoActiviti,
	getProtectTaskQueryInfo,
	protectTaskAudit,
	protectCheckInfo,
	getSystemUsersGetThis,
	protectCheckAudit,
	getDeviceInfo,
	bindDeviceInfo,
	takePhoto,
	getBattery,
	startRecord,
	stopRecord,
	startCamera,
	stopCamera,
	adjustVolume,
};
