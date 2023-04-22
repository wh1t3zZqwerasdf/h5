<!-- 动态表单，单表单页面，可单独使用也可配合van-collapse使用 -->
<template>
  <van-cell-group inset v-for="formData in formInfos">
    <van-divider
      v-if="formData.type !== FormType.HEADER && formData.isShow"
      class="divider"
    />

    <div
      v-if="formData.type === FormType.HEADER && formData.isShow"
      class="header"
    >
      {{ formData.title }}
    </div>

    <div
      v-else-if="formData.type === FormType.EDIT && formData.isShow"
      class="item"
    >
      <div class="label">
        <span v-if="formData.isRequired" class="required">*</span>
        {{ formData.title }}
      </div>

      <van-field
        v-model="formData.value"
        :placeholder="formData.placeholder"
        :rows="formData.options.rows"
        :autosize="formData.options.autosize"
        :type="formData.options.fieldType"
        :maxlength="formData.options.maxLenght"
        :show-word-limit="formData.options.showWordLimit"
        :clearable="formData.options.clearable"
        :required="formData.isRequired"
        :readonly="formData.readonly"
        :disabled="formData.readonly"
        :rules="[
          {
            required: formData.isRequired && !formData.readonly,
            message: '该选项为必填项'
          }
        ]"
      />
    </div>

    <div
      v-else-if="formData.type === FormType.READONLY && formData.isShow"
      class="item"
    >
      <div class="label">
        <span v-if="formData.isRequired" class="required">*</span>
        {{ formData.title }}
      </div>

      <van-field
        v-model="formData.valueName"
        :placeholder="formData.placeholder"
        :rows="formData.options.rows"
        :autosize="formData.options.autosize"
        :type="formData.options.fieldType"
        :maxlength="formData.options.maxLenght"
        :show-word-limit="formData.options.showWordLimit"
        :clearable="formData.options.clearable"
        :required="formData.isRequired"
        :readonly="true"
        :disabled="true"
        :rules="[
          {
            required: formData.isRequired,
            message: '该选项为必填项'
          }
        ]"
      />
    </div>

    <div
      v-else-if="formData.type === FormType.SELECT && formData.isShow"
      class="item"
    >
      <div class="label">
        <span v-if="formData.isRequired" style="color: red">*</span>
        {{ formData.title }}
      </div>

      <van-field
        v-model="formData.valueName"
        is-link
        readonly
        name="picker"
        :disabled="formData.readonly"
        :placeholder="formData.placeholder"
        @click="formData.options.showPicker = !formData.readonly"
        :clearable="formData.options.clearable"
        :required="formData.isRequired"
        :border="false"
        :rules="[
          {
            required: formData.isRequired && !formData.readonly,
            message: '该选项为必填项'
          }
        ]"
      />
      <van-popup v-model:show="formData.options.showPicker" position="bottom">
        <van-picker
          :columns="formData.options.columns"
          :default-index="formData.options.defaultIndex"
          :columns-field-names="formData.options.customFieldName"
          @confirm="onConfirm(formData, $event)"
          @cancel="formData.options.showPicker = false"
        />
      </van-popup>
    </div>

    <div
      v-else-if="formData.type === FormType.DATE && formData.isShow"
      class="item"
    >
      <div class="label">
        <span v-if="formData.isRequired" style="color: red">*</span>
        {{ formData.title }}
      </div>

      <van-field
        v-model="formData.value"
        is-link
        readonly
        name="datetimePicker"
        :disabled="formData.readonly"
        :placeholder="formData.placeholder"
        @click="formData.options.showPicker = !formData.readonly"
        :border="false"
        :clearable="formData.options.clearable"
        :required="formData.isRequired"
        :rules="[
          {
            required: formData.isRequired && !formData.readonly,
            message: '该选项为必填项'
          }
        ]"
      />
      <van-popup v-model:show="formData.options.showPicker" position="bottom">
        <van-datetime-picker
          :type="formData.options.type"
          @confirm="onDateConfirm(formData, $event)"
          @cancel="formData.options.showPicker = false"
          v-model="formData.options.defaultDate"
          :max-date="formData.options.maxDate"
          :min-date="formData.options.minDate"
        />
      </van-popup>
    </div>

    <div
      v-else-if="formData.type === FormType.PHOTO && formData.isShow"
      class="item"
    >
      <div style="position: relative">
        <div class="label">
          <span v-if="formData.isRequired" style="color: red">*</span>
          {{ formData.title }}
        </div>
        <van-icon name="add" size="25" class="right" />
      </div>
      <van-divider class="size"></van-divider>
      <van-field
        name="uploader"
        :required="formData.isRequired"
        :rules="[
          {
            required: formData.isRequired && !formData.readonly,
            message: '该选项为必填项'
          }
        ]"
      >
        <template #input>
          <van-uploader
            v-model="formData.value"
            multiple
            :max-count="formData.options.maxCount"
            accept="image/*"
            capture="camera"
            :readonly="formData.readonly"
            :before-read="beforeRead"
            :after-read="file => afterRead(formData, file)"
            :deletable="!formData.readonly"
            :show-upload="!formData.readonly"
          />
        </template>
      </van-field>
    </div>

    <div
      v-else-if="formData.type === FormType.UPLOADFILE && formData.isShow"
      class="item"
    >
      <div style="position: relative">
        <div class="label">
          <span v-if="formData.isRequired" style="color: red">*</span>
          {{ formData.title }}
        </div>
        <van-icon name="add" size="25" class="right" />
      </div>
      <van-divider class="size"></van-divider>
      <van-field
        name="uploader"
        :required="formData.isRequired"
        :rules="[
          {
            required: formData.isRequired && !formData.readonly,
            message: '该选项为必填项'
          }
        ]"
      >
        <template #input>
          <van-uploader
            v-model="formData.value"
            multiple
            :max-count="formData.options.maxCount"
            accept="/*"
            :readonly="formData.readonly"
            :after-read="file => afterRead(formData, file)"
            :deletable="!formData.readonly"
            :preview-size="[fileNameWidth, 30]"
          >
            <van-button type="primary" :disabled="formData.readonly"
              >上传文件</van-button
            >
            <template #preview-cover="{ name, file }">
              <div class="preview-cover van-ellipsis">
                {{ getFileName(name, file) }}
              </div>
            </template>
          </van-uploader>
        </template>
      </van-field>
      <a v-if="formData.value.length > 0" :href="formData.value[0].url" download
        >下载</a
      >
      <a
        class="display-flex"
        v-if="formData.options.template"
        :href="baseURL + formData.options.template"
        download
        >模板下载</a
      >
    </div>

    <div
      v-else-if="formData.type === FormType.STEPPER && formData.isShow"
      class="item"
    >
      <div class="label">
        <span v-if="formData.isRequired" class="required">*</span>
        {{ formData.title }}
      </div>

      <van-field
        name="stepper"
        :required="formData.isRequired"
        :rules="[
          {
            required: formData.isRequired && !formData.readonly,
            message: '该选项为必填项'
          }
        ]"
      >
        <template #input>
          <van-stepper :disabled="formData.readonly" v-model="formData.value" />
        </template>
      </van-field>
    </div>

    <div
      v-else-if="formData.type === FormType.CHECKBOX && formData.isShow"
      class="item"
    >
      <div class="label">
        <span v-if="formData.isRequired" class="required">*</span>
        {{ formData.title }}
      </div>
      <van-field
        name="checkboxGroup"
        :required="formData.isRequired"
        :rules="[
          {
            required: formData.isRequired && !formData.readonly,
            message: '该选项为必填项'
          }
        ]"
      >
        <template #input>
          <van-checkbox-group v-model="formData.value" direction="horizontal">
            <van-checkbox
              v-for="checkbox in formData.options.checkbox"
              :name="checkbox"
              :disabled="formData.readonly"
              shape="square"
              >{{ checkbox }}</van-checkbox
            >
          </van-checkbox-group>
        </template>
      </van-field>
    </div>

    <div
      v-else-if="formData.type === FormType.SELECT2 && formData.isShow"
      class="item"
    >
      <div class="label">
        <span v-if="formData.isRequired" style="color: red">*</span>
        {{ formData.title }}
      </div>

      <van-field
        v-model="formData.valueName"
        is-link
        readonly
        name="picker"
        :disabled="formData.readonly"
        :placeholder="formData.placeholder"
        @click="formData.options.showPicker = !formData.readonly"
        :clearable="formData.options.clearable"
        :required="formData.isRequired"
        :border="false"
        :rules="[
          {
            required: formData.isRequired && !formData.readonly,
            message: '该选项为必填项'
          }
        ]"
      />
      <van-popup
        v-model:show="formData.options.showPicker"
        position="bottom"
        class="popup"
        round
      >
        <PowerStationAndLine
          @confirm="onConfirm(formData, $event)"
        ></PowerStationAndLine>
      </van-popup>
    </div>

    <div
      v-else-if="formData.type === FormType.CUSTOMFORM && formData.isShow"
      class="item"
    >
      <div class="label">
        <span v-if="formData.isRequired" style="color: red">*</span>
        {{ formData.title }}
      </div>
      <slot name="customForm" :formEntity="formData"></slot>
    </div>
  </van-cell-group>
</template>

<script lang="ts" setup>
import { Toast } from "vant";
import DateUtils from "../../utils/DateUtils";
import Api from "../../http/Api";
import { Numeric } from "vant/lib/utils";
import { baseURL } from "../../http/request";
import LineUtils from "../../utils/LineUtils";
import { UploaderFileListItem } from "vant";
import PowerStationAndLine from "../line-base/PowerStationAndLine.vue";
import {
  ColumnOption,
  DynamicFormOption,
  FormInfo,
  FormType
} from "./useDynamicForm";
//文件名称的长度
const fileNameWidth = window.innerWidth - 45;
const emit = defineEmits(["onConfirm"]);
const props = defineProps({
  index: Number,
  formInfos: Array<FormInfo>
});
const formInfos = props.formInfos;
//记录动态表单的最后一次操作，动态表单多种情况下重置状态使用，key是title，value是选项动态表单的title列表
const formDataMap = new Map<string, Array<DynamicFormOption>>();
function onConfirm(currentFormInfo: FormInfo, currentValue: any) {
  if (Array.isArray(currentValue)) {
    if (currentValue.length == 0) {
      return;
    }
    let valueName = "";
    let value = "";
    for (const item of currentValue) {
      if (item) {
        if (currentFormInfo.options.customFieldName?.text) {
          const methodName: keyof typeof item =
            currentFormInfo.options.customFieldName?.text;
          valueName += item[methodName] + "/";
        }

        if (currentFormInfo.options.customFieldName?.values) {
          const methodName: keyof typeof item =
            currentFormInfo.options.customFieldName?.values;
          value = item[methodName];
        }
      }
    }
    currentFormInfo.value = value;
    currentFormInfo.valueName = valueName.substring(0, valueName.length - 1);
    currentFormInfo.options.showPicker = false;
  } else {
    let valueName = "";
    let value = "";
    if (currentFormInfo.options.customFieldName) {
      if (currentFormInfo.options.customFieldName.text) {
        const methodName: keyof typeof currentValue =
          currentFormInfo.options.customFieldName.text;
        valueName += currentValue[methodName];
      }

      if (currentFormInfo.options.customFieldName.values) {
        const methodName: keyof typeof currentValue =
          currentFormInfo.options.customFieldName.values;
        value = currentValue[methodName];
      }
    } else {
      value = currentValue.value;
      valueName = currentValue.text;
    }

    currentFormInfo.value = value;
    currentFormInfo.valueName = valueName;
    currentFormInfo.options.showPicker = false;
  }

  resetLastDynamicChildForm(currentFormInfo, currentValue);
  setDynamicChildForm(currentFormInfo);
  formDataMap.delete(currentFormInfo.title);
  console.log("当前选中：", currentValue);
  emit("onConfirm", {
    formData: currentFormInfo,
    currentValue: currentValue
  });
}

/**
 * 上次动态表单中的数据，需要重置状态
 * 只判断设置了dynamicFormOption的isHideOldForm为true的
 * @param currentFormInfo
 * @param currentValue
 */
function resetLastDynamicChildForm(
  currentFormInfo: FormInfo,
  currentValue: any
) {
  let lastCurrentValue: ColumnOption;
  if (Array.isArray(currentValue)) {
    lastCurrentValue = currentValue[currentValue.length - 1];
  } else {
    lastCurrentValue = currentValue;
  }
  const oldFormFormOptions = formDataMap.get(currentFormInfo.title);
  if (currentFormInfo && formInfos && oldFormFormOptions) {
    console.log("动态表单=====>上一次遗留的数据", oldFormFormOptions);
    for (const selectItemFormOption of oldFormFormOptions) {
      if (selectItemFormOption.isHideOldForm !== true) {
        continue;
      }
      const childFormInfoTypes = formInfos.filter((value: any) => {
        //只找出SELECT的选项，因为只有SELECT需要进行遍历子项的动态表单
        //在查找的过程中，顺便设置动态表单显示
        // console.log("动态表单显示隐藏=====>3", value, selectItemFormOption);
        if (value.title !== selectItemFormOption.title) {
          return false;
        }
        if (value.lineType !== selectItemFormOption.lineType) {
          return false;
        }
        // value.isShow = selectItemFormOption.isShow;
        return true;
      });
      //如果找到对应的选项，才进行下一步，一般都能找到，
      //而且只会有一个，所以取第一个就可以了
      if (childFormInfoTypes && childFormInfoTypes.length > 0) {
        const childFormInfoType = childFormInfoTypes[0];
        if (childFormInfoType) {
          childFormInfoType.isShow = false;
        }
      }
    }
  }
  currentFormInfo.options.condition = lastCurrentValue.condition;
  if (lastCurrentValue.dynamicFormOptions) {
    formDataMap.set(currentFormInfo.title, lastCurrentValue.dynamicFormOptions);
  }
}

/**
 * 动态表单操作显示隐藏
 * 检测当前表单是否有需要操作的子项，用链表关系next来判断
 * 1、首先判断当前SELECT是否赋值，如果没有直接跳过，否则2
 * 2、获取到当前选项选中的值，并且取到next，如果next没有值，直接跳过，否则3
 * 3、next是一个配置项，不确定是哪个form，
 *
 *
 * 1、首先判断当前SELECT是否赋值，如果没有直接跳过，否则2
 * 2、获取到当前的formOptions，每一个子项都查找到对应的form，然后判断是不是SELECt，如果是3，否则跳过
 * 3、递归每一项form，进行1、2操作，从而设置从父到子的formOptions值
 *
 *
 * 新方案，目前是这个
 * 1、首先判断当前SELECT是否赋值，如果没有直接跳过，否则2
 * 2、获取到当前的dynamicFormOptions, 每一个子项都查找到对应的form，然后判断是不是SELECt，如果是3，否则跳过
 * 3、递归每一项form，进行1、2操作，从而设置从父到子的dynamicFormOptions值
 *
 *
 * 2022/11/25：
 * 还有一种情况没考虑到，那就是子项已经是隐藏了，
 * 但是值还在，还会影响到子项递归的逻辑，
 * 需要再考虑一下怎么处理
 * 需要知道父项是显示还是隐藏的，才能判断出子项要显示还是隐藏
 * 还需要考虑子项是否动态加载的，如果是的话还要判断当前的状态是已经配置过了没，再通过配置的选项判断要显示还是隐藏
 *
 *
 */
function setDynamicChildForm(targetFormInfo: FormInfo) {
  if (!formInfos) {
    return;
  }
  if (targetFormInfo.type !== FormType.SELECT) {
    return;
  }
  //如果是选项式才进
  if (targetFormInfo.isShow === true) {
    // console.log(
    //   "setDynamicChildForm=====>1",
    //   targetFormInfoType,
    //   targetFormInfoType.options.columns
    // );
    //有值才能判断，否则直接跳过
    if (targetFormInfo.value === 0 || targetFormInfo.value) {
      //找到当前值对应的选项
      const selectItems = LineUtils.getSelectItem(
        targetFormInfo.options.columns,
        targetFormInfo.value,
        targetFormInfo.options.customFieldName
      );
      //正常应该都能找到
      if (selectItems.length > 0) {
        //取出最后一个,最后一个选项才配置了formOptions,hideFormOptions
        const selectItem = selectItems[selectItems.length - 1];
        // console.log("动态表单显示隐藏=====>", selectItem.dynamicFormOptions);
        //遍历选项，显示表单
        if (selectItem.dynamicFormOptions) {
          for (const selectItemFormOption of selectItem.dynamicFormOptions) {
            //配置的标题，所以通过标题去查找对应的form
            const childFormInfoTypes = formInfos.filter((value: any) => {
              //只找出SELECT的选项，因为只有SELECT需要进行遍历子项的动态表单
              //在查找的过程中，顺便设置动态表单显示
              // console.log("动态表单显示隐藏=====>3", value, selectItemFormOption);
              if (value.title !== selectItemFormOption.title) {
                return false;
              }
              if (value.lineType !== selectItemFormOption.lineType) {
                return false;
              }
              value.isShow = selectItemFormOption.isShow;
              return value.type === FormType.SELECT;
            });
            //如果找到对应的选项，才进行下一步，一般都能找到，
            //而且只会有一个，所以取第一个就可以了
            if (childFormInfoTypes && childFormInfoTypes.length > 0) {
              const childFormInfoType = childFormInfoTypes[0];
              //然后再递归继续下一层子项的操作
              setDynamicChildForm(childFormInfoType);
            } else {
            }
          }
        }
      }
    }
  } else {
    // console.log(
    //   "setDynamicChildForm=====>2",
    //   targetFormInfoType,
    //   targetFormInfoType.options.columns
    // );
    //有值才能判断，否则直接跳过
    if (targetFormInfo.value === 0 || targetFormInfo.value) {
      //找到当前值对应的选项
      const selectItems = LineUtils.getSelectItem(
        targetFormInfo.options.columns,
        targetFormInfo.value,
        targetFormInfo.options.customFieldName
      );
      //正常应该都能找到
      if (selectItems.length > 0) {
        //取出最后一个,最后一个选项才配置了formOptions,hideFormOptions
        const selectItem = selectItems[selectItems.length - 1];
        // console.log("动态表单显示隐藏=====>", selectItem.dynamicFormOptions);
        //遍历选项，显示表单
        if (selectItem.dynamicFormOptions) {
          for (const selectItemFormOption of selectItem.dynamicFormOptions) {
            //配置的标题，所以通过标题去查找对应的form
            const childFormInfoTypes = formInfos.filter((value: any) => {
              //只找出SELECT的选项，因为只有SELECT需要进行遍历子项的动态表单
              //在查找的过程中，顺便设置动态表单显示
              if (value.title !== selectItemFormOption.title) {
                return false;
              }
              if (value.lineType !== selectItemFormOption.lineType) {
                return false;
              }
              value.isShow = false;
              return value.type === FormType.SELECT;
            });
            //如果找到对应的选项，才进行下一步，一般都能找到，
            //而且只会有一个，所以取第一个就可以了
            if (childFormInfoTypes && childFormInfoTypes.length > 0) {
              const childFormInfoType = childFormInfoTypes[0];
              //然后再递归继续下一层子项的操作
              setDynamicChildForm(childFormInfoType);
            }
          }
        }
      }
    }
  }
}

function onDateConfirm(formData: FormInfo, value: string) {
  if (formData.options.formatter) {
    formData.value = DateUtils.DateFormat(
      new Date(value),
      formData.options.formatter
    );
  }
  formData.valueName = formData.value;
  formData.options.showPicker = false;
}

/**
 * 图片上传之前的操作，校验图片格式
 * @param file
 * @param detail
 */
function beforeRead(
  file: File | File[],
  detail: {
    name: Numeric;
    index: number;
  }
) {
  if (Array.isArray(file)) {
    for (const item of file) {
      if (item) {
        if (item.type !== "image/jpeg" && item.type !== "image/png") {
          Toast("请上传 jpg/png 格式图片");
          return false;
        }
      }
    }
  } else {
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      Toast("请上传 jpg/png 格式图片");
      return false;
    }
  }
  return true;
}

/**
 * 图片上传操作
 */
async function afterRead(
  formData: FormInfo,
  items: UploaderFileListItem | UploaderFileListItem[]
) {
  console.log(items);
  if (Array.isArray(items)) {
    for (const item of items) {
      if (item.file) {
        const uploadResponse = await Api.uploadImage(item.file);
        item.url = uploadResponse.url;
        // formData.value.push(item);
        console.log(formData.value);
      }
    }
  } else {
    if (items.file) {
      const uploadResponse = await Api.uploadImage(items.file);
      items.url = uploadResponse.url;
      // formData.value.push(items);
      console.log("添加附件=====>", formData);
    }
  }
}

// function deleteFile(
//   formData: FormInfoType,
//   items: UploaderFileListItem | UploaderFileListItem[]
// ) {
//   formData.options.photos.delete(formData.options.photos.length - 1);
//   console.log("删除附件=====>", formData);
// }

async function handleSuccess(formData: FormInfo, response: any) {
  // const uploadResponse = await Api.uploadImage(files[0]);
  formData.value.push(response.url);
  console.log("添加附件=====>", formData, response);
}

function getFileName(name: string, file: File): String {
  // console.log("附件值=====>", value, value instanceof );
  if (file) {
    return file.name;
  } else {
    return name;
  }
}

function onSelectFileChange() {
  // Toast("");
}
</script>

<style>
@import "./dynamicForm.css";
</style>
