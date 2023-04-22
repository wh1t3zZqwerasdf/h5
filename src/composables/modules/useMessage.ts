import { Toast } from '@vant/compat';
import { Dialog } from '@vant/compat';
import { ApiResponse, CODE_STATUS } from '@/types';

export function useMessage() {
	/* 处理返回 */
	function handleResponse(res: Partial<ApiResponse>, cbFn?: () => void) {
		if (res.code !== CODE_STATUS.SUCCESS) {
			if (res.code === 500) {
				// handleError(`请求错误[${res.code}]: ${res.message}`);
				handleError(`${res.message}`);
				return false;
			}

			// 与登录相关出错 401
			console.log('res:', res);
			if (res.code === 401) {
				// handleError(`请求错误[${res.code}]: ${res.message}`);
				let msg = res['msg'];
				if (msg && msg.length > 0) {
					handleError(`${res['msg']}`);
				}
				return false;
			}

			const msg = res?.message ?? '';
			if (msg.length > 0) {
				handleError(res?.message ?? '');
			}

			// handleError(res?.message ?? '返回 message 为空所以请求错误！');
			// handleError(res?.message ?? '请求错误');
			return false;
		}
		// 存在 data, 且 data 为 null
		if (res.data !== undefined && res.data === null) {
			handleWarning(res?.message ?? '数据为空');
			return false;
		}
		if (cbFn) handleSuccess(res?.message ?? '操作成功', cbFn);
		return true;
	}

	/* 警告 */
	function handleWarning(message: string, cbFn?: () => void) {
		Toast({
			closeOnClick: true,
			type: 'html',
			icon: 'warn-o',
			message,
			onClose: cbFn,
		});
	}

	/* 失败 */
	function handleError(message: string, cbFn?: () => void) {
		Toast({
			closeOnClick: true,
			type: 'html',
			icon: 'warning-o',
			// dangerouslyUseHTMLString: true,
			message,
			onClose: cbFn,
		});
	}

	/* 成功 */
	function handleSuccess(message: string, cbFn?: () => void) {
		Toast({
			type: 'success',
			// grouping: true,
			message,
			duration: 2000,
			onClose: cbFn,
		});
	}

	/* 删除二次确认 */
	function handleDeleteConfirm(message = '确认是否删除', cbFn?: () => void) {
		return Dialog.config({
			title: '提示',
			message,
			confirmButtonText: '确定',
			confirmButtonColor: '#00C853',
			cancelButtonText: '取消',
			cancelButtonColor: '#FF5252',
			// showCancelButton: true,
		})
			.then(() => {
				return true;
				// if (cbFn === undefined)
				// return cbFn();
			})
			.catch((error) => {
				return false;
			});
	}

	/* 二次确认 */
	function commHandleConfirm(message = '', cbFn?: () => void) {
		return Dialog.config({
			title: '提示',
			message,
			confirmButtonText: '确定',
			confirmButtonColor: '#00C853',
			cancelButtonText: '取消',
			cancelButtonColor: '#FF5252',
		})
			.then(() => {
				return true;
				// if (cbFn === undefined)
				// return cbFn();
			})
			.catch((error) => {
				return false;
			});
	}

	function handleTodo() {
		handleWarning('该功能暂未开放，敬请期待！');
	}

	/* 咨询确认 */
	function handleConsulting(message = '确定？') {
		// return Toast.confirm(message, '提示', {
		//     type: 'warning'
		// })
		//     .then(() => {
		//         return true;
		//     })
		//     .catch(error => {
		//         return false;
		//     });
	}

	return {
		handleResponse,
		handleWarning,
		handleError,
		handleSuccess,
		commHandleConfirm,
		handleDeleteConfirm,
		handleConfirm: handleDeleteConfirm,
		handleTodo,
		handleConsulting,
	};
}
