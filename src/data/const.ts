export type OrgData = {
  id: string;
  name: string;
  levelType: string;
};
export const defaultOrg: OrgData = {
  name: '福建省电力执法办',
  id: '7200',
  levelType: 'province'
};
const keyOrg: string =
  (sessionStorage.getItem('auth') as string) ||
  (localStorage.getItem('auth') as string);
export const orgCode = JSON.parse(keyOrg)?.userOrg?.id;
export const userOrg = JSON.parse(keyOrg)?.userOrg;

// 省市区县等级map
export const levelMap = {
  // 省
  1: 'province',
  // 市
  2: 'city',
  // 区县
  3: 'county',
  // 特殊市
  4: 'specialCity'
};

// 省市区县新闻tab map
export const homeLevelNewTabTitleMap = {
  // 省
  province: ['外部信息', '本办要闻', '市县要闻'],
  // 市
  city: ['外部信息', '省办要闻', '本办要闻', '区县要闻'],
  // 区县
  county: ['外部信息', '省市办要闻', '本办要闻'],
  // 特殊市
  specialCity: ['外部信息', '省办要闻', '本办要闻']
};

export const provinceMap = ['福建'];

export const cityMap = ['福州', '泉州', '漳州', '龙岩', '三明', '南平', '宁德'];

export const specialCityMap = ['厦门', '平潭', '莆田'];

export const orgLevelType = () => {
  if (provinceMap.includes(userOrg?.name.slice(0, 2))) return 'province';
  else if (cityMap.includes(userOrg?.name.slice(0, 2))) return 'city';
  else if (specialCityMap.includes(userOrg?.name.slice(0, 2)))
    return 'specialCity';
  else return 'county';
};
