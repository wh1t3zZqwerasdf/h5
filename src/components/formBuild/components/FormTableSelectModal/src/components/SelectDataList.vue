<template>
  <div class="select-data shadow">
    <div class="select-data-group">
      <p class="select-data-group-title mb-10px">已选择:</p>
      <template v-for="tag in dataSource" :key="tag[keyProps.valueKey]">
        <el-tag
          class="mx-1 mb-8px"
          closable
          type="info"
          @close="deleteData(tag)"
        >
          {{ tag[keyProps.labelKey] }}
        </el-tag>
      </template>
    </div>
    <div v-show="!dataSource || !dataSource.length">
      <el-empty :image-size="100" description="暂无数据" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SelectDataProps } from '../props';
import { computed } from 'vue';
/* props */
const props = defineProps(SelectDataProps);
/* emits */
const emits = defineEmits(['deleteItem']);
/* hook */

/* data */

/* computed */
const dataSource = computed(() => props.dataSource);
const keyProps = computed(() => props.keyProps);
/* watch */

/* methods */
const deleteData = (item: any) => {
  emits('deleteItem', item[keyProps.value?.valueKey]);
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
.select-data {
  margin-right: 10px;
  height: 100%;

  &-group {
    &-title {
      color: #999;
    }
  }
}
</style>
