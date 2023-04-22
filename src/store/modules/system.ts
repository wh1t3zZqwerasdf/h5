import { defineStore } from 'pinia';
import api from '@/api';
import { DictType } from '@/types';
export const useSystemStore = defineStore('system', {
	state: () => ({
		dict: {} as { [key: string]: DictType[] }, // 字典首页加载后缓存
		dictApi: {} as { [key: string]: any[] }, // select-api组件加载后缓存
	}),
	getters: {},
	actions: {
		/* 获取数据字典 */
		async getDict() {
			const res = await api.system.dictQueryAll();
			this.dict = res.data ?? {};
		},
		saveDictApi(name: string, arr?: any) {
			if (arr === undefined) return;
			if (!this.dictApi[name] && arr.length > 0) this.dictApi[name] = arr;
		},
	},
	persist: true, // 数据持久化
});
