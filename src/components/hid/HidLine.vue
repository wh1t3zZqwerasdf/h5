<!-- 隐患流程页面 -->
<template>
  <van-form @submit="onSubmit" :scroll-to-error="true">
    <LineHeader
      :lineHeaderOptions="{
        title: '隐患流程',
        placeholder: '电力设施产权人提报',
      }"
    />
    <CollapseDynamicForm @onConfirm="onConfirm" />
    <LineFooter :lineFooter="HidFormOptions.lineMap()" />
    <div class="sizeBox"></div>
    <van-button
      :v-if="targetActivityInfo.activityId === 'userTask1'"
      class="footer"
      type="primary"
      native-type="submit"
      block
      >提交</van-button
    >
  </van-form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { HidInfoEntity } from "../../types/HidEntity";
import Api from "../../http/Api";
import {
  useActivityStore,
  useCollapseFormInfoStore
} from "../form/DynamicFormStore";
import CollapseDynamicForm from "../form/CollapseDynamicForm.vue";
import LineUtils from "../../utils/LineUtils";
import {
  ActivityEntity,
  ActivityInfo,
  LineHeaderType
} from "../../types/ActivityEntity";
import { useRoute } from "vue-router";
import HidFormOptions from "./HidFormOptions";
import LineHeader from "../line-base/LineHeader.vue";
import LineFooter from "../line-base/LineFooter.vue";
const activityStore = useActivityStore();
const collapseFormInfosStore = useCollapseFormInfoStore();
const route = useRoute();
const id: string = route.query.id as string;
const hidInfoEntity = ref<HidInfoEntity>({});
const activityEntity = ref<ActivityEntity>(new ActivityEntity());
const targetActivityInfo = ref<ActivityInfo>(new ActivityInfo());

async function getHidInfo() {
  if (!id) {
    return;
  }
  const apiResponse = await Api.getHidInfo(id);
  if (apiResponse.success) {
    hidInfoEntity.value = apiResponse.data;
    if (hidInfoEntity) {
      activityStore.hidInfoEntity = hidInfoEntity.value;
      if (hidInfoEntity.value.instanceId) {
        const apiResponse = await Api.getActivity(
          hidInfoEntity.value.instanceId
        );
        if (apiResponse.success) {
          activityEntity.value = apiResponse.data;
          targetActivityInfo.value = LineUtils.getTargetActivityInfo(
            activityEntity.value
          );
          activityStore.activityEntity = activityEntity.value;
          LineUtils.initCollapseForm(
            activityEntity.value,
            HidFormOptions.allCollapse(),
            hidInfoEntity.value
          );
        }
      }
    }
  }
}
getHidInfo();

function onConfirm(data: any) {}

async function onSubmit() {
  const collapseDynamicFormInfo = collapseFormInfosStore.collapseFormInfos[0];
  let condition = LineUtils.getSubmitFormValues(
    collapseDynamicFormInfo.formInfos
  );
  hidInfoEntity.value.createTime = "";
  hidInfoEntity.value.updateTime = "";
  const formData = Object.assign(hidInfoEntity.value, condition);
  const targerTaskInfo = LineUtils.getTargetTaskInfo(activityEntity.value);
  console.log("表单提交=====>", formData);
  const nextStep = formData["nextStep"];
  if (nextStep == null) {
    formData.nextStep = true;
    condition.nextStep = true;
  }
  if (targerTaskInfo) {
    Api.updateHid(formData, targerTaskInfo, condition);
  }
}
</script>

<style>
@import "./Hid.css";
</style>
