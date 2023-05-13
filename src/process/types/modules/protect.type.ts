export type FacilityInfoType = {
  childList?: any;
  id: string; //
  createBy: string;
  createTime: string;
  name: string;
  voltageLevel: number;
  deviceType: number;
  specialty: number;
  tower: number;
  region: number;
  status: number;
  create: boolean;
  new: boolean;
};

export type ProtectFacilityInfoType = {
  childList?: any;
  id: string; //
  status: string;
  name: string;
  voltageLevel: number;
  deviceType: string;
  specialty: string;
  adminRegion: string;
  propertyOrg: string;
  companyOperation: string;
  operationTime: string;
  region: boolean;
  companyType: string;
  new: boolean;
};

export interface IProtectCheckFormParams {
  id?: string;
  planStartTime: string;
  planEndTime: string;
  submitOrg?: string;
  submitName?: string;
  data: { id: string; facilityId: string; userId: string }[];
}
