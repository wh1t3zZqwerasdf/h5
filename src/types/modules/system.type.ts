/* 登录返回 */
export type LoginResType = {
  token: string;
  user: AuthUserType;
};

export type AuthUserType = {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  email: string;
  phone: string;
};

export type ImageType = {
  name: string;
  title: string;
  url: string;
};

export type TabType = {
  name: string;
  path: string;
  title: string;
  query?: { [key: string]: any };
};

// export type OrgTreeType = {
//   orgId: string;
//   orgName: string;
//   children?: OrgTreeType[];
// };
export type OrgType = any;
// {
//   orgId: string;
//   orgName: string;
//   parentId: string;
//   parentName: string;
//   staffCount: number;
//   sort: number;
//   remark: string;
//   createTime: string;
//   updateTime: string;
//   shortName: string;
//   createUserId: string;
//   createUserName: string;
// };

export type TroubleType = {
  id: number;
  name: string;
  applyOrg: string;
  applyPerson: string;
  discoveryTime: string;
  createTime: string;
  updateTime: string;
  voltage: string;
  troubleType: string;
  troubleLevel: string;
  troublePosition: string;
  source: string;
  state: string;
  dealWay: string;
  dealResult: string;
};

export type DictType = {
  value: string;
  label: string;
  text?: string;
  title?: string;
  // [key: string]: {
  // }[];
};

// 字典管理
export type dictionaryType = {
  id: string; // 字典id
  name: string; // 字典名称,
  code: string; // 编码
  ordinal: number; // 排序
  description: string;
  status: string; // 1启用 0禁用
};

// 日志管理
export type logManageType = {
  id: any;
  title: string; // 系统模块
  operation_type: string; // 操作类型,
  account: string; // 请求账号
  method: string; // 请求方式
  username: number; // 用户名称
  ip_addr: string; // IP地址
  location: string; // 操作地点
  browser: string; // 浏览器
  os: string; // 操作系统
  time_taken: number; // 处理时间
  status: string; // 操作状态
  create_time: string; // 请求时间
  url: string; // 操作系统
  operation_meth: number; // 操作方法
  result: string; // 返回结果
};
