<template>
  <div class="one-center">
    <h3>综合管理</h3>
    <van-grid :gutter="10" :border="false">
      <van-grid-item v-for="(item, index) in icons" :key="index" @click="goToPage(item)">
        <div class="icon-wrapper">
          <img :src="item.icon" class="icon" />
          <div class="text">{{ item.text }}</div>
        </div>
      </van-grid-item>
    </van-grid>
    <!-- <div>
      <van-popup v-model:show="show" position="top" safe-area-inset-top closeable close-icon="arrow-left"
        close-icon-position="top-left" :style="{ height: '38%' }">
        <div class="popup-title">
          <div class="title">{{ popupTitle }}</div>
        </div>
        <van-grid :gutter="20" :border="false">
          <van-grid-item v-for="(item, index) in currentList" :key="index" @click="goToPage(item)">
            <div class="icon-wrapper">
              <img :src="item.icon" class="icon" />
              <div class="text">{{ item.text }}</div>
            </div>
          </van-grid-item>
        </van-grid>
      </van-popup>
    </div> -->
  </div>
</template>

<script lang="ts">
import icon1 from '@/assets/images/desk/news-2.png'
import icon2 from '@/assets/images/desk/report-3.png'
import icon3 from '@/assets/images/desk/consult-4.png'
import icon4 from '@/assets/images/desk/file-1.png'
import icon5 from '@/assets/images/desk/Tasks-41.png'
import icon6 from '@/assets/images/desk/History-42.png'


export default {
  data() {
    return {
      show: false,
      popupTitle: '',
      activeItemId: null,
      currentList: [],
      icons: [
        { id: 'news', icon: icon1, text: '新闻管理', path: '/newsList' },
        { id: 'report', icon: icon2, text: '举报管理' },
        { id: 'consult', icon: icon3, text: '咨询管理' },
        { id: 'file', icon: icon4, text: '文件管理' },
        { id: 'tasks', icon: icon5, text: '临时任务' },
        { id: 'history', icon: icon6, text: '历史数据' },
      ],
      // moreNews: [
      //   { id: 'internal', icon: icon1, text: '内部新闻', path: '/internalNews' },
      //   { id: 'external', icon: icon1, text: '外部新闻', path: '/externalNews' },
      //   { id: 'subordinate', icon: icon1, text: '采用下级新闻', path: '/subordinateNews' },
      //   { id: 'edit', icon: icon1, text: '编辑新闻', path: '/editNews' },
      //   { id: 'list', icon: icon1, text: '新闻列表', path: '/newsList' },
      // ],
      moreReport: [
        { id: 'internal', icon: icon2, text: '举报新增', path: '' },
        { id: 'external', icon: icon2, text: '举报查询', path: '' },
        { id: 'subordinate', icon: icon2, text: '草稿箱', path: '' },
        // { id: 'edit', icon: icon2, text: '', path: '' },
        // { id: 'list', icon: icon2, text: '', path: '' },
      ],
      moreConsult: [
        { id: 'internal', icon: icon3, text: '交流管理', path: '' },
        // { id: 'external', icon: icon3, text: '', path: '' },
        // { id: 'subordinate', icon: icon3, text: '', path: '' },
        // { id: 'edit', icon: icon3, text: '', path: '' },
        // { id: 'list', icon: icon3, text: '', path: '' },
      ],
      moreFile: [
        { id: 'internal', icon: icon4, text: '', path: '' },
        { id: 'external', icon: icon4, text: '', path: '' },
        { id: 'subordinate', icon: icon4, text: '', path: '' },
        { id: 'edit', icon: icon4, text: '', path: '' },
        { id: 'list', icon: icon4, text: '', path: '' },
      ],
      moreTasks: [
        { id: 'internal', icon: icon5, text: '', path: '' },
        { id: 'external', icon: icon5, text: '', path: '' },
        { id: 'subordinate', icon: icon5, text: '', path: '' },
        { id: 'edit', icon: icon5, text: '', path: '' },
        { id: 'list', icon: icon5, text: '', path: '' },
      ],
      moreHistory: [
        { id: 'internal', icon: icon6, text: '', path: '' },
        { id: 'external', icon: icon6, text: '', path: '' },
        { id: 'subordinate', icon: icon6, text: '', path: '' },
        { id: 'edit', icon: icon6, text: '', path: '' },
        { id: 'list', icon: icon6, text: '', path: '' },
      ],
    }
  },
  methods: {
    // openNewsPopup (item) {
    //   this.show = true;
    //   this.popupTitle = item.text;
    //   this.activeItemId = item.id;
    // },
    goToPage(item: any) {
      // 使用 Vue Router 的 push 方法来跳转路由
      console.log(item, ' this.$router.push(item.path);');
      this.$router.push(item.path);
    },
    openNewsPopup(item: any) {
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
    }
  },
  computed: {
    activeItem() {
      return this.moreNews.find(item => item.id === this.activeItemId);
    },
  }
}
</script>

<style src="../style/management.css"></style>