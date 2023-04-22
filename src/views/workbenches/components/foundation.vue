<template>
  <div class="one-center4">
    <h3>基础管理</h3>
    <van-grid :gutter="10" :border="false">
      <van-grid-item v-for="(item, index) in icons" :key="index" @click="goToDetailPage(item)">
        <div class="icon-wrapper">
          <img :src="item.icon" class="icon" />
          <div class="text-pl text-icon1">{{ item.text }}</div>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import icon1 from '@/assets/images/desk/electricityBill-38.png'
import icon2 from '@/assets/images/desk/hiddenDangerWarehouse-39.png'
import icon3 from '@/assets/images/desk/externalBrokenWarehouse-29.png'
import icon4 from '@/assets/images/desk/filingLibrary-40.png'
import icon5 from '@/assets/images/desk/researchDocuments-34.png'
import icon6 from '@/assets/images/desk/lawsAndRegulations-33.png'
import icon7 from '@/assets/images/desk/annualPlan-32.png'
import icon8 from '@/assets/images/desk/importantUsers-31.png'

export default {
  data () {
    return {
      icons: [
        { icon: icon1, text: '电力设施台账' },
        { icon: icon2, text: '隐患库' },
        { icon: icon3, text: '外破库' },
        { icon: icon4, text: '立案库' },
        { icon: icon5, text: '调研文档库' },
        { icon: icon6, text: '法律法文规库' },
        { icon: icon7, text: '年计划库' },
        { icon: icon8, text: '重要用户库' },
      ]
    }
  },
  methods: {
    goToDetailPage (item) {
      // this.$router.push({ path: '/detail', query: { id: item.id } })
      console.log(item);
    }
  }
}
</script>

<style src="../style/foundation.css"></style>