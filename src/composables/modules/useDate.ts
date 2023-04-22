import { A_DAY_TIME, A_WEEK_TIME, A_MONTH_TIME } from '@/utils';
export function useDate() {
  /* 范围快捷选择 */
  const shortcutsRange = [
    {
      text: '最近一周',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - A_WEEK_TIME);
        return [start, end];
      }
    },
    {
      text: '最近一月',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - A_MONTH_TIME);
        return [start, end];
      }
    },
    {
      text: '最近三月',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - A_MONTH_TIME * 3);
        return [start, end];
      }
    }
  ];
  /* 单日快捷选择 */
  const shortcuts = [
    {
      text: '今日',
      value: new Date()
    },
    {
      text: '昨日',
      value: () => {
        const date = new Date();
        date.setTime(date.getTime() - A_DAY_TIME);
        return date;
      }
    },
    {
      text: '一周前',
      value: () => {
        const date = new Date();
        date.setTime(date.getTime() - A_WEEK_TIME);
        return date;
      }
    }
  ];
  /* 获取范围值，拼接字段名 */
  function getRangeValue(name: string, range: string[]) {
    const [start, end] = range;
    return {
      [`${name}StartTime`]: start,
      [`${name}EndTime`]: end
    };
  }
  /* 不可选择日期 */
  const disabledDate = (time: Date) => {
    return time.getTime() > Date.now();
  };

  return {
    shortcuts,
    shortcutsRange,
    getRangeValue,
    disabledDate
  };
}
