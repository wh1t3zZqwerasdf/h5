<template>
  <div class="process-card-list">
    <div v-loading="loading" class="process-card-list-box">
      <van-row v-show="dataSource && dataSource.length" :gutter="10" class="content-start">
        <template v-for="(item, index) in dataSource" :key="index">
          <van-col class="card-item">
            <ProcessCardChildren :dataSource="item" :tableProps="tableProps">
              <template #footer>
                <div class="card-btns">
                  <slot :data="item" name="cardBtn">
                  </slot>
                </div>
              </template>
            </ProcessCardChildren>
          </van-col>
        </template>
      </van-row>
      <van-empty v-show="!dataSource || !dataSource.length" class="" description="暂无数据" />
    </div>
    <div class="list-footer">
      <slot name="pagination"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProcessCardChildren from './ProcessCardChildren.vue';
import { processCardListProps } from '@/process/components/processCard/src/props';
/* props */
const props = defineProps(processCardListProps);

/* emits */

/* hook */
/* data */

/* computed */

/* watch */

/* methods */
function pageChange() {
}

onMounted(() => {
});
</script>

<style lang="less" scoped>
.process-card-list {
  height: 100%;
  position: relative;

  &-box {
    height: calc(100% - 70px);
  }

  .card-item {
    width: 100%;
    padding: 0 !important;
    height: calc((100% - 24px) / 3);
  }
}

.card-btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
