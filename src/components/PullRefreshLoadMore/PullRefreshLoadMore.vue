<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh" loading-text="正在请求数据" success-text="数据刷新成功">
    <van-list :loading="loading" @load="onLoad" :finished="finished" :offset="10" :immediate-check="false">
      <template #default>
        <slot></slot>
      </template>
    </van-list>
  </van-pull-refresh>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  pageSize: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    default: 0
  },
  dataSource: {
    type: Array, // 修改类型为数组
    default: () => []
  },
  loadings: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['loadList']);
const pageNo = ref(1);
const refreshing = ref(false);
const loading = ref(false);
const finished = ref(false);
const total = ref(props.total);

// 下拉刷新列表
function onRefresh() {
  pageNo.value = 1;
  refreshing.value = true;
  finished.value = false;
  loadList();
}

//上拉加载下一页
function onLoad() {
  if (loading.value) {
    return
  }


  if (pageNo.value < 10) {
    pageNo.value++;
    loading.value = true;
    loadList();
  }
}

function loadList() {
  try {
    emits('loadList', {
      pageNo: pageNo.value,
      pageSize: props.pageSize,
      total: props.total,
    });
    console.log(pageNo.value, props.pageSize, props.total, 'total');

    // console.log(pageNo.value, props.pageSize, 'pageSizepageSize');

    refreshing.value = false;
    // loading.value = false;
    return
  } catch (error) {
    console.error(error);
    refreshing.value = false;
    // loading.value = false;
  }
}

</script>
