<!---HyTabsDialog 弹窗中有tabs页面 每一页作为slot 外部插入内容 -->

<template>
    <div class="wraper">
      <el-tabs @tab-change="tabChg" v-model="myTab" class="demo-tabs">
        <template v-for="item in tabsArray">
          <el-tab-pane
            :label="item.title"
            :name="item.slotName"
            v-if="item.visible"
            :key="item.slotName"
            @click="clickMyTab"
          >
            <slot :name="item.slotName"> </slot>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
</template>
  
  <script setup lang="ts">
  import api from '@/api';
  import { useAuthStore, useSystemStore } from '@/store';
  import {
    useDialog,
    useDialogNew,
    useFormNew,
    useMessage,
    usePage,
    useSearch,
    useState
  } from '@/composables';
  import { FormInstance, ElButton } from 'element-plus';
  import { PropType } from 'vue';
  const { filterData, validateForm, formRef, setFormInstance } = useFormNew();
  
  type tabsParamsType = {
    slotName: string;
    visible?: boolean;
    title: string;
  };
  
  const props = defineProps({
    project_data: {
      type: Object,
      default: {}
    },
    tabsParams: {
      type: Array as PropType<tabsParamsType[]>,
      default: []
    },
    //默认打开项
    defaultView: {
      type: Number,
      default: ''
    }
  });
  const tabsArray = computed(() => {
    return props.tabsParams;
  });
  
  const authStore = useAuthStore();
  
  const myTab = computed({
    get() {
      return props.defaultView;
    },
    set(value) {
      emit('defaultViewChange', value);
    }
  });
  
  const clickMyTab = () => {};
  
  //#endregion
  const emit = defineEmits<{
    (e: 'update:visible', value: any): void;
    (e: 'update:defaultView', value: any): void;
    (e: 'submitDelimit', data?: any): void;
    (e: 'defaultViewChange', data?: any): void;
  }>();
  
  const tabChg = () => {};
  
  // onMounted(() => {
  //   getApi();
  // });
  </script>
  
  <style lang="less" scoped>
  * {
    margin: 0px;
    padding: 0;
  }
  .wraper {
    display: flex;
    align-items: flex-end;
    background-color: #f2f2f2;
  }
  
  :deep(.el-button) {
    padding: 2px 15px;
  }
  
  :deep(.el-tabs) {
    width: 100%;
  }
  </style>
  