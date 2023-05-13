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
      <van-popup v-model:show="show" position="top" safe-area-inset-top close-icon-position="top-left"
        :style="{ height: '30%' }">
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

<script setup lang="ts">
import icon1 from '@/assets/images/desk/hidden-10.png'
import icon2 from '@/assets/images/desk/rupture-11.png'
import icon3 from '@/assets/images/desk/register-12.png'
import icon4 from '@/assets/images/desk/instrument-13.png'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const show = ref(false)
const popupTitle = ref('')
const activeItemId = (null)
const currentList = ref([])
const icons = ref([
  { id: 'hidden', icon: icon1, text: '隐患管理' },
  { id: 'broken', icon: icon2, text: '外破管理' },
  { icon: icon3, text: '立案管理' },
  { icon: icon4, text: '执法仪管理' },
])
const moreHidden = ref([
  // { id: 'internal', icon: icon1, text: '隐患列表', path: '' },
  { id: 'external', icon: icon1, text: '隐患新增', path: '/troubleAdd' },
  { id: 'subordinate', icon: icon1, text: '隐患查询', path: '/trouble' },
  { id: 'edit', icon: icon1, text: '草稿箱', path: '/troubledrafts' },
])
const moreBroken = ref([
  { id: 'external', icon: icon2, text: '外破新增', path: '/brokenAdd' },
  { id: 'subordinate', icon: icon2, text: '外破查询', path: '/broken' },
  { id: 'edit', icon: icon2, text: '草稿箱', path: '/brokenDrafts' },
])


function goToPage(item: any) {
  // 使用 Vue Router 的 push 方法来跳转路由
  console.log(item, 'this.$router.push(item.path);');
  router.push(item.path);
}

function openNewsPopup(item: any) {
  show.value = true;
  popupTitle.value = item.text;
  switch (item.id) {
    case 'hidden':
      currentList.value = moreHidden.value;
      break;
    case 'broken':
      currentList.value = moreBroken.value;
      break;
    // case 'file':
    //   currentList.value = moreFile.value;
    //   break;
    // case 'tasks':
    //   currentList.value = moreTasks.value;
    //   break;
    // case 'history':
    //   currentList.value = moreHistory.value;
    //   break;
    // default:
    //   currentList.value = moreNews.value;
    //   break;
  }
}

// computed(() => {
//   activeItem() {
//     return this.moreNews.find(item => item.id === this.activeItemId);
//   })

</script>

<style src="../style/meetings.css"></style>