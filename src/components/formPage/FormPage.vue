<template>
  <div class="form-page">
    <!--E 操作步骤-->

    <!--S 表单-->
    <template v-if="reactiveData.pageStatus === 'form'">
      <div :style="bodyStyle" class="form-page-body">
        <van-nav-bar v-show="reactiveData.pageStatus === 'form'" :title="_opText+title" left-arrow left-text=""
                     @click-left="onBack"/>
        <template v-if="!loading">
          <FormBuild
              v-model="formData"
              :formConfig="{ op: formOp, inline: false }"
              :formPropsGroup="formProps"
              :scroll-tab="true"
              class="form-build"
          >
            <template #formFooter="{ formRef }">
              {{ setFormInstance(formRef) }}
            </template>
          </FormBuild>
        </template>
        <div class="p-20px pt-0">
          <slot name="extraContent"></slot>
        </div>
      </div>
      <div class="form-page-footer text-center">
        <template v-if="_formOp === 'add'">
          <!--          <van-button v-debounce type="danger" @click="onResetForm(formRef)">-->
          <!--            重置-->
          <!--          </van-button>-->
          <div class="footer-left">
            <div class="item" @click="onSave(formRef)">
              <van-icon :size="20" name="records"/>
              <p>暂存</p>
            </div>
          </div>
          <van-button v-debounce class="submit-btn" type="primary" @click="onSubmit(formRef)">
            提交
          </van-button>
        </template>
        <template v-else-if="_formOp === 'edit'">
          <!--          <el-button v-debounce type="danger" @click="onResetForm(formRef)">-->
          <!--            重置-->
          <!--          </el-button>-->
          <div class="footer-left">
            <div class="item" @click="onUpdate(formRef)">
              <van-icon :size="20" name="records"/>
              <p>暂存</p>
            </div>
          </div>
          <van-button v-debounce class="submit-btn" type="primary" @click="onSubmit(formRef)">
            提交
          </van-button>
        </template>
      </div>
    </template>
    <!--E 表单-->

    <FormResultPage v-else v-bind="successTextMap[reactiveData.pageStatus]">
      <template #footer>
        <el-button
            v-if="_formOp !== 'edit' && $props.subAfterBtn?.add"
            v-debounce
            size="large"
            type="primary"
            @click="onReset"
        >
          继续新增
        </el-button>
        <el-button
            v-if="$props.subAfterBtn?.toList"
            v-debounce
            size="large"
            type="warning"
            @click="toListPage"
        >
          前往列表
        </el-button>
        <!--        <el-button
                    v-if="$props.subAfterBtn?.details"
                    v-debounce
                    size="large"
                    @click="onDetailView"
                >
                  查看详情
                </el-button>-->
      </template>
    </FormResultPage>
  </div>
</template>

<script lang="ts" setup>
import FormBuild from '@/components/formBuild';
import FormResultPage from "./FormResultPage.vue";
import {useRouter} from 'vue-router'
import {useFormNew, useMessage, useState} from '@/composables';
import {FormInstance} from 'vant';
import {useAuthStore} from '@/store';
import {FormPageStepPropsType, FormPageType, FormPropGroupType, HookFnMapType, OpStatus} from '@/types';

/* props */
const props = defineProps({
  // 表单项配置
  formProps: {
    type: Array as PropType<FormPropGroupType[]>,
    required: true
  },
  stepProps: {
    type: Object as PropType<FormPageStepPropsType>
  },
  // 增删改查接口map
  apiFnMap: {
    type: Object as PropType<any>,
    required: true
  },
  // 钩子函数map
  hookFnMap: {
    type: Object as PropType<HookFnMapType>,
    default: () => {
      return {};
    }
  },
  // 表单title
  title: {
    type: String as PropType<string>,
    default: '新增'
  },
  // 返回列表路由
  listRouter: {
    type: Object as PropType<any>,
    required: true
  },
  // 表单默认数据
  defaultFormData: {
    type: Object as PropType<any>,
    default: () => {
    }
  },
  // 是否显示保存按钮
  saveBtn: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  // 'add' | 'edit' | 'view'
  formOp: {
    type: String as PropType<OpStatus>,
    default: 'add'
  },
  opText: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  businessId: {
    type: String as PropType<string>
  },
  // 编辑是否校验表单
  updateValidate: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  bodyStyle: {
    type: Object as PropType<{ [key: string]: any }>,
    default: () => {
      return {};
    }
  },
  subAfterBtn: {
    type: Object as PropType<{
      add: boolean;
      toList: boolean;
      details: boolean;
    }>,
    default: () => {
      return {
        add: true,
        toList: true,
        details: true
      };
    }
  }
});

/* emits */
const emit = defineEmits<{
  (e: 'apiFormDataChange', value: any): any;
  (e: 'onResetData', value: any): any;
}>();
/* hook */
const router = useRouter();
const authStore = useAuthStore();
const {loading} = useState();
const {
  filterData,
  validateForm,
  formRef,
  resetForm,
  setFormInstance,
  setFormData
} = useFormNew();
const {handleResponse, commHandleConfirm} = useMessage();
/* const */
const successTextMap = {
  saveSuccess: {
    title: '信息提报保存成功',
    description: '您已保存信息，可前往草稿箱查看'
  },
  submitSuccess: {
    title: '信息提报提交成功',
    description: '您已提交信息，等待部门审核'
  },
  editSuccess: {
    title: '信息提报编辑成功',
    description: '您已编辑信息，可前往列表查看'
  }
};

/* data */
const formModalRef = ref();
const formData = ref(Object.assign({}, props.defaultFormData));
const reactiveData = reactive<{
  pageStatus: FormPageType;
  currentFormId: string;
}>({
  pageStatus: 'form',
  currentFormId: ''
});

/* computed */
const _apiFnMap = computed(() => props.apiFnMap);
const _hookFnMap = computed(() => props.hookFnMap);
const _formData = computed({
  get: () => formData.value,
  set: val => (formData.value = val)
});
const _formOp = computed(() => props.formOp);
const _businessId = computed(() => props.businessId);
const _stepProps = computed(() => {
  if (props.stepProps) return props.stepProps;
  const formOpStepMap = {
    add: [
      {
        title: '基本信息',
        description: '填写基本信息'
      },
      {
        title: '完成创建',
        description: '创建成功'
      }
    ],
    edit: [
      {
        title: '基本信息',
        description: '编辑基本信息'
      },
      {
        title: '完成编辑',
        description: '编辑成功'
      }
    ]
  };
  return {
    dataSource: formOpStepMap[_formOp.value]
  };
});
const _formModalProps = computed(() => ({
  formProps: props.formProps,
  apiFnMap: _apiFnMap.value,
  hookFnMap: _hookFnMap.value
}));
const _opText = computed(() => {
  if (!props.opText) return '';
  const opTextMap = {
    add: '新增',
    edit: '编辑',
    view: '查看'
  };
  return opTextMap[_formOp.value];
});

/* watch */
// watch(_businessId, val => {
//   if (['edit', 'view'].includes(props.formOp)) loadInfoData();
// });
/* methods */


const onBack = () => history.back();

// 保存草稿
async function onSave(formRef: FormInstance | undefined) {
  let params = JSON.parse(JSON.stringify(formData.value));
  if (_hookFnMap.value.beforeSaveFn)
    params = _hookFnMap.value.beforeSaveFn(params);

  const {code, message, data} = await _apiFnMap.value.add(params);

  handleResponse({code, message}, () => {
    reactiveData.currentFormId = data;
    reactiveData.pageStatus = 'saveSuccess';
    // 接口请求后提供给外部的钩子函数
    if (_hookFnMap.value.afterSaveFn) _hookFnMap.value.afterSaveFn(data);
  });
}

// 表单提交
async function onSubmit(formRef: FormInstance | undefined) {
  const valid = await validateForm(formRef);
  if (!valid) return;

  let params = JSON.parse(JSON.stringify(formData.value));
  if (_hookFnMap.value.beforeSubmitFn)
    params = _hookFnMap.value.beforeSubmitFn(params);
  // beforeSubmitFn内返回false结束方法
  if (params === false) return;

  const {code, message, data} = await _apiFnMap.value.submit(params);

  handleResponse({code, message}, () => {
    reactiveData.currentFormId = data;
    reactiveData.pageStatus = 'submitSuccess';
    // 接口请求后提供给外部的钩子函数
    if (_hookFnMap.value.afterSubmitFn) _hookFnMap.value.afterSubmitFn(data);
  });
}

// 表单编辑
async function onUpdate(formRef: FormInstance | undefined) {
  if (props.updateValidate) {
    const valid = await validateForm(formRef);
    if (!valid) return;
  }

  let params = JSON.parse(JSON.stringify(formData.value));
  if (_hookFnMap.value.beforeUpdateFn)
    params = _hookFnMap.value.beforeUpdateFn(params);

  const {code, message, data} = await _apiFnMap.value.update(params);

  handleResponse({code, message}, () => {
    reactiveData.currentFormId = data;
    reactiveData.pageStatus = 'editSuccess';
    // 接口请求后提供给外部的钩子函数
    if (_hookFnMap.value.afterUpdateFn) _hookFnMap.value.afterUpdateFn(data);
  });
}

// 表单重置
async function onResetForm(formRef: FormInstance | undefined) {
  const result = await commHandleConfirm('确认重置内容？');
  if (!result) return;
  formData.value = {};
  resetForm(formRef);
  setFormData(Object.assign({}, props.defaultFormData));
  console.log(formData);
  emit('onResetData', formData.value);
  // onReset();
}

function setFormFieldData<T>(fields: string, value: T) {
  formData.value[fields] = value;
}

// 继续新增
const onReset = () => {
  reactiveData.pageStatus = 'form';
  formData.value = Object.assign({}, props.defaultFormData);
  emit('onResetData', formData.value);
};

// 跳转列表页
const toListPage = () => {
  router.push(props.listRouter[reactiveData.pageStatus]);
  onReset();
};

// 查看详情
const onDetailView = async () => {
  const {data, ...res} = await _apiFnMap.value.queryInfo({
    id: reactiveData.currentFormId
  });
  if (!handleResponse(res)) return;
  let formData = data;
  if (_hookFnMap.value.beforeDetailFn)
    formData = _hookFnMap.value.beforeDetailFn(data);

  formModalRef.value.showDialog('view', formData);
};

// 编辑查看数据加载
const loadInfoData = async () => {
  loading.value = true;
  if (['edit', 'view'].includes(props.formOp) && !props.businessId)
    throw new Error('缺少必要参数businessId!');

  await nextTick();
  const {data, ...res} = await _apiFnMap.value.queryInfo({
    id: props.businessId
  });
  if (!handleResponse(res)) {
    loading.value = false;
    return;
  }
  if (_hookFnMap.value.beforeDetailFn)
    formData.value = _hookFnMap.value.beforeDetailFn(data);
  else formData.value = data;
  loading.value = false;
  emit('apiFormDataChange', data);
};
onActivated(async () => {
  await nextTick();
  if (['edit', 'view'].includes(props.formOp)) loadInfoData();
});

onMounted(async () => {
  await nextTick();
  if (['edit', 'view'].includes(props.formOp)) loadInfoData();
});

defineExpose({_formData, setFormFieldData, setFormData, onReset});
</script>

<style lang="less" scoped>
.form-build {
  height: calc(100vh - 100px);
  overflow-y: auto;
}

.form-page-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  background: #fff;
  padding: 10px;

  .footer-left {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    font-size: 12px;
  }

  .submit-btn {
    flex: 1;
  }
}
</style>
