<script setup lang="ts">
import api from "@/api";
import { useRouter } from 'vue-router'
import SearchDialog from '@/components/search'
import ProcessCardList from '@/views/trouble-broken/components/ProcessCardList.vue';
import PullRefreshLoadMore from '@/components/PullRefreshLoadMore/PullRefreshLoadMore.vue'
import { useBroken } from './composables';
import { useMessage, useState } from '@/composables/index'
import { usePage } from '@/composables'
import { useSystemStore } from '@/store';
import { utcTime } from "@/utils";
/* const */
const router = useRouter()
const searchData = ref({})
const dataSource = ref<any[]>([]);
const { searchProps, tableProps } = useBroken()
const { loading } = useState()
const { pageNo, pageSize } = usePage()
const { handleResponse } = useMessage()
const total = ref<number>();
const systemStore = useSystemStore();


/* methods */
const onClickLeft = () => history.back();

function onView(data: any) {
  const params = { mode: 'view', id: data }
  router.push({
    name: 'BrokenDetail',
    state: { params }
  })
}


function statusText(data: any) {
  const statusDict = systemStore.dict.hidden_trouble_status;
  const dictItem = statusDict.find((item) => item.value === data);
  return dictItem ? dictItem.title : "";
}

async function getApi() {
  loading.value = true
  const params = { page: pageNo.value, size: pageSize.value, statusType: 2, ...searchData.value }
  const { code, message, data } = await api.exter.queryList(params)
  if (!handleResponse({ code, message })) return;
  if (!data.rows) {
    dataSource.value = [];
    return
  }
  if (pageNo.value === 1) {
    dataSource.value = data.rows.map(item => {
      item.dataSource = utcTime(item.dataSource)
      return item
    })
    loading.value = false
    return
  }
  dataSource.value.push(...data.rows.map(item => {
    item.dataSource = utcTime(item.dataSource)
    return item
  }))
  loading.value = false
}

onMounted(() => {
  getApi()
})

</script>

<template>
  <van-sticky>
    <van-nav-bar left-arrow left-text="" title="外破列表" @click-left="onClickLeft">
      <template #right>
        <SearchDialog v-model="searchData" :form-props="searchProps" @onSearch="getApi" />
      </template>
    </van-nav-bar>
  </van-sticky>
  <PullRefreshLoadMore v-model:page-no="pageNo" :loading="loading" :pageSize="pageSize" :total="total" @reLoad="getApi">
    <template #default>
      <ProcessCardList :dataSource="dataSource" :tableProps="tableProps">
        <template #cardBtn="{ data }">
          <span class="process-text">{{ statusText(data.status) }}</span>
          <div class="process-card-btn-box" @click="onView(data.id)">
            <span>查看</span>
          </div>
        </template>
      </ProcessCardList>
    </template>
  </PullRefreshLoadMore>
</template>

<style scoped>
.process-text {
  font-size: 12px;
}
</style>