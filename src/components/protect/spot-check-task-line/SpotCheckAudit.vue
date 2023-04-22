<!-- 保护区抽检任务流程-保护区抽检任务审核 -->
<template>
  <van-form @submit="onSubmit" :scroll-to-error="true">
    <LineHeader
      :lineHeaderOptions="{
        title: '保护区抽检任务',
        placeholder: '保护区抽检任务审核'
      }"
    />
    <CollapseDynamicForm
      @onConfirm="onConfirm"
      @onCollapseChange="onCollapseChange"
      :accordion="true"
    />
    <!-- <LineFooter :lineFooter="ExterFormOptions.lineMap()" /> -->
    <div class="sizeBox"></div>
    <van-button class="footer" type="primary" native-type="submit" block
      >保存</van-button
    >
  </van-form>
</template>
<script lang="ts" setup>
import { Toast } from "vant";
import { useRoute } from "vue-router";
import { allDict } from "../../../data/AllDicts";
import { LineHeaderType } from "../../../types/ActivityEntity";
import {
  SpotCheckAuditEntity,
  SpotCheckAuditItemEntity,
  SpotCheckAuditDetailEntity
} from "../../../types/SpotCheckEntity";
import Api from "../../../http/Api";
import { ApiResponse } from "../../../http/request";
import JSONUtils from "../../../utils/JSONUtils";
import LineUtils from "../../../utils/LineUtils";
import CollapseDynamicForm from "../../form/CollapseDynamicForm.vue";
import { useCollapseFormInfoStore } from "../../form/DynamicFormStore";
import LineHeader from "../../line-base/LineHeader.vue";
import {
  FormInfo,
  LineType,
  FormType,
  CollapseFormInfo
} from "../../form/useDynamicForm";
const collapseFormInfosStore = useCollapseFormInfoStore();
const formInfos = new Array<FormInfo>(
  {
    lineType: LineType.PROTECT,
    type: FormType.READONLY,
    key: "facilityId",
    title: "线路名称",
    value: "",
    valueName: "",
    placeholder: "",
    isRequired: false,
    readonly: true,
    isShow: true,
    options: {
      fieldType: "text",
      maxLenght: 100,
      showWordLimit: false,
      clearable: true,
      key: "facilityName"
    }
  },
  {
    lineType: LineType.PROTECT,
    type: FormType.SELECT,
    key: "voltageLevel",
    title: "电压等级",
    value: "",
    valueName: "",
    placeholder: "请输入",
    isRequired: false,
    readonly: true,
    isShow: true,
    options: {
      columns: allDict.value.hidden_trouble_voltage
    }
  },
  {
    lineType: LineType.PROTECT,
    type: FormType.READONLY,
    key: "",
    title: "杆塔号",
    value: "",
    valueName: "",
    placeholder: "",
    isRequired: false,
    readonly: true,
    isShow: true,
    options: {
      fieldType: "text",
      maxLenght: 100,
      showWordLimit: false,
      clearable: true
    }
  },
  {
    lineType: LineType.PROTECT,
    type: FormType.READONLY,
    key: "userId",
    title: "抽检人员",
    value: "",
    valueName: "",
    placeholder: "",
    isRequired: false,
    readonly: true,
    isShow: true,
    options: {
      fieldType: "text",
      maxLenght: 100,
      showWordLimit: false,
      clearable: true,
      key: "username"
    }
  },
  {
    lineType: LineType.PROTECT,
    type: FormType.DATE,
    key: "checkTime",
    title: "抽检时间",
    value: "",
    valueName: "",
    placeholder: "请选择日期",
    isRequired: true,
    readonly: false,
    isShow: true,
    options: {
      type: "date",
      formatter: "yyyy-MM-dd",
      maxDate: new Date(),
      minDate: new Date(2020, 0, 1),
      defaultDate: new Date()
    }
  },
  {
    lineType: LineType.PROTECT,
    type: FormType.SELECT,
    key: "checkResult",
    title: "抽检结果",
    value: "",
    valueName: "",
    placeholder: "请选择",
    isRequired: true,
    readonly: false,
    isShow: true,
    options: {
      columns: allDict.value.pass_fail
    }
  },
  {
    lineType: LineType.PROTECT,
    type: FormType.PHOTO,
    key: "evidencePhoto",
    title: "佐证照片",
    value: [],
    valueName: "",
    placeholder: "请选择",
    isRequired: false,
    readonly: false,
    isShow: true,
    options: {
      maxCount: 9
    }
  }
);
const route = useRoute();
const id: string = route.query.id as string;
let currentCollapseIndex = 0; //当前展开的collapse
let currentSpotChekAuditDetailEntity: SpotCheckAuditDetailEntity;
let spotCheckAuditEntity: SpotCheckAuditEntity;
function getProtectTaskQueryInfoActiviti() {
  Api.getProtectTaskQueryInfoActiviti(
    id,
    function (res: ApiResponse<SpotCheckAuditEntity>) {
      if (res.success) {
        spotCheckAuditEntity = res.data;
        const list = new Array<CollapseFormInfo>();
        if (spotCheckAuditEntity.data) {
          for (let i = 0; i < spotCheckAuditEntity.data.length; i++) {
            const item = spotCheckAuditEntity.data[i];
            const newFormInfos = JSONUtils.JSONParseForDate(formInfos);
            const collapseDynamicForm: CollapseFormInfo = {
              title: item.facilityName ?? "",
              formInfos: newFormInfos,
              icon: "checked",
              iconColor: "#409eff",
              iconShow: item.checkResult !== null
            };
            list.push(collapseDynamicForm);
          }
          collapseFormInfosStore.collapseFormInfos = list;
          getProtectTaskQueryInfo(
            spotCheckAuditEntity.data[currentCollapseIndex],
            collapseFormInfosStore.collapseFormInfos[currentCollapseIndex]
          );
          console.log(collapseFormInfosStore.collapseFormInfos);
        }
      }
    }
  );
}

function onCollapseChange(activeNames: any) {
  // console.log("onCollapseChange=====>回调", activeNames);
  if (!activeNames && activeNames !== 0) {
    return;
  }
  //手风琴模式，只会展开一个
  if (Array.isArray(activeNames)) {
    return;
  }
  if (!spotCheckAuditEntity || !spotCheckAuditEntity.data) {
    return;
  }
  currentCollapseIndex = Number(activeNames);
  let spotCheckAuditItemEntity =
    spotCheckAuditEntity.data[currentCollapseIndex];
  const collapseDynamicForm =
    collapseFormInfosStore.collapseFormInfos[currentCollapseIndex];
  // console.log(
  //   "onCollapseChange=====>回调2",
  //   index,
  //   spotCheckAuditEntity.data,
  //   spotCheckAuditItemEntity
  // );
  getProtectTaskQueryInfo(spotCheckAuditItemEntity, collapseDynamicForm);
}

function getProtectTaskQueryInfo(
  spotCheckAuditItemEntity: SpotCheckAuditItemEntity,
  collapseDynamicForm: CollapseFormInfo
) {
  if (!spotCheckAuditItemEntity.taskId) {
    return;
  }
  Api.getProtectTaskQueryInfo(
    spotCheckAuditItemEntity.taskId,
    function (res: ApiResponse<SpotCheckAuditDetailEntity>) {
      if (res.success) {
        currentSpotChekAuditDetailEntity = res.data;
        LineUtils.setFormValue(
          spotCheckAuditItemEntity,
          collapseDynamicForm.formInfos
        );
        LineUtils.setFormValue(res.data, collapseDynamicForm.formInfos);
        console.log("给表单赋值======>", collapseDynamicForm.formInfos);
      }
    }
  );
}

getProtectTaskQueryInfoActiviti();
// getAllDict();
function onConfirm() {}
function onSubmit() {
  if (!spotCheckAuditEntity || !spotCheckAuditEntity.data) {
    return;
  }
  const collapseDynamicForm =
    collapseFormInfosStore.collapseFormInfos[currentCollapseIndex];
  const formValues = LineUtils.getSubmitFormValues(
    collapseDynamicForm.formInfos
  );
  // const spotCheckAuditItemEntity =
  //   spotCheckAuditEntity.data[currentCollapseIndex];
  currentSpotChekAuditDetailEntity.createTime = "";
  currentSpotChekAuditDetailEntity.updateTime = "";
  // formValues.checkId = spotCheckAuditEntity.id;
  // formValues.manageId = spotCheckAuditItemEntity.id;
  console.log(
    "提交=====>",
    currentCollapseIndex,
    formValues,
    Object.assign(currentSpotChekAuditDetailEntity, formValues)
  );
  const params = Object.assign(currentSpotChekAuditDetailEntity, formValues);
  Api.protectTaskAudit(params, function (res: ApiResponse<any>) {
    Toast(res.message);
  });
}
</script>

<style>
@import "../protect.css";
</style>
