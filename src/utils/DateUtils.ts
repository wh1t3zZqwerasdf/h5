const getNowDate = () => {
  const date = getLocalTime(8);
  const year: number = date.getUTCFullYear();
  const month: string =
    date.getUTCMonth() + 1 < 10
      ? "0" + (date.getUTCMonth() + 1)
      : date.getUTCMonth() + 1 + "";
  const day: string =
    date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate() + "";

  const hours: string =
    date.getUTCHours() < 10
      ? "0" + date.getUTCHours()
      : date.getUTCHours() + "";

  const minutes: string =
    date.getUTCMinutes() < 10
      ? "0" + date.getUTCMinutes()
      : date.getUTCMinutes() + "";

  const seconds: string =
    date.getUTCSeconds() < 10
      ? "0" + date.getUTCSeconds()
      : date.getUTCSeconds() + "";

  const timeZone = "+08:00";

  return (
    year +
    "-" +
    month +
    "-" +
    day +
    "T" +
    hours +
    ":" +
    minutes +
    ":" +
    seconds +
    timeZone
  );
};

function getLocalTime(i: number): Date {
  //参数i为时区值数字，比如北京为东八区则输进8,西5输入-5
  const date = new Date();
  //得到1970年一月一日到现在的秒数
  const len = date.getTime();
  //本地时间与GMT时间的时间偏移差
  const offset = date.getTimezoneOffset() * 60000;
  //得到现在的格林尼治时间
  const utcTime = len + offset;
  return new Date(utcTime + 3600000 * i);
}

const formatter = (type: string, val: string) => {
  if (type === "year") {
    return val + "年";
  }
  if (type === "month") {
    return val + "月";
  }
  if (type === "day") {
    return val + "日";
  }
  return val;
};

const getDateToYMDHms = (date: Date) => {
  const year: number = date.getFullYear();
  const month: string =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1 + "";
  const day: string =
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate() + "";

  const hours: string =
    date.getHours() < 10 ? "0" + date.getHours() : date.getHours() + "";

  const minutes: string =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes() + "";

  const seconds: string =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds() + "";

  const timeZone = "+08:00";

  return (
    year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
  );
};

function strToDate(str: string, format: string): Date {

  return new Date();
}

const DateFormat = (date: any, fmt: string): string => {
  if (date && fmt) {
    let _date = new Date(date);
    var o = {
      "M+": _date.getMonth() + 1, //月份
      "d+": _date.getDate(), //日
      "h+": _date.getHours(), //小时
      "m+": _date.getMinutes(), //分
      "s+": _date.getSeconds(), //秒
      "q+": Math.floor((_date.getMonth() + 3) / 3), //季度
      S: _date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (_date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? (o as any)[k]
            : ("00" + (o as any)[k]).substr(("" + (o as any)[k]).length)
        );
      }
    }
    return fmt;
  } else {
    return "";
  }
};

export default { getNowDate, formatter, getDateToYMDHms, DateFormat };
