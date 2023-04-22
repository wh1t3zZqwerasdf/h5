<script setup>
import { onMounted, ref, computed, reactive, watch } from 'vue'
import { Toast } from 'vant';
import Api_news from '@/http/http.ts'
import { useRouter } from 'vue-router';
import filterPopup from './components/filterPopup.vue'

const router = useRouter();
const loading = ref(false);
const search_value = ref('');
const showFilterPopup = ref(false)
const tuozhan = ref('https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng470bbe780c9cfb25437362433e5b33a801f9c4d18eafc54036c791b0429a6c93')


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


const getNewsData = async () => {
  try {
    const res = await Api_news.getNewsDrafts();
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

// 使用computed属性返回需要渲染的数据
const renderedNews = computed(() => {
  // 如果searchValue有值，则渲染filteredNews，否则渲染news
  return searchValue.value ? filteredNews : news;
});

// 计算属性，根据 showFilterPopup 的值返回组件



onMounted(() => {
  getNewsData()
})

</script>

<template>
  <div style="background-color:#F3F3F3; width: 100%; ">
    <van-nav-bar class="search-top" left-text="" left-arrow @click-left="handleClickLeft">
      <template #title>
        <van-search v-model="search_value" shape="round" placeholder="请输入搜索关键词" class="news-search"
          @input="onSearch($event.target.value)" />
      </template>
      <template #right>
        <img :src="tuozhan" alt="" @click="handleClickFilter">
      </template>
    </van-nav-bar>

    <van-pull-refresh v-model="loading" @refresh="onRefresh">

      <van-popup v-model:show="showFilterPopup" position="right" :style="{ width: '80%', height: '100%' }"
        safe-area-inset-top>
        <filterPopup></filterPopup>
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



<style scoped src="./style/editNews.css"></style>