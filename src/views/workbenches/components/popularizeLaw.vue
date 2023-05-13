<template>
  <div class="one-center1">
    <h3>普法管理</h3>
    <van-grid :gutter="10" :border="false">
      <van-grid-item v-for="(item, index) in icons" :key="index" @click="goToDetailPage(item)">
        <div class="icon-wrapper">
          <img :src="item.icon" class="icon" />
          <div class="text">{{ item.text }}</div>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script lang="ts">
import icon1 from '@/assets/images/desk/historicalCases-22.png'
import icon2 from '@/assets/images/desk/popularizeVideo-21.png'
import icon3 from '@/assets/images/desk/PPT-19.png'
import icon4 from '@/assets/images/desk/materials-20.png'
import icon5 from '@/assets/images/desk/importantNews-23.png'
import icon6 from '@/assets/images/desk/policyDocument-24.png'
import icon7 from '@/assets/images/desk/education-25.png'


export default {
  data() {
    return {
      icons: [
        { icon: icon1, text: '历史案例' },
        { icon: icon2, text: '普法视频' },
        { icon: icon3, text: '课件PPT' },
        { icon: icon4, text: '普法素材' },
        { icon: icon5, text: '普法要闻' },
        { icon: icon6, text: '政策文件' },
        { icon: icon7, text: '教育培训' },

      ]
    }
  },
  methods: {
    goToDetailPage(item: any) {
      // this.$router.push({ path: '/detail', query: { id: item.id } })
      console.log(item);
    }
  }
}
</script>

<style src="../style/popularizeLaw.css"></style>