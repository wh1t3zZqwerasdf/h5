<template>
  <van-col v-show="prop.type !== 'hidden'" class="form-item-col" v-bind="layoutProps">
    <!--    文本输入-->
    <van-field
        v-if="['text', 'password', 'textarea'].includes(prop.type)"
        v-model.trim="scopeData[prop.name]"
        :class="['form-item', `form-item-${prop.type}`]"
        :disabled="isDisabled(prop, scopeData, config)"
        :label="!prop.hiddenLabel && prop.label"
        :name="prop.name"
        :placeholder="prop.placeholder ?? setPlaceholder(prop)"
        :readonly="isReadonly(prop, scopeData, config)"
        :required="isRequired(prop, scopeData, config)"
        :rules="prop.rules?.map((rule:any) => {
          if (rule.required) {
            rule.message = rule.message || `${prop.label}不能为空`;
          }
          return rule
        })"
        :type="prop.type"
        clearable
    />

    <!--    数字输入-->
    <van-field
        v-else-if="['number'].includes(prop.type)"
        v-model.number="scopeData[prop.name]"
        :class="['form-item', `form-item-${prop.type}`]"
        :disabled="isDisabled(prop, scopeData, config)"
        :label="!prop.hiddenLabel && prop.label"
        :name="prop.name"
        :placeholder="prop.placeholder ?? setPlaceholder(prop)"
        :readonly="isReadonly(prop, scopeData, config)"
        :required="isRequired(prop, scopeData, config)"
        :rules="prop.rules?.map((rule:any) => {
          if (rule.required) {
            rule.message = rule.message || `${prop.label}不能为空`;
          }
          return rule
        })"
        clearable
        type="number"
    />

    <!--    选择器-->
    <template v-else-if="['select'].includes(prop.type)">
      <FormSelect v-model="scopeData[prop.name]" :config="config" :disabled="isDisabled(prop, scopeData, config)"
                  :prop="prop"
                  :scopeData="scopeData"/>
    </template>

    <!--   级联选择-->
    <template v-else-if="['select-api-cascade'].includes(prop.type)">
      <FormCascaderSelect v-model="scopeData[prop.name]" :config="config"
                          :disabled="isDisabled(prop, scopeData, config)" :prop="prop"
                          :scopeData="scopeData" @setCascaderArrName="setCascaderArrName"/>
    </template>

    <!--    日期选择-->
    <template v-else-if="['date-picker'].includes(prop.type)">
      <FormDatePicker v-model="scopeData[prop.name]" :config="config" :disabled="isDisabled(prop, scopeData, config)"
                      :prop="prop"
                      :scopeData="scopeData"/>
    </template>

    <!--    日期时间选择-->
    <template v-else-if="['datetime-picker'].includes(prop.type)">
      <FormDateTimePicker v-model="scopeData[prop.name]" :config="config"
                          :disabled="isDisabled(prop, scopeData, config)" :prop="prop"
                          :scopeData="scopeData"/>
    </template>

    <!--    日期区间-->
    <template v-else-if="['daterange-picker'].includes(prop.type)">
      <FormDateRangePicker v-model="scopeData[prop.name]" :config="config"
                           :disabled="isDisabled(prop, scopeData, config)" :prop="prop"
                           :scopeData="scopeData" @setDateRangeData="setDateRangeData"/>
    </template>

    <!-- 单选框 -->
    <template v-else-if="prop.type === 'radio'">
      <van-field
          v-model.number="scopeData[prop.name]"
          :class="['form-item', `form-item-${prop.type}`]"
          :disabled="isDisabled(prop, scopeData, config)"
          :label="!prop.hiddenLabel && prop.label"
          :name="prop.name"
          :placeholder="prop.placeholder ?? setPlaceholder(prop)"
          :readonly="isReadonly(prop, scopeData, config)"
          :required="isRequired(prop, scopeData, config)"
          :rules="prop.rules?.map((rule:any) => {
      if (rule.required) {
        rule.message = rule.message || `${prop.label}不能为空`;
      }
      return rule
    })"
          clearable
      >
        <template #input>
          <van-radio-group v-model="scopeData[prop.name]" :disabled="isDisabled(prop, scopeData, config)"
                           direction="horizontal">
            <van-radio
                v-for="option in getOptions(prop, scopeData, config)"
                :disabled="option.disabled"
                :label="option.value"
                :name="option.value"
            >
              {{ option.label }}
            </van-radio>
          </van-radio-group>
        </template>
      </van-field>
    </template>

    <!-- 复选框 -->
    <template v-else-if="prop.type === 'checkbox'">
      <van-field
          :class="['form-item', `form-item-${prop.type}`]"
          :disabled="isDisabled(prop, scopeData, config)"
          :label="!prop.hiddenLabel && prop.label"
          :name="prop.name"
          :placeholder="prop.placeholder ?? setPlaceholder(prop)"
          :readonly="isReadonly(prop, scopeData, config)"
          :required="isRequired(prop, scopeData, config)"
          :rules="prop.rules?.map((rule:any) => {
      if (rule.required) {
        rule.message = rule.message || `${prop.label}不能为空`;
      }
      return rule
    })"
          clearable
      >
        <template #input>
          <van-checkbox-group v-model="scopeData[prop.name]" :disabled="isDisabled(prop, scopeData, config)"
                              direction="horizontal">
            <van-checkbox
                v-for="option in getOptions(prop, scopeData, config)"
                :disabled="option.disabled"
                :label="option.value"
                :name="option.value"
            >
              {{ option.label }}
            </van-checkbox>
          </van-checkbox-group>
        </template>
      </van-field>
    </template>

    <!--数组卡片-->
    <template v-else-if="prop.type === 'arrayCard'">
      <van-field
          :class="['form-item', `form-item-${prop.type}`]"
          :disabled="isDisabled(prop, scopeData, config)"
          :label="!prop.hiddenLabel && prop.label"
          :name="prop.name"
          :placeholder="prop.placeholder ?? setPlaceholder(prop)"
          :readonly="isReadonly(prop, scopeData, config)"
          :required="isRequired(prop, scopeData, config)"
          :rules="prop.rules?.map((rule:any) => {
          if (rule.required) {
            rule.message = rule.message || `${prop.label}不能为空`;
          }
          return rule
        })"
          clearable
      >
        <template #input>
          <FormArrayCard
              v-model="scopeData[prop.name]"
              :disabled="isDisabled(prop, scopeData, config)"
              :formConfig="config"
              :itemProp="prop"
          />
        </template>
      </van-field>
    </template>


    <!-- 自定义组件 -->
    <template v-else-if="prop.type === 'custom'">
      <van-field
          :class="['form-item', `form-item-${prop.type}`]"
          :disabled="isDisabled(prop, scopeData, config)"
          :label="!prop.hiddenLabel && prop.label"
          :name="prop.name"
          :placeholder="prop.placeholder ?? setPlaceholder(prop)"
          :readonly="isReadonly(prop, scopeData, config)"
          :required="isRequired(prop, scopeData, config)"
          :rules="prop.rules?.map((rule:any) => {
          if (rule.required) {
            rule.message = rule.message || `${prop.label}不能为空`;
          }
          return rule
        })"
          clearable
      >
        <template #input>
          <FormCustom
              v-model="scopeData[prop.name]"
              :disabled="isDisabled(prop, scopeData, config)"
              :formConfig="config"
              :formData="scopeData"
              :formRef="formRef"
              :itemProp="prop"
              :placeholder="prop.placeholder"
          ></FormCustom>
        </template>
      </van-field>
    </template>

    <template v-else-if="prop.type.includes('upload')">
      <van-field
          :class="['form-item', `form-item-${prop.type}`]"
          :disabled="isDisabled(prop, scopeData, config)"
          :label="!prop.hiddenLabel && prop.label"
          :name="prop.name"
          :placeholder="prop.placeholder ?? setPlaceholder(prop)"
          :readonly="isReadonly(prop, scopeData, config)"
          :required="isRequired(prop, scopeData, config)"
          :rules="prop.rules?.map((rule:any) => {
      if (rule.required) {
        rule.message = rule.message || `${prop.label}不能为空`;
      }
      return rule
    })"
          clearable
      >
        <template #input>
          <MyFormUpload
              v-model="scopeData[prop.name]"
              :disabled="isDisabled(prop, scopeData, config)"
              :itemProp="prop"
              :label="!prop.hiddenLabel && prop.label"
              @upLoadArray="setUpload"
          >
          </MyFormUpload>
        </template>
      </van-field>
    </template>
  </van-col>
</template>

<script lang="ts" setup>
import {useFormNew} from "@/composables";
import {useSystemStore} from "@/store";
import type {FormConfigType, FormPropType, UploadType} from "@/types";
import {retainNumber} from "@/utils";
import FormSelect from "../components/FormSelect";
import FormCustom from "../components/FormCustom";
import FormDatePicker from "../components/FormDatePicker";
import FormDateTimePicker from "../components/FormDateTimePicker";
import FormDateRangePicker from "../components/FormDateRangePicker";
import FormCascaderSelect from "../components/FormCascaderSelect"
import FormArrayCard from '../components/FormArrayCard'
import MyFormUpload from "../components/FormUpload/MyFormUpload.vue";

const systemStore = useSystemStore();

// const { handleResponse } = useMessage();

const prop = computed<any>(() => props.itemProp);

// 栅格布局参数
const layoutProps = computed<any>(() => {
  const {layoutProps, type} = prop.value;
  let defaultSpan = 24;
  if (["upload", "upload-file", "textarea"].includes(type)) defaultSpan = 24;
  else if (["daterange-picker"].includes(type)) defaultSpan = 24;

  return {
    span: defaultSpan,
    ...layoutProps,
  };
});

const props = defineProps({
  // 双向绑定数据
  modelValue: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({}),
  },
  formConfig: {
    type: Object as PropType<FormConfigType>,
    required: true,
  },
  itemProp: {
    type: Object as PropType<FormPropType>,
    required: true,
  },
  originData: {
    type: Object as PropType<Record<string, unknown>>,
  },
  complexData: {
    type: Object as PropType<Record<string, unknown>>,
  },
  formRef: {
    type: Object as PropType<any>,
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", value: any): void;
}>();

const scopeData = computed<any>({
  get() {
    // 格式 '[{"fileName":"avator_20221221165652.png","objectName":"2022/12/21/avator_20221221165652.png","size":107071,"suffix":"png","type":"image/png","url":"http://139.9.83.47:9000/dev/2022/12/21/avator_20221221165652.png"}]',
    if (props.itemProp.type.includes("upload")) {
      Object.keys(props.modelValue).map((key) => {
        if (
            props.modelValue[key] &&
            key === props.itemProp.name &&
            typeof props.modelValue[key] === "string"
        )
          props.modelValue[key] = JSON.parse(props.modelValue[key] as string);
      });
    }
    return props.modelValue;
  },
  set(data) {
    emit("update:modelValue", data);
  },
});

// #region 下拉查询组件相关属性及方法
const selectApiOptionsList: any = ref([]); //
const selectApiData: any = ref([]); // // 保存所有的下拉查询数据-数据源
const selectApiData_: any = ref([]); // 保存所有的下拉查询数据-数据源 selectApiData 提取后的数据源
const selectApiOptionName = ref(""); // 下拉查询组件 对应的 字段名称
// #endregion

// const formDisabled = inject('formDisabled');

// const config = computed(() =>
//   Object.assign({}, props.formConfig, { disabled: formDisabled })
// );

const config = computed(() => {
  // 计算配置变更 则重新设置表单配置
  setFormConfig(props.formConfig);
  return props.formConfig;
});

const {isDisabled, getOptions, isReadonly, isRequired, setFormConfig} =
    useFormNew(props.formConfig);

/* ========== 数字输入框特殊限制 ========== */
const numberChannelInputLimit = (e: any) => {
  const key = e.key; // 不允许输入'e'和'.'
  if (key === "e" || key === "+") {
    e.returnValue = false;
    return false;
  }

  return true;
};

/* ========== 数据单向流 ========== */
function inputNumber(value: any, name: string) {
  scopeData.value[name] = retainNumber(value);
}

function setData(date: any) {
  Object.assign(scopeData.value, date);
}

/**
 * 绑定startTime和endTime再通过自定义校验规则判断两个值是否空
 * @param date
 */
function setDateRangeData(date: any) {
  Object.assign(scopeData.value, date);
}

function setCascaderArrName(name: string) {
  scopeData.value[`${prop.value.name}ArrName`] = name
}

function setUpload(files: UploadType[], name: string) {
  // const urls = files.join(',');inputArr
  scopeData.value[name] = files;
  // emit('clearValid', name);
}

// 下拉选择数据改变后保存详细数据
function selectDataChange(val: string) {
  if (!val) {
    scopeData.value[`${prop.value.name}_infoData`] = {};
    return;
  }
  const options = props.itemProp.options as { [key: string]: any }[];
  let selectData = null;
  options?.forEach((item) => {
    if (item.value === val) {
      selectData = item;
    }
  });
  scopeData.value[`${prop.value.name}_infoData`] = selectData;
}

// 缓存删除文件的id
function setDeleteFileId(id: string) {
  if (!scopeData.value["deletes"]) scopeData.value["deletes"] = [id];
  else scopeData.value["deletes"].push(id);
}

/* 判断是否显示 placeholder */
function setPlaceholder(item: FormPropType) {
  let tip = "";
  // search 显示 全部
  // add 显示 请选择
  // view|edit 显示 当前值
  // deal ? 区分已处理未处理
  if (["search", ""].includes(config.value?.op ?? "")) tip = "全部";

  if (config.value.op === "add") {
    tip = "全部";
    // 根据 type 显示不同文本
    const inputArr = [
      "text",
      "textarea",
      "password",
      "number",
      "number-stepper",
    ];
    if (inputArr.includes(item.type)) tip = "请输入";
    else if (item.type.includes("select") || item.type.includes("picker"))
      tip = "请选择";
  }

  return tip;
}

function handleSelectClick(item: FormPropType) {
  return isDisabled(item, scopeData.value, config.value);
}

// #region 下拉框选择组件相关

/* 执行下拉框请求 */
async function handleSelectApi(item: FormPropType) {
  // 已请求
  if (item.options?.length && !item.noCache) {
    if (item.type === "select-api-filter") setSelectApiFilterData(item);

    return;
  }
  if (item.apiFn === undefined) return;
  let params = Array.isArray(item.apiParams)
      ? [...item.apiParams]
      : item.apiParams;
  if (typeof item.apiParams === "function")
    params = item.apiParams(scopeData.value);
  console.log(params);
  const res = await item.apiFn(params);
  // if (!handleResponse(res)) return;
  if (item.apiCbFn === undefined) {
    item.options = Array.isArray(res.data) ? res.data : [];
  } else {
    const cbData = item.apiCbFn(res.data);
    item.options = Array.isArray(cbData) ? cbData : [];
  }
  if (item.apiDefaultValue)
    scopeData.value[item.name] = item.apiDefaultValue(item.options);

  // #region  数据缓存 如果是查询下拉的 先以这种方式存储
  if (item.type === "select-api-filter") setSelectApiFilterData(item);

  // #endregion
  systemStore.saveDictApi(item.name, item.options);
}

function setSelectApiFilterData(item: FormPropType) {
  selectApiOptionName.value = item.name;
  selectApiData.value = item.options;
  console.log("-----------------------");
  console.log(
      "---------- selectApiOptionName.value-------------",
      selectApiOptionName.value
  );
  console.log(
      "---------- selectApiData.value-------------",
      selectApiData.value
  );
  // 获取当前ID的值构建数组
  selectApiOptionsList.value = selectApiData.value.filter((item: any) => {
    return item?.value === scopeData.value[selectApiOptionName.value];
  });
}

/* 设置api请求的select */
function setApiOptions(item: FormPropType) {
  // 请求 options
  if (item.type === "select-api") handleSelectApi(item);
  if (item.type === "select-api-filter") handleSelectApi(item);
  if (item.type === "select-api-cascade") handleSelectCascadeApi(item);
}

/* 设置默认值 */
function setDefaultValue(item: FormPropType) {
  // #region 设置默认值 (部分组件)
  if (item.type === "radio") setRadioDefaultValue(item);
  else if (item.type === "checkbox") {
    setCheckBoxDefaultValue(item);
    return;
  }
  // else if (item.type === 'select-api-cascade') seCaseCadeDefaultValue(item);

  // #endregion
  // add deal 设置默认值
  if (!["add", "deal", "edit"].includes(config.value.op ?? "")) return;
  // 没有默认值
  if (item.defaultValue === undefined) return;
  // 不存在值，强制赋值不进入
  if (![undefined, null].includes(scopeData.value[item.name])) return;
  if (typeof item.defaultValue === "function") {
    const res = item.defaultValue(scopeData.value);
    if (typeof res === "object") {
      Object.assign(scopeData.value, res);
    } else {
      // string, number, boolean
      scopeData.value[item.name] = res;
    }
    return;
  }
  scopeData.value[item.name] = item.defaultValue;
}

// #endregion

// #region 设置默认值 (部分组件)
/* 单选  设置默认值 */
function setRadioDefaultValue(item: FormPropType) {
  if (!["add", "deal", "edit", "search"].includes(config.value.op ?? ""))
    return;

  // 没有默认值
  if (item.defaultValue === undefined) return;
  // 不存在值，强制赋值不进入
  if (scopeData.value[item.name] !== undefined) return;
  scopeData.value[item.name] = item.defaultValue;
}

/* 多选  设置默认值 */
function setCheckBoxDefaultValue(item: FormPropType) {
  if (!["add", "deal", "edit", "search"].includes(config.value.op ?? ""))
    return;
  // 没有默认值
  if (item.defaultValue === undefined) {
    scopeData.value[item.name] = [];
    return;
  }
  // 不存在值，强制赋值不进入
  if (scopeData.value[item.name] !== undefined) return;
  const p = [];
  p.push(item.defaultValue);
  scopeData.value[item.name] = p;
}

/* 级联  设置默认值 */
function seCaseCadeDefaultValue(item: FormPropType) {
  // 没有默认值
  if (item.defaultValue === undefined) return;
  // 不存在值，强制赋值不进入
  if (scopeData.value[item.name] !== undefined) return;
  scopeData.value[item.name] = item.defaultValue;
}

// 使radio可以取消选中
function radioClick(value: string | number, name: string) {
  if (props.formConfig.disabled) return;
  scopeData.value[name] === value
      ? (scopeData.value[name] = "")
      : (scopeData.value[name] = value);
}

// #endregion

// #region 级联组件相关

/* 执行下拉框请求 - 级联 */
async function handleSelectCascadeApi(item: FormPropType) {
  if (item.cascadeOptions?.length) return; // 已请求
  if (item.apiFn === undefined) return;
  let params = Array.isArray(item.apiParams)
      ? [...item.apiParams]
      : [item.apiParams];
  if (typeof item.apiParams === "function")
    params = item.apiParams(scopeData.value);

  const res = await item.apiFn(...params);
  // if (!handleResponse(res)) return;
  if (item.apiCbFn === undefined) {
    item.cascadeOptions = Array.isArray(res.data) ? res.data : [];
  } else {
    const cbData = item.apiCbFn(res.data);
    item.cascadeOptions = Array.isArray(cbData) ? cbData : [];
  }
  // 数据缓存
  systemStore.saveDictApi(item.name, item.cascadeOptions);
}

/**
 * 级联选择设置值
 * @change 事件触发
 */
function setCascaderValue(val: any) {
  // prop.value;
  if (Array.isArray(val)) {
    scopeData.value[prop.value.name] = val[val.length - 1];
    scopeData.value[`${prop.value.name}Arr`] = val;
  } else {
    scopeData.value[prop.value.name] = val;
  }
}

// #endregion

/* 动态设置默认值 */
function setDynamicDefaultValue(item: FormPropType, data?: any) {
  if (!data) data = scopeData.value;
  if (typeof item.defaultValue === "function") {
    const res = item.defaultValue(data);
    if (typeof res === "object") {
      Object.assign(data, res);
    } else {
      // string, number, boolean
      data[item.name] = res;
    }

    return;
  }
}

// #region 下拉框 查询组件 的搜索查询
function remoteMethod(query: string) {
  if (query !== "") {
    setTimeout(() => {
      selectApiData_.value = selectApiData.value.map((item: any) => {
        return {value: `${item?.value}`, label: `${item?.label}`};
      });
      selectApiOptionsList.value = selectApiData_.value.filter((item: any) => {
        return item?.label.indexOf(query) > -1;
      });
    }, 200);
  } else {
    selectApiOptionsList.value = [];
  }
}

const popOption: any = ref();
const optionsArray = computed(() => {
  const key = getOptions(prop.value, scopeData.value, config.value);
  key.forEach((e: any) => {
    if (e.value == scopeData.value[prop.value.name]) popOption.value = e.label;
  });
  return key;
});

watch(
    () => scopeData.value,
    (val) => {
      if (prop.value.alias) {
        const _name = prop.value.name;
        const _alias = prop.value.alias;
        val[_alias] = val[_name];
      }
      // 动态设置默认值
      setDynamicDefaultValue(props.itemProp, val);
    },
    {
      deep: true,
    }
);


// #endregion
onActivated(() => {
  setApiOptions(props.itemProp);
});

onMounted(() => {
  setApiOptions(props.itemProp);
  setDefaultValue(props.itemProp);
});
</script>

<style lang="less" scoped>
.form-item-col {
  border-bottom: 1px solid var(--hy-border-color);

  :deep(.van-cell) {
    label {
      font-size: var(--hy-xs-text-size);
      color: var(--hy-placeholder-text-color);
    }
  }
}
</style>
