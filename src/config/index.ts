import packageConfig from '../../package.json';
console.warn('VERSION', packageConfig.version);

export default {
  /* 版本号 */
  VERSION: packageConfig.version,
  /* mock 数据 */
  OPEN_MOCK: false,
  /* api 接口超时时间 */
  API_TIMEOUT: 10 * 1000,
  /* element 提示持续时间 毫秒 */
  EL_DURATION: 1200,
  /* 系统菜单位置 top/left */
  MENUS_POSITION: 'top'
};
