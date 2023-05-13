<template>
  <div>
    <!-- @click.prevent="goLink(item)" -->
    <!-- v-if="index < maximum" -->
    <template v-for="(item, index) in infoItems" :key="index">
      <div class="newItem" v-if="index < maximum">
        <div class="content">
          <a href="#">{{ item.title }}</a>
          <!-- {{ item.title }}
          {{ item.status_ }} -->
          <!-- {{ item.content }} -->
          <!-- {{
            `为深入贯彻落实国家发展改革委印发的革命老区重点城市对口合作工作方推动三明龙岩打造革命老区重点城市对口合作典范`
          }} -->
          <!-- {{ item.submitOrgName }} -->
          <!-- {{ item.date }} -->
          <div class="right">{{ item.date }}</div>
        </div>

      </div>
    </template>

  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue';
import type { NewInfoItem } from './types/NewsInfoItem.type';
import router from '@/router';

const props = defineProps({
  infoItems: {
    type: Array as () => NewInfoItem[], // (string也可以是其他你自定义的接口)
    required: true
  },
  maximum: {
    type: Number,
    require: false,
    default: 7
  }
});

const emits = defineEmits<{
  (e: 'goLink', data?: any): void;
  //   (e: "getDetail", data?: any): void;
}>();

const { proxy } = getCurrentInstance() as any;
const goLink = (data: any) => {
  console.log('跳转执行方法-----------------:');
  emits('goLink', data);
};
const newsMore = () => {
  router.push({ name: 'integratedNewsNewsMag' });
};
onMounted(() => {
  console.log(props, 'props023');

})

</script>

<style lang="less" scoped>
.newItem {
  width: 100%;
  display: flex;
  align-items: center;
  // overflow: hidden;
  cursor: pointer;
  border: 1px solid black;
  background-color: olivedrab;
  margin-bottom: 10px;
}


.newItem:hover .content a {
  color: #4579b3;
}

.right {
  width: 95px;
  color: #999999;
  font-size: 15px;
  text-align: right;
}

.content {
  width: 100%;
  height: 200px;
  background-color: #4579b3;
  // text-align: left;
  // overflow: hidden;
  /* 超出部分隐藏 */
  // white-space: nowrap;
  /* 文本不换行 */
  // text-overflow: ellipsis;
  /* 省略的文本用省略号表示 */
  color: #333333;
  font-family: 'Microsoft YaHei', 'simsun';
  box-sizing: border-box;

  a {
    font-size: 15px;
    color: #333333;
  }
}
</style>
