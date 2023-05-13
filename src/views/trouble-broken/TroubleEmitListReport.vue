<script setup lang="ts">
import api from "@/api";
import { useRouter } from 'vue-router'
import { troubleList } from './composables/troubleList'
import ProcessCardList from './components/ProcessCardList.vue';
import PullRefreshLoadMore from '@/components/PullRefreshLoadMore/PullRefreshLoadMore.vue'
import { useMessage, useState } from '@/composables/index'
import SearchDialog from '@/components/search'
import { utcTime } from '@/utils';
import { usePage } from '@/composables'


/* const */
const { loading } = useState()
const { pageNo, pageSize } = usePage()
const { tableProps, searchProps } = troubleList()
const dataSource = ref<any[]>([]);
const searchData = ref({})
const total = ref<number>();
const router = useRouter()
const { handleResponse } = useMessage()

/** events */
const emits = defineEmits(['loadList']);


/* methods */
async function getApi() {
  loading.value = true
  const params = {
    page: pageNo.value, size: pageSize.value, statusType: 1, ...searchData.value
  }
  const { code, message, data } = await api.hid.queryList(params)
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
    });
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

const onClickLeft = () => history.back();


// 编辑
async function toEditPage(rows: any) {
  router.push({
    name: 'TroubleAdd',
    query: { businessId: rows.id, updateValidate: 0 }
  });
}

onMounted(() => {
  getApi()
})



</script>

<template>
  <div>
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
  </div>
</template>

<style lang="less" scoped>
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