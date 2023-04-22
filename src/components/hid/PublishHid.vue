<!-- 发布隐患 -->
<template>
  <van-form @submit="onSubmit">
    <LineHeader
      :lineHeaderOptions="{
        title: '隐患流程',
        placeholder: '电力设施产权人提报'
      }"
    />
    <DynamicFormNew @onConfirm="onConfirm" :formInfos="store.formInfos" />
    <LineFooter :lineFooter="HidFormOptions.lineMap()" />
    <div class="sizeBox"></div>
    <van-button class="footer" type="primary" native-type="submit" block
      >提交</van-button
    >
  </van-form>
</template>

<script lang="ts" setup>
import { useActivityStore, useFormStore } from "../form/DynamicFormStore";
import Api from "../../http/Api";
import { HidInfoEntity } from "../../types/HidEntity";
import { ActivityEntity } from "../../types/ActivityEntity";
import JSONUtils from "../../utils/JSONUtils";
import HidFormOptions from "./HidFormOptions";
import LineUtils from "../../utils/LineUtils";
import LineHeader from "../line-base/LineHeader.vue";
import LineFooter from "../line-base/LineFooter.vue";
import { FormInfo, FormType } from "../form/useDynamicForm";
import DynamicFormNew from "../form/DynamicFormNew.vue";
const store = useFormStore();
const activityStore = useActivityStore();
activityStore.activityEntity = new ActivityEntity();
activityStore.hidInfoEntity = new HidInfoEntity();

const formInfos: Array<FormInfo> = JSONUtils.JSONParseForDate(
  HidFormOptions.formInfos1()
);
for (const formInfo of formInfos) {
  formInfo.readonly = false;
}
store.saveForm(formInfos);

function onConfirm(data: any) {
  if (data) {
    const checkFormInfo: FormInfo = data.formData;
    switch (checkFormInfo.title) {
      case "隐患类型":
        {
          const name = data.currentValue[2].name;
          // const formOptions: Array<string> = data.currentValue[2].formOptions;
          const checkboxOptions = data.currentValue[2].checkboxOptions;
          // console.log("隐患类型选中的数据：", data);
          // console.log("隐患类型选中的动态表单数据：", formOptions);
          // console.log("隐患类型选中的隐患协调情况数据：", checkboxOptions);
          for (const formInfo of store.formInfos) {
            if (formInfo.title === "隐患协调情况") {
              formInfo.isShow = true;
              formInfo.options.checkbox = checkboxOptions;
            } else if (formInfo.title === "协调情况备注") {
              formInfo.isShow = true;
            } else if (
              formInfo.title.indexOf("隐患类型") != -1 &&
              formInfo.type === FormType.HEADER
            ) {
              formInfo.isShow = true;
              formInfo.title = "隐患类型-" + name;
            }
          }
        }
        break;
    }
  }
}

async function onSubmit() {
  const formValue = LineUtils.getSubmitFormValues(store.formInfos);
  // console.log(formValue);
  Api.addHid(formValue);
}
</script>

<style>
@import "./Hid.css";
</style>
