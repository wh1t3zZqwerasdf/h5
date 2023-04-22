<template>
  <div class="process-card">
    <div class="l-text-size process-card-title card-width text-hidden">
      <span>{{ dataSource[_titleField.name] }}</span>
    </div>
    <div v-for="item in _otherField" :key="item.name" class="process-card-item">
      <span class="label">{{ item.label }}:</span>
      <span v-if="isDateField(item.name)">
        <!-- 日期 -->
        {{
          daytimeFormat(dataSource[item.name], {
            friendly: false,
            format: item.format
          })
        }}
      </span>
      <span v-else class="text-hidden">{{
        dataSource[item.name]
      }}</span>
    </div>
    <div class="process-footer">
      <div class="process-card-tag-box" v-if="dataSource.status">
        <van-tag size="large" :type="_statusTagDictMap[dataSource.status].type">{{
          _statusTagDictMap[dataSource.status].label }}
        </van-tag>
      </div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { processCardProps } from '../props';
import { daytimeFormat } from '@/utils';
import { watchEffect } from 'vue'

watchEffect(() => {
  console.log('dataSource.processStatus:', [props.dataSource.status]);
});

/* props */
const props = defineProps(processCardProps);
/* emits */

/* hook */

/* data */

/* computed */
const _titleField = computed(() => {
  return props.tableProps[0];
});

const _otherField = computed(() => {
  return props.tableProps.filter((item, index) => index > 0);
});

const _statusTagDictMap = computed(() => {
  return {
    1: {
      label: '草稿',
      type: 'primary',
    },
    2: {
      label: '电力设施产权人提报',
      type: 'success'
    },
    3: {
      label: '执法办经办审核',
      type: 'danger'
    },
    4: {
      label: '执法办负责人审核',
      type: 'warning'
    },
    5: {
      label: '执法办经办处置',
      type: 'warning'
    },
    6: {
      label: '电力设施产权人核实',
      type: 'warning'
    },
    7: {
      label: '归档',
      type: 'warning'
    },
  };
});

/* watch */

/* methods */
function isDateField(name: string) {
  return (
    name.endsWith('Date') || name.endsWith('Datetime') || name.endsWith('Time')
  );
}

onMounted(() => {
  // console.log(_titleField.value.name);  //submitStr
  // console.log(props.tableProps);

});

</script>

<style lang="less" scoped>
.process-card {
  position: relative;
  background-color: rgb(255, 255, 255);
  height: 100%;
  padding: 10px;
  margin-bottom: 10px;

  &-title {
    margin-bottom: 12px;

    span {
      // color: var(--hy-title-text-color);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 300px;
      font-size: 18px;
      font-weight: 600;
      line-height: 24px;
    }
  }

  &-item {
    display: flex;
    margin-bottom: 8px;
    justify-content: space-between;

    .label {
      margin-right: 8px;
      font-size: 14px;
      color: var(--hy-placeholder-text-color);
    }

    span {
      color: var(--hy-title-text-color);
      font-size: 14px;
    }
  }

  &-btn-box {
    position: absolute;
    width: 100%;
    height: 40px;
    background-color: #eaf2ff;
    bottom: 0;
    left: 0;
    text-align: center;
    line-height: 40px;
    cursor: pointer;

    span {
      color: var(--el-color-primary);
      letter-spacing: 3px;
    }
  }

  &-tag-box {
    // position: absolute;
    // right: 12px;
    // top: 12px;

    .el-tag {
      font-size: var(--hy-medium-text-size);
    }
  }
}


.process-footer {
  display: flex;
  justify-content: space-between;
  height: 30px;
  align-items: center;
}

.process-card-tag-box {
  // position: absolute;
  // top: 157px;
  // left: 10px;

  .van-tag--large {
    // color: #000;
    font-size: 12px;
  }
}
</style>
