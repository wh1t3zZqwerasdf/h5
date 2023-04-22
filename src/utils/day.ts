import dayjs from 'dayjs';
// 引入中文包
import zh_cn from 'dayjs/locale/zh-cn';
// 导入相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime';

import utc from 'dayjs/plugin/utc';

dayjs.locale(zh_cn);
dayjs.extend(relativeTime);
dayjs.extend(utc);

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const A_DAY_TIME = 3600 * 1000 * 24;
export const A_WEEK_TIME = 3600 * 1000 * 24 * 7;
export const A_MONTH_TIME = 3600 * 1000 * 24 * 30;

/**
 * 日期时间转换
 * @param time 时间值
 * @param options
 * @returns
 */
export function daytimeFormat(
	time: dayjs.ConfigType,
	options?: {
		showTime?: boolean;
		friendly?: boolean;
		format?: string;
	}
) {
	if (!time) return '';

	if (options?.friendly) {
		// 判断是否一天前
		// const now = dayjs();
		/**
		 * add(n, unit)
		 * week  w  周
		 * day  d  星期(星期日0，星期六6)
		 * month  M  月份(0-11)
		 * quarter  Q  依赖QuarterOfYear插件
		 * year  y  年
		 * hour  h  小时
		 * minute  m  分钟
		 * second  s  秒
		 * millisecond  ms  毫秒
		 */
		// const afterDay = dayjs(time).add(1, 'week');
		// 加一天后是否大于当前时间
		// if (afterDay.isAfter(now))
		return friendlyFormat(time);
	}
	if (options?.showTime) return datetimeFormat(time);

	return dateFormat(time, options?.format);
}

/**
 * 日期友好显示，一天前
 * @param time
 * @returns
 * 范围  键  输出结果
 * 0 to 44 seconds  s  几秒钟前
 * 45 to 89 seconds  m  一分钟前
 * 90 seconds to 44 minutes  mm  2分钟前…44分钟前
 * 45 to 89 minutes  h  一个小时前
 * 90 minutes to 21 hours  hh  2小时前…21小时前
 * 22 to 35 hours  d  一天前
 * 36 hours to 25 days  dd  两天前…25天前
 * 26 to 45 days  M  一个月前
 * 46 days to 10 months  MM  两个月前…10个月前
 * 11 months to 17months  y  一年前
 * 18 months+  yy  两年前…20年前
 */
export function friendlyFormat(time: dayjs.ConfigType) {
	return dayjs(time).fromNow();
}

/* 日期格式化 */
export function dateFormat(date: dayjs.ConfigType, format?: string) {
	if (!date) return '';
	return dayjs(date).format(format || DATE_FORMAT);
}

/* 时间格式化 */
export function datetimeFormat(date: dayjs.ConfigType) {
	const str = dayjs(date).format(DATETIME_FORMAT);
	return str;
}

/* 时间戳格式（秒） */
export function timestampFormat(timeStr: dayjs.ConfigType) {
	return dayjs(timeStr).unix();
}

/* 时间utc */
export function utcTime(timeStr?: dayjs.ConfigType) {
	return dayjs(timeStr).format(); // 2019-03-06T08:00:00+08:00
}

//计算指定日期到今日之间的
export function getAge(birthYearMonthDay: any) {
	let year = parseInt(birthYearMonthDay.substring(0, 4));
	let month = parseInt(birthYearMonthDay.substring(5, 7));
	let day = parseInt(birthYearMonthDay.substring(8, 10));

	let newDate = dateFormat(new Date());
	let newyear = parseInt(newDate.substring(0, 4));
	let newmonth = parseInt(newDate.substring(5, 7));
	let newday = parseInt(newDate.substring(8, 10));
	let difference = newyear - year;
	if (newday - day < 0) {
		newmonth -= 1;
	}
	if (newmonth - month < 0) {
		difference -= 1;
	}
	return difference;
}

//求本年  本月 本季度 本周的时间节点  yyyy-mm-dd
export function getAPeriodOfTimeDate(type: string) {
	let now = new Date();
	switch (type) {
		case 'year':
			console.log('year');
			return `${now.getFullYear()}-01-01 00:00:00`;
		case 'month':
			console.log('month');
			return `${now.getFullYear()}-${
				Number(now.getMonth()) + 1 > 9
					? Number(now.getMonth()) + 1
					: '0' + (Number(now.getMonth()) + 1)
			}-01 00:00:00`;
		case 'quarter':
			console.log('quarter');
			let key = (now.getMonth() + 1) / 3;
			return `${now.getFullYear()}-${
				key * 3 > 9 ? key * 3 : '0' + key * 3
			}-01 00:00:00`;
		case 'week':
			console.log('week');
			let weekKey = now.getDay() ? now.getDay() : 7;
			let date = new Date(
				now.getTime() - (weekKey - 1) * 24 * 3600 * 1000
			);
			return `${date.getFullYear()}-${
				Number(date.getMonth()) + 1 > 9
					? Number(date.getMonth()) + 1
					: '0' + (Number(date.getMonth()) + 1)
			}-${
				date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
			} 00:00:00`;
	}
}
