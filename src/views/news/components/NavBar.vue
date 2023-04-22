<script setup>
import { ref } from "vue";
import tuozhan1 from '@/assets/images/qiehuan.png'


const search_value = ref("");
const tuozhan = tuozhan1
const showFilterPopup = ref(false)

const handleClickLeft = () => history.back()
const handleClickFilter = () => {
  showFilterPopup.value = true
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
};

</script>

<template>
  <van-nav-bar class="search-top" left-text="" left-arrow safe-area-inset-top @click-left="handleClickLeft">
    <template #title>
      <van-search v-model="search_value" shape="round" clearable placeholder="请输入搜索关键词" class="news-search"
        @input="onSearch($event.target.value)" />
    </template>
    <template #right>
      <img :src="tuozhan" alt="" @click="handleClickFilter">
    </template>
  </van-nav-bar>
</template>

<style scoped src="../style/newsList.css"></style>