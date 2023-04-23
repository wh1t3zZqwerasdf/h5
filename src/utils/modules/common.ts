import { FormPropGroupType, FormPropType } from '@/types';

/**
 * 网络连接返回编码及错误对照
 */
export const showMessage = (status: number | string): string => {
  let message = '';
  switch (status) {
    case 400:
      message = '请求错误(400)';
      break;
    case 401:
      message = '未授权，请重新登录(401)';
      break;
    case 403:
      message = '拒绝访问(403)';
      break;
    case 404:
      message = '请求出错(404)';
      break;
    case 408:
      message = '请求超时(408)';
      break;
    case 500:
      message = '服务器错误(500)';
      break;
    case 501:
      message = '服务未实现(501)';
      break;
    case 502:
      message = '网络错误(502)';
      break;
    case 503:
      message = '服务不可用(503)';
      break;
    case 504:
      message = '网络超时(504)';
      break;
    case 505:
      message = 'HTTP版本不受支持(505)';
      break;
    default:
      message = `连接出错(${status})!`;
  }
  return `${message}，请检查网络或联系管理员！`;
};
/**
 * @Description: 问候语
 * @author ZZH
 * @date 2023/3/22
 */
export function getGreetingText() {
  const time = new Date().getHours();
  let message;

  if (time < 12) message = '上午好！';
  else if (time < 18) message = '下午好！';
  else message = '晚上好！';

  return message;
}

export function arr2Obj(
  arr: any[],
  options?: {
    key?: string;
    value?: string;
    hasChildren?: boolean;
    children?: string;
  }
) {
  const obj = {};
  if (!Array.isArray(arr) || arr.length === 0) return obj;

  const config = Object.assign(
    {
      key: 'value',
      value: 'label',
      hasChildren: false,
      children: 'children'
    },
    options
  );
  arr.forEach(item => {
    obj[item[config.key]] = item[config.value];
    if (config.hasChildren && item[config.children])
      Object.assign(obj, arr2Obj(item[config.children], options));
  });

  return obj;
}

// 对象深拷贝
export function cloneObj(obj: object) {
  let ret: any;
  if (Array.isArray(obj)) {
    ret = []; // 创建一个空数组
    for (let i = 0; i < obj.length; i++) ret[i] = cloneObj(obj[i]);

    return ret;
  } else if (Object.prototype.toString.call(obj) === '[object object]') {
    ret = {}; // 创建一个空对象
    for (const i in obj) ret[i] = cloneObj(obj[i]);

    return ret;
  } else {
    return obj;
  }
}

// 对象简单深拷贝
export function deepSimpleCloneObj(obj: object) {
  return JSON.parse(JSON.stringify(obj));
}

/***
 * 判单数据类型方法
 */
export const isType = (type: any) => {
  return typeof type;
  // 基本类型判断“"string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"”
  // return /^\[object\s(.*)\]$/.exec(Object.prototype.toString.call(type))[1];
};

/***
 * 数组置空处理根据类型不同赋予相应的默认值
 */
export const setObjDefault = (obj: any) => {
  const temp = {};
  if (isType(obj) === 'object' && '{}' !== JSON.stringify(obj)) {
    Object.keys(obj).forEach(key => {
      const t = isType(obj[key]);
      switch (t) {
        case 'string':
          temp[key] = '';
          break;
        case 'number':
          temp[key] = '';
          break;
        case 'object':
          temp[key] = {};
          break;
        case 'boolean':
          temp[key] = false;
          break;
        default:
          temp[key] = '';
          break;
      }
    });
  }
  // console.log(' temp 2222', temp);
  return temp;
};

/**
 * 打平 隐患/外破类型 对应字段
 * @param arr
 * @param map
 */
export function flatArrToObj(arr: any, map = {}) {
  arr.forEach((item: any) => {
    if (
      item.childList &&
      Array.isArray(item.childList) &&
      item.childList.length
    ) {
      flatArrToObj(item.childList, map);
    } else {
      map[item.id] = {
        name: item.name,
        fieldList: item.fieldList.map((item: any) => {
          if (item.rules === undefined) item.rules = [{ required: true }];
          return item;
        }),
        dealSituation: item.dealSituation,
        dealWorkbench: item.dealWorkbench
      };
    }
  });
}

/**
 * 对象数组中进行某个字段数据判空处理
 * @param dataArr 对象数组
 * @param field 对象中的字段
 */
export async function isFieldNull(dataArr: any, field: string) {
  let f = false;
  for (let index = 0; index < dataArr.length; index++) {
    const item = dataArr[index];
    //  执行判空处理是否未
    if ((item[field] ?? '') === '') {
      f = true;
      break;
    } else {
      f = false;
    }
  }
  return f;
}

/**
 * 获取系统内相对路径的地址
 * 该方法是确保发布后路径可用
 * @param imageName  图片名称
 * @param relativePath  图片相对于 assert 路径下一级的图片
 * @returns
 */
export const getImageUrl = (imageName: string, relativePath: string) => {
  return new URL(
    `../../assets/${relativePath}/${imageName}.png`,
    import.meta.url
  ).href;
};

/**
 * @Description: 根据视口百分比获取宽度
 * @author ZZH
 * @date 2023/3/24
 */
export function getWidthByViewportPercentage(percentage: number) {
  return (percentage / 100) * window.innerWidth;
}

export function getHomeWidthByViewportPercentage(percentage: number) {
  return (percentage / 100) * (window.innerWidth > 1920 ? 1920 : 1792);
}

/*
 * json数组去重
 * @param: {Array} jsonArr 去重之前的数组
 * @param  {String} field  需要去重的字段值
 * @return {Array}        去重之后的数组
 */
export function uniqueJsonArrByField(jsonArr: any[], field: string) {
  // 数组长度小于2 或 没有指定去重字段 或 不是json格式数据
  if (jsonArr.length < 2 || !field || typeof jsonArr[0] !== 'object')
    return jsonArr;

  return jsonArr.reduce(
    (all, next) =>
      all.some((item: any) => item[field] === next[field])
        ? all
        : [...all, next],
    []
  );
}

/*
 * 等待函数
 * @return { }
 */
export function sleep(delay = 100) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

/*
 * 深拷贝 map.set()
 * @return { }
 */
export function deepClone(target: any, map = new Map()) {
  // 检测数据类型
  if (typeof target !== 'object' || target === null) {
    // target 是 null ，或者不是对象和数组，说明是原始类型,直接返回
    return target;
  } else {
    // 克隆数据前，先进行判断数据之前是否克隆过
    const cache = map.get(target);
    // 如果克隆过,直接返回映射中键对应的值,绕开了递归
    if (cache) return cache;

    // 创建一个容器,存储数组或者对象
    const result = Array.isArray(target) ? [] : {};
    // 注意:map.set()传入的值是按引用传入,后序result改变也会影响map中保存的状态
    map.set(target, result);
    // 遍历target
    for (const key in target) {
      // 检测该属性是否为对象本身的属性(不能拷贝原型对象的属性)
      if (target.hasOwnProperty(key)) result[key] = deepClone(target[key], map);
    }
    return result;
  }
}

// 根据数组及模板将数据添加尾号并拍平为对象
export function arrToDataObj(key: any, data: any) {
  const d: any = data[key];
  if (!d) return {};

  const count = d.length;
  for (let index = 0; index < count; index++) {
    const d_key_obj = d[index];
    if (index === 0) {
      for (const k in d_key_obj) data[k] = d_key_obj[k];
    } else if (index > 0) {
      for (const k in d_key_obj) {
        if (k.indexOf('_Field') > 0) continue;

        const c = index * 1 + 1;
        const new_k = `${k}_Field_${c}`;
        data[new_k] = d_key_obj[k];
      }
    }
  }
  delete data[key];
  return data;
}

// 将带序号的对象数据根据模板生成模板的数组
export function dataObjToArr(modules: FormPropGroupType, key: any, data: any) {
  // 将对象进行处理成数组存到 对应的key 字段 的键中
  const arr: any = [];
  const objItem: any = {};
  const dataCopy = JSON.parse(JSON.stringify(data));
  // 获取数据中最大的分项  如moduleKey_2 /moduleKey_3的情况  count = 3 最大为3
  const module: FormPropType[] = modules.group;
  const countArr: any = [0];
  for (const dataItemKey in data.value) {
    for (const item of module) {
      const moduleKey = item.name;
      if (dataItemKey === moduleKey) {
        continue;
      } else if (dataItemKey.startsWith(moduleKey)) {
        const index = dataItemKey.lastIndexOf('_');
        // 如moduleKey_2 /moduleKey_3的情况  count = 2 或者3
        const count: any = index > -1 ? dataItemKey.slice(index + 1) : '';
        if (!countArr.includes(count * 1)) countArr.push(count * 1);
      }
    }
  }
  // 获取 最大值
  countArr.sort();
  const maxIndex = countArr[countArr.length - 1];
  for (let index = 0; index < countArr.length; index++) {
    let obj: any = {};
    const indexValue = countArr[index];
    if (indexValue === 0) {
      obj = {};
      for (const item of module) {
        const moduleKey = item.name;
        if (data.value[moduleKey]) {
          obj[moduleKey] = data.value[moduleKey];
          delete data.value[moduleKey];
        }
      }
      arr.push(obj);
      // console.log('arr;-------1------------:', arr);
    } else if (indexValue > 1) {
      obj = {};
      for (const item of module) {
        const moduleKey = item.name;
        const newKey = `${moduleKey}_Field_${indexValue}`;
        if (data.value[newKey] && newKey.startsWith(moduleKey)) {
          obj[moduleKey] = data.value[newKey];
          delete data.value[newKey];
        }
      }
      arr.push(obj);
    }
  }
  data.value[key] = arr;
  return data;
  // objItem
}

// b备份
export function dataObjToArr2(module: any, key: any, data: any) {
  // 将对象进行处理成数组存到 对应的key 字段 的键中
  const arr: any = [];
  const objItem: any = {};
  const dataCopy = JSON.parse(JSON.stringify(data));
  // 获取数据中最大的分项  如moduleKey_2 /moduleKey_3的情况  count = 3 最大为3
  const countArr: any = [0];
  for (const dataItemKey in data) {
    for (const moduleKey in module) {
      // let value = module[moduleKey];
      if (dataItemKey === moduleKey) {
        continue;
      } else if (dataItemKey.startsWith(moduleKey)) {
        const index = dataItemKey.indexOf('_');
        // 如moduleKey_2 /moduleKey_3的情况  count = 2 或者3
        const count = index > -1 ? dataItemKey.slice(index + 1) : '';
        countArr.push(count);
      }
    }
  }
  // 获取 最大值
  countArr.sort();
  const maxIndex = countArr[countArr.length - 1];
  for (let index = 0; index < countArr.length; index++) {
    let obj: any = {};
    const indexValue = countArr[index];
    if (indexValue === 0) {
      obj = {};
      for (const moduleKey in module) {
        if (data.hasOwnProperty(moduleKey)) {
          obj.moduleKey = data[moduleKey];
          delete data[moduleKey];
        }
      }
      arr.push(obj);
    } else if (indexValue > 1) {
      obj = {};
      for (const moduleKey in module) {
        const newKey = `${moduleKey}_${indexValue}`;
        for (const moduleKey in module) {
          if (data.hasOwnProperty(newKey)) {
            obj.moduleKey = data[newKey];
            delete data[newKey];
          }
        }
        arr.push(obj);
      }
    }
  }
  data[key] = arr;
  console.log('data-------------------:', data);

  return data;
  // objItem
}

/* 对数组进行分组 一维分为二位 */
/**
 *
 * @param data 数组
 * @param num 每组几个
 * @returns
 */
export const againGroup = (data: any, num: number) => {
  let result = [];
  for (var i = 0, len = data.length; i < len; i += num) {
    result.push(data.slice(i, i + num));
  }
  return result;
};
