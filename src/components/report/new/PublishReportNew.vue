<!-- 发布举报 -->
<template>
  <van-form @submit="onSubmit">
    <LineHeader
      :lineHeaderOptions="{
        title: '举报流程',
        placeholder: '执法办经办提报',
      }"
    />
    <DynamicFormNew @onConfirm="onConfirm" :formInfos="store.formInfos" />
    <LineFooter :lineFooter="ReportFormOptions.lineMap()" />
    <div class="sizeBox"></div>
    <van-button class="footer" type="primary" native-type="submit" block
      >提交</van-button
    >
  </van-form>
</template>

<script lang="ts" setup>
import DynamicFormNew from "../../form/DynamicFormNew.vue";
import { useFormStore } from "../../form/DynamicFormStore";
import ReportFormOptions from "./ReportFormOptions";
import JSONUtils from "../../../utils/JSONUtils";
import LineUtils from "../../../utils/LineUtils";
import Api from "../../../http/Api";
import DateUtils from "../../../utils/DateUtils";
import LineHeader from "../../line-base/LineHeader.vue";
import LineFooter from "../../line-base/LineFooter.vue";
import { FormInfo } from "../../form/useDynamicForm";
const store = useFormStore();
const formEntitys: Array<FormInfo> = JSONUtils.JSONParseForDate(
  ReportFormOptions.formInfos1
);
for (const formEntity of formEntitys) {
  formEntity.readonly = false;
}
store.saveForm(formEntitys);
function onConfirm() {}
async function onSubmit() {
  const formValue = LineUtils.getSubmitFormValues(store.formInfos);
  const condition = {
    acceptTime: DateUtils.getNowDate(),
    status: 4,
    isNext: 1,
    nextStep: true
  };
  Object.assign(formValue, condition);
  const id = await Api.submitReport(formValue);
  if (id) {
    const apiResponse = await Api.getActivity(id);
    if (apiResponse.success) {
      const taskInfo = LineUtils.getTargetTaskInfo(apiResponse.data);
      Api.operationTask(taskInfo, condition);
    }
  }
}
</script>
