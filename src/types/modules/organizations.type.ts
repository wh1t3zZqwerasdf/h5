export type OrgInfoType = {
  id: string;
  name: string;
  shortName: string;
  ordinal: number;
  level: number;
  status: number;
  delFlag: boolean;
  parentId: string;
  parentPath: string;
  parentPathName: string;
  mainUserCount: number;
  outUserCount: number;
  pathName: string;
  path: string;
};

export type OrgTreeType = {
  isChild: boolean;
  id: string;
  isLeaf: boolean;
  name: string;
  shortName: string;
  ordinal: number;
  parentId: string;
  path: string;
  pathName: string;
  level: number;
  label?: string;
  value?: string | number;
};

export type OrgSelectOptionType = {
  value: string | number;
  lable: string;
  children: OrgSelectOptionType[];
};
