<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import MyCard from "@/components/mycard/myCard.vue";
import image1 from "@/assets/images/swipe/swp1.jpg";
import image2 from "@/assets/images/swipe/swp2.jpg";
import image3 from "@/assets/images/swipe/swp3.png";
import image4 from "@/assets/images/swipe/swp4.jpg";
import FormBuild from "@/components/formBuild";

const router = useRouter();

const images = ["image1", "image2", "image3", "image4"];
const imageMap = {
  image1,
  image2,
  image3,
  image4,
};

const getImage = (name) => {
  return imageMap[name];
};

const items = [
  { title: "提报单位：", name: "福州市电力执法办公室" },
  { title: "线路名称：", name: "名称名称名称" },
  { title: "隐患类型：", name: "通道占用" },
  { title: "发现时间：", name: "2023-03-01" },
];

const items1 = [
  { title: "提报单位：", name: "福州市电力执法办公室" },
  { title: "线路名称：", name: "名称名称名称" },
  { title: "隐患类型：", name: "通道占用" },
  { title: "发现时间：", name: "2023-03-01" },
];

/* methods */
const onMore = () => {
  router.push({ path: `/workbenches` });
};
// const formData = ref({});
// const dialogPropsData = [
//   {
//     title: "基本信息",
//     group: [
//       {
//         name: "name",
//         label: "文本输入",
//         type: "upload",
//         required: true,
//         rules: [{ required: true }],
//       },
//       {
//         name: "xxx",
//         label: "文本输入",
//         type: "text",
//         required: true,
//         rules: [{ required: true }],
//       },
//       {
//         name: "radio",
//         label: "单选框",
//         type: "radio",
//         required: true,
//         options: (data, op) => {
//           return [
//             { label: "yes", value: 1 },

//             { label: "no", value: 0 },
//           ];
//         },
//         defaultValue: 0,
//       },
//     ],
//   },
// ];
</script>

<template>
  <div class="bgc"></div>
  <div class="container">
    <div class="title">厦门执法办公室</div>
    <div class="icon">
      <van-icon name="chat-o" badge="11" size="18" />
    </div>
  </div>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" loop>
      <van-swipe-item v-for="item in images" :key="item">
        <img :src="getImage(item)" />
      </van-swipe-item>
    </van-swipe>
    <div class="news-item">
      <div class="news-image">
        <img src="@/assets/images/news-1.png" />
      </div>
      <span class="news-span">|</span>
      <!-- <div class="news-text">
                      这里是新闻内容这里是新闻内容这里是新闻内容</div> -->
      <van-notice-bar :scrollable="false" class="news-text">
        <van-swipe
          vertical
          class="notice-swipe"
          :autoplay="3000"
          :touchable="false"
          :show-indicators="false"
        >
          <van-swipe-item
            >不会回头的东西有四件：说出口的话、离弦的箭、逝去的生活和失去的机会。</van-swipe-item
          >
          <van-swipe-item>仙人抚我顶，结发受长生。</van-swipe-item>
          <van-swipe-item>今人不见古时月，今月曾经照古人。</van-swipe-item>
          <van-swipe-item
            >无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。</van-swipe-item
          >
        </van-swipe>
      </van-notice-bar>
    </div>
    <!-- <FormBuild
      v-model="formData"
      :form-props-group="dialogPropsData"
      :formConfig="{ op: 'add' }"
    ></FormBuild> -->
    <div class="box-grid">
      <van-grid :gutter="20" :border="false">
        <van-grid-item class="my-grid-item">
          <img src="@/assets/images/hid-6.png" alt="" />
          <span>隐患管理</span>
        </van-grid-item>
        <van-grid-item class="my-grid-item">
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
    <div class="today-content">
      <div>今日待办</div>
      <span class="gradient-span"></span>
    </div>
    <div>
      <my-card
        header="隐患事件"
        :items="items"
        button-text="去处理"
        @button-click="handleButtonClick"
      />
      <my-card header="隐患事件" :items="items1" button-text="操作按钮" />
    </div>
  </div>
</template>

<style src="./style/homePage.css"></style>
