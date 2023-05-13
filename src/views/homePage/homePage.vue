<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import newsCarousel from './components/newsCarousel.vue';
import type { NewInfoItem } from '@/components/web/types/NewsInfoItem.type';
import { useImportantNews } from '@/views/homePage/composables';
import newsTabs from './components/newsTabs.vue';
import { homeLevelNewTabTitleMap, orgLevelType } from '@/data';


const username = ref('')
const router = useRouter();
const flag = ref(false);
const { loadBannerData, getHomeImportantNewsData } = useImportantNews();
// 轮播图
const bannerData = ref<NewInfoItem[]>([]);
// tab标题
const tabTitle = ref(homeLevelNewTabTitleMap['province']);
// tab新闻数据源
const newsTabsOption = reactive<NewInfoItem[][]>([]);
// 省市区类型
const levelType = ref('province');
// 天气信息
const cityCode = ref('')
const tempMax = ref('0')
const tempMin = ref('0')
const textDay = ref('当前账号暂无天气数据')
const iconDay = ref('')



/* methods */
const onMore = () => {
  router.push({ path: `/workbenches` });
};
const onMoreone = () => {
  router.push({ path: `/trouble` });
};
const onMoretwo = () => {
  router.push({ path: `/broken` });
};

async function getBanner() {
  levelType.value = orgLevelType();
  tabTitle.value = homeLevelNewTabTitleMap[levelType.value];
  flag.value = false;
  bannerData.value = await loadBannerData();
  flag.value = true;
  newsTabsOption.push(...(await getHomeImportantNewsData(levelType.value)));
  newsTabsOption.forEach(e => {
    if (e.length > 8) e.length = 8;
  });
}

function getCityCode(location: string) {
  const cityMap = {
    '福建省福州市': '101230101',
    '福建省厦门市': '101230201',
    '福建省宁德市': '101230301',
    '福建省莆田市': '101230401',
    '福建省泉州市': '101230501',
    '福建省漳州市': '101230601',
    '福建省龙岩市': '101230701',
    '福建省三明市': '101230801',
    '福建省南平市': '101230901'
  }
  return cityMap[location] || ''
}

function getUserInfo() {
  const userInfoString = localStorage.getItem('auth');
  const userInfo = JSON.parse(userInfoString);
  username.value = userInfo.userInfo.name
  const administrationLocation = userInfo.userOrg.administrationLocation
  const locationArray = administrationLocation.split('/')
  const province = locationArray[1]
  const city = locationArray[2]
  const location = province + city
  console.log(location);
  cityCode.value = getCityCode(location)
}

function weather() {
  fetch(`https://devapi.qweather.com/v7/weather/3d?location=${cityCode.value}&key=702c808a45394a4e855276280f2ea013`).then((res) => {
    return res.json();
  }).then((data) => {
    console.log(data.daily);
    tempMax.value = data.daily[0].tempMax
    tempMin.value = data.daily[0].tempMin
    textDay.value = data.daily[0].textDay
    iconDay.value = data.daily[0].iconDay
  }).catch((err) => {
    console.log(err)
  })
}



onMounted(async () => {
  await getBanner()
  getUserInfo()
  weather()
})


</script>
<template>
  <div style="background: #F6F7F8;">
    <div class="bgc"></div>
    <div class="container">
      <div>
        <img class="head-image" src="@/assets/images/homePh.jpg" alt="">
      </div>
      <!-- <div class="title">{{ username }}</div> -->
      <div class="title-right">
        <i v-if="textDay === '阴'"><img class="title-iconDay" src="@/assets/images/weather-icon/cloudy.png" alt=""></i>
        <i v-else-if="textDay === '晴'"><img class="title-iconDay" src="@/assets/images/weather-icon/sun.png" alt=""></i>
        <i v-else="textDay === '小雨'"><img class="title-iconDay" src="@/assets/images/weather-icon/rain.png" alt=""></i>
        <div class="right-weather">
          <span>{{ tempMin + '℃' }}～{{ tempMax + '℃' }}</span>
          <span>{{ textDay }}</span>
        </div>
        <div class="icon">
          <van-icon name="chat-o" badge="1" />
        </div>
      </div>
    </div>
    <div>
      <news-carousel :dataSource="bannerData" v-if="flag"></news-carousel>
      <div class="news-item">
        <div class="news-image">
          <img src="@/assets/images/news-1.png" />
        </div>
        <van-notice-bar class="news-text" :scrollable="true">
          <van-swipe class="notice-swipe" :autoplay="1000" v-for="item in newsTabsOption" :key="item.id">
            <van-swipe-item style="color: #000;">{{ item[0].title }}</van-swipe-item>
          </van-swipe>
        </van-notice-bar>
      </div>
      <div class="box-grid">
        <van-grid :gutter="20" :border="false">
          <van-grid-item class="my-grid-item" @click="onMoreone">
            <img src="@/assets/images/hid-6.png" alt="" />
            <span>隐患管理</span>
          </van-grid-item>
          <van-grid-item class="my-grid-item" @click="onMoretwo">
            <img src="@/assets/images/rup-7.png" alt="" />
            <span>外破管理</span>
          </van-grid-item>
          <van-grid-item class="my-grid-item">
            <img src="@/assets/images/report-8.png" alt="" />
            <span>举报管理</span>
          </van-grid-item>
          <van-grid-item class="my-grid-item" @click="onMore">
            <img src="@/assets/images/more-9.png" alt="" />
            <span>更多应用</span>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <div class="today">
      <news-tabs :title="tabTitle" :content="newsTabsOption"></news-tabs>
    </div>
  </div>
</template>

<style src="./style/homePage.css" lang="less"></style>
