export type UserInfo = {
	id?: string;
	create?: boolean;
	version?: number;
	createBy?: string;
	createTime?: string;
	updateBy?: string;
	updateTime?: string;
	name?: string;
	organizationId?: string;
	account?: string;
	phone?: string;
	birthDate?: string;
	education?: number;
	gender?: number;
	political?: number;
	delFlag?: number;
	status?: number;
	character?: string;
	organizationPath?: string;
	organizationPathName?: string;
	role?: string;
	new?: boolean;
};

export type OrgInfo = {
	id?: string;
	name?: string;
	shortName?: string;
	ordinal?: number;
	level?: number;
	status?: number;
	delFlag?: number;
	parentId?: string;
	parentPath?: string;
	parentPathName?: string;
	mainUserCount?: number;
	outUserCount?: number;
	countyMark?: number;
	path?: string;
	pathName?: string;
};
export type UserType = {
	userInfo: UserInfo;
	orgInfo: OrgInfo;
	token: string;
};
