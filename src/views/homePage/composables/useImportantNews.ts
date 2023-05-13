import api from '@/api';
import { ImportantNewsItem, PageParams_hj } from '@/types';
import { dateFormat } from '@/utils';
import { NewInfoItem } from '@/components/web/types/NewsInfoItem.type';
import { useAuthStore, useTabsStore, useWorkbenchStore } from '@/store';
const pageParams = {
  page: 1,
  size: 10
};
const total = ref(0);
export function useImportantNews() {
  let orgCode = useAuthStore().userOrg?.id;

  const loadData = async (
    params: ImportantNewsItem & PageParams_hj,
    showShortName: boolean = false
  ) => {
    const { success, data } = await api.news.importantNewsList(params);
    if (!success) {
      return [];
    }
    total.value = data.total;
    return data.rows.map(
      ({ title, publishTime, id, hotPic, cityName, hisTopFlag, content, status, status_, openFlag, openFlag_, lawNewsFlag, lawNewsFlag_, headFlag, headFlag_, topFlag, topFlag_,submitOrgName }) => ({
        title: showShortName ? `[${cityName}]: ${title}` : title,
        date: publishTime ? dateFormat(publishTime, 'YYYY-MM-DD') : '',
        id,
        hotPic,
        hisTopFlag,
        content,
        status,
        status_,
        openFlag,
        openFlag_
        , lawNewsFlag, lawNewsFlag_, headFlag, headFlag_, topFlag, topFlag_,submitOrgName
      })
    ) as NewInfoItem[];
  };
  const loadData_sup = async (
    params: ImportantNewsItem & PageParams_hj,
    showShortName: boolean = false
  ) => {
    const { success, data } = await api.news.importantNewsList(params);
    if (!success) {
      return [];
    }
    total.value = data.total;
    return data.rows.map(
      ({
        title,
        publishTime,
        id,
        hotPic,
        cityName,
        hisTopFlag,
        externalInfoType, content, status, status_, openFlag, openFlag_, lawNewsFlag, lawNewsFlag_, headFlag, headFlag_, topFlag, topFlag_,submitOrgName
      }) => ({
        title:
          externalInfoType == 1
            ? `[政府]: ${title}`
            : externalInfoType == 2
              ? `[企业]: ${title}`
              : `[其他]: ${title}`,
        date: publishTime ? dateFormat(publishTime, 'YYYY-MM-DD') : '',
        id,
        hotPic,
        hisTopFlag, content, status, status_, openFlag, openFlag_, lawNewsFlag, lawNewsFlag_, headFlag, headFlag_, topFlag, topFlag_,submitOrgName
      })
    ) as NewInfoItem[];
  };

  // 省办id
  const provinceOrgCode = '241457306124951552';
  // 福州Id
  const specialCityId = '720001';
  // 平潭Id 特殊情况当选择福州，区县要闻需要排除平潭的要闻
  const excludeCityId = '72752863343812608';
  // 新闻接口条件map
  const importantNewsParamsMap = {
    // 轮播图
    banner: {
      queryType: 'city',
      cityId: orgCode,
      hotFlag: 1
    },
    // 首页外部信息
    externalX: {
      cityId: orgCode,
      queryType: 'fatherNodes',
      includeCityIds: orgCode,
      newsType: 2
    },
    external: {
      queryType: 'city',
      cityId: orgCode,
      newsType: 2
    },
    // 指定id
    org: {
      queryType: 'city',
      cityId: orgCode,
      newsType: 1
    },
    // 固定省办
    province: {
      queryType: 'city',
      cityId: provinceOrgCode,
      newsType: 1
    },
    // 指定id的下级所有子办
    city: {
      queryType: 'childrenNodes',
      cityId: orgCode,
      newsType: 1
    },
    // 省市办要闻 看上级市和省
    provinceAndCity: {
      queryType: 'fatherNodes',
      cityId: orgCode,
      newsType: 1
    }
  };

  // 外部信息
  const loadExternalData = async (data: any) => {
    const params = {
      ...pageParams,
      ...importantNewsParamsMap['external'],
      ...data
    };
    return await loadData_sup(params);
  };

  // 本办要闻(获取指定id的本办信息)
  const loadOrgData = async (data: any) => {
    const params = {
      ...pageParams,
      ...importantNewsParamsMap['org'],
      ...data
    };
    return await loadData(params);
  };

  // 省办要闻(市和特殊市获取固定省办的信息)
  const loadProvinceData = async (data: any) => {
    const params = {
      ...pageParams,
      ...importantNewsParamsMap['province'],
      ...data
    };
    return await loadData(params);
  };

  //  查看下级所有信息（省级的市县要闻、市级的区县要闻）
  const loadCityChildrenData = async (data: any) => {
    const params = {
      ...pageParams,
      ...importantNewsParamsMap['city'],
      ...data
    };
    let s = await loadData(params, true);
    return s;
  };

  // 获取指定id的上属父办的指定信息
  const loadProvinceAndCityData = async (data: any) => {
    const params = {
      ...pageParams,
      ...importantNewsParamsMap['provinceAndCity'],
      ...data
    };
    return await loadData(params, true);
  };

  // 获取指定id的上属父办的指定信息
  const loadProvinceAndCityDataX = async (data: any) => {
    const params = {
      ...pageParams,
      ...importantNewsParamsMap['externalX'],
      ...data
    };
    return await loadData_sup(params, true);
  };

  // 获取指定id的所有下属办(包括自身)的指定信息
  const loadCityAndCountyData = async (data: any) => {
    const params = {
      ...pageParams,
      ...importantNewsParamsMap['city'],
      ...data,
      includeCityIds: data.cityId
    };
    return await loadData(params, true);
  };

  // 获取指定id的所有下属办(不包括自身)的指定信息
  const loadCountyData = async (data: any) => {
    const params = {
      ...pageParams,
      ...importantNewsParamsMap['city'],
      ...data
    };
    //市级全部按钮重置为当前id
    params.cityId = orgCode;
    return await loadData(params, true);
  };

  // 轮播图
  const loadBannerData = async () => {
    const params = {
      ...pageParams,
      pageSize: 5,
      ...importantNewsParamsMap['banner']
    };
    const loadDataBanner = async (
      params: ImportantNewsItem & PageParams_hj,
      showShortName: boolean = false
    ) => {
      const { success, data } = await api.news.importantNewsList(params);
      if (!success) {
        return [];
      }
      total.value = data.total;
      return data.rows.map(
        ({ title, publishTime, id, hotPic, cityName, contentFirstPic }) => ({
          title: showShortName ? `[${cityName}]: ${title}` : title,
          date: publishTime ? dateFormat(publishTime, 'YYYY-MM-DD') : '',
          id,
          hotPic: contentFirstPic ? contentFirstPic : hotPic
        })
      ) as NewInfoItem[];
    };
    return await loadDataBanner(params);
  };

  // 转译
  const importantNewsKeyMap = {
    外部信息: 'external',
    本办要闻: 'org',
    省办要闻: 'province',
    市县要闻: 'city',
    区县要闻: 'county',
    省市办要闻: 'provinceAndCity'
  };

  // 3级页面城市筛选指定函数
  const importantNewsApiMap = {
    org: loadOrgData,
    province: loadProvinceData,
    external: loadExternalData,
    provinceAndCity: loadProvinceAndCityData,
    CityAndCounty: loadCityAndCountyData,
    County: loadCountyData
  };

  // 其他新闻页数据源获取
  const getImportantNewsData = async (levelType: string) => {
    const levelNewTabOptionMap = {
      // 省
      province: [loadOrgData, loadCityChildrenData, loadProvinceAndCityDataX],
      // 市
      city: [
        loadOrgData,
        loadProvinceData,
        loadCityChildrenData,
        loadProvinceAndCityDataX
      ],
      // 特殊市厦门、莆田、平潭
      specialCity: [loadOrgData, loadProvinceData, loadProvinceAndCityDataX],
      // 区县
      county: [loadOrgData, loadProvinceAndCityData, loadProvinceAndCityDataX]
    };
    let tabNews = [];
    const currentOptions = levelNewTabOptionMap[levelType];
    for (const optionItem of currentOptions) {
      tabNews.push(await optionItem());
    }
    return tabNews;
  };

  // 首页新闻数据源获取
  const getHomeImportantNewsData = async (levelType: string) => {
    const levelNewTabOptionMap = {
      // 省
      province: [loadProvinceAndCityDataX, loadOrgData, loadCityChildrenData],
      // 市
      city: [
        loadProvinceAndCityDataX,
        loadProvinceData,
        loadOrgData,
        loadCityChildrenData
      ],
      // 特殊市厦门、莆田、平潭
      specialCity: [loadProvinceAndCityDataX, loadProvinceData, loadOrgData],
      // 区县
      county: [loadProvinceAndCityDataX, loadProvinceAndCityData, loadOrgData]
    };
    let tabNews = [];
    const currentOptions = levelNewTabOptionMap[levelType];
    for (const optionItem of currentOptions) {
      tabNews.push(await optionItem());
    }
    return tabNews;
  };

  return {
    importantNewsParamsMap,
    importantNewsKeyMap,
    loadBannerData,
    getImportantNewsData,
    getHomeImportantNewsData,
    importantNewsApiMap,
    dataTotal: total
  };
}
