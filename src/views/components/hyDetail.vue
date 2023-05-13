<template>
  <div class="bnt">
    <van-cell-group>
      <van-tabs v-model:active="active" animated swipeable swipe-threshold="3" @click-tab="tabCheck">
        <van-tab :title="item.name" v-for="(item) in _taskInfos" :key="item.id">
          <FormBuild ref=" processDataFormRef" v-model="processFormData" :formConfig="_processFormConfig"
            :formPropsGroup="detailFormProps">
            <template #formFooter="{ formRef }">
              {{ setFormInstance(formRef) }}
            </template>
          </FormBuild>
        </van-tab>
      </van-tabs>
    </van-cell-group>
  </div>
</template>

  
<script lang="ts" setup>
import { FormPropGroupType, FormConfigType } from "@/types";
import { IHookFnMap, IBusinessInfo } from "@/process/types";
import { useFormNew, useState } from "@/composables";
import {
  InjectProcessTaskInfoKey,
  QueryActivitiInfoTaskInfosType,
  QueryInfoActivitiType
} from '@/process/types';
import api from '@/process/api';
import FormBuild from "@/components/formBuild";
import { arr2Obj, deepClone } from '@/utils';
import { useSystemStore } from "@/store";
import { useProcess } from "@/process/composables";

const systemStore = useSystemStore()
const { formInstance, setFormInstance, validateForm } = useFormNew();
const active = ref(0)

enum TimelineStatusMap {
  // 已执行
  RESOLVE = '#67C23A',
  // 执行中
  PENDING = '#409EFF',
  // 未执行
  UNRESOLVE = '#909399'
}

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



const props = defineProps({
  // 每个流程节点表单的map
  instanceId: {
    type: String as PropType<string>,
    required: true
  },
  processPropsMap: {
    type: Object as PropType<{ [key: string]: FormPropGroupType[] }>,
    required: true
  },
  hookFnMap: {
    type: Object as PropType<IHookFnMap>
  },
  businessInfoData: {
    type: Object as PropType<{ [key: string]: string }>,
    required: true
  }
} as const);


const _hookFnMap = computed(() => {
  return props.hookFnMap || {};
});

const _isEnd = computed(() => processRecordData.value?.endTime);
const keyIndex = ref(-1)
const detailFormProps = ref<FormPropGroupType[]>([])
const popUpTitle = ref('')
const _processFormConfig = ref<FormConfigType>({
  disabled: true,
})
const processFormData = ref()
const processOperationTypeColorMap = {
  1: '#409EFF',
  2: '#67C23A',
  3: '#F56C6C',
  4: '#F56C6C',
  5: '#3ac2b6',
  6: '#b93ac2',
  7: '#9694f5',
  8: '#409EFF'
};

const _taskInfos = computed<QueryActivitiInfoTaskInfosType[]>(() => {
  const taskInfos: QueryActivitiInfoTaskInfosType[] =
    processRecordData.value?.taskInfos || [];
  if (!taskInfos || !taskInfos.length) return [];
  let key = taskInfos.map((item, index) => {
    const nodeData = item.variableMap;
    // 流程操作类型
    const { processOperationType = 1, fromOrg, fromUser } = nodeData;
    const processNodeStatusDictMap = arr2Obj(
      systemStore.dict.process_node_status
    );
    let stepStatus = 'RESOLVE';
    // 未执行节点
    if (!item.endTime) stepStatus = 'PENDING';
    if (item.endTime) {
      keyIndex.value = index + 1
    }
    return {
      ...item,
      color: TimelineStatusMap[stepStatus],
      tagColor: processOperationTypeColorMap[processOperationType],
      tagText: processNodeStatusDictMap[processOperationType],
      showTitle: `${fromOrg}-${fromUser}(${processNodeStatusDictMap[processOperationType]})`,
    };
  });
  handleDetail(key[active.value], active.value)

  return key
});

function tabCheck(name: any) {
  handleDetail(_taskInfos.value[name.name])
}



const processRecordData = ref<QueryInfoActivitiType>();


async function handleDetail(taskNode: QueryActivitiInfoTaskInfosType, index?: number) {
  if (index === _taskInfos.value.length - 1) return
  popUpTitle.value = taskNode.name
  const taskDefKey = taskIdMap.value[taskNode.id];
  let formData = taskNode.variableMap;
  let formProps = deepClone(props.processPropsMap[taskDefKey]);
  console.log(formProps, 'formProps');

  if (_hookFnMap.value.businessDataHookFn)
    formData = _hookFnMap.value.businessDataHookFn(formData, taskDefKey);
  formProps = _hookFnMap.value.customFormPropHookFn
    ? await _hookFnMap.value.customFormPropHookFn(formProps, formData, taskDefKey)
    : formProps;

  detailFormProps.value = formProps;
  processFormData.value = formData;
  if (index === 0) {
    processFormData.value = props.businessInfoData
  }
  _processFormConfig.value.op = 'view'
  return formProps
}

// 加载流程历史记录数据
async function loadRecordData() {
  const response = await api.activiti.getProcessHistory({
    processInstanceId: props.instanceId
  });
  if (!response) return;
  processRecordData.value = response;
}

async function loadProcessInfoData() {
  if (!props.instanceId) {
    return;
  }
  const { success, data } = await api.activiti.queryInfo({
    instanceId: props.instanceId,
  });
  if (!success) throw new Error("查询流程数据失败");
  return data;
}

async function init() {
  processInfoActivitiWrap.value = await loadProcessInfoData();
  processRecordData.value = processInfoActivitiWrap.value?.actData;
}

watch(() => props.instanceId, (newValue, oldValue) => {
  if (newValue) {
    init();
  }
})

watch(() => props.businessInfoData, (newValue, oldValue) => {
  if (newValue) {
    init();
  }
})


onMounted(() => {
  init()
});

defineExpose({ onReset: loadRecordData });
</script>
  
<style lang="less" scoped>
:deep(.van-tabs__content) {
  height: 100%;
}

.van-tabs {
  overflow-x: auto !important;
  white-space: nowrap;
  width: 100%;
}
</style>
  