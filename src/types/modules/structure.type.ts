import { PropType } from '@/types';

export type StructureClassTree = {
  id: string;
  parentId: string;
  name: string;
  label?: string;
  value?: string;
  type: number;
  level: number; // 1;
  formType?: PropType;
  required?: number;
  accept?: string;
  tipText?: string;
  dictCode?: string;
  limit?: number;
  childList?: StructureClassTree[];
  children: StructureClassTree[];
};

export type StructureBusinessType = 'exter' | 'hid';

export type StructureClassInfo = {
  name: string;
  systemStructureClassDisposeViews: StructureClassTree[];
  systemStructureClassTypes: StructureClassTree[];
};