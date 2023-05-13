<template>
  <div class="bnt">
    <van-cell-group title="流程" inset>
      <div v-for="(item, index) in _taskInfos" :key="item.id" class="processNode">
        <div class="imgBox">
          <div class="peopleImg">
            <img src="@/assets/images/people.png" alt="" class="pPImg">
            <img src="@/assets/images/right.png" alt="" class="finishImg" v-if="item.endTime">
          </div>
        </div>
        <div class="infoBox" :class="!item.endTime ? 'act' : ''">
          <div class="infoTitle" :class="!item.endTime ? 'act' : ''">
            <div class="innerP">
              <p> {{ item.name }} </p>
            </div>

            <button class="btn-onView" v-if="index !== _taskInfos.length - 1"
              @click="handleDetail(item, index)">查看详情</button>
          </div>
          <div class="timeBox" v-if="index !== 0">
            {{ index === _taskInfos.length - 1 && !item.endTime ? '待受理' : index === 0 ? '已创建' : item.showTitle }}
          </div>

          <div class="endTime" v-if="item.endTime">{{ item.endTime ? item.endTime.slice(0, 10) : '' }}</div>
        </div>
      </div>
    </van-cell-group>


    <van-popup v-model:show="upShow" position="bottom" :style="{ height: '80%' }" :lock-scroll="false">
      <template #default>
        <FormBuild ref="processDataFormRef" v-model="processFormData" :formConfig="_processFormConfig"
          :formPropsGroup="detailFormProps">
          <template #formFooter="{ formRef }">
            {{ setFormInstance(formRef) }}
          </template>
        </FormBuild>
      </template>
    </van-popup>
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

const systemStore = useSystemStore()
const { formInstance, setFormInstance, validateForm } = useFormNew();
const upShow = ref(false)

enum TimelineStatusMap {
  // 已执行
  RESOLVE = '#67C23A',
  // 执行中
  PENDING = '#409EFF',
  // 未执行
  UNRESOLVE = '#909399'
}



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
  taskIdMap: {
    type: Object as PropType<{ [key: string]: string }>,
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
const instanceId = computed(() => props.instanceId)
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
      showTitle: `${fromOrg}-${fromUser}(${processNodeStatusDictMap[processOperationType]})`
    };
  });
  console.log(key)
  return key
});



const processRecordData = ref<QueryInfoActivitiType>();

async function handleDetail(taskNode: QueryActivitiInfoTaskInfosType, index: number) {
  if (index === _taskInfos.value.length - 1) return
  popUpTitle.value = taskNode.name
  const taskDefKey = props.taskIdMap[taskNode.id];
  let formData = taskNode.variableMap;
  let formProps = deepClone(props.processPropsMap[taskDefKey]);
  console.log(formData, taskDefKey);
  if (_hookFnMap.value.businessDataHookFn)
    formData = _hookFnMap.value.businessDataHookFn(formData, taskDefKey);
  formProps = _hookFnMap.value.customFormPropHookFn
    ? await _hookFnMap.value.customFormPropHookFn(
      formProps,
      formData,
      taskDefKey
    )
    : formProps;
  console.log(formProps)

  detailFormProps.value = formProps;
  processFormData.value = formData;
  if (index === 0) {
    processFormData.value = props.businessInfoData
  }
  _processFormConfig.value.op = 'view'
  upShow.value = true
}

// 加载流程历史记录数据
async function loadRecordData() {
  const response = await api.activiti.getProcessHistory({
    processInstanceId: instanceId.value
  });
  if (!response) return;
  processRecordData.value = response;
}

onMounted(() => {
  // 外部传入数据源通过数据源渲染
  //   if (props.dataSource) return;
  loadRecordData();
});

defineExpose({ onReset: loadRecordData });
</script>
  
<style lang="less" scoped>
p {
  margin-block-start: 0;
  margin-block-end: 0;
}

.processNode {
  width: 100%;
  height: 4rem;
  padding: 0.5rem;
  display: flex;
  margin-bottom: 5px;

  .peopleImg {
    margin-top: 0.5rem;
    width: 2rem;
    height: 2rem;
    border-radius: 0.25rem;
    background-color: #666666;
    position: relative;

    .pPImg {
      width: 100%;
      height: 100%;
    }

    .finishImg {
      width: 1rem;
      height: 1rem;
      position: absolute;
      bottom: -0.5rem;
      right: -0.5rem;
    }
  }

  .infoBox {

    flex: 1;
    margin-left: 1rem;

    .infoTitle {
      display: flex;
      flex: 1;

      .innerP {
        flex: 1;
      }


    }
  }

  .act {
    color: #0097ff !important;
  }
}

.bnt {
  margin: 0 !important;

  >:deep(.van-cell-group) {
    margin: 0 !important;
  }
}

.timeBox {
  font-size: 12px;
}

.btn-onView {
  font-size: 12px;
  color: #0097ff;
}

.endTime {
  color: #666666a8;
  font-size: 12px;
  text-align: right;
}
</style>
  