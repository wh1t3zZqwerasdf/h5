<template>
  <div class="one-center2">
    <h3>保护区管理</h3>
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
import icon1 from '@/assets/images/desk/protectionZone-35.png'
import icon2 from '@/assets/images/desk/protectionZone-36.png'
import icon3 from '@/assets/images/desk/InspectorInspection-37.png'

export default {
  data () {
    return {
      icons: [
        { icon: icon1, text: '保护区查询' },
        { icon: icon2, text: '保护区划定' },
        { icon: icon3, text: '保护区督察检查' },
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

<style src="../style/protectionZone.css"></style>