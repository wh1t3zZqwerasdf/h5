<template>
  <div class="w-full result-page">
    <div class="flex justify-center result">
      <van-icon :class="resTypeMap[type].class" :name="resTypeMap[type].icon" :size="50" class="result-icon">
      </van-icon>
      <p>{{ title }}</p>
      <p class="description">{{ description }}</p>
    </div>
    <div class="result-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
/* props */

const resTypeMap = {
  success: {
    icon: 'passed',
    class: 'success'
  },
  warning: {
    icon: 'warning-o',
    class: 'warning'
  },
  error: {
    icon: 'close',
    class: 'error'
  }
};

const props = defineProps({
  type: {
    type: String as PropType<string>,
    default: 'success'
  },
  title: {
    type: String as PropType<string>,
    default: '信息填报提交成功'
  },
  description: {
    type: String as PropType<string>,
    default: '您已提交信息,等待部门审核'
  }
});
/* emits */

/* hook */

/* data */

/* computed */

/* watch */

/* methods */

onMounted(() => {
});
</script>

<style lang="less" scoped>
.result {
  flex-direction: column;
  align-items: center;
  height: 70vh;

  p {
    font-size: var(--hy-title-text-size);
    color: var(--el-input-text-color);
    margin: 5px 0;
  }

  .description {
    font-size: var(--hy-subtitle-text-size);
    color: var(--el-color-info);
  }
}

.result-footer {
  text-align: center;
  //padding-top: 80px;
  min-height: 200px;
}

.result-page {
  height: 100vh;
  background: #fff;
}

.success {
  color: var(--el-color-success);
}

.warning {
  color: var(--el-color-warning);
}

.error {
  color: var(--el-color-danger);
}
</style>
