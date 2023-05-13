<script setup lang="ts">
import api from '@/api'
import acApi from "@/process/api";
import hyDetail from '@/views/components/hyDetail.vue'

import { useRoute } from 'vue-router'
import { useMessage } from '@/composables'
import { useTroubleaging } from "@/views/trouble-broken/composables";
import { useProcess } from "@/process/composables";

/** props */


/* const */
const show = ref(false)
const route = useRoute()
const images = ref([])
const processImg = ref('');
const troubleFormData = ref<any>({})

const { businessInfoData } = useProcess()
const { handleResponse } = useMessage()
const { processPropsMap, customDetailsFormPropsHookFn } = useTroubleaging()
// const { viewDataFilter } = useTroubleBrokenFieldsSet()
// 定义标题和表单配置
const title = ref()
const formConfig = ref({})

// 流程图
const processInstanceId = ref()


/* methods */
const fetchData = async () => {
  const res = await api.hid.queryInfo({ id: id })
  res.data = {
    ...res.data,
    ...JSON.parse(res.data?.hiddenTypeData),
  }
  console.log(res.data)
  businessInfoData.value = res.data
  processInstanceId.value = res.data.instanceId
  if (!handleResponse(res)) return
  troubleFormData.value = res.data
}



async function loadProcessImg() {
  if (!processInstanceId.value) {
    console.log('流程实例id不存在');
    return;
  }
  const res = await acApi.activiti.getProcessImg({
    processInstanceId: processInstanceId.value
  });
  processImg.value = res;
  images.value = [processImg.value] as never[];
}



// 获取路由参数中的 id
const id = route.params.id
const mode = route.query.mode
// console.log(mode 'mode');
if (mode === 'view') {
  title.value = '隐患详情'
  formConfig.value = { op: 'view' }
} else if (mode === 'edit') {
  title.value = '隐患编辑'
  formConfig.value = { op: 'edit' }
}


const onClickLeft = () => history.back();

const showBottom = () => {
  show.value = true;
}


watch(processInstanceId, (newVal) => {
  if (newVal) {
    loadProcessImg()
  }
})


onMounted(() => {
  fetchData()
})

</script>

<template>
  <div>
    <van-sticky>
      <van-nav-bar :title=title left-text="" left-arrow @click-left="onClickLeft">
        <template #right>
          <van-button class="title_check" type="primary" size="mini" @click="showBottom">查看流程图</van-button>
        </template>
      </van-nav-bar>
    </van-sticky>
    <hyDetail :instanceId="processInstanceId" :processPropsMap="processPropsMap" :businessInfoData="businessInfoData"
      :hookFnMap='{ customFormPropHookFn: customDetailsFormPropsHookFn }' />
    <!--  -->
  </div>
  <van-image-preview v-model:show="show" :images="images" maxZoom="3" closeable class="bgc-image"
    style="background-color: white;">
  </van-image-preview>
</template>
<style scoped>
.title_check {
  font-size: 12px;
}
</style>