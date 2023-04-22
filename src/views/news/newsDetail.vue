<script setup >
import { onMounted, ref } from "vue";
import Api_news from '@/http/http.ts'
import { useRouter } from 'vue-router';


const router = useRouter();
const news = ref({});
const onClickLeft = () => history.back();

const sanitizeContent = (content) => {
  if (content) {
    return content.replace(/<img/g, '<img class="img-width"');
  } else {
    return '';
  }
}

const splitContent = (content) => {
  const imageRegex = /<img.*?src="(.*?)".*?>/g;
  const textRegex = /<p.*?>(.*?)<\/p>/g;
  const images = [];
  const text = [];
  let imageMatch = null;
  let textMatch = null;
  while ((imageMatch = imageRegex.exec(content))) {
    images.push(imageMatch[1]);
    console.log(images, 'images');
  }
  while ((textMatch = textRegex.exec(content))) {
    text.push(textMatch[1].replace(/&nbsp;/g, ''));
    console.log(text, 'text');
  }
  return { text, images };
};



onMounted(() => {
  const id = router.currentRoute.value.params.id
  console.log(id, 'id');
  Api_news.queryNewsList(id).then(res => {
    news.value = res.data
  })
})
</script>

<template>
  <div>
    <van-nav-bar title="详情" left-text="" left-arrow @click-left="onClickLeft" safe-area-inset-top style="top: 26px;">
    </van-nav-bar>
    <div class="news-detail">
      <div class="news-tag">
        <div class="news-title">{{ news.title }} <span>{{ '「' + {
          1: '草稿',
          2: '审核中',
          3: '已驳回',
          4: '已取消',
          5: '已发布'
        }[news.status] + '」' || '' }}</span></div>
      </div>
      <div class="news-meta">
        <span>发布单位：{{ news.submitOrgName }}</span>
        <span>发布人：{{ news.submitUserName }}</span>
        <span>发布时间：{{ news.submitTime }}</span>
      </div>
      <!-- <img :src="news.imageUrl" alt="新闻图片" class="news-image"> -->
      <div class="news-content" v-html="sanitizeContent(news.content)"></div>
    </div>
    <div class="news-footer">
      <p>属性:</p>
      <span class="tag-item" v-if="news.lawNewsFlag === 1">普法</span>
      <span class="tag-item" v-if="news.topFlag === 1">置顶</span>
      <span class="tag-item" v-if="news.headFlag === 1">头条</span>
    </div>
  </div>
</template>

<style scoped src="./style/newsDetail.css"></style>