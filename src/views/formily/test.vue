<template>
  <FormBuild ref="formBuildRef" v-model="formData" :form-props-group="dialogPropsData"
             :formConfig="{ op: op }"></FormBuild>
  <van-button block native-type="submit" round type="primary" @click="onSubmit">
    提交
  </van-button>
</template>

<script lang="ts" setup>
import api from '@/api';
import {FormPropType} from '@/types'
import FormBuild from '@/components/formBuild';
import CustomTest from './customTest.vue'
import {useSystemStore} from '@/store';

const systemStore = useSystemStore()
const formData = reactive({})
const op = ref('add')
const formBuildRef = ref()
console.log(systemStore.dict);
const dialogProps = reactive<FormPropType[]>([
  {
    name: 'text',
    label: '文本输入',
    type: 'text',
    required: true,
    rules: [{required: true}]
  },
  {
    name: 'number',
    label: '数字输入',
    type: 'number',
    required: true,
    rules: [{required: true}, {max: 100, message: '最多输入36个字符'}]
  },
  {
    name: 'password',
    label: '密码输入',
    type: 'password',
    required: true,
    rules: [{required: true}, {max: 100, message: '最多输入100个字符'}]
  },
  {
    name: 'textarea',
    label: '文本域输入',
    type: 'textarea',
    required: true,
    rules: [{required: true}, {max: 100, message: '最多输入100个字符'}]
  },
  {
    name: 'select',
    label: '选择器',
    type: 'select',
    required: true,
    options: (data, op) => {
      return [
        {label: 'vvvv111', value: '222'}
      ]
    },
    defaultValue: 0
  },
  {
    name: 'radio',
    label: '单选框',
    type: 'radio',
    required: true,
    options: (data, op) => {
      return [
        {label: 'yes', value: 1},

        {label: 'no', value: 0}
      ]
    },
    defaultValue: 0
  },
  {
    name: 'checkbox',
    label: '复选框',
    type: 'checkbox',
    required: true,
    options: (data, op) => {
      return [
        {label: '选项1', value: 1},
        {label: '选项2', value: 2},
        {label: '选项3', value: 3},
      ]
    },
    defaultValue: 1
  },
  {
    name: 'date',
    label: '日期选择',
    type: 'date-picker',
    defaultValue: '2023-04-22'
  },
  {
    name: 'datetime',
    label: '日期时间选择',
    type: 'datetime-picker',
    defaultValue: '2023-04-22'
  },
  {
    name: 'dateRange',
    label: '日期区间选择',
    type: 'daterange-picker',
  },
  {
    name: 'selectApi',
    label: '联系人',
    type: 'select',
    apiFn: api.users.usersFilter,
    apiParams: (data: any) => {
      return {
        size: 100,
        organizationPath: data.path
      };
    },
    apiCbFn: data => {
      return data.rows.map((item: any) => {
        return {
          label: item.name,
          value: item.id,
          phone: item.phone
        };
      });
    }
  },
  {
    name: 'custom',
    label: '自定义组件',
    type: 'custom',
    customComponent: markRaw(CustomTest)
  },
  {
    name: 'img',
    label: '图片上传',
    type: 'upload',
  },
  {
    name: 'file',
    label: '文件上传',
    type: 'upload-file',
  },
  {
    name: 'case-select',
    label: '级联选择',
    type: 'select-api-cascade'
  },
  {
    name: 'phone',
    label: '联系电话',
    type: 'text',
    disabled: true
  },
  {
    name: 'affiliateName',
    label: '对应的属地电网企业',
    type: 'text'
  },
  {
    name: 'hiddenTroubleType',
    label: '隐患类型',
    type: 'select-api-cascade',
    apiFn: api.structure.structureClassQueryAll,
    apiParams: 'hid',
    apiProps: {
      value: 'id',
      label: 'name',
      children: 'children',
      emitPath: false
    }
    // optionCbFn: (data, option) => {}
  },
  {
    name: 'arrayUserTask',
    label: '',
    hiddenLabel: true,
    type: 'arrayCard',
    layoutProps: {
      span: 24
    },
    arrayCardConfig: {},
    items: [
      {
        name: 'array',
        title: '基本信息',
        group: [
          {
            name: 'arrayText',
            label: '数组文本',
            type: 'text',
            required: true,
            rules: [{required: true}]
          }
        ]
      }
    ]
  }

]);
const dialogPropsData = [{
  title: '基本信息',
  group: dialogProps
}]


const setApiData = () => {
  setTimeout(() => {
    formData.text = '文本'
    formData.number = 1234
    formData.select = '222'
    formData.password = '222'
    formData.textarea = 'textarea'
    formData.radio = 1
    formData.checkbox = [1]
    formData.date = '2023-04-26 00:00:00'
    formData.datetime = '2023-04-26 00:00:00'
    formData.dateRangeStartTime = '2023-04-26 00:00:00'
    formData.dateRangeEndTime = '2023-04-27 00:00:00'
    formData.selectApi = '2'
    formData.hiddenTroubleType = "85708563472731137"
    formData.hiddenTroubleTypeArrName = 'xxx/xx/xx'
    formData.arrayUserTask = [{arrayText: ''}, {}]
    // op.value = 'view'
  }, 2000)
}

async function onSubmit() {
  const res = await formBuildRef.value.onSubmit()
  console.log(formData);
}

watch(formData, val => {
  console.log('page', val);
})

onMounted(() => {
  setApiData()
})

</script>
