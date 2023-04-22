<template>
  <div class="process-card-list">
    <div class="process-card-list-box" v-loading="loading">
      <van-row class="content-start" :gutter="10" v-show="dataSource && dataSource.length">
        <template v-for="(item, index) in dataSource" :key="index">
          <van-col class="card-item">
            <ProcessCard :tableProps="tableProps" :dataSource="item">
              <template #footer>
                <div class="card-btns">
                  <slot name="cardBtnRight" :data="item">
                  </slot>
                </div>
              </template>
            </ProcessCard>
          </van-col>
        </template>
      </van-row>
      <van-empty class="" v-show="!dataSource || !dataSource.length" description="暂无数据" />
    </div>
    <div class="list-footer">
      <slot name="pagination"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProcessCard from './components/ProcessCard.vue';
import { processCardListProps } from './props';
/* props */
const props = defineProps(processCardListProps);

/* emits */

/* hook */
/* data */

/* computed */

/* watch */

/* methods */
function pageChange() { }

onMounted(() => { });
</script>

<style lang="less" scoped>
.process-card-list {
  height: 100%;
  position: relative;

  &-box {
    height: calc(100% - 70px);
  }

  .card-item {
    padding: 0 !important;
    height: calc((100% - 24px) / 3);
  }
}

.card-btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // width: 50%;

}
</style>
