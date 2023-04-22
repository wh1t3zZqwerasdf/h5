/**
 * 验证规则
 */

/* 正则表达式 */
export const REGEXP = {
  phoneAndlandline: /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/,
  phone: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
  cname: /^[\u4e00-\u9fa5]{2,16}$/,
  number: /^[0-9]*$/,
  IDCardNumber: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
};
export const REGEXP_RULES = {
  phoneAndlandline: {
    pattern: REGEXP.phoneAndlandline,
    message: '请输入正确手机或座机号码'
  },
  cname: { pattern: REGEXP.cname, message: '请输入正确的姓名' },
  phone: { pattern: REGEXP.phone, message: '请输入正确的手机号' },
  number: { pattern: REGEXP.number, message: '请输入数字' },
  IDCardNumber: {
    pattern: REGEXP.IDCardNumber,
    message: '请输入正确的身份证号'
  }
};

/* 保留数字 */
export function retainNumber(value: string) {
  return value.replace(/[^0-9]/g, '').trim();
}
