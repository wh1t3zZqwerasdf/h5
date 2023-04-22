<template>
  <div class="line-item"><span class="line-title">流程</span></div>
  <div class="line">
    <div class="line-content-item" v-for="item in lineInfos">
      <div class="line-head">
        <van-image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          width="35"
          height="35"
          radius="4"
        ></van-image>
        <van-icon :name="item.icon" :color="item.color" size="15" />
      </div>

      <van-row style="position: relative">
        <van-col
          ><div class="line-title5">{{ item.title }}</div>
          <div class="line-title2">{{ item.content }}</div></van-col
        >
        <div class="line-date">
          <div class="line-title5">{{ item.timestamp }}</div>
        </div>
      </van-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useActivityStore } from "../form/DynamicFormStore";
import { storeToRefs } from "pinia";
import LineUtils from "../../utils/LineUtils";
import { LineEntity } from "../../types/ActivityEntity";
const props = defineProps({
  lineFooter: Map<String, LineEntity>
});
const lineMap = props.lineFooter;
const activityStore = useActivityStore();
const { activityEntity } = storeToRefs(activityStore);
const lineInfos = computed(() => {
  // console.log("啥情况======>1", activityEntity);
  if (lineMap) {
    return LineUtils.getLines(lineMap, activityEntity.value);
  }
});
</script>

<style>
@import "../line-base/Line.css";
</style>
