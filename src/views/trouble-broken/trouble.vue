<script lang="ts" setup>
import { useRouter } from 'vue-router'
import api from "@/api";
import { troubleList } from './composables/troubleList'
import ProcessCardList from './components/ProcessCardList.vue';
import PullRefreshLoadMore from '@/components/PullRefreshLoadMore/PullRefreshLoadMore.vue'
import { useMessage, useState } from '@/composables/index'
import SearchDialog from '@/components/search'
import { utcTime } from '@/utils';
import { usePage } from '@/composables'
import { useSystemStore } from '@/store';


/* const */
const { loading } = useState()
const { tableProps, searchProps } = troubleList()
const { pageNo, pageSize } = usePage()
const dataSource = ref<any[]>([]);
const searchData = ref({})
const total = ref<number>();
const router = useRouter()
const { handleResponse } = useMessage()
const systemStore = useSystemStore();


/** events */
const emits = defineEmits(['loadList']);


/* methods */
async function getApi() {
  loading.value = true
  const params = { page: pageNo.value, size: pageSize.value, statusType: 2, ...searchData.value }
  const { code, message, data } = await api.hid.queryList(params)
  console.log(data, 'data');

  if (!handleResponse({ code, message })) return;
  if (!data.rows) {
    dataSource.value = [];
    return;
  }
  if (pageNo.value === 1) {
    dataSource.value = data.rows.map(item => {
      item.discoverDate = utcTime(item.discoverDate);
      // item.position = `${item.cityName}${item.adminAddr}`;
      return item;
    })
    loading.value = false
    return
  }
  dataSource.value.push(...data.rows.map(item => {
    item.discoverDate = utcTime(item.discoverDate);
    // item.position = `${item.cityName}${item.adminAddr}`;
    return item;
  }));
  loading.value = false
}

// 查看
async function onView(data: any) {
  router.push({
    name: 'TroubleDetail',
    params: { id: data },
    query: { mode: 'view' }
  })
}

function statusText(data: any) {
  const statusDict = systemStore.dict.hidden_trouble_status;
  const dictItem = statusDict.find((item) => item.value === data);
  return dictItem ? dictItem.title : "";
}

const onClickLeft = () => history.back();


onMounted(() => {
  getApi()
})

</script>

<template>
  <div>
    <!-- @click="onClickLeft" -->
    <van-sticky>
      <van-nav-bar left-arrow left-text="" title="隐患列表" @click-left="onClickLeft">
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
            <!-- <van-tag>{{ statusText(data.status) }}</van-tag> -->
            <div class="process-card-btn-box" @click="onView(data.id)">
              <span>查看</span>
            </div>
          </template>
        </ProcessCardList>
      </template>
    </PullRefreshLoadMore>
  </div>
</template>

<style scoped>
.process-text {
  font-size: 12px;
}
</style>
