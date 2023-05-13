<template>
  <div class="boxHeight" v-loading="dialogLoading">
    <ProcessDetails v-if="keyFlag" ref="processDetailsRef" :processPropsMap="processPropsMap" :processType="searchType"
      v-model:processInfoActivitiWrap="processInfoActivitiWrap" :businessInfoApiFn="getInfoData" :hookFnMap="{
        businessDataHookFn,
        customFormPropHookFn: customDetailsFormPropsHookFn
      }" :pageTitle='pageTitle' @loadingCompleted="update"></ProcessDetails>
    <van-sticky position="bottom">
      <div class="footerBox" v-if="searchType === 'BACKLOG'">
        <van-button type="primary" @click="onDeal" v-if="!isSubmitCache" v-debounce>确认</van-button>
        <van-button type="warning" @click="onClose" v-else v-debounce>关闭</van-button>
      </div>
    </van-sticky>
  </div>
</template>
  
<script setup lang="ts">
import ProcessDetails from "@/process/components/processDetails/index";
import { useBroken } from "./composables/useBreak";
import { ProcessSearchType, IBusinessInfo } from "@/process/types";
import { useProcess } from '@/process/composables';
import api from '@/api';
import { useRouter, useRoute } from "vue-router";
import { useTroubleBrokenFieldsSet } from '@/views/trouble-broken/composables/useTroubleBrokenFieldsSet';
import { useFormNew, useMessage } from '@/composables'


const route = useRoute();

const {
  viewDataFilter,
  submitDataFilter,
  resetCheckFormFields,
  resetFormData
} = useTroubleBrokenFieldsSet();

const {
  processPropsMap,
  loadFieldsData,
  checkValueList,
  setCheckFormFields,
  userTask1,
  businessData,
  customDetailsFormPropsHookFn
} = useBroken();

const {
  processInfoActivitiWrap,
  handleDeal,
  handleReturn,
  taskInfos,
  lastActivityInfo,
  lastTaskInfo,
  handleBeforeDeal,
  currUserLastDealTaskItem
} = useProcess();

const { handleResponse, handleError, handleSuccess } = useMessage();

const { filterData } = useFormNew();



const searchId = ref<any>('')
const dialogLoading = ref(false)
const keyFlag = ref(false)
const searchType = ref<ProcessSearchType>("BACKLOG");
const pageTitle = ref('外破详情')
const processDetailsRef = ref()
const isFirst = ref(true);


const isSubmitCache = computed(() => {
  return processDetailsRef.value?.isSubmitCache;
});
const processFormData = computed(() => {
  return processDetailsRef.value?.processFormData;
});



function businessDataHookFn(data: any) {
  return viewDataFilter(data);
}

async function resetFormFieldsAndData() {
  if (!isFirst.value) {
    processDetailsRef.value.setFormFieldData('hiddenTroubleHarmonize', '');
    resetCheckFormFields(userTask1);
  }

  isFirst.value = false;

  // processDetailsRef.value.setFormData(resetFormData(processFormData.value));
}


async function handleDispenseExter(data: any, extraParams: any) {
  console.log('handleDispense: ', data);
  const params = handleBeforeDeal(data);
  const assignParams = Object.assign({}, params);

  assignParams.taskIdList = [extraParams.id];
  console.log('handleBeforeDispense-end: ', assignParams);
  const result = await api.exter.dispense(assignParams);
  return {
    success: result.code === 200,
    msg: result.message || result.data
  };
}


async function getInfoData() {


  const { success, data } = await api.exter.queryInfo({
    id: searchId.value
  });
  console.log(data, 'getInfoData - 119');

  if (!success) return;

  businessData.value = viewDataFilter(data);
  return viewDataFilter(data) as IBusinessInfo;
}



// 执行任务派发 省经办 派发任务 给到 属地负责人
async function onDispatch(data: any, str: any) {
  let isDispatch = true;
  try {
    // 省经办审核

    const params = {
      ...data
    };
    console.log('params: ', params);
    const { success, msg } = await handleDispenseExter(
      params,
      lastTaskInfo.value
    );
    console.log('handleDeal-end: ', success, msg);
    if (!success) {
      handleError(msg);
      isDispatch = false;
      return isDispatch;
    }
    const key = {
      ...filterData(data),
      dependencyOrg: filterData(data).uid
    };
    const res = await api.exter.updateData(filterData(data), 1);
    if (!handleResponse(res)) {
      dialogLoading.value = false;
      return;
    }
    handleSuccess('派发成功', () => {
      dialogLoading.value = false;
      processDetailsRef.value.onReset();

      isDispatch = true;
      return isDispatch;
    });
  } catch (error) {
    isDispatch = false;
  }
  return isDispatch;
}


/* 审批 */
async function onDeal() {
  let formData = await processDetailsRef.value.getFormData();
  if (!formData) return;
  try {
    let flag = true;
    dialogLoading.value = true;
    const data = businessData.value;
    const keyName = processDetailsRef.value.currUserTaskKey;

    if (keyName == 'userTask4') {
      formData.isOk = 1;
      formData.isNext = 1;
      const btc = formData.arrayUserTask[formData.arrayUserTask.length - 1];
      formData.status = btc.status;
      formData.way = btc.way;
      formData.mode = btc.mode;
      const msc = formData.arrayUserTask[formData.arrayUserTask.length - 1];
      Object.keys(msc).forEach((e: any) => {
        formData[e] = msc[e];
      });
    }
    // 更新详情数据
    const detailInfo = Object.assign({}, data, formData);
    if (detailInfo.sevenDisposeWay == 2 && detailInfo.sevenOliceIsAccept == 0)
      detailInfo.sevenDisposeWay = detailInfo.mode;

    if (keyName == 'userTask2' && detailInfo.fiveIsAccept == 1) {
      detailInfo.toUser = detailInfo.uid;
      onDispatch(detailInfo, keyName);
      flag = false;
      return;
    }
    if (keyName == 'userTask1') detailInfo.status = 2;

    if (keyName == 'userTask8') detailInfo.processStatus = 2;
    console.log(detailInfo);
    if (keyName == 'userTask4' && formData['status'] === 4) {
      const { success } = await api.activiti.saveTaskVariables({
        taskId: lastTaskInfo.value.id,
        variableMap: submitDataFilter(formData)
      });
      if (!success) {
        handleError('处理失败');
        dialogLoading.value = false;
        formData = {}; // 重置流程数据
        return;
      }

      handleSuccess('处理成功', () => {
        dialogLoading.value = false;
        processDetailsRef.value.onReset();
      });
      return;
    }
    // 更新流程
    const { success, msg } = await handleDeal(submitDataFilter(formData));
    if (!success) {
      handleError('处理失败');
      dialogLoading.value = false;
      formData = {}; // 重置流程数据
      return;
    }

    const res = await api.exter.updateData(
      submitDataFilter(filterData(detailInfo)),
      1
    );
    if (!handleResponse(res)) {
      dialogLoading.value = false;
      return;
    }

    handleSuccess('处理成功', () => {
      dialogLoading.value = false;
      processDetailsRef.value.onReset();
    });
  } catch (error) {
    console.log(error);
    dialogLoading.value = false;
  }
}


const previewForm = () => {
  loadFieldsData(businessData.value.exterType);
  checkValueList.value = businessData.value.hiddenTroubleHarmonize?.split(',');
  setCheckFormFields();
};

const update = async () => {
  previewForm();
  const formData = lastTaskInfo.value.variableMap;
  if (
    processDetailsRef.value.currUserTaskKey == 'userTask4' &&
    searchType?.value === 'BACKLOG' &&
    !processDetailsRef.value.isSubmitCache
  ) {
    if (!formData.arrayUserTask) {
      formData.arrayUserTask = [{}];
    } else if (formData.arrayUserTask) {
      const key = formData.arrayUserTask[0];
      formData.arrayUserTask.push({
        sevenIsAdvice: key.sevenIsAdvice,
        sevenAdviceTime: key.sevenAdviceTime,
        sevenAdviceFile: key.sevenAdviceFile
      });
      formData.arrayUserTask?.forEach((item: any, index: any) => {
        if (index != formData.arrayUserTask.length - 1) item.disabled = true;
      });
    }
    processDetailsRef.value.setFormFieldData(
      'arrayUserTask',
      formData.arrayUserTask
    );
  }
};

watch(
  () => processFormData.value?.exterType,
  val => {
    if (!val) return;
    resetFormFieldsAndData();
    loadFieldsData(val);
  }
);

watch(
  () => processFormData.value?.siteSituation,
  val => {
    if (!val) return;
    checkValueList.value = val.split(',');
    setCheckFormFields();
  }
);


const onClose = () => history.back();



onMounted(() => {
  isFirst.value = true;
  keyFlag.value = false
  const query = route.query;
  if (query.type) {
    searchType.value = query.type as ProcessSearchType;
    searchId.value = query.id
  }
  keyFlag.value = true
});
</script>
  
<style lang="less" scoped>
.boxHeight {
  height: 100vh
}

.footerBox {
  width: 100%;
  box-sizing: border-box;
  height: 10vh;
  position: absolute;
  bottom: 0;
  padding: 4% 10%;
  background-color: #fff;

  :deep(.van-button) {
    width: 100%;
  }
}
</style>
  