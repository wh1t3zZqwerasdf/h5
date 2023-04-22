export interface ProcessCardTableProps {
	label: string;
	name: string;
	customLabelFn?: (data: any) => string;

	[key: string]: any;
}
