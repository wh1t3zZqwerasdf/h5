<template>
  <div class="new-wraper">
    <div>

      <van-tabs v-model:active="active" animated swipe-threshold="3" sticky>
        <van-tab v-for="(item, index) in title" :title="item" class="newsContent">
          <span v-for="(itemList, indexList) in content[index]" :key="indexList" @click="goLink(itemList)">
            <div class="newsContent_div">
              <div class="newsContent_head">
                <div class="div-title">
                  <p class="newsContent_title">
                  <p class="newsContent_lawNewsFlag" v-if="itemList.lawNewsFlag == 1">普法</p>
                  {{ itemList.title }}
                  </p>
                </div>
                <div v-if="getFirstImageAndText(itemList.content)?.firstImage">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div class="div-cotent">
                      <p class="newsContent_text" v-if="getFirstImageAndText(itemList.content)?.firstText">{{
                        getFirstImageAndText(itemList.content)?.firstText }}</p>
                      <div class="div-footer">
                        <P class="newsContent_submitOrgName">{{ itemList.submitOrgName }}</P>
                        <P class="newsContent_date">{{ itemList.date }}</P>
                      </div>
                    </div>
                    <div class="div-image">
                      <img class="newsContent_image" v-if="getFirstImageAndText(itemList.content)?.firstImage"
                        :src="getFirstImageAndText(itemList.content)?.firstImage" />
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="div-cotent">
                    <p class="newsContent_text" style="width: auto;"
                      v-if="getFirstImageAndText(itemList.content)?.firstText">{{
                        getFirstImageAndText(itemList.content)?.firstText }}</p>
                    <div class="div-footer">
                      <P class="newsContent_submitOrgName">{{ itemList.submitOrgName }}</P>
                      <P class="newsContent_date">{{ itemList.date }}</P>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </span>
        </van-tab>
      </van-tabs>


    </div>
  </div>
</template>

<script lang="ts" setup>
import type { NewInfoItem } from '@/components/web/types/NewsInfoItem.type';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

type Content = Array<NewInfoItem>;

const props = defineProps({
  title: {
    type: Array<string>,
    required: true,
    default: () => []
  },
  content: {
    type: Array as () => Content[], // (string也可以是其他你自定义的接口)
    required: true
  }
});
const router = useRouter();
const active = ref(0);

const goLink = (item: any) => {
  router.push({ path: `/newsDetail/${item.id}` });
}

const show: boolean | any = ref(true);

function getFirstImageAndText(content: string) {
  if (content === null) {
    // console.error('The content parameter is null.');
    return { firstImage: null, firstText: null };
  }
  // 匹配第一个图片和文本
  const pattern = /<img.*?src="(.*?)".*?>\s*(?:<[^>]*>)*\s*(.*?)\s*(?:<\/[^>]*>)*\s*(?=<img|$)/si;
  let match = pattern.exec(content);

  let i = 1;
  let firstImage = null;
  let firstText = null;

  while (match === null || match[2].length === 0) {
    const pPattern = new RegExp(`<p[^>]*>(.*?)<\/p>`, 'gis');
    const pMatches = pPattern.exec(content);
    if (pMatches !== null && pMatches[1].length > 0) {
      // 匹配到有文本内容的p标签
      firstText = pMatches[1].replace(/(<([^>]+)>)|(&nbsp;)/gi, '');
      break;
    }
    // 继续循环匹配下一个p标签
    i++;
    pattern.lastIndex = 0;
    const imgAndTextPattern = new RegExp(`(?:<p[^>]*>){${i}}(?:.*?<img.*?src="(.*?)".*?>)?\\s*(?:<[^>]*>)*\\s*(.*?)(?:<\/[^>]*>)*\\s*(?=<img|$)`, 'si');
    match = imgAndTextPattern.exec(content);
  }

  if (match !== null && firstText === null) {
    firstImage = match[1];
    let firstTextWithTags = match[2];
    let firstTextWithoutImageTags = firstTextWithTags.replace(/<img.*?>/g, '');
    firstText = firstTextWithoutImageTags.replace(/(<([^>]+)>)|(&nbsp;)/gi, '');
  }
  /(((<br\s?\/?>)|(<\/p>)|(<\/div>)|(<\/h\d>))\s*)/gi

  return { firstImage, firstText };
}


onMounted(() => {
  console.log(props.content);

})
</script>

<style lang="less" scoped>
body,
html {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

:deep(.van-tabs__nav) {
  background-color: rgba(255, 255, 255, 0);
  background: #F6F7F8;
}

:deep(.van-tab) {
  font-size: 16px;
  font-family: 思源黑体 CN Medium;
  color: #000000;
}

:deep(.van-tabs__line) {
  width: 16px;
  height: 4px;
  border-radius: 50%;
  box-shadow: 0 2px 0 1.5px #0075ff;
  background-color: rgba(255, 255, 255, 0);
  bottom: 20px;
}



.new-wraper {
  width: 100%;
  height: auto;
  padding-top: 5px;
  background: #F6F7F8;
}

.newsContent {
  padding: 10px;

  .newsContent_div {
    margin-bottom: 10px;
    background-color: #fff;
    border-radius: 10px;
    padding: 6px;

    .div-title {
      // height: 80px;
      font-size: 16px;
      line-height: 22px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: PingFangHK-Medium, PingFangHK;
      font-weight: 600;

      .newsContent_lawNewsFlag {
        font-size: 12px;
        color: #F22C2C;
        width: 42px;
        display: inline-block;
        background: #FFF2F4;
        text-align: center;
        border-radius: 4px;
      }

    }

    .div-cotent {
      display: flex;
      padding: 5px 0;
      justify-content: space-around;
      flex-direction: column;

      .newsContent_text {
        width: 200px;
        height: 59px;
        font-size: 14px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: PingFangHK-Regular, PingFangHK;
        color: #000;
        margin-bottom: 4px;
      }
    }
  }

  .div-footer {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.4);
    font-family: PingFangHK-Regular, PingFangHK;
  }

  .div-image {

    .newsContent_image {
      width: 120px;
      height: 94px;
      border-radius: 5px;
    }
  }
}
</style>
