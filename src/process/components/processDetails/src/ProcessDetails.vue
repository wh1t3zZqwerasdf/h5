<template>
  <div v-loading="loading" class="formList">
    <van-sticky >
          <van-nav-bar
          :title="pageTitle"
          left-text="返回"
          left-arrow
          @click-left="returnBack"
        />
    </van-sticky>
    
    <FormBuild
      v-if="!loading"
      ref="processDataFormRef"
      v-model="processFormData"
      :formConfig="_processFormConfig"
      :formPropsGroup="_processNodeFormProps"
    >
      <template #formFooter="{ formRef }">
        {{ setFormInstance(formRef) }}
      </template>
    </FormBuild>
    <FlowStepsList         
        ref="processRecordsRef"
        v-if="instanceId"
        :hookFnMap="_hookFnMap"
        :instanceId="instanceId"
        :processPropsMap="processPropsMap"
        :taskIdMap="taskIdMap"
        :businessInfoData = 'businessInfoData'
        >
      </FlowStepsList>
  </div>
</template>

<script lang="ts" setup>
import { useProcess } from "@/process/composables";
import { useFormNew, useState } from "@/composables";
import { FormPropGroupType } from "@/types";
import FormBuild from "@/components/formBuild";
import { IHookFnMap, IBusinessInfo } from "@/process/types";
import {
  InjectProcessSearchTypeKey,
  InjectProcessTaskInfoKey,
  QueryInfoActivitiWrapType
} from '@/process/types';
import FlowStepsList from './components/FlowStepsList.vue'
import api from "@/process/api";

/* props */
const props = defineProps({
  processType: {
    type: String as PropType<string>,
    default: () => {
      return "HAVE_FINISHED";
    },
  },
  processPropsMap: {
    type: Object as PropType<{ [key: string]: FormPropGroupType[] }>,
    required: true,
  },
  // 业务接口方法(返回业务对象，并且必须包含流程id字段和业务id字段)
  businessInfoApiFn: {
    type: Function as PropType<() => Promise<IBusinessInfo | undefined>>,
    required: true,
  },
  pageTitle:{
    type: String,
    required: true,
    default: '标题'
  },
  hookFnMap: {
    type: Object as PropType<IHookFnMap>
  },
});
/* emits */
const emits = defineEmits<{
  (
    e: 'update:processInfoActivitiWrap',
    value: QueryInfoActivitiWrapType | undefined
  ): QueryInfoActivitiWrapType;
  (e: 'loadingCompleted'): void;
}>();


/* hook */
const { formInstance, setFormInstance, validateForm } = useFormNew();
const {
  instanceId,
  businessInfoData,
  processInfoActivitiWrap,
  activityInfos,
  isProcessEnd,
  currTaskId,
  currUserLastDealTaskItem,
  taskInfos,
  taskIdMap,
  lastTaskInfo,
  getTaskInfoItemByBackIndex,
} = useProcess();
const { loading } = useState();

/* data */
const reactiveData = reactive({
  loadingText: "加载中...",
  isFirst: true,
  // 提交暂存标记
  isSubmitCache: false,
});

/* provide/inject */
const processType = computed(() => {
  return props.processType;
});
const _isSubmitCache = computed(() => reactiveData.isSubmitCache);
// 流程表单formData
const processFormData = reactive({});

const _currUserTaskKey = computed(() => {
  let currUserLastDealTaskId = currUserLastDealTaskItem.value?.id;
  switch (processType.value) {
    case 'BACKLOG':
      currUserLastDealTaskId = lastTaskInfo.value?.id;
      break;
  }
  return taskIdMap.value[currUserLastDealTaskId];
});


const showFlag = ref(false);
const processDataFormRef = ref();
const processRecordsRef = ref()
const showTaskPop = computed(() =>{
  const currUserLastDealTaskId = currUserLastDealTaskItem.value
    ? currUserLastDealTaskItem.value.id
    : "";
  const currUserLastDealTaskDefKey = taskIdMap.value[currUserLastDealTaskId];
  return processType.value === "BACKLOG"? currTaskId.value : currUserLastDealTaskDefKey
})

/* computed */
// 流程表单config
const _processFormConfig = computed(() => {
  if (!processType) return {};
  const processSearchType = processType.value;
  const formConfig = {
    inline: false,
    disabled: false,
    op: "deal",
    isPreview: true,
  };
  switch (processSearchType) {
    case "BACKLOG":
      if (reactiveData.isSubmitCache) {
        formConfig.disabled = true;
        formConfig.op = "view";
      }
      break;
    case "HAVE_FINISHED":
      formConfig.disabled = true;
      formConfig.op = "view";
      break;
  }
  return formConfig;
});

const _hookFnMap = computed(() => {
  return props.hookFnMap || {};
});

// // 流程节点表单配置
const _processNodeFormProps = ref<FormPropGroupType[]>([]);

function formPropsChange() {
  if (!processType) return [];
  const processSearchType = processType.value;
  const currUserLastDealTaskId = currUserLastDealTaskItem.value
    ? currUserLastDealTaskItem.value.id
    : "";
  const currUserLastDealTaskDefKey = taskIdMap.value[currUserLastDealTaskId];
  let formProps = props.processPropsMap[currTaskId.value];
  switch (processSearchType) {
    // 待处理
    case "BACKLOG":
      // 提交审批后的缓存
      if (reactiveData.isSubmitCache)
        formProps = props.processPropsMap[currUserLastDealTaskDefKey];

      break;
    // 已处理
    case "HAVE_FINISHED":
      formProps = props.processPropsMap[currUserLastDealTaskDefKey];
      break;
  }
  _processNodeFormProps.value = formProps;
}

/* watch */

/* methods */
async function init() {
  console.log('提交后发起2222222')
  reactiveData.loadingText = reactiveData.isFirst
    ? "加载中..."
    : "流程处理中...";
  reactiveData.isFirst = false;
  loading.value = true;
  businessInfoData.value = await loadBusinessInfoData();
  processInfoActivitiWrap.value = await loadProcessInfoData();
  setBaseProcessData();
  formPropsChange();
  emits('update:processInfoActivitiWrap', processInfoActivitiWrap.value);
  emits('loadingCompleted');
  loading.value = false;
}

// 加载业务数据
async function loadBusinessInfoData() {
  if (!props.businessInfoApiFn) {
    console.log("缺少businessInfoFn");
    return;
  }
  return props.businessInfoApiFn();
}

// 加载流程数据
async function loadProcessInfoData() {
  if (!instanceId.value) {
    console.log("流程实例id不存在");
    return;
  }
  const { success, data } = await api.activiti.queryInfo({
    instanceId: instanceId.value,
  });
  if (!success) throw new Error("查询流程数据失败");
  return data;
}

async function getFormData() {
  const valid = await processDataFormRef.value.onSubmit();
  // const valid = await validateForm(formInstance.value);
  if (!valid) return false;
  return toRaw(processFormData);
}


// 修改当前流程节点的数据
function setFormFieldData(fields: string, value: any) {
  if (!fields) return;
  processFormData[fields] = value;
}


// 流程重置刷新
function onReset() {
  console.log('提交后发起')
  businessInfoData.value = { id: '', instanceId: '' };
  reactiveData.isSubmitCache = true;
  reactiveData.isFirst = true;
  processRecordsRef.value.onReset();
  init();
}

function setBaseProcessData() {
  let data = businessInfoData.value || {};
  if (_hookFnMap.value.businessDataHookFn)
    data = _hookFnMap.value.businessDataHookFn(data);
  if (showTaskPop.value === "userTask1") {
    Object.keys(data).forEach((e: any) => {
      setFormFieldData(e, data[e]);
    });
  }
}


const returnBack = () => history.back();

onMounted(() => {
  init();
});

defineExpose({
  getFormData,
  setFormFieldData,
  onReset,
  currUserTaskKey: _currUserTaskKey,
  isSubmitCache: _isSubmitCache,
  processFormData
});
</script>

<style lang="less" scoped>
.formList{
  height: 100%;
  overflow: auto;
}
</style>
