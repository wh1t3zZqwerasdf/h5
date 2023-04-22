import { http, API_URL } from '@/utils/request';

import type { OAuthType } from '@/types';
import { encryptStr } from '@/utils/encrypt';

const PREFIX = API_URL.ADMIN;

/**
 * 获取验证码
 * @returns
 */
export function verificationCode(t: string) {
	return http<string>({
		url: `${PREFIX}/system/randomImage/${t}`,
		method: 'get',
	});
}

/* 登录 */
export function login(data: {
	username: string;
	password: string;
	captcha: string;
	checkKey: string;
}) {
	// 执行加密处理
	return http<OAuthType>({
		url: `${PREFIX}/system/login`,
		method: 'post',
		params: {
			aksParamsA: encryptStr(JSON.stringify(data)),
		},
	});
}

/* 登录 */
export function logout() {
	return http<OAuthType>({
		url: `${PREFIX}/system/logout`,
		method: 'get',
	});
}
