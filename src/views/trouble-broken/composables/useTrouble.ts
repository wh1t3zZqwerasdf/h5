import { useAuthStore, useSystemStore } from '@/store';
import type { FormPropGroupType, FormPropType, TablePropType } from '@/types';
import { FormPagePropsType, StructureClassInfo } from '@/types';
import api from '@/api';
import { arr2Obj } from '@/utils';
// import FormTableSelectModal from '@/components/formBuild/components/FormTableSelectModal';
import { useFormProps } from '@/components/formBuild/composables/useFormProps';
import { useTroubleBrokenFieldsSet } from '@/views/trouble-broken/composables';
import FormTableSelectModal from '@/components/formBuild/components/FormSearchSelect';

export function useTrouble(hookFnMap?: any) {
  const systemStore = useSystemStore();
  const { tableSelectProps } = useFormProps();
  const {
    submitDataFilter,
    viewDataFilter,
    getFormFieldsAndCheckData,
    checkOptionsMap,
    checkValueList,
    resetCheckFormFields,
    getCheckFormFields
  } = useTroubleBrokenFieldsSet();
  const module = 'hid';
  const moduleName = '隐患';
  const apiFnMap = {
    add: api[module].addRaftsList,
    submit: api[module].addData,
    // delete: api[module].batchDelete,
    update: api[module].updateData,
    // list: api[module].queryList,
    draftsList: api[module].queryList,
    delete: api[module].deleteData,
    queryInfo: api[module].queryInfo
  };
  const authStore = useAuthStore();
  // 根据隐患类型切换的动态字段
  const fieldGroup = reactive<FormPropGroupType>({
    name: 'fieldGroup',
    title: ``,
    group: []
  });
  const checkOptions = ref<{ value: string; label: string }[]>([]);
  const hiddenTroubleTypeMap = ref({});

  const searchProps = reactive<FormPropType[]>([
    {
      name: 'name',
      label: '线路名称',
      type: 'custom',
      customComponent: markRaw(FormTableSelectModal),
      customProps: tableSelectProps
    },
    {
      name: 'voltageLevel',
      label: '电压等级',
      type: 'select',
      options: systemStore.dict.hidden_trouble_voltage
      // optionCbFn: (data, option) => {}
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
      name: 'status',
      label: '流程状态',
      type: 'select',
      options: systemStore.dict.hidden_trouble_status
    },
    {
      name: 'sevenDisposeWay',
      label: '处置方式',
      type: 'select',
      options: systemStore.dict.hidden_trouble_dispose_way
    },
    {
      name: 'sevenDisposeTime',
      label: '执法办处置结束时间',
      type: 'daterange-picker',
      disabledDate: (time: Date) => {
        return false;
      }
    },
    {
      name: 'createTime',
      label: '提报时间',
      type: 'daterange-picker',
      disabledDate: (time: Date) => {
        return false;
      }
    },
    {
      name: 'discoverDate',
      label: '发现时间',
      type: 'daterange-picker',
      disabledDate: (time: Date) => {
        return false;
      }
    }
    // {
    //   name: 'voltageLevel',
    //   label: '电压等级',
    //   type: 'select',
    //   options: systemStore.dict.hidden_trouble_voltage
    //   // optionCbFn: (data, option) => {}
    // }
  ]);

  const searchPropsDrafts = reactive<FormPropType[]>([
    {
      name: 'name',
      label: '线路名称',
      type: 'custom',
      customComponent: markRaw(FormTableSelectModal),
      customProps: tableSelectProps
    },
    {
      name: 'voltageLevel',
      label: '电压等级',
      type: 'select',
      options: systemStore.dict.hidden_trouble_voltage
      // optionCbFn: (data, option) => {}
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
      name: 'sevenDisposeWay',
      label: '处置方式',
      type: 'select',
      options: systemStore.dict.hidden_trouble_dispose_way
    },
    {
      name: 'sevenDisposeTime',
      label: '执法办处置结束时间',
      type: 'daterange-picker',
      disabledDate: (time: Date) => {
        return false;
      }
    },
    {
      name: 'createTime',
      label: '提报时间',
      type: 'daterange-picker',
      disabledDate: (time: Date) => {
        return false;
      }
    },
    {
      name: 'discoverDate',
      label: '发现时间',
      type: 'daterange-picker',
      disabledDate: (time: Date) => {
        return false;
      }
    }
  ]);

  const tableProps = reactive<TablePropType[]>([
    {
      name: 'name',
      label: '线路名称'
    },
    {
      name: 'voltageLevel',
      label: '电压等级',
      keyMap: arr2Obj(systemStore.dict.hidden_trouble_voltage)
    },
    {
      name: 'submitOrg',
      label: '提报单位'
    },
    {
      name: 'createTime',
      label: '提报时间'
    },
    {
      name: 'discoverDate',
      label: '发现时间'
    },
    {
      name: 'voltageLevel_',
      label: '电压等级'
      // keyMap: arr2Obj(systemStore.dict.hidden_trouble_voltage)
    },
    {
      name: 'hiddenTroubleTypeName',
      label: '隐患类型'
    },
    {
      name: 'sevenDisposeTime',
      label: '执法办处置结束时间'
    },
    {
      name: 'status_',
      label: '流程状态'
    },
    {
      name: 'sevenDisposeWay',
      label: '处置方式',
      keyMap: arr2Obj(systemStore.dict.hidden_trouble_dispose_way)
    }
  ]);

  const dialogPropsGroup = reactive<FormPropGroupType[]>([
    {
      name: 'zone1',
      title: '隐患设备信息',
      group: [
        {
          name: 'facilityId',
          label: '线路名称',
          type: 'custom',
          customComponent: markRaw(FormTableSelectModal),
          customProps: tableSelectProps,
          required: true,
          rules: [{ required: true }]
        },
        {
          name: 'submitOrg',
          label: '提报单位',
          type: 'text',
          display: (_data, op) => {
            return !['add', 'deal', 'edit'].includes(op ?? '');
          },
          disabled: (data, op) => {
            return (
              data.status === 1 && !['add', 'deal', 'edit'].includes(op ?? '')
            );
          },
          rules: [{ required: true }]
        },
        {
          name: 'phone',
          label: '提报人电话',
          type: 'text',
          display: (_data, op) => {
            return !['add', 'deal', 'edit'].includes(op ?? '');
          },
          disabled: (data, op) => {
            return (
              data.status === 1 && !['add', 'deal', 'edit'].includes(op ?? '')
            );
          },
          rules: [{ required: true }]
        },
        {
          name: 'submitUserName',
          label: '提交人',
          type: 'text',
          display: (_data, op) => {
            return !['add', 'deal', 'edit'].includes(op ?? '');
          },
          disabled: (data, op) => {
            return (
              data.status === 1 && !['add', 'deal', 'edit'].includes(op ?? '')
            );
          }
        },
        {
          name: 'cityId',
          label: '行政地理位置',
          type: 'text',
          disabled: true,
          defaultValue: () => {
            return authStore.userOrg?.administrationLocation;
          },
          required: true,
          rules: [{ required: true }]
        },
        {
          name: 'isVip',
          label: '重要用户',
          type: 'select',
          options: systemStore.dict.yes_no,
          required: true,
          rules: [{ required: true }],
          disabled: () => {
            return true;
          }
        },
        {
          name: 'tower',
          label: '杆塔区段',
          type: 'text',
          range: { max: 100 },
          required: true,
          rules: [{ required: true }],
        },
        {
          name: 'adminAddr',
          label: '行政位置详细',
          type: 'text',
          range: { max: 100 },
          required: true,
          rules: [{ required: true }],
        }
        // {
        //   name: 'vipType',
        //   label: '重要用户类型',
        //   type: 'select',
        //   options: systemStore.dict.vip_type,
        //   display: (data, _op) => {
        //     return data.isVip === 1;
        //   }
        // },
        // {
        //   name: 'vipName',
        //   label: '重要用户名称',
        //   type: 'text',
        //   display: (data, _op) => {
        //     return data.isVip === 1;
        //   }
        // }
      ]
    },
    {
      name: 'zone1',
      title: '隐患基础信息',
      group: [
        {
          name: 'hiddenTroubleType',
          label: '隐患类型',
          type: 'select-api-cascade',
          apiFn: api.structure.structureClassQueryAll,  // protectFacilityQueryList
          apiParams: ['hid', { roles: authStore.userRoles }],
          apiProps: {
            value: 'id',
            label: 'name',
            children: 'children'
            // emitPath: false
          },
          layoutProps: {
            span: 24
          },
          required: true,
          rules: [{ required: true }]
        },
        {
          name: 'hiddenTroubleLevel',
          label: '隐患等级',
          type: 'select',
          options: systemStore.dict.hidden_trouble_level,
          tip: '有下列情形的，应判定为重大隐患：特高压架空线路杆塔基础出现较大沉陷、严重开裂或显著上拔，塔身出现严重弯曲形变，导地线出现严重损伤、断股和腐蚀。',
          required: true,
          rules: [{ required: true }]
        },
        {
          name: 'discoverDate',
          label: '发现日期',
          type: 'date-picker',
          required: true,
          rules: [{ required: true }],
          disabledDate: (time: Date) => {
            return (
              time.getTime() >
              new Date(new Date().setDate(new Date().getDate() - 1)).getTime()
            );
          }
        },
        {
          name: 'lastDate',
          label: '上一次巡视日期',
          type: 'date-picker',
          required: true,
          rules: [{ required: true }],
          disabledDate: (time: Date) => {
            return (
              time.getTime() >
              new Date(new Date().setDate(new Date().getDate() - 1)).getTime()
            );
          }
        },
        {
          name: 'source',
          label: '来源',
          type: 'select',

          options: (data, op) => {
            return op === 'add' || data.source !== 1
              ? systemStore.dict.source.slice(1)
              : systemStore.dict.source;
          },
          disabled: (data, _op) => {
            return data.source === 1;
          },
          defaultValue: () => {
            return 4;
          },
          required: true,
          rules: [{ required: true }]
        }
      ]
    },
    fieldGroup,
    // ...fieldGroup.map(([key, val]) => {
    //   return {
    //     name: key,
    //     title: `隐患类型-${val.name}`,
    //     display: (data: any) => data?.hiddenTroubleType === key,
    //     group: val.fieldList.map(item => {
    //       return Object.assign(
    //         { type: 'text', rules: [{ required: true }] },
    //         item
    //       );
    //     })
    //   };
    // }),
    {
      name: 'zone2',
      title: '',
      group: [
        {
          label: '隐患现场情况简述',
          name: 'siteSituation',
          type: 'textarea',
          rules: [{ required: true }]
        },
        {
          label: '现场照片或视频',
          name: 'hiddenTroublePhoto',
          type: 'upload',
          disabled: (data, op) => {
            return data.status === 1 && op !== 'edit';
          },
          uploadConfig: {
            limit: 1000,
            tipText: '仅能上传图片和视频文件',
            accept: [
              'video/mp4', // rmvb，mpeg1-4 mov mtv dat wmv avi 3gp amv dmv flv
              'video/avi',
              'video/mpg',
              'video/mpeg',
              'video/x-flv',
              'video/3gpp',
              'video/x-ms-wmv',
              'image/jpeg',
              'image/jpg',
              'image/png'
            ]
          }
        }
      ]
    },
    {
      name: 'zone2',
      title: '产权人对隐患的处置情况',
      group: [
        {
          label: '隐患协调情况',
          name: 'hiddenTroubleHarmonize', // 'hiddenTroubleHarmonizeAppend',
          type: 'checkbox',
          rules: [{ required: true }],
          display(data, op) {
            return data?.hiddenTroubleType && checkOptions.value.length;
          },
          options: (data: any) => {
            console.log(checkOptions.value,'checkOptions');
            return checkOptions.value;
          }
        }
      ]
    },
    {
      name: 'zone4',
      title: '',
      group: [
        {
          label: '处置情况备注',
          name: 'siteRemark',
          display(data, op) {
            return data?.hiddenTroubleType;
          },
          type: 'textarea'
        }
      ]
    }
  ]);

  const addPageProps: FormPagePropsType = {
    formProps: dialogPropsGroup,
    apiFnMap,
    hookFnMap: {
      beforeSaveFn: data => submitDataFilter(data),
      beforeSubmitFn: data => submitDataFilter(data),
      beforeDetailFn: data => viewDataFilter(data)
    },
    title: ` ${moduleName}`,
    listRouter: {
      saveSuccess: { name: 'TroubleDrafts' },
      submitSuccess: { name: 'Trouble' },
      editSuccess: { name: 'TroubleDrafts' }
    },
    defaultFormData: { userId: authStore.userId }
  };

  // 草稿箱页面配置
  const draftsPageProps = {
    searchProps: searchPropsDrafts,
    tableProps,
    apiFnMap,
    hookFnMap,
    editRouter: 'troubleBrokenTroubleForm',
    defaultParams: {
      statusType: 1
    }
  };

  // 隐患表单处理函数 85708563472731011 
  async function loadFieldsData(id: string) {
    const { success, data } = await api.structure.structureClassQueryInfo({
      id
    });
    setFormFields(data);
  }


  function setFormFields(data: StructureClassInfo) {
    const childrenData = getFormFieldsAndCheckData(data);
    // 动态字段
    fieldGroup.title = childrenData.fieldGroup.title;
    fieldGroup.group = [];
    fieldGroup.group.push(...childrenData.fieldGroup.group);
    // 产权人处置情况勾选项
    checkOptions.value = childrenData.checkOptions;
  }

  function setCheckFormFields() {
    if (!checkOptionsMap || JSON.stringify(checkOptionsMap) === '{}') {
      setTimeout(() => {
        setCheckFormFields();
      }, 200);
      return;
    }

    const checkDataList = (checkValueList.value || []).join(',').split(',').map(item => {
      if (!!checkOptionsMap[item]) {
        return checkOptionsMap[item];
      } else {
        console.log(`No option found for "${item}"`);
        return null;
      }
    }).filter(Boolean);
      resetCheckFormFields(dialogPropsGroup);
        dialogPropsGroup.splice(
          dialogPropsGroup.length - 1,
          0,
          ...(getCheckFormFields(checkDataList) as FormPropGroupType[])
      );
  }

  return {
    searchProps,
    tableProps,
    dialogPropsGroup,
    fieldGroup,
    checkOptions,
    addPageProps,
    draftsPageProps,
    loadFieldsData,
    setCheckFormFields,
    checkValueList
  };
}
