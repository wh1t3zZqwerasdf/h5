import type { FormPropGroupType, FormPropType, TablePropType } from '@/types';
import { useSystemStore, useAuthStore } from '@/store';

export function troubleList() {
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

  const formPropsGroup = reactive<FormPropGroupType[]>([
    {
      name:'edit',
      title: '',
      group:[{
        name:'lineName',
        label:"线路名称",
        type:"text",
        required:true,
      }]
    }
  ])


	return {
		tableProps,
    formPropsGroup
	};
}
