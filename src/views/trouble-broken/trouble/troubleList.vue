<script setup lang="ts">
import tuozhan1 from '@/assets/images/qiehuan.png'
import api from "@/api";
import { troubleList } from './composables/troubleList'
import { ProcessCardList } from '@/process/components';
import PullRefreshLoadMore from '@/components/PullRefreshLoadMore/PullRefreshLoadMore.vue'
import FormBuild from '@/components/formBuild'

/* const */
const tuozhan = tuozhan1
const { tableProps, formPropsGroup } = troubleList()
const dataSource = ref<any[]>([]);
const total = ref<number>();
const show = ref(false);

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
  show.value = true
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
    <PullRefreshLoadMore @loadList="(rows, total) => onLoadList({ rows, total })" :pageSize="10" :total="total">
      <template #default>
        <ProcessCardList :tableProps="tableProps" :dataSource="dataSource">
          <template #cardBtn="{ data }">
            <div class="process-card-btn-box" @click="onDeal(data)">
              <span>查看</span>
            </div>
          </template>
        </ProcessCardList>
      </template>
    </PullRefreshLoadMore>
    <van-dialog v-model:show="show" show-cancel-button>
      <!-- <FormBuild :formPropsGroup="dialogPropsGroup"></FormBuild> -->
    </van-dialog>
  </div>
</template>

<style scoped></style>