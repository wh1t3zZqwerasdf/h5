/**
 * 判断字符串是否为空或undefined,不判断为0,不判断为false
 * @param str
 * @returns {boolean}
 */
function isEmpty(str: any): boolean {
  if (str === null || str === "" || str === undefined) {
    return true;
  } else {
    return false;
  }
}

function isNotEmpty(str: any): boolean {
  if (str === null || str === "" || str === undefined) {
    return false;
  } else {
    return true;
  }
}

export default { isEmpty, isNotEmpty };
