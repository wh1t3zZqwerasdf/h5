/**
 * 加解密
 */

import { JSEncrypt } from 'jsencrypt';
import { encode } from 'js-base64';

const pubKey = import.meta.env.VITE_APP_PUB_KEY;

export function encryptStr(str: string) {
  const instance = new JSEncrypt();
  instance.setPublicKey(pubKey); // 设置 加密公钥
  return instance.encrypt(str); // 进行加密
}

export function decryptStr(str: string) {
  const instance = new JSEncrypt();
  instance.setPrivateKey(pubKey); // 设置 解密私钥
  return instance.decrypt(str); // 进行解密
}

// 字符串转base64
export function stringToBase64(str: string) {
  return encodeURIComponent(encode(str));
}

// base64转字符串
export function base64ToString(base64String: string) {
  return decodeURIComponent(escape(window.atob(base64String)));
}
