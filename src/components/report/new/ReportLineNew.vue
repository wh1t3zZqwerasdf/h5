<!-- 举报流程 -->
<template>
  <van-form @submit="onSubmit" :scroll-to-error="true">
    <LineHeader
      :lineHeaderType="{
        title: '举报流程',
        placeholder: '执法办经办提报',
      }"
    />
    <CollapseDynamicForm @onConfirm="onConfirm" />
    <LineFooter :lineFooter="ReportFormOptions.lineMap()" />
    <div class="sizeBox"></div>
    <van-button
      class="footer"
      type="primary"
      native-type="submit"
      block
      v-if="isMyTask"
      >提交</van-button
    >
  </van-form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { ActivityEntity, LineHeaderType } from "../../../types/ActivityEntity";
import Api from "../../../http/Api";
import LineUtils from "../../../utils/LineUtils";
import { FormInfo, FormType } from "../../form/useDynamicForm";
import {
  useActivityStore,
  useCollapseFormInfoStore
} from "../../form/DynamicFormStore";
import ReportFormOptions from "./ReportFormOptions";
import CollapseDynamicForm from "../../form/CollapseDynamicForm.vue";
import { ReportEntity } from "../../../types/ReportEntity";
import HidFormOptions from "../../hid/HidFormOptions";
import JSONUtils from "../../../utils/JSONUtils";
import ExterFormOptions from "../../exter/ExterFormOptions";
import { ApiResponse } from "../../../http/request";
import UserManager from "../../../utils/UserManager";
const activityStore = useActivityStore();
const collapseFormInfosStore = useCollapseFormInfoStore();
const route = useRoute();
const id: string = route.query.id as string;
const reportEntity = ref<ReportEntity>(new ReportEntity());
const activityEntity = ref<ActivityEntity>(new ActivityEntity());

let isMyTask = ref(false);

async function getReportInfo() {
  if (!id) {
    return;
  }
  const apiResponse = await Api.getReportInfo(id);
  if (apiResponse.success) {
    reportEntity.value = apiResponse.data;
    if (reportEntity) {
      activityStore.hidInfoEntity = reportEntity.value;
      if (reportEntity.value.instanceId) {
        const apiResponse = await Api.getActivity(
          reportEntity.value.instanceId
        );
        if (apiResponse.success) {
          activityEntity.value = apiResponse.data;
          activityStore.activityEntity = activityEntity.value;
          LineUtils.initCollapseForm(
            activityEntity.value,
            ReportFormOptions.allCollapse,
            reportEntity.value
          );
          const targetActivityInfo = LineUtils.getTargetActivityInfo(
            activityEntity.value
          );

          isMyTask.value =
            targetActivityInfo.assignee.indexOf(
              UserManager.getUserInfo().userInfo.id ?? ""
            ) !== -1 && targetActivityInfo.activityId !== "end";

          /**
           * 判断如果是电力设施产权人核实，需要添加相关隐患和外破的表单配置项
           */
          if (targetActivityInfo.activityId === "userTask3") {
            const collapseDynamicFormInfo3 =
              collapseFormInfosStore.collapseFormInfos[0];
            if (collapseDynamicFormInfo3) {
              const hidFormInfos = JSONUtils.JSONParseForDate(
                HidFormOptions.formInfos1()
              );
              const exterFormInfos = JSONUtils.JSONParseForDate(
                ExterFormOptions.formInfos1()
              );
              const hidAndExterFormInfos = hidFormInfos.concat(exterFormInfos);
              const transferFormInfos = new Array<FormInfo>();
              for (const formEntity of hidAndExterFormInfos) {
                if (
                  transferFormInfos.some((value: any) => {
                    return (
                      value.title === formEntity.title &&
                      value.lineType === formEntity.lineType
                    );
                  })
                ) {
                  continue;
                }
                formEntity.isShow = false;
                formEntity.readonly = false;
                transferFormInfos.push(formEntity);
              }
              collapseDynamicFormInfo3.formInfos =
                collapseDynamicFormInfo3.formInfos.concat(transferFormInfos);
              console.log(collapseDynamicFormInfo3);
            }
          }
        }
      }
    }
  }
}
getReportInfo();

function onConfirm(data: any) {
  if (data) {
    const checkFormInfo: FormInfo = data.formData;
    switch (checkFormInfo.title) {
      case "隐患类型":
        {
          const collapseDynamicFormInfo3 =
            collapseFormInfosStore.collapseFormInfos[0];
          const name = data.currentValue[2].name;
          for (const formEntity of collapseDynamicFormInfo3.formInfos) {
            if (formEntity.title === "隐患协调情况") {
              formEntity.isShow = true;
              const checkboxOptions = data.currentValue[2].checkboxOptions;
              formEntity.options.checkbox = checkboxOptions;
            } else if (formEntity.title === "协调情况备注") {
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
      case "外破类型":
        {
          const collapseDynamicFormInfo3 =
            collapseFormInfosStore.collapseFormInfos[0];
          const name = data.currentValue[2].name;
          for (const formEntity of collapseDynamicFormInfo3.formInfos) {
            if (formEntity.title === "现场情况简述") {
              formEntity.isShow = true;
              const checkboxOptions = data.currentValue[2].checkboxOptions;
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
  // console.log("表单提交=====>", collapseFormInfosStore.collapseFormInfos);
  const collapseDynamicFormInfo = collapseFormInfosStore.collapseFormInfos[0];
  let condition = LineUtils.getSubmitFormValues(
    collapseDynamicFormInfo.formInfos
  );
  console.log("表单提交前=====>", collapseDynamicFormInfo.formInfos);
  reportEntity.value.createTime = "";
  reportEntity.value.updateTime = "";
  const formData = Object.assign(reportEntity.value, condition);
  const targetActivityInfo = LineUtils.getTargetActivityInfo(
    activityEntity.value
  );
  const targerTaskInfo = LineUtils.getTargetTaskInfo(activityEntity.value);
  console.log("表单提交=====>", formData);
  if (targerTaskInfo) {
    if (targetActivityInfo.activityId === "userTask3") {
      const isOneself: boolean = formData["isOneself"];
      const disposeWay: number = formData["disposeWay"];
      if (isOneself === true) {
        Api.updateReport(formData, targerTaskInfo, condition);
      } else if (disposeWay === 1) {
        Api.addHidActiviti(formData, function (res: ApiResponse<any>) {
          if (res.success) {
            Api.updateReport(formData, targerTaskInfo, condition);
          }
        });
      } else if (disposeWay === 2) {
        Api.addExterActiviti(formData, function (res: ApiResponse<any>) {
          if (res.success) {
            Api.updateReport(formData, targerTaskInfo, condition);
          }
        });
      }
    } else {
      Api.updateReport(formData, targerTaskInfo, condition);
    }
  }
}
</script>

<style>
@import "./report.css";
</style>
