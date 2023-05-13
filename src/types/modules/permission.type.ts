export type PermissionType = {
  checkedCodes: string[];
  tree: PermissionItemType[];
};

export type PermissionInfoType = {
  checkedIds: string[];
  tree: PermissionItemType[];
};

export type PermissionDetailsType = {
  checkedIds: string[];
  tree: PermissionItemType[];
};

export type PermissionItemType = {
  code: string;
  hidden: number;
  id: string;
  leaf: boolean;
  name: string;
  order: number;
  parentId: string;
  path: string;
  type: number;
  children?: PermissionItemType[];
};
