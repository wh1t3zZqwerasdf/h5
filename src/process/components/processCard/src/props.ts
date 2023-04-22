import { PropType } from 'vue';
import { ProcessCardTableProps } from './typing';

export const processCardListProps = {
	dataSource: {
		type: Array as PropType<any[]>,
		required: true,
	},
	tableProps: {
		type: Array as PropType<ProcessCardTableProps[]>,
		required: true,
	},
	loading: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
} as const;

export const processCardProps = {
	dataSource: {
		type: Object as PropType<any>,
		required: true,
	},
	tableProps: {
		type: Array as PropType<ProcessCardTableProps[]>,
		required: true,
	},
} as const;
