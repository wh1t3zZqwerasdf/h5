<template>
  <div class="line-item">
    <h1 class="line-title">{{ lineHeaderOptions?.title }}</h1>
    <p class="line-state">
      {{ targetTaskInfo?.name ?? lineHeaderOptions?.placeholder }}
    </p>
  </div>
  <van-divider class="line-divider-10"> </van-divider>
</template>

<script lang="ts" setup>
import { computed, PropType } from "vue";
import LineUtils from "../../utils/LineUtils";
import { useActivityStore } from "../form/DynamicFormStore";
import { storeToRefs } from "pinia";
import { LineHeaderType } from "../../types/ActivityEntity";

const props = defineProps({
  lineHeaderOptions: {
    type: Object as PropType<LineHeaderType>,
    required: true
  }
});
const lineHeaderOptions = props.lineHeaderOptions;
const activityStore = useActivityStore();
const { activityEntity } = storeToRefs(activityStore);

const targetTaskInfo = computed(() => {
  if (activityEntity) {
    return LineUtils.getTargetTaskInfo(activityEntity.value);
  }
});
</script>

<style>
@import "../line-base/Line.css";
</style>
