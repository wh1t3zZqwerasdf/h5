<!-- 外破流程 -->
<template>
  <van-form @submit="onSubmit" :scroll-to-error="true">
    <LineHeader
      :lineHeaderOptions="{
        title: '外破流程',
        placeholder: '电力设施产权人提报',
      }"
    />
    <CollapseDynamicForm @onConfirm="onConfirm" />
    <LineFooter :lineFooter="ExterFormOptions.lineMap()" />
    <div class="sizeBox"></div>
    <van-button
      v-if="targetActivityInfo.activityId !== 'end'"
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
LineHeaderType,
} from "../../types/ActivityEntity";
import { useRoute } from "vue-router";
import { ExterInfoEntity } from "../../types/ExterEntity";
import ExterFormOptions from "./ExterFormOptions";
import LineHeader from "../line-base/LineHeader.vue";
import LineFooter from "../line-base/LineFooter.vue";
const activityStore = useActivityStore();
const collapseFormInfosStore = useCollapseFormInfoStore();
const route = useRoute();
const id: string = route.query.id as string;
const exterInfoEntity = ref<ExterInfoEntity>(new ExterInfoEntity());
const activityEntity = ref<ActivityEntity>(new ActivityEntity());
const targetActivityInfo = ref<ActivityInfo>(new ActivityInfo());

async function getExterInfo() {
  if (!id) {
    return;
  }
  const apiResponse = await Api.getExterInfo(id);
  if (apiResponse.success) {
    exterInfoEntity.value = apiResponse.data;
    if (exterInfoEntity) {
      activityStore.exterInfoEntity = exterInfoEntity.value;
      if (exterInfoEntity.value.instanceId) {
        const apiResponse = await Api.getActivity(
          exterInfoEntity.value.instanceId
        );
        if (apiResponse.success) {
          activityEntity.value = apiResponse.data;
          targetActivityInfo.value = LineUtils.getTargetActivityInfo(
            activityEntity.value
          );
          activityStore.activityEntity = activityEntity.value;
          LineUtils.initCollapseForm(
            activityEntity.value,
            ExterFormOptions.allCollapse(),
            exterInfoEntity.value
          );
        }
      }
    }
  }
}
getExterInfo();

function onConfirm(data: any) {}

async function onSubmit() {
  const collapseDynamicFormInfo = collapseFormInfosStore.collapseFormInfos[0];
  let condition = LineUtils.getSubmitFormValues(
    collapseDynamicFormInfo.formInfos
  );
  exterInfoEntity.value.createTime = "";
  exterInfoEntity.value.updateTime = "";
  const formData = Object.assign(exterInfoEntity.value, condition);
  const targerTaskInfo = LineUtils.getTargetTaskInfo(activityEntity.value);
  console.log("表单提交=====>", formData);
  const nextStep = formData["nextStep"];
  if (nextStep == null) {
    formData.nextStep = true;
    condition.nextStep = true;
  }
  if (targerTaskInfo) {
    Api.updateExter(formData, targerTaskInfo, condition);
  }
}
</script>

<style>
@import "./Exter.css";
</style>
