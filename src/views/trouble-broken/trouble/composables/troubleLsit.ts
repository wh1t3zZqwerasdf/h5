import type { FormPropGroupType, FormPropType, TablePropType } from '@/types';
import { useSystemStore, useAuthStore } from '@/store';

export function troubleLsit() {
	const tableProps = reactive<TablePropType[]>([
		{
			name: 'submitOrg',
			label: '提报单位',
		},
		{
			name: 'name',
			label: '线路名称',
		},
		{
			name: 'hiddenTroubleTypeName',
			label: '隐患类型',
		},
		{
			name: 'discoverDate',
			label: '发现时间',
		},
	]);
	return {
		tableProps,
	};
}
