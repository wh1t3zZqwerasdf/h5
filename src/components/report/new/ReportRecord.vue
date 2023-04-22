<!-- 举报记录 -->
<template>
  <van-list class="background" v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <div v-for="item in data?.rows">
      <!-- <van-button @click="onItemClick(item)">点击</van-button> -->
      <div class="line-item-record" @click="onItemClick(item)">
        <van-row justify="space-between" class="line-item-relative">
          <van-col span="6" class="title">举报事件</van-col>
          <van-col span="18" class="line-right">{{
            DateUtils.DateFormat(item.reportTime, "yyyy-MM-dd")
          }}</van-col>
        </van-row>

        <van-divider class="line-divider-height1-margin10"> </van-divider>

        <van-row justify="space-between" class="line-item-relative">
          <van-col span="6" class="line-title6">举报人</van-col>
          <van-col span="18" class="line-right">{{ item.reportName }}</van-col>
        </van-row>

        <van-row justify="space-between" class="line-item-relative">
          <van-col span="12" class="line-title6">举报人联系方式</van-col>
          <van-col span="12" class="line-right">{{
            item.reportNumber
          }}</van-col>
        </van-row>

        <van-row justify="space-between" class="line-item-relative">
          <van-col span="6" class="line-title6">隐患位置</van-col>
          <van-col span="18" class="line-right">{{ item.cityName }}</van-col>
        </van-row>

        <van-row justify="space-between" class="line-item-relative">
          <van-col span="5" class="line-title6">举报内容</van-col>
          <van-col span="19" class="line-right">{{
            item.reportContent
          }}</van-col>
        </van-row>

        <van-divider class="line-divider-height1-margin10"> </van-divider>

        <van-row justify="space-between" class="line-item-relative" style="margin-top: 20px">
          <van-col span="8" class="line-content">{{ item.status_ }}</van-col>
          <van-col span="16" class="line-right" :style="setStatusColor(item.status)">{{ item.status_ }}</van-col>
        </van-row>
      </div>
    </div>
  </van-list>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  FinishActiviEntity,
  FinishActivityList
} from "../../../types/ReportEntity";
import Api from "../../../http/Api";
import { ApiResponse } from "../../../http/request";
import DateUtils from "../../../utils/DateUtils";

const currentPage = ref(1);
const loading = ref(false);
const finished = ref(false);

const router = useRouter();
function setStatusColor(status: number) {
  let style = { color: "#FF9900" };
  switch (status) {
    case 4:
      style.color = "#FF9900";
      break;
    case 7:
      style.color = "#31B87A";
      break;
    case 8:
      style.color = "#FF0000";
      break;
    default:
      style.color = "#FF9900";
      break;
  }
  return style;
}

function onItemClick(item: FinishActiviEntity) {
  router.push({
    path: "/reportLineNew",
    query: {
      id: item.id,
      entity: JSON.stringify({
        options: { isEdit: false }
      })
    }
  });
}

// const list = ref<Array<string>>([]);

const data = ref<FinishActivityList>();

function onLoad() {
  const promise: Promise<ApiResponse<FinishActivityList>> = Api.getFinishActivi(
    currentPage.value
  );
  promise.then((result: ApiResponse<FinishActivityList>) => {
    if (result.code != 200) {
      loading.value = false;
      finished.value = true;
      return;
    }
    if (!data.value) {
      data.value = result.data;
      console.log(data.value.rows,'data.value.rowsdata.value.rows');
      

    } else {
      for (let row of result.data.rows) {
        // list.value.push(row.cityName);
        data.value?.rows.push(row);
      }
    }
    // 加载状态结束
    loading.value = false;
    // console.log(JSON.stringify(list.value));

    // 数据全部加载完成
    if (data.value.rows?.length >= result.data.total) {
      finished.value = true;
    } else {
      currentPage.value++;
    }
  });
}
</script>

<style>
@import "./report.css";

.background {
  width: 100%;
  height: 100%;
  background-color: #f2f3f5;
  padding-top: 5px;
  padding-bottom: 10px;
}
</style>
