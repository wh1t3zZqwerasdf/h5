<script setup lang="ts">
import { Toast } from 'vant';
import { ref } from 'vue'
import Api_news from '../../http/http';



const image_video = ref('https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng24463d91ce6088b6e8a150d2c8cf0dec600763ea5673dad6a4830bcd421eb975')
const attachment = ref('https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng2f98ddd960ff22193f3e45b08c00f66831645edd5a3f041bc1d8ae7e0decec9f')
const preview_btn = ref('https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngbada61546df155dff9045e37c3542de45de6bbb111790f1767cbe2cab355a329')
const register_btn = ref('https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngc058893e7a1790d6ea32432ede5f0a9182b2f4101a4e6b4c7c41adcdd42f4e8b')
const imageUrl = ref('');
const videoUrl = ref('');
const fileInput = ref<HTMLInputElement | null>(null);
const show = ref(false);



const news = {
  title: ref(''),
  content: ref(''),
  newsType: ref(''),
  externalInfoType: ref(''),
  externalInfoRefUrl: ref(''),
  attachmentList: ref<string[]>([]),
  openFlag: ref(''),
  lawNewsFlag: ref(''),
  topFlag: ref(''),
  headFlag: ref(''),
  recommendHeadFlag: ref(''),
};



/* methods */
const onClickLeft = () => history.back();

// 提交 - 内部新闻
const submit_news = async () => {
  const data = {
    title: news.title.value,
    content: news.content.value,
    newsType: Number(news.newsType.value),
    externalInfoType: Number(news.externalInfoType.value),
    externalInfoRefUrl: news.externalInfoRefUrl.value,
    attachmentList: news.attachmentList.value,
    openFlag: Number(news.openFlag.value),
    lawNewsFlag: news.lawNewsFlag.value === 'true' ? 1 : 0,
    topFlag: news.topFlag.value === 'true' ? 1 : 0,
    headFlag: news.headFlag.value === 'true' ? 1 : 0,
    recommendHeadFlag: news.recommendHeadFlag.value === 'true' ? 1 : 0,
  };
  try {
    const res = await Api_news.addNews(data);
    Toast.success('提交成功');
    news.title.value = '';
    news.content.value = '';
    news.newsType.value = '';
    news.externalInfoType.value = '';
    news.externalInfoRefUrl.value = '';
    news.attachmentList.value = [];
    news.openFlag.value = '';
    news.lawNewsFlag.value = '';
    news.topFlag.value = '';
    news.headFlag.value = '';
    news.recommendHeadFlag.value = '';
  } catch (error) {
    console.log(error)
  }
}

const headFlagValue = news.headFlag.value === 'true' ? 1 : (news.headFlag.value === 'false' ? 0 : (news.headFlag.value === '' ? 0 : null));
const topFlagValue = news.topFlag.value === 'true' ? 1 : (news.topFlag.value === 'false' ? 0 : (news.topFlag.value === '' ? 0 : null));
const lawNewsFlagValue = news.lawNewsFlag.value === 'true' ? 1 : (news.lawNewsFlag.value === 'false' ? 0 : (news.lawNewsFlag.value === '' ? 0 : null));
// 暂存 - 草稿箱
const submit_drafts = async () => {
  const data = {
    title: news.title.value,
    content: news.content.value,
    newsType: Number(news.newsType.value),
    externalInfoType: Number(news.externalInfoType.value),
    externalInfoRefUrl: news.externalInfoRefUrl.value,
    attachmentList: news.attachmentList.value,
    openFlag: Number(news.openFlag.value),
    lawNewsFlag: lawNewsFlagValue,
    topFlag: topFlagValue,
    headFlag: headFlagValue,
    recommendHeadFlag: news.recommendHeadFlag.value === 'true' ? 1 : 0,
  };
  try {
    const res = await Api_news.addNewsDrafts(data);
    console.log(res, 'ressssss');
    Toast.success('暂存成功');
    news.title.value = '';
    news.content.value = '';
    news.newsType.value = '';
    news.externalInfoType.value = '';
    news.externalInfoRefUrl.value = '';
    news.attachmentList.value = [];
    news.openFlag.value = '';
    news.lawNewsFlag.value = '';
    news.topFlag.value = '';
    news.headFlag.value = '';
    news.recommendHeadFlag.value = '';
  } catch (error) {
    console.log(error)
  }
}


// 上传照片 视频
const handleFileSelector = async () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
  const files = fileInput.value?.files;

  if (files && files.length) {
    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', file.type);

    try {
      const res = await Api_news.uploadFile(formData); // 调用文件上传API
      if (res.code === 200) {
        if (file.type.startsWith('image/')) {
          imageUrl.value = res.data.data;
          videoUrl.value = '';
        } else if (file.type.startsWith('video/')) {
          imageUrl.value = '';
          videoUrl.value = res.data.data;
        }
      } else {
        console.error(res.message, '异常3');
      }
    } catch (error) {
      console.error(error);
    }
  }
};


/* 上传附件 */
const uploadFile = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.onchange = (event) => {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      const newFiles = Array.from(files).map(file => {
        const newFile = blobToFile(file, file.name);
        return URL.createObjectURL(newFile);
      });
      news.attachmentList.value.push(...newFiles);
      console.log(news.attachmentList.value, 'news.attachmentList.value');
      console.log(newFiles, 'newFiles');


    }
  };
  input.click();
};
// 转换附件
function blobToFile(blob: Blob, fileName: string): File {
  const file = new File([blob.slice(0, blob.size, blob.type)], fileName, {
    lastModified: new Date().getTime(),
    type: blob.type
  });
  return file;
}

</script>

<template>
  <div class="nwes-bgc">
    <van-nav-bar class="vant-title" title="内部新闻" left-text="" left-arrow :border='false' @click-left="onClickLeft" fixed>
    </van-nav-bar>
    <div class="text-wrapper_3">
      <span class="text_3">所写内容会实时保存</span>
    </div>
    <div style="margin-bottom: 10px;">
      <van-cell-group>
        <span class="news-title">新闻标题</span>
        <van-field class="xinwen" v-model="news.title.value" rows="2" autosize type="textarea" placeholder="请填写新闻标题" />
      </van-cell-group>
      <van-cell-group>
        <span class="news-title1">新闻内容</span>
        <van-field class="xinwen" v-model="news.content.value" rows="2" autosize type="textarea" maxlength="5000"
          placeholder="请填写新闻内容" show-word-limit />
      </van-cell-group>
    </div>

    <div class="news-radio">
      <span>新闻设置</span>
      <van-field name="radio" label="设为新闻头条" slot="label">
        <template #input>
          <div style="width: 100%; ">
            <van-radio-group v-model="news.headFlag.value" direction="horizontal" icon-size="16px" class="align-right">
              <van-radio name="1">是</van-radio>
              <van-radio name="0">否</van-radio>
            </van-radio-group>
          </div>
        </template>
      </van-field>
      <van-field name="radio" label="置顶该新闻">
        <template #input>
          <div style="width: 100%; ">
            <van-radio-group v-model="news.topFlag.value" direction="horizontal" icon-size="16px" class="align-right">
              <van-radio name="1">是</van-radio>
              <van-radio name="0">否</van-radio>
            </van-radio-group>
          </div>
        </template>
      </van-field>
      <van-field name="radio" label="普法新闻">
        <template #input>
          <div style="width: 100%; ">
            <van-radio-group v-model="news.lawNewsFlag.value" direction="horizontal" icon-size="16px" class="align-right">
              <van-radio name="1">是</van-radio>
              <van-radio name="0">否</van-radio>
            </van-radio-group>
          </div>
        </template>
      </van-field>
    </div>

    <div>
      <div class="box_10">
        <span class="text_14">视频/图片</span>
        <img class="icon_2" referrerpolicy="no-referrer" :src="image_video" @click="handleFileSelector" />
        <input type="file" ref="fileInput" style="display: none" @change="handleFileSelector" />
      </div>
      <div v-if="imageUrl">
        <img :src="imageUrl" />
      </div>
      <div v-if="videoUrl">
        <video controls>
          <source :src="videoUrl" type="video/mp4" />
        </video>
      </div>
    </div>
    <div class="box_10">
      <span class="text_15">附件</span>
      <img class="icon_2" referrerpolicy="no-referrer" :src="attachment" @click="uploadFile" />
    </div>
    <div class="box_12">
      <div class="section_2">
        <div class="image-text_17" @click="show = true">
          <img class="icon_4" referrerpolicy="no-referrer" :src="preview_btn" />
          <span class="text-group_11">预览</span>
          <van-overlay :show="show">
            <div class="wrapper" @click.stop @click="show = false">
              <div class="block">
                <h1>该页面正在完善中！</h1>
              </div>
            </div>
          </van-overlay>
        </div>
        <div class="image-text_18 " @click="submit_drafts">
          <img class="icon_5" referrerpolicy="no-referrer" :src="register_btn" />
          <span class="text-group_12">暂存</span>
        </div>
        <van-button type="primary" size="large" @click="submit_news">提交</van-button>
      </div>
    </div>
  </div>
</template>


<style scoped src="./style/internalNews.css"></style>