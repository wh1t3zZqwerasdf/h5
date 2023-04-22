<!-- 抽检对象的子项 -->
<template>
  <div class="spot-check-item">
    <van-row justify="space-between" class="spot-check-item-relative">
      <van-col span="6" class="spot-check-item-title">{{ item?.key }}</van-col>
      <van-col span="18" class="spot-check-item-right-content">{{
        item?.value
      }}</van-col>
    </van-row>
  </div>
</template>

<script lang="ts" setup>
import { Item } from "./Item";

const props = defineProps({
  item: Item
});
const item = props.item;
</script>
