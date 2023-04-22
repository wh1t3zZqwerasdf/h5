import { ITaskInfo } from '@/process/types';
export type hidQueryType = {
	discoverDate: string;
	hiddenTroubleType: number;
	hiddenTroubleLevel: number;
	deviceType: number;
	status: number;
	processNode: number;
	disposalMode: number;
	position: string;
	cityName: string;
	adminAddr: string;
	id: string;
	instanceId: string;
	taskInfo: ITaskInfo[];
};
