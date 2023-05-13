<script setup lang="ts">
import api from "@/api";
import SearchDialog from '@/components/search'
import PullRefreshLoadMore from '@/components/PullRefreshLoadMore/PullRefreshLoadMore.vue'
import ProcessCardList from '@/views/trouble-broken/components/ProcessCardList.vue';

import { useRouter } from 'vue-router'
import { useBroken } from './composables'
import { useMessage, useState } from '@/composables/index'
import { usePage } from '@/composables'
import { utcTime } from '@/utils';


/* const */
const searchData = ref({})
const total = ref<number>();
const dataSource = ref<any[]>([]);
const router = useRouter()

const { searchProps, tableProps } = useBroken()
const { loading } = useState()
const { handleResponse } = useMessage()
const { pageNo, pageSize, } = usePage()


/* methods */
const onClickLeft = () => history.back()

async function getApi() {
  loading.value = true
  const params = {
    page: pageNo.value, size: pageSize.value, statusType: 1, ...searchData.value
  }
  const { code, message, data } = await api.exter.queryList(params)
  if (!handleResponse({ code, message })) return;
  if (!data.rows) {
    dataSource.value = [];
    return;
  }
  if (pageNo.value === 1) {
    dataSource.value = data.rows.map(item => {
      item.discoverDate = utcTime(item.discoverDate);
      return item;
    });
    loading.value = false
    return
  }
  dataSource.value.push(...data.rows.map(item => {
    item.discoverDate = utcTime(item.discoverDate);
    return item;
  }));
  loading.value = false
}

// 编辑
async function toEditPage(rows: any) {
  router.push({
    name: 'BrokenAdd',
    query: { businessId: rows.id, updateValidate: 0 }
  });
}

onMounted(() => {
  getApi()
})
</script>



<template>
  <van-sticky>
    <van-nav-bar title="草稿箱" left-text="" left-arrow @click-left="onClickLeft">
      <template #right>
        <SearchDialog v-model="searchData" :form-props="searchProps" @onSearch="getApi" />
      </template>
    </van-nav-bar>
  </van-sticky>
  <PullRefreshLoadMore v-model:page-no="pageNo" :pageSize="pageSize" :total="total" :loading="loading" @reLoad="getApi">
    <template #default>
      <ProcessCardList :tableProps="tableProps" :dataSource="dataSource">
        <template #cardBtn="{ data }">
          <div class="processbox" @click="toEditPage(data)">
            <span>编辑</span>
          </div>
        </template>
      </ProcessCardList>
    </template>
  </PullRefreshLoadMore>
</template>

<style scoped>
.processbox {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.processbox span {
  width: 98px;
  text-align: center;
  line-height: 30px;
  color: #f2f2f2;
  background: #2793FF;
  border-radius: 6px 6px 6px 6px;
  opacity: 1;
  z-index: 1;
}
</style>