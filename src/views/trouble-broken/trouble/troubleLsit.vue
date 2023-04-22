<script setup lang="ts">
import tuozhan1 from '@/assets/images/qiehuan.png'
import api from "@/api";
import { troubleLsit } from './composables/troubleLsit'
import { ProcessCardList } from '@/process/components';
import PullRefreshLoadMore from '@/components/PullRefreshLoadMore/PullRefreshLoadMore.vue'

/* const */
const tuozhan = tuozhan1
const { tableProps } = troubleLsit()
const dataSource = ref<any[]>([]);
const total = ref<number>();

/** events */
const emits = defineEmits(['loadList']);

/** interfaces */
interface ListParams {
  page: number;
  size: number;
  total?: number;
}

/* methods */
async function getApi(params: ListParams = { page: 1, size: 10 }) {
  const { page, size, total } = params
  const { data } = await api.hid.queryList({ page, size, total })
  dataSource.value.push(...data.rows)
  return data
}

async function onLoadList(params: ListParams) {
  try {
    const { rows, total } = await getApi(params)
    emits('loadList', rows, total);
  } catch (err) {
    console.error(err);
  }
}

function onDeal(data: any) {
  console.log('点击查看');
}

onMounted(() => {
  getApi()
})


</script>

<template>
  <div>
    <van-nav-bar title="隐患列表" left-text="" left-arrow>
      <template #right>
        <img :src="tuozhan" size="14" />
      </template>
    </van-nav-bar>
    <PullRefreshLoadMore @loadList="(rows, total) => onLoadList({ rows, total })" @update:total="total = $event"
      :pageSize="10" :total="total">
      <template #default>
        <ProcessCardList :tableProps="tableProps" :dataSource="dataSource">
          <template #cardBtnRight="{ data }">
            <div class="process-card-btn-box" @click="onDeal(data)">
              <span>查看</span>
            </div>
          </template>
        </ProcessCardList>
      </template>
    </PullRefreshLoadMore>
  </div>
</template>

<style scoped></style>