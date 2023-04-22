import UserManager from '../utils/UserManager';
import {UserType} from '../types/UserType';

const windowObj = window as any;
let isReady = false;
window.addEventListener('flutterInAppWebViewPlatformReady', function (event) {
    isReady = true;
});

async function getUserInfo() {
    if (isReady) {
        windowObj.flutter_inappwebview
            .callHandler('getUserInfo')
            .then(function (result: UserType) {
                UserManager.saveUserInfo(result);
            });
    } else {
        window.addEventListener(
            'flutterInAppWebViewPlatformReady',
            function (event) {
                isReady = true;
                UserManager.getUserInfo();
            }
        );
    }
}

/**
 * scan 测试
 */
async function scan(fn: Function) {
    if (isReady) {
        windowObj.flutter_inappwebview
            .callHandler('scan')
            .then(function (result: string) {
                fn(result);
            });
    } else {
        window.addEventListener(
            'flutterInAppwebviewPlatformReady',
            function (event) {
                isReady = true;
                scan(fn);
            }
        );
    }
}

/**
 * 退出登录
 */
async function logout(fn: Function) {
    if (isReady) {
        windowObj.flutter_inappwebview
            .callHandler('logout')
            .then(function (result: string) {
                fn(result);
            });
    } else {
        window.addEventListener(
            'flutterInAppwebviewPlatformReady',
            function (event) {
                isReady = true;
                logout(fn);
            }
        );
    }
}

// const getUserInfoJS = () => {
//   try {
//     const type = targetPlatFormEnv;
//     console.log("运行环境：" + type);
//     if (type == PlatFormEnv.ANDROID) {
//       (window as any).android.postMessage(
//         JSON.stringify({ method: "getUserInfo", msg: "获取用户信息" })
//       );
//     }
//   } catch (e) {
//     Toast(e + "");
//   }
// };

function closeJS() {
    // try {
    //   const type = targetPlatFormEnv;
    //   console.log("运行环境：" + type);
    //   if (type == PlatFormEnv.ANDROID) {
    //     (window as any).android.postMessage(
    //       JSON.stringify({ method: "close", msg: "关闭" })
    //     );
    //   }
    // } catch (e) {
    //   Toast(e + "");
    // }
    console.log('关闭JS1');
    windowObj.flutter_inappwebview
        .callHandler('close')
        .then(function (result: string) {
            console.log('关闭JS2:' + result);
        });

    // window.addEventListener("flutterInAppWebViewPlatformReady", function (event) {
    //   console.log("关闭JS2");
    //   windowObj.flutter_inappwebview
    //     .callHandler("close")
    //     .then(function (result: string) {
    //       console.log("关闭JS3:" + result);
    //     });
    // });
}

export default {getUserInfo, closeJS, scan, logout};
