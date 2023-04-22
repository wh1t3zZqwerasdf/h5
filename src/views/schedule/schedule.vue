<template>
  <div class="schedule-title">
    <van-nav-bar title="工作待办" left-text="" left-arrow :border="false">
      <template #right>
        <van-icon name="search" size="24" />
      </template>
    </van-nav-bar>
  </div>
  <div class="schedule-select">
    <van-dropdown-menu active-color="#1989fa" :overlay="false">
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>
  </div>
  <div v-for="item in resList" :key="item.id">
    <MyCard :icon=icon_2 header='举报事件' :items="formatItems(item)" button-text="去处理">
    </MyCard>
  </div>
</template>



<script setup>
import { onMounted, ref } from 'vue';
import MyCard from "@/components/mycard/myCard.vue";
import Api from "@/http/Api.ts";
import icon_2 from '@/assets/images/report-2.png'

const value1 = ref(0);
const value2 = ref('a');
const option1 = [
  { text: '举报管理', value: 0 },

];
const option2 = [
  { text: '待处理', value: 'a' },

];

const resList = ref([]);



const formatItems = (item) => {
  return [
    { title: '举报人', name: item.cityName },
    { title: '隐患位置', name: item.status_ },
    { title: '举报内容', name: item.reportContent },
    { title: '举报时间', name: item.createTime }
  ];
}

Api.getFinishActivi().then((res) => {
  resList.value = res.data.rows;
})

onMounted(() => {
})

</script>
<style>
.van-nav-bar__title {
  width: 72px;
  height: 25px;
  font-weight: 700;
  font-size: 18px;
  font-family: 微软雅黑;
  color: #000000;
  line-height: 25px;
}

.van-nav-bar .van-icon {
  color: #000000;
  font-size: 22px;
}

.schedule-title {
  margin-top: 28px;
  margin-bottom: 20px;
}

.schedule-select {
  width: 100%;
  height: 58px;
}

.van-dropdown-menu__bar--opened {
  z-index: 0
}

.van-dropdown-menu__item {
  flex: none;
}

.van-dropdown-menu__title {
  font-size: 16px;
  font-weight: 700;
  margin-right: 50px;
  margin-left: 10px;
}
</style>