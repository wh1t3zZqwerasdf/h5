<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import api from "@/api";
import { ProcessCardList } from '@/process/components';
import { testCard } from './composables/testCard'
import PullRefreshLoadMore from '@/components/PullRefreshLoadMore/PullRefreshLoadMore.vue'

/** const */
const { tableProps } = testCard()
const dataSource = ref<any[]>([]);
const loadings = ref(false)
/** events */
const emits = defineEmits(['loadList']);

/** methods */
async function getApi(pageNo: number, pageSize: number) {
  const params = { pageNo, pageSize }
  const { data } = await api.news.getNewsList({ page: pageNo, size: pageSize })
  // console.log(data, 'data');
  dataSource.value.push(...data.rows)
  return data
}


async function onLoadList({ pageNo, pageSize }: { pageNo: number, pageSize: number }) {
  try {
    const data = await getApi(pageNo, pageSize)
    // console.log(data.rows, 'onLoadListData');
    emits('loadList', data.rows);
    // console.log(data.rows, 'console.log(data.rows);');
  } catch (err) {
    console.error(err);
  }
}


function onDeal(data: any) {
  console.log('点击查看');
}

onMounted(() => {
  getApi(1, 10)
})
</script>
<template>
  <PullRefreshLoadMore @loadList="onLoadList" :pageSize="10">
    <template #default>
      <ProcessCardList :tableProps="tableProps" :dataSource="dataSource">
        <template #cardBtn="{ data }">
          <div class="process-card-btn-box" @click="onDeal(data)">
            <span>审核</span>
          </div>
        </template>
      </ProcessCardList>
    </template>
  </PullRefreshLoadMore>
</template>

<style lang="less" scoped></style>