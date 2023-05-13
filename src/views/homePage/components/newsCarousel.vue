<template>
  <div id="root" class="root">
    <div class="box-swiper">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" loop height="346px"
        v-if="dataSource[0] != null">
        <template v-for="(item, index) in dataSource" :key="item.id">
          <van-swipe-item @click="goNewsInfo(item)" v-if="index <= 4">
            <!-- <img :src="item.hotPic" :alt="item.title" @load="imgOnLoad" /> -->
            <!-- <van-image width="100" height="100" :src="item.hotPic" /> -->
            <el-image class="cursor-pointer" :src="item.hotPic" :alt="item.title" @load="imgOnLoad" />
          </van-swipe-item>
        </template>
      </van-swipe>
      <!-- <el-carousel trigger="click" arrow="always" :interval="3000" width="100%" height="346px"
        v-if="dataSource[0] != null">
        <template v-for="(item, index) in dataSource" :key="item.id">
          <el-carousel-item @click="goNewsInfo(item)" v-if="index <= 4">
            <el-image class="cursor-pointer w-full" :src="item.hotPic" :alt="item.title" :title="item.title" fit="contain"
              @load="imgOnLoad" />
          </el-carousel-item>
        </template>
      </el-carousel> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMessage } from '@/composables';
import { useState } from '@/composables';
import type { NewInfoItem } from '@/components/web/types/NewsInfoItem.type';
import { useRouter } from 'vue-router'

const props = defineProps({
  dataSource: {
    type: Array as () => NewInfoItem[], // (string也可以是其他你自定义的接口)
    required: true
  }
});
const { handleWarning } = useMessage();
const router = useRouter();
const { loading } = useState();
loading.value = true;

const imgOnLoad = (e: any) => {
  loading.value = false;
};

function goNewsInfo(item: NewInfoItem) {
  const newUrl = router.resolve({
    name: 'LawNewDetail',
    query: {
      id: item.id
    }
  });

  window.open(newUrl.href, '_blank');
}

onMounted(() => {

})
</script>

<style lang="less" scoped>
.box-swiper {
  width: 100%;
}

body,
html {
  width: 100%;
  height: 100%;
}

.cursor-pointer {
  height: 100%;
  object-fit: cover;
}
</style>
