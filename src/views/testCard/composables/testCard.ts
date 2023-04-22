import { ProcessCardTableProps } from '@/process/components/processCard';

export function testCard() {
	const tableProps = reactive<ProcessCardTableProps[]>([
		{
			label: 'Name',
			name: 'title',
		},
		{
			label: '新闻内容',
			name: 'title',
		},
		{
			label: '发现时间',
			name: 'publishTime',
		},
		{
			label: '行政地理位置',
			name: 'submitOrgName',
		},
		{
			label: '提报时间',
			name: 'createTime',
		},
	]);

	return {
		tableProps,
	};
}
