<template>
  <van-pull-refresh v-model="refreshing" :disabled="openRefresh" loading-text="正在请求数据" success-text="数据刷新成功"
                    @refresh="onRefresh">
    <van-list :disabled="isEnd" :finished="isEnd" :immediate-check="false" :loading="loading" :offset="10"
              @load="onLoad">
      <template #default>
        <slot></slot>
      </template>
    </van-list>
  </van-pull-refresh>
</template>

<script lang="ts" setup>

const props = defineProps({
  pageNo: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    default: 0
  },
  loading: {
    type: Boolean,
    default: false
  },
  // 是否开启下拉刷新
  openRefresh: {
    type: Boolean,
    default: true
  },
  // 是否没有更多数据要加载，会禁用上拉加载更多
  isEnd: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['reLoad', 'update:pageNo']);
const refreshing = ref(false);
const finished = ref(false);
const total = ref(props.total);


const _loading = computed(() => {
  return props.loading
})

// 下拉刷新列表
function onRefresh() {
  emits('update:pageNo', 1)
  emits('reLoad')
  refreshing.value = true;
  finished.value = true;
}

// 上拉加载下一页
function onLoad() {
  if (props.loading && props.pageNo > 1) return
  emits('update:pageNo', props.pageNo + 1)
  emits('reLoad')
}


watch(_loading, (val) => {
  if (!val) {
    refreshing.value = false;
  }
})


</script>
