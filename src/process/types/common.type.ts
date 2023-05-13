import { InjectionKey, Ref, ComputedRef } from "vue";
import { ITaskInfo } from "./modules/activiti";
export type ProcessSearchType = "BACKLOG" | "HAVE_FINISHED" | "ALL_APPLY";

export interface WorkbenchSearchParams {
  type?: ProcessSearchType;
  processStatus?: string;

  [key: string]: any;
}

export const InjectProcessSearchTypeKey: InjectionKey<Ref<ProcessSearchType>> =
  Symbol("processSearchType");

export const InjectProcessTaskInfoKey: InjectionKey<ComputedRef<ITaskInfo[]>> =
  Symbol("taskInfos");
