<!-- 发布外破 -->
<template>
  <van-form @submit="onSubmit">
    <LineHeader
      :lineHeaderOptions="{
        title: '外破流程',
        placeholder: '电力设施产权人提报'
      }"
    />
    <DynamicFormNew @onConfirm="onConfirm" :formInfos="store.formInfos" />
    <LineFooter :lineFooter="ExterFormOptions.lineMap()" />
    <div class="sizeBox"></div>
    <van-button class="footer" type="primary" native-type="submit" block
      >提交</van-button
    >
  </van-form>
</template>

<script lang="ts" setup>
import { FormType, FormInfo } from "../form/useDynamicForm";
import { useActivityStore, useFormStore } from "../form/DynamicFormStore";
import { getExterClass } from "../../data/AllDicts";
import { ActivityEntity, LineHeaderType } from "../../types/ActivityEntity";
import { ExterInfoEntity } from "../../types/ExterEntity";
import DynamicFormNew from "../form/DynamicFormNew.vue";
import Api from "../../http/Api";
import ExterFormOptions from "./ExterFormOptions";
import JSONUtils from "../../utils/JSONUtils";
import LineUtils from "../../utils/LineUtils";
import LineHeader from "../line-base/LineHeader.vue";
import LineFooter from "../line-base/LineFooter.vue";
const store = useFormStore();
const activityStore = useActivityStore();
activityStore.activityEntity = new ActivityEntity();
activityStore.exterInfoEntity = new ExterInfoEntity();
getExterClass();
// console.log("转换前=====>", ExterFormOptions.formEntitys1);
const formEntitys: Array<FormInfo> = JSONUtils.JSONParseForDate(
  ExterFormOptions.formInfos1()
);
// console.log("转换后=====>", formEntitys);
for (const formEntity of formEntitys) {
  formEntity.readonly = false;
}
store.saveForm(formEntitys);

// function onSelectLineSubmit(value: FacilityRow) {
//   show.value = false;
//   const formEntity = store.formEntitys.filter((item: FormInfo) => {
//     return item.title === "电站/线路名称";
//   })[0];
//   formEntity.value = value.id;
//   formEntity.valueName = value.name;
//   console.log("选择了哪条线路======>", value, formEntity);
// }
// function onClick(formEntity: FormInfo) {
//   if (formEntity.title === "电站/线路名称") {
//     show.value = true;
//   }
//   console.log("点击了哪个表单======>", formEntity);
// }

function onConfirm(data: any) {
  if (data) {
    const checkFormInfo: FormInfo = data.formData;
    switch (checkFormInfo.title) {
      case "外破类型":
        {
          const name = data.currentValue[2].name;
          const checkboxOptions = data.currentValue[2].checkboxOptions;
          for (const formEntity of store.formInfos) {
            if (formEntity.title === "现场情况简述") {
              formEntity.isShow = true;
              formEntity.options.checkbox = checkboxOptions;
            } else if (formEntity.title === "现场情况备注") {
              formEntity.isShow = true;
            } else if (
              formEntity.title.indexOf("隐患类型") != -1 &&
              formEntity.type === FormType.HEADER
            ) {
              formEntity.isShow = true;
              formEntity.title = "隐患类型-" + name;
            }
          }
        }
        break;
    }
  }
}

async function onSubmit() {
  const formValue = LineUtils.getSubmitFormValues(store.formInfos);
  console.log("新增外破=====>", formValue);
  Api.addExter(formValue);
}
</script>

<style>
@import "./Exter.css";
</style>
