import api from '@/api';
import {LoginUserOrgType, LoginUserType, OAuthType} from '@/types';
import {defineStore} from 'pinia';

import {useMessage} from '@/composables';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        // apiQueue: [] as { u: string; q: AxiosRequestConfig }[],
        oauthInfo: null as OAuthType | null,
        userInfo: null as LoginUserType | null,
        userOrg: null as LoginUserOrgType | null,
        token: '',
        refreshToken: '',
    }),
    getters: {
        userId: (state) => state.userInfo?.id ?? '',
        isLogin: (state) => !!state.userInfo,
        userRoles: (state) => state.userInfo?.roles,
    },
    actions: {
        /* 登出 */
        logout() {
            // 清空 tabs
            // 清空用户信息
            this.oauthInfo = null;
            this.userOrg = null;
            this.userInfo = null;
            this.token = '';
            localStorage.removeItem('token');
            localStorage.removeItem('menusList');
            localStorage.removeItem('USER_PERMISSION');
            this.refreshToken = '';

            api.auth.logout();

            return true;
        },
        /* 刷新 */
        // async refresh() {
        //   localStorage.removeItem('token');

        //   const { data, ...res } = await api.auth.authRefresh({
        //     refreshToken: this.refreshToken
        //   });
        //   const { handleResponse } = useMessage();

        //   if (handleResponse(res)) return;

        //   this.setOAuth(data);

        //   // this.sendApi();

        //   return true;
        // },

        /* 登录 */
        async login(params: {
            username: string;
            password: string;
            captcha: string;
            checkKey: string;
        }) {
            localStorage.removeItem('token');

            const {handleResponse, handleError} = useMessage();

            // 密码加密
            // const password = (encryptStr(params.password) as string) || '';

            // 获取token
            const {data: res, ...authLoginRes} = await api.auth.login(params);
            if (!handleResponse(authLoginRes)) return;

            return await this.setOAuth(res);
            // return true;
        },
        async setOAuth(authLoginData: OAuthType) {
            this.oauthInfo = authLoginData;
            this.token = authLoginData.token;
            console.log(this.token);
            localStorage.setItem('token', this.token);
            localStorage.setItem(
                'orgInfo',
                JSON.stringify(authLoginData.orgInfo)
            );
            // this.refreshToken = authLoginData.refresh_token;
            const {handleResponse, handleError} = useMessage();

            /*  */
            // const allRes = await Promise.allSettled([
            //   // 通过用户id获取用户信息
            //   api.auth.loginInfoUser({
            //     id: authLoginData.userInfo.id
            //   }),
            //   // 通过用户id获取用户组织机构信息
            //   api.auth.loginInfoOrg({
            //     id: authLoginData.orgInfo.id
            //   })
            // ]);

            // const [userInfoRes, userOrgInfoRes] = allRes;

            // 判断请求（发送）是否成功
            // if (
            //   userInfoRes.status === 'rejected' ||
            //   userOrgInfoRes.status === 'rejected'
            // ) {
            //   handleError('登录失败');
            //   return false;
            // }

            // 判断请求（数据）是否成功
            // if (
            //   !handleResponse(userInfoRes.value)
            //   // !handleResponse(userOrgInfoRes.value)
            // )
            //   return false;

            // 赋值
            this.userInfo = authLoginData.userInfo;
            this.userOrg = authLoginData.orgInfo;
            return true;
        },
    },
    persist: true, // 数据持久化
});
