<template>
  <van-nav-bar title="工作待办"/>
  <van-tabs v-model:active="active" @change="tabChange">
    <van-tab name="BACKLOG" title="待处理"></van-tab>
    <van-tab name="HAVE_FINISHED" title="已处理"></van-tab>
    <van-tab name="ALL_APPLY" title="已发起"></van-tab>
  </van-tabs>

  <PullRefreshLoadMore :pageSize="10" @loadList="loadData">
    <template #default>
      <ProcessCardList :dataSource="dataSource" :tableProps="tableProps">
        <template #cardBtnLeft="{ data }">
          <div class="process-card-btn-box" @click="onDeal(data)">
            <span>{{ }}</span>
          </div>
        </template>
        <template #cardBtnRight="{ data }">
          <div class="process-card-btn-box" @click="onDeal(data)">
            <span>查看</span>
          </div>
        </template>
      </ProcessCardList>
    </template>
  </PullRefreshLoadMore>
</template>

<script lang="ts" setup>
import {ProcessCardList} from '@/process/components';
import PullRefreshLoadMore from '@/components/PullRefreshLoadMore/PullRefreshLoadMore.vue'
import api from '@/process/api'
import {useAuthStore} from "@/store";

const authStore = useAuthStore()
const active = ref('BACKLOG')

const dataSource = ref([])

const tableProps = reactive([
  {
    name: 'submitOrg',
    label: '提报单位',
  },
  {
    name: 'name',
    label: '线路名称',
  },
  {
    name: 'hiddenTroubleTypeName',
    label: '隐患类型',
  },
  {
    name: 'discoverDate',
    label: '发现时间',
  },
])

const loadData = async () => {
  const params = {
    page: 1,
    size: 100,
    userId: authStore.userId,
    requestType: active.value,
    procDeKey: 'HIDDEN_TROUBLE_EVENT'
  }
  const {items} = await api.activiti.getProcessTaskList(params)
  dataSource.value = items.map(item => ({...item.processVariables, ...item}));
}

const tabChange = () => {
  loadData()
}

onMounted(() => {

  loadData()
})
</script>
