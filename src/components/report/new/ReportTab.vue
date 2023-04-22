<!-- 举报首页tab -->
<template>
  <van-tabs
    v-model:active="active"
    title-active-color="black"
    title-inactive-color="#9F9F9F"
    color="black"
    sticky
  >
    <van-tab title="发起提交" name="1"
      ><component :is="PublishReportNew" />
    </van-tab>
    <van-tab title="历史记录" name="2"
      ><component :is="ReportRecord" />
    </van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import ReportRecord from "./ReportRecord.vue";
import PublishReportNew from "./PublishReportNew.vue";
import { ref } from "vue";
const active = ref("1");
// const active = ref(getCurrentIndex());
// function onClickTab(
//   name: string | number,
//   title: string,
//   event: MouseEvent,
//   disabled: boolean
// ) {
//   window.localStorage.setItem("currentname", name.toString());
// }

// function getCurrentIndex() {
//   const name = window.localStorage.getItem("currentname");
//   if (name) {
//     // Toast(name);
//     return name;
//   }
//   return "1";
// }
</script>
<style></style>
