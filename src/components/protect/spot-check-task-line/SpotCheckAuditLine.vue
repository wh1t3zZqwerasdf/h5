<!-- 保护区抽检任务流程-保护区抽检任务审核 -->
<template>
  <van-form @submit="onSubmit" :scroll-to-error="true">
    <LineHeader
      :lineHeaderOptions="{
        title: '保护区抽检计划审核',
        placeholder: '执法办经办提报',
      }"
    />
    <CollapseDynamicForm @onConfirm="onConfirm">
      <template #customForm="data">
        <div
          v-for="(item, index) in data.formEntity.options.data"
          class="spot-check-item"
        >
          <van-row justify="space-between" class="spot-check-item-relative">
            <van-col span="24" class="spot-check-item-right-content"
              ><van-tag type="primary">序号{{ index + 1 }}</van-tag></van-col
            >
          </van-row>
          <div class="spot-check-size-box-10"></div>
          <van-row justify="space-between" class="spot-check-item-relative">
            <van-col span="6" class="spot-check-item-title">线路名称</van-col>
            <van-col span="18" class="spot-check-item-right-content">{{
              item.facilityName
            }}</van-col>
          </van-row>
          <div class="spot-check-size-box-10"></div>
          <van-row justify="space-between" class="spot-check-item-relative">
            <van-col span="6" class="spot-check-item-title">电压等级</van-col>
            <van-col span="18" class="spot-check-item-right-content">{{
              getVoltageLevelName(item)
            }}</van-col>
          </van-row>
          <div class="spot-check-size-box-10"></div>
          <van-row justify="space-between" class="spot-check-item-relative">
            <van-col span="6" class="spot-check-item-title">划定状态</van-col>
            <van-col span="18" class="spot-check-item-right-content">{{
              LineUtils.getSelectItem(
                allDict.delimit_status,
                item.processStatus
              )[0].label
            }}</van-col>
          </van-row>
          <van-row justify="space-between" class="spot-check-item-relative">
            <van-col span="6" class="spot-check-item-title">批复文号</van-col>
            <van-col span="18" class="spot-check-item-right-content">{{
              item.replyNum
            }}</van-col>
          </van-row>
          <van-row justify="space-between" class="spot-check-item-relative">
            <van-col span="6" class="spot-check-item-title">批复时间</van-col>
            <van-col span="18" class="spot-check-item-right-content">{{
              DateUtils.DateFormat(new Date(item.replyTime), "yyyy-MM-dd")
            }}</van-col>
          </van-row>
          <van-row justify="space-between" class="spot-check-item-relative">
            <van-col span="6" class="spot-check-item-title">发布时间</van-col>
            <van-col span="18" class="spot-check-item-right-content">{{
              DateUtils.DateFormat(new Date(item.releaseTime), "yyyy-MM-dd")
            }}</van-col>
          </van-row>
          <van-row justify="space-between" class="spot-check-item-relative">
            <van-col span="6" class="spot-check-item-title">抽检次数</van-col>
            <van-col
              span="18"
              class="spot-check-item-right-content"
              >{{
            }}</van-col>
          </van-row>
          <van-row justify="space-between" class="spot-check-item-relative">
            <van-col span="6" class="spot-check-item-title">抽检人员</van-col>
            <van-col
              @click="onSelectUserClick(item)"
              span="18"
              class="spot-check-item-right-content"
              >{{ item.username }}</van-col
            >
          </van-row>
          <van-divider
            v-if="
              spotCheckAuditEntity?.data &&
              index !== spotCheckAuditEntity?.data?.length - 1
            "
            class="spot-check-divider"
          >
          </van-divider>
        </div>
      </template>
    </CollapseDynamicForm>
    <!-- <LineFooter :lineFooter="ExterFormOptions.lineMap()" /> -->
    <div class="sizeBox"></div>
    <van-button class="footer" type="primary" native-type="submit" block
      >保存</van-button
    >
  </van-form>
  <UserPicker
    :show="show"
    @onConfirm="onUserPickerConfirm"
    @onCancel="onUserPickerCancel"
  ></UserPicker>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { allDict } from "../../../data/AllDicts";
import {
  ActivityEntity,
  ActivityInfo,
  LineHeaderType,
  TaskInfo
} from "../../../types/ActivityEntity";
import {
  SpotCheckAuditEntity,
  SpotCheckAuditItemEntity
} from "../../../types/SpotCheckEntity";
import Api from "../../../http/Api";
import { ApiResponse } from "../../../http/request";
import DateUtils from "../../../utils/DateUtils";
import LineUtils from "../../../utils/LineUtils";
import UserPicker from "../../base/UserPicker.vue";
import CollapseDynamicForm from "../../form/CollapseDynamicForm.vue";
import {
  useActivityStore,
  useCollapseFormInfoStore
} from "../../form/DynamicFormStore";
import LineHeader from "../../line-base/LineHeader.vue";
import SpotCheckFormOptions from "./SpotCheckFormOptions";
import { FormInfo } from "../../form/useDynamicForm";

const show = ref(false);
const route = useRoute();
const id: string = route.query.id as string;
const spotCheckAuditEntity = ref<SpotCheckAuditEntity>();
const activityEntity = ref<ActivityEntity>(new ActivityEntity());
const targetActivityInfo = ref<ActivityInfo>(new ActivityInfo());
const targerTaskInfo = ref<TaskInfo>(new TaskInfo());
const activityStore = useActivityStore();
const collapseFormInfosStore = useCollapseFormInfoStore();
let currentSpotCheckAuditItemEntity: SpotCheckAuditItemEntity | null;

/**
 * 选择抽检人员
 */
function onSelectUserClick(item: SpotCheckAuditItemEntity) {
  currentSpotCheckAuditItemEntity = item;
  show.value = true;
}
function onUserPickerCancel(isShow: boolean) {
  currentSpotCheckAuditItemEntity = null;
  show.value = isShow;
}

function onUserPickerConfirm(currentValue: any) {
  // console.log("==============0", currentValue[0]);
  if (currentSpotCheckAuditItemEntity) {
    // console.log("==============1", currentSpotCheckAuditItemEntity);
    currentSpotCheckAuditItemEntity.userId = currentValue[0].id;
    currentSpotCheckAuditItemEntity.username = currentValue[0].name;
    // console.log("==============2", currentSpotCheckAuditItemEntity);
  }
}

function protectCheckInfo() {
  Api.protectCheckInfo(
    id,
    async function (res: ApiResponse<SpotCheckAuditEntity>) {
      if (res.success) {
        spotCheckAuditEntity.value = res.data;
        const apiResponse = await Api.getActivity(
          spotCheckAuditEntity.value.instanceId!
        );
        if (apiResponse.success) {
          activityEntity.value = apiResponse.data;
          targerTaskInfo.value = LineUtils.getTargetTaskInfo(
            activityEntity.value
          );
          targetActivityInfo.value = LineUtils.getActivityInfoByTaskId(
            activityEntity.value,
            targerTaskInfo.value.id
          );
          activityStore.activityEntity = activityEntity.value;

          const allCollapse = SpotCheckFormOptions.allCollapse();
          const collapseDynamicForm = allCollapse.get("userTask1");
          if (collapseDynamicForm) {
            const formEntity = collapseDynamicForm.formInfos.filter(
              (value: FormInfo) => {
                return value.title === "抽检对象";
              }
            )[0];
            formEntity.options.data = spotCheckAuditEntity.value.data;
            // console.log("aaaaaaaaaaaaaaaa", allCollapse);
          }
          LineUtils.initCollapseForm(
            activityEntity.value,
            allCollapse,
            spotCheckAuditEntity.value
          );
          // console.log(
          //   "collapseFormInfosStore添加完成后的值=====>",
          //   collapseFormInfosStore.collapseFormInfos
          // );
        }
      }
    }
  );
}
protectCheckInfo();

/**
 * 获取电压等级的字典名称
 * @param item
 */
function getVoltageLevelName(item?: SpotCheckAuditItemEntity): string {
  if (!item) {
    return "";
  }
  if (!item.voltageLevel) {
    return "";
  }
  const items = LineUtils.getSelectItem(
    allDict.value.hidden_trouble_voltage,
    item.voltageLevel
  );
  // console.log("电压等级=====>2", items);
  if (!items || items.length === 0) {
    return "";
  }
  return items[items.length - 1].label;
}

function onConfirm() {}
function onSubmit() {
  if (
    !spotCheckAuditEntity ||
    !spotCheckAuditEntity.value ||
    !spotCheckAuditEntity.value.data
  ) {
    return;
  }
  const collapseDynamicForm = collapseFormInfosStore.collapseFormInfos[0];
  const condition = LineUtils.getSubmitFormValues(
    collapseDynamicForm.formInfos
  );
  console.log("提交任务=====>1", collapseFormInfosStore.collapseFormInfos);
  spotCheckAuditEntity.value.createTime = "";
  spotCheckAuditEntity.value.updateTime = "";
  // condition.checkId = spotCheckAuditEntity.value.id;
  // condition.manageId = spotCheckAuditEntity.value.id;
  const spotCheckUsers = new Array<{
    manageId: string;
    userId: String;
    id: String;
  }>();
  if (targetActivityInfo.value.activityId === "userTask1") {
    condition.nextStep = true;
    condition.status = 3;

    const formEntity = collapseDynamicForm.formInfos.filter(
      (value: FormInfo) => {
        return value.title === "抽检对象";
      }
    )[0];

    if (formEntity.options.data) {
      for (const iterator of formEntity.options.data) {
        spotCheckUsers.push({
          manageId: iterator.id,
          userId: iterator.userId,
          id: iterator.taskId
        });
      }
      console.log("提交=====>222", spotCheckUsers);
    }
  }
  console.log("提交=====>", condition);
  Api.operationTaskCallback(
    targerTaskInfo.value,
    condition,
    function (res: ApiResponse<string>) {
      console.log("提交=====>3", res);
      if (res.success) {
        console.log("提交=====>4", spotCheckUsers);
        if (spotCheckUsers.length > 0) {
          Api.protectCheckAudit(
            spotCheckAuditEntity.value?.id!,
            spotCheckUsers,
            function (res: ApiResponse<any>) {
              if (res.success) {
              }
            }
          );
        }
      }
    }
  );
}
</script>

<style>
@import "../protect.css";

.spot-check-item {
  text-align: left;
  margin: 0px;
  padding: 0px;
}
.spot-check-item-title {
  font-size: 14px;
  color: #9f9f9f;
  text-align: start;
}
.spot-check-item-right-content {
  color: black;
  font-size: 14px;
  text-align: right;
}
.spot-check-item-relative {
  position: relative;
  display: flex;
  margin-bottom: 10px;
}
.spot-check-size-box-10 {
  height: 0px;
}
.spot-check-divider {
  border-style: none;
  height: 1px;
  padding: 0;
  margin-top: 10px;
  background-color: #f2f3f5;
}
</style>
