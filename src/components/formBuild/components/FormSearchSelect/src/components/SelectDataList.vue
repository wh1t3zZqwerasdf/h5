<template>
  <template v-for="(item, index) in dataSource" :key="index">
    <van-tag v-if="item"
             :closeable="!disabled" class="p-5px mr-5px mb-5px" @close="deleteData(item)">
      {{
        item[keyProps.labelKey]
      }}
    </van-tag>
  </template>
</template>

<script lang="ts" setup>

/* props */
const props = defineProps({
  dataSource: {
    type: Array as PropType<any[]>
  },
  keyProps: {
    type: Object as PropType<{ valueKey: string; labelKey: string }>,
    default: () => {
      return {
        valueKey: 'id',
        labelKey: 'name'
      };
    }
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  }
})

/* emits */
const emits = defineEmits(['deleteItem']);
/* hook */

/* data */

/* computed */

/* watch */

/* methods */
const deleteData = (item: any) => {
  emits('deleteItem', item[props.keyProps?.valueKey]);
};
onMounted(() => {

});
</script>

<style lang="scss" scoped>

</style>
