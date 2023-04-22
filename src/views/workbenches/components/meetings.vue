<template>
  <div class="one-center">
    <h3>会议管理</h3>
    <van-grid :gutter="10" :border="false">
      <van-grid-item v-for="(item, index) in icons" :key="index" @click="openNewsPopup(item)">
        <div class="icon-wrapper">
          <img :src="item.icon" class="icon" />
          <div class="text">{{ item.text }}</div>
        </div>
      </van-grid-item>
    </van-grid>
    <div>
      <van-popup v-model:show="show" position="top" safe-area-inset-top closeable close-icon="arrow-left"
        close-icon-position="top-left" :style="{ height: '38%' }">
        <div class="popup-title">
          <div class="title">{{ popupTitle }}</div>
        </div>
        <!-- 在这里添加更多的新闻项目 -->
        <van-grid :gutter="20" :border="false">
          <van-grid-item v-for="(item, index) in currentList" :key="index" @click="goToPage(item)">
            <div class="icon-wrapper">
              <img :src="item.icon" class="icon" />
              <div class="text">{{ item.text }}</div>
            </div>
          </van-grid-item>
        </van-grid>
      </van-popup>
    </div>
  </div>
</template>

<script>
import icon1 from '@/assets/images/desk/hidden-10.png'
import icon2 from '@/assets/images/desk/rupture-11.png'
import icon3 from '@/assets/images/desk/register-12.png'
import icon4 from '@/assets/images/desk/instrument-13.png'


export default {
  data () {
    return {
      show: false,
      popupTitle: '',
      activeItemId: null,
      currentList: [],
      icons: [
        { id: 'hidden', icon: icon1, text: '隐患管理' },
        { icon: icon2, text: '外破管理' },
        { icon: icon3, text: '立案管理' },
        { icon: icon4, text: '执法仪管理' },
      ],
      moreNews: [
        { id: 'internal', icon: icon1, text: '隐患列表', path: '' },
        { id: 'external', icon: icon1, text: '隐患新增', path: '' },
        { id: 'subordinate', icon: icon1, text: '隐患查询', path: '' },
        { id: 'edit', icon: icon1, text: '草稿箱', path: '' },
      ],
    }
  },
  methods: {
    goToPage (item) {
      // 使用 Vue Router 的 push 方法来跳转路由
      console.log(item, ' this.$router.push(item.path);');
      this.$router.push(item.path);
    },
    openNewsPopup (item) {
      this.show = true;
      this.popupTitle = item.text;
      switch (item.id) {
        case 'report':
          this.currentList = this.moreReport;
          break;
        case 'consult':
          this.currentList = this.moreConsult;
          break;
        case 'file':
          this.currentList = this.moreFile;
          break;
        case 'tasks':
          this.currentList = this.moreTasks;
          break;
        case 'history':
          this.currentList = this.moreHistory;
          break;
        default:
          this.currentList = this.moreNews;
          break;
      }
    },
    computed: {
      activeItem () {
        return this.moreNews.find(item => item.id === this.activeItemId);
      },
    }
  }
}
</script>

<style src="../style/meetings.css"></style>