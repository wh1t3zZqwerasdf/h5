/**
 * 解析带时间格式的JSON
 * @param obj 
 * @returns 
 */
function JSONParseForDate(obj: any) {
  return JSON.parse(JSON.stringify(obj), function (key, value) {
    switch (key) {
      case "defaultDate":
      case "maxDate":
      case "minDate":
        return new Date(value);
    }
    return value;
  });
}

export default { JSONParseForDate };
