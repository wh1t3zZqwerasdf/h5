<script setup>
import { onMounted, ref, reactive, computed } from 'vue'
import Api_news from '@/http/http.ts'
import { useRouter } from 'vue-router';
import { Toast } from 'vant';


const router = useRouter();
const loading = ref(false);
const search_value = ref('');
const showFilterPopup = ref(false)
const tuozhan = ref('https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng470bbe780c9cfb25437362433e5b33a801f9c4d18eafc54036c791b0429a6c93')
const activeNames = ref(['1', '2', '3', '4', '5'])
const months = ref(['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'])
const selectedMonth = ref('1月')
const news_type = ref(['全部', '内部新闻', '外部新闻'])
const news_status = ref(['头条', '置顶', '普法'])

const news = ref([]);
const filteredNews = reactive([]);
const searchValue = ref('');

/* methods */
const handleClickLeft = () => history.back()
const handleClickFilter = () => {
  showFilterPopup.value = true
}

const onRefresh = () => {
  setTimeout(() => {
    getNewsData()
    Toast('刷新成功');
    loading.value = false;
  }, 1000);
};

// 搜索
const onSearch = (value) => {
  if (typeof value !== 'string') {
    return; // 如果value不是字符串，则退出函数
  }
  searchValue.value = value.trim(); // 去除空格并更新搜索关键词
  if (searchValue.value !== '') {
    filteredNews.value = news.value.filter(item => {
      // 根据标题或内容是否包含关键词进行过滤
      return item.title.includes(searchValue.value) || item.content.includes(searchValue.value);
    });
  } else {
    // 如果搜索关键词为空，则显示所有新闻
    filteredNews.value = news.value;
  }
}



// 使用computed属性返回需要渲染的数据
const renderedNews = computed(() => {
  // 如果searchValue有值，则渲染filteredNews，否则渲染news
  return searchValue.value ? filteredNews : news;
});


const getNewsData = async () => {
  try {
    const res = await Api_news.getSubordinate();
    const newsData = res.data.rows;
    news.value = newsData.map(item => {
      return {
        title: item.title,
        publisher: item.submitOrgName,
        author: item.author,
        publishTime: item.publishTime,
        imageUrl: item.imageUrl,
        content: item.title,
        id: item.id,
        status_: item.status_
      };
    });
  } catch (error) {
    console.error(error);
  }
};

const showDetail = (item) => {
  router.push({ path: `/newsDetail/${item.id}` });
}


onMounted(() => {
  getNewsData()

})

</script>

<template>
  <div style="background-color:#F3F3F3; width: 100%; ">
    <van-nav-bar class="search-top" left-text="" left-arrow @click-left="handleClickLeft">
      <template #title>
        <van-search v-model="search_value" shape="round" clearable placeholder="请输入搜索关键词" class="news-search"
          @input="onSearch($event.target.value)" />
      </template>
      <template #right>
        <img :src="tuozhan" alt="" @click="handleClickFilter">
      </template>
    </van-nav-bar>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <van-popup v-model:show="showFilterPopup" position="right" :style="{ width: '80%', height: '100%' }"
        safe-area-inset-top>
        <!-- 弹出层内容 -->
        <van-collapse v-model="activeNames" style="margin-top: 26px;" :border="false">
          <van-collapse-item title="发布时间" name="1" class="time-title">
            <div class="month-selector">
              <span v-for="month in months" :class="{ selected: selectedMonth === month }"
                @click="selectedMonth = month">{{
                  month }}</span>
            </div>
          </van-collapse-item>
        </van-collapse>
        <van-collapse v-model="activeNames" style="margin-top: 26px;" :border="false">
          <van-collapse-item title="所在地区" name="2" class="time-title">
            <div class="month-selector">
              <span v-for="month in months" :class="{ selected: selectedMonth === month }"
                @click="selectedMonth = month">{{
                  month }}</span>
            </div>
          </van-collapse-item>
        </van-collapse>
        <van-collapse v-model="activeNames" style="margin-top: 26px;" :border="false">
          <van-collapse-item title="类型" name="3" class="time-title">
            <div class="month-selector-type">
              <span v-for="typeindex in news_type" :class="{ selected: selectedMonth === typeindex }"
                @click="selectedMonth = typeindex">{{
                  typeindex }}</span>
            </div>
          </van-collapse-item>
        </van-collapse>
        <van-collapse v-model="activeNames" style="margin-top: 26px;" :border="false">
          <van-collapse-item title="属性" name="4" class="time-title">
            <div class="month-selector-attribute">
              <span v-for="status in news_status" :class="{ selected: selectedMonth === status }"
                @click="selectedMonth = status">{{
                  status }}</span>
            </div>
          </van-collapse-item>
        </van-collapse>
        <van-collapse v-model="activeNames" style="margin-top: 26px;" :border="false">
          <van-collapse-item title="状态" name="5" class="time-title" :lazy-render="false">
            <div class="month-selector-type">
              <van-button type="primary" color="#7D7D7D" class="van-button">重置</van-button>
              <van-button type="success">确定</van-button>
            </div>
          </van-collapse-item>
        </van-collapse>
      </van-popup>

      <div>
        <div class="news-list">
          <div class="news-detail" v-for="item in renderedNews.value" :key="item.id" @click="showDetail(item)">
            <div class="news-tag">
              <span class="tag-item" :class="item.status_ === '已完成' ? 'tag-item' : 'tag-pending'">
                {{ item.status_ }}
              </span>
              <h3 class="news-title">{{ item.title }}</h3>
            </div>
            <p class="news-content"> {{ item.content }}</p>
            <div class="news-meta">
              <span>{{ item.publishTime }}</span>
              <span>{{ item.publisher }}</span>
            </div>
            <van-divider :style="{ color: '#1989fa', borderColor: '#409EFF' }"></van-divider>
          </div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>



<style scoped src="./style/subordinateNews.css"></style>