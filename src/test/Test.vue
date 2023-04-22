<template>
  <van-button @click="onClick">测试弹框</van-button>

  <van-popup
    class="popup"
    v-model:show="show"
    position="bottom"
    round
    closeable
  >
    <!-- <SelectLinePopup @submit="submit"></SelectLinePopup> -->
  </van-popup>

  <!-- <van-popup
    class="popup"
    v-model:show="show"
    position="bottom"
    round
    closeable
  >
    <div>111</div>
  </van-popup> -->
</template>

<script lang="ts" setup>
import { ref } from "vue";
import SelectLinePopup from "../components/line-base/PowerStationAndLine.vue";
import { FacilityRow } from "../types/ActivityEntity";
const show = ref(false);
function onClick() {
  // Toast("点击操作");
  show.value = true;
}
function submit(value: FacilityRow) {
  show.value = false;
  console.log("父页面得到的结果=====>", value);
}
// const checkbox = ["aaa", "ccc", "bbb"];
// const nameValues = ["aaa", "bbb"];
// const indexValues = new Array<number>();
// for (const name of nameValues) {
//   indexValues.push(checkbox.indexOf(name));
// }
// console.log(indexValues);
// console.log(_.isEm);
</script>

<style>
.popup {
  width: 100%;
  max-height: 70%;
}
</style>
