<!-- 隐患首页tab -->
<template>
  <van-tabs
    v-model:active="active"
    title-active-color="black"
    title-inactive-color="#9F9F9F"
    color="black"
    sticky
  >
    <van-tab title="发起提交" name="1"><component :is="PublishHid" /> </van-tab>
    <van-tab title="历史记录" name="2"><component :is="HidRecord" /> </van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import PublishHid from "./PublishHid.vue";
import HidRecord from "./HidRecord.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const active = ref("1");
// function onClickTab(value: any) {
//   // name = value.name;
//   route.query.name = value.name;
//   // Toast(JSON.stringify(value));
//   // window.localStorage.setItem("currentname", value.name);
// }

// function getCurrentIndex() {
//   // const name = window.localStorage.getItem("currentname");
//   if (route.query.name) {
//     return route.query.name;
//   }
//   return "1";
// }
</script>
<style></style>
