<script setup lang="ts">
import api from '@/api'
import acApi from "@/process/api";
import hyDetail from '@/views/components/hyDetail.vue'
import { useMessage } from '@/composables'
import { useBrokenagin, } from "@/views/trouble-broken/composables";
import { useProcess } from "@/process/composables";
import { useBroken } from '@/views/workbenches/breakWork/composables/useBreak'


/* const */
const show = ref(false)
const title = ref()
const images = ref([])
const processImg = ref('');
const formConfig = ref({})
const troubleFormData = ref<any>({})
const processDetailsRef = ref()

const { processPropsMap, customDetailsFormPropsHookFn } = useBrokenagin()
const { handleResponse } = useMessage()
const { businessInfoData } = useProcess()
const { setCheckFormFields, checkValueList } = useBroken()

// 获取路由参数中的 id
const historyParams = history.state.params


// 流程图
const processInstanceId = ref()

/* methods */
const onClickLeft = () => history.back();

const showBottom = () => {
  show.value = true;
}

const processFormData = computed(() => {
  return processDetailsRef.value?.processFormData;
});



/* methods */
const getApi = async () => {
  const res = await api.exter.queryInfo({ id: historyParams.id })
  res.data = {
    ...res.data,
    ...JSON.parse(res.data?.exterTypeData),
    // ...JSON.parse(res.data?.siteSituationData)
  }
  businessInfoData.value = res.data
  processInstanceId.value = res.data.instanceId
  if (!handleResponse(res)) return
  troubleFormData.value = res.data
}


// 获取流程图
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


if (historyParams.mode === 'view') {
  title.value = '外破详情'
  formConfig.value = { op: 'view' }
} else if (historyParams.mode === 'edit') {
  title.value = '外破编辑'
  formConfig.value = { op: 'edit' }
}



watch(
  () => processFormData.value?.siteSituation,
  val => {
    if (!val) return;
    checkValueList.value = val.split(',');
    setCheckFormFields();
  }
);


watch(processInstanceId, (newVal) => {
  if (newVal) {
    loadProcessImg()
  }
})

onMounted(() => {
  getApi()
})
</script>

<template>
  <van-sticky>
    <van-nav-bar :title=title left-text="" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-button class="title_check" type="primary" size="mini" @click="showBottom">查看流程图</van-button>
      </template>
    </van-nav-bar>
  </van-sticky>
  <hyDetail ref="processDetailsRef" :instanceId="processInstanceId" :processPropsMap="processPropsMap"
    :businessInfoData="businessInfoData" :hookFnMap='{ customFormPropHookFn: customDetailsFormPropsHookFn }' />
  <van-image-preview v-model:show="show" :images="images" maxZoom="3" closeable class="bgc-image"
    style="background-color: white;">
  </van-image-preview>
</template>

<style scoped>
.title_check {
  font-size: 12px;
}
</style>
