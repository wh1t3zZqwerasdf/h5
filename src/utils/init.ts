import PlatFormEnv from "../utils/PlatFormEnv";

const userAgent = window.navigator.userAgent;

const mobileEnv = ["Android", "iPhone", "iPad", "IPod"]; // 手机环境

const getPlatForm: any = (() => {
  // console.log("userAgent = " + userAgent);
  if (!userAgent) {
    return PlatFormEnv.PC;
  }
  let isMobiel = false;
  mobileEnv.forEach((mobileEnvStr: string) => {
    if (userAgent.indexOf(mobileEnvStr) !== -1) isMobiel = true;
  });
  if (isMobiel) {
    // 是否微信环境
    if (/Micromessenger/i.test(userAgent)) {
      // 是否小程序环境
      if (/miniprogram/i.test(userAgent)) {
        return PlatFormEnv.MINI_PROGRAMER;
      }
      // 返回微信浏览器环境
      return PlatFormEnv.WEICHAT;
    } else {
      // 是否App环境
      // if (/isapp/i.test(userAgent)) {
        
      // }
      for (let i = 0; i < mobileEnv.length; i++) {
        if (userAgent.indexOf(mobileEnv[i]) !== -1) {
          // 返回安卓app环境
          if (i === 0) {
            return PlatFormEnv.ANDROID;
          }
          // 返回ios的app环境
          else return PlatFormEnv.IOS;
        }
      }
    }
    // 返回移动端H5环境
    return PlatFormEnv.WEB;
  }
  // 返回PC环境
  return PlatFormEnv.PC;
})();

export default getPlatForm;
