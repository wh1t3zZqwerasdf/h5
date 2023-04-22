<template>
  <div class="one-center3">
    <h3>整改库</h3>
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

<script >
import icon1 from '@/assets/images/desk/Management-27.png'
import icon2 from '@/assets/images/desk/researchManagement-30.png'

export default {
  data () {
    return {
      icons: [
        { icon: icon1, text: '保护区管理' },
        { icon: icon2, text: '调研检查管理' },
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

<style src="../style/rectify.css"></style>