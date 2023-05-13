<template>
  <van-sticky>
    <van-nav-bar :safe-area-inset-top="true" title="工作待办">
      <template #right>
        <SearchDialog v-model="searchData" :form-props="searchProps" :org-search="false" @onSearch="loadData" />
      </template>
    </van-nav-bar>
    <van-tabs v-model:active="active" @change="tabChange">
      <van-tab name="BACKLOG" title="待处理"></van-tab>
      <van-tab name="HAVE_FINISHED" title="已处理"></van-tab>
      <van-tab name="ALL_APPLY" title="已发起"></van-tab>
    </van-tabs>
  </van-sticky>

  <!--  <PullRefreshLoadMore :pageSize="10" @loadList="loadData">-->
  <ProcessCardList :dataSource="dataSource" :loading="loading" :tableProps="tableProps">
    <template #cardBtn="{ data }">
      <div class="card-footer">
        <van-button class="process-btn" size="normal" type="primary" @click="routerPush(data)">
          {{ active === 'BACKLOG' ? '审核' : '查看' }}
        </van-button>
      </div>
    </template>
  </ProcessCardList>
  <!--  </PullRefreshLoadMore>-->
</template>

<script lang="ts" setup>
import { ProcessCardList } from '@/process/components';
import api from '@/process/api'
import { useAuthStore } from "@/store";
import SearchDialog from '@/components/search'
import { useWorkbench } from './useWorkbeanch'
import { useRouter } from "vue-router";
import { useState } from "@/composables";

const authStore = useAuthStore()
const router = useRouter()
const { routerPushArray, workbenchTypeArr } = useWorkbench()
const { loading } = useState()
const active = ref('BACKLOG')

const dataSource = ref([])
const searchData = ref({})

const tableProps = reactive([
  {
    name: 'submitStr',
    label: ''
  },
  {
    label: '提报人',
    name: 'startUserName'
  },
  {
    label: '提报时间',
    name: 'startTime'
  },
  {
    label: '提报单位',
    name: 'startOrgName'
  },
  {
    name: 'taskName',
    label: '当前节点'
  },
])

const searchProps = [
  {
    name: 'procDefKey',
    type: 'select-tag',
    label: '事件类型',
    options: workbenchTypeArr
  }
]

const loadData = async () => {
  loading.value = true
  const params = {
    page: 1,
    size: 100,
    userId: authStore.userInfo?.id,
    requestType: active.value,
    ...searchData.value
  }
  const { items } = await api.activiti.getProcessTaskList(params)
  loading.value = false
  dataSource.value = items.map(item => {
    const processVariables = item.processVariables
    item.startOrgName = processVariables?.startOrgName
    item.startUserName = processVariables?.startUserName
    item.submitStr = `${item.procDefName}`
    item.processStatus = item.processVariables?.processStatus || 1
    return item
  });
}

const routerPush = (data: any) => {
  console.log(data, '工作台-100-id');

  router.push({
    name: routerPushArray[data.procDefKey],
    query: {
      id: data.businessKey,
      type: active.value
    }
  })
}

const tabChange = () => {
  loadData()
}

onMounted(() => {

  loadData()
})
</script>

<style lang="less" scoped>
.card-footer {
  width: 100%;
  align-items: center;

  button {
    height: 30px;
  }
}
</style>
