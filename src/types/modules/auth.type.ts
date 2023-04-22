// export type OAuthReqType = {
//   grant_type: 'password' | 'refresh_token'; // 认证类型
//   client_id: string; // 客户端ID
//   client_secret: string; // 客户端密钥
//   username?: string; // grant_type = password 必填
//   password?: string; // grant_type = password 必填
//   refresh_token?: string; // grant_type = refresh_token 必填
// };

export type OAuthType = {
  userInfo: LoginUserType;
  orgInfo: LoginUserOrgType;
  token: string;
};

export type LoginUserType = {
  id: string;
  create: boolean;
  version: number;
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
  name: string;
  loginUserId: string;
  birthDate: string;
  account: string;
  phone: string;
  organizationId: string;
  organizationPath: string;
  organizationPathName: string;
  education: number;
  political: number;
  gender: number;
  delFlag: number;
  status: number;
  character: number;
  role: string;
  roles: string[];
  new: boolean;
};

export type LoginUserOrgType = {
  id: string;
  name: string;
  address: string;
  shortName: string;
  ordinal: number;
  level: number;
  countyMark: number;
  status: number;
  delFlag: number;
  parentId: string;
  parentPath: string;
  parentPathName: string;
  mainUserCount: number;
  outUserCount: number;
  pathName: string;
  orginal: number;
  path: string;
  type: number;
  administrationLocation: string;
};
