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
import { useFormNew, useMessage } from '@/composables'
import { useTrouble } from "./composables/useTrouble";
import { useRouter, useRoute } from "vue-router";
import { ProcessSearchType, IBusinessInfo } from "@/process/types";
import { useTroubleBrokenFieldsSet } from '@/views/trouble-broken/composables/useTroubleBrokenFieldsSet';
import { useProcess } from '@/process/composables';
import api from '@/api';

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
} = useTrouble();

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

const { filterData } = useFormNew();
const { handleResponse, handleError, handleSuccess } = useMessage();

const isSubmitCache = computed(() => {
  return processDetailsRef.value?.isSubmitCache;
});


const searchType = ref<ProcessSearchType>("BACKLOG");
const pageTitle = ref('隐患详情')
const searchId = ref<any>('')
const processDetailsRef = ref()
const keyFlag = ref(false)
const isFirst = ref(true);
const dialogLoading = ref(false)


const processFormData = computed(() => {
  return processDetailsRef.value?.processFormData;
});

const getInfoData = async () => {
  const { success, data } = await api.hid.queryInfo({
    id: searchId.value
  });

  if (!success) return;

  businessData.value = viewDataFilter(data);
  return viewDataFilter(data) as IBusinessInfo;
};


async function resetFormFieldsAndData() {
  if (!isFirst.value) {
    processDetailsRef.value.setFormFieldData('hiddenTroubleHarmonize', '');
    resetCheckFormFields(userTask1);
  }

  isFirst.value = false;
}

function businessDataHookFn(data: any, taskDefKey?: string) {
  if (!taskDefKey || taskDefKey === 'userTask1') return viewDataFilter(data);
  return data;
}

async function handleDispenseHid(data: any, extraParams: any) {
  console.log('handleDispense: ', data);
  const params = handleBeforeDeal(data);
  const assignParams = Object.assign({}, params);

  assignParams.taskIdList = [extraParams.id];
  console.log('handleBeforeDispense-end: ', assignParams);
  const result = await api.hid.dispense(assignParams);
  return {
    success: result.code === 200,
    msg: result.message || result.data
  };
}



// 执行任务派发 省经办 派发任务 给到 属地负责人
async function onDispatch(data: any, str: any) {
  let isDispatch = true;
  try {
    // let uid: string = processData.value['uid'];
    // 省经办审核

    const params = {
      ...data
      // uid: uid,
      // instanceId: lastActivityInfo.value.id
    };
    console.log('params: ', params);
    const { success, msg } = await handleDispenseHid(
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
    const res = await api.hid.updateData(filterData(data));
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
    console.log(formData, processInfoActivitiWrap.value)
    dialogLoading.value = true;
    let flag = true;
    const data = businessData.value;
    const taskInfoData = taskInfos.value;
    const keyName = processDetailsRef.value.currUserTaskKey;
    const detailInfo = Object.assign({}, data, formData);
    console.log(detailInfo, formData, keyName, processDetailsRef.value);
    // return;
    if (keyName == 'userTask4') {
      detailInfo.disposeResult = detailInfo.sevenDisposeWay;

      detailInfo.status =
        formData.arrayUserTask[detailInfo.arrayUserTask.length - 1].status;
      detailInfo.isNext =
        formData.arrayUserTask[detailInfo.arrayUserTask.length - 1].isNext;
      detailInfo.sevenDisposeTime =
        formData.arrayUserTask[
          detailInfo.arrayUserTask.length - 1
        ].sevenDisposeTime;
      detailInfo.sevenDisposeWay =
        formData.arrayUserTask[
          detailInfo.arrayUserTask.length - 1
        ].sevenDisposeWay;
    }
    if (keyName == 'userTask2' && detailInfo.isNext === 1) {
      detailInfo.toUser = formData.uid;
      onDispatch(detailInfo, keyName);
      flag = false;
    }
    if (keyName == 'userTask5') detailInfo.processStatus = 2;

    if (keyName == 'userTask4' && detailInfo['status'] === 5) {
      const { success } = await api.activiti.saveTaskVariables({
        taskId: lastTaskInfo.value.id,
        variableMap: submitDataFilter(detailInfo)
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
    if (flag) {
      const { success, msg } = await handleDeal(
        Object.assign({}, submitDataFilter(detailInfo))
      );
      console.log(success, 'success')
      // if (!success) {
      //   handleError(msg);
      //   dialogLoading.value = false;
      //   formData = {}; // 重置流程数据
      //   return;
      // }
      console.log('我要调update')
      const res = await api.hid.updateData(
        submitDataFilter(filterData(detailInfo))
      );
      if (!handleResponse(res)) {
        dialogLoading.value = false;
        return;
      }
      handleSuccess('处理成功', () => {
        dialogLoading.value = false;
        processDetailsRef.value.onReset();
      });
    }
  } catch (error) {
    console.log(error);
    // dialogLoading.value = false;
  }
}

const onClose = () => history.back();

/* watch */
watch(
  () => processFormData.value?.hiddenTroubleType,
  val => {
    if (!val) return;
    resetFormFieldsAndData();
    loadFieldsData(val);
  }
);

watch(
  () => processFormData.value?.hiddenTroubleHarmonize,
  val => {
    if (!val) return;
    console.log(val)
    if (typeof val === "string") {
      checkValueList.value = val.split(',');
    }
    setCheckFormFields();
  }
);


const previewForm = () => {
  loadFieldsData(businessData.value.hiddenTroubleType);
  checkValueList.value = businessData.value.hiddenTroubleHarmonize?.split(',');
  setCheckFormFields();
};


const update = async () => {
  previewForm();
  const formData = lastTaskInfo.value.variableMap;
  if (
    processDetailsRef.value.currUserTaskKey == 'userTask4' &&
    searchType.value === 'BACKLOG' &&
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
  // height: 10vh;
  position: absolute;
  bottom: 0;
  padding: 4% 10%;
  background-color: #fff;

  :deep(.van-button) {
    width: 100%;
  }
}
</style>
