export class SpotCheckAuditEntity {
  id?: string;
  create?: boolean;
  version?: number;
  createBy?: string;
  createTime?: string;
  updateBy?: null;
  updateTime?: string;
  checkNumber?: string;
  checkName?: null;
  planStartTime?: null;
  planEndTime?: null;
  realStartTime?: null;
  realEndTime?: null;
  status?: number;
  processStatus?: number;
  description?: null;
  formulate?: string;
  instanceId?: string;
  formulateName?: string;
  data?: Array<SpotCheckAuditItemEntity>;
  new?: boolean;
}

export class SpotCheckAuditItemEntity {
  id?: string;
  create?: boolean;
  version?: number;
  createBy?: string;
  createTime?: string;
  updateBy?: string;
  updateTime?: string;
  organizationId?: string;
  replyTime?: string;
  replyNum?: string;
  replyFile?: string;
  replyFileName?: string;
  publiclyTitle?: string;
  publiclyContent?: string;
  publiclyFile?: string;
  releaseTime?: string;
  noticeFile?: null;
  noticeMedia?: string;
  noticeTime?: string;
  rejectComment?: null;
  status?: number;
  description?: null;
  instanceId?: string;
  facilityId?: string;
  delFlag?: null;
  processStatus?: number;
  userId?: string;
  taskId?: string;
  username?: string;
  facilityName?: string;
  voltageLevel?: number;
  operationTime?: null;
  checkResult?: null;
  new?: boolean;
}

export class SpotCheckAuditDetailEntity {
  id?: string;
  create?: boolean;
  version?: number;
  createBy?: string;
  createTime?: string;
  updateBy?: string;
  updateTime?: string;
  checkId?: string;
  manageId?: string;
  description?: string;
  userId?: string;
  checkResult?: number;
  evidencePhoto?: string;
  checkTime?: string;
  reason?: string;
  rectifyTime?: string;
  rectifyPhoto?: string;
  rectifyExplain?: string;
  recheckTime?: string;
  recheckResult?: string;
  recheckUser?: string;
  recheckExplain?: string;
  instanceId?: string;
  status?: string;
  new?: boolean;
}
