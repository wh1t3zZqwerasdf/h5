import api from '@/api';
import { useAuthStore, useSystemStore } from '@/store';
import type { FormPropGroupType, FormPropType, TablePropType } from '@/types';
import { FormPagePropsType, StructureClassInfo } from '@/types';

import { arr2Obj } from '@/utils';
import { useBrokenSet } from '@/data/fieldBrokenSet';
// import FormTableSelectModal from '@/components/formBuild/components/FormTableSelectModal';
import { useFormProps } from '@/components/formBuild/composables/useFormProps';
import { useTroubleBrokenFieldsSet } from '@/views/trouble-broken/composables';
import FormTableSelectModal from "@/components/formBuild/components/FormSearchSelect";

export function useBroken(hookFnMap?: any) {
  const { tableSelectProps } = useFormProps();
  const {
    submitDataFilter,
    viewDataFilter,
    getFormFieldsAndCheckData,
    checkOptionsMap,
    checkValueList,
    resetCheckFormFields,
    getCheckFormFields,
    businessType
  } = useTroubleBrokenFieldsSet();
  const module = 'exter';
  const moduleName = '外破';
  businessType.value = module;
  const apiFnMap = {
    add: api[module].saveData,
    submit: api[module].addData,
    update: api[module].updateData,
    queryInfo: api[module].queryInfo,
    draftsList: api[module].queryList,
    delete: api[module].deleteData
  };
  const systemStore = useSystemStore();
  const { fieldSetMap } = useBrokenSet(systemStore);
  // 根据隐患类型切换的动态字段
  const fieldGroup = reactive<FormPropGroupType>({
    name: 'fieldGroup',
    title: ``,
    group: []
  });
  const checkOptions = ref<{ value: string; label: string }[]>([]);
  const authStore = useAuthStore();
  const exterTypeMap = computed(() => {
    return arr2Obj(systemStore.dictApi.exterType, {
      key: 'id',
      value: 'name',
      hasChildren: true,
      children: 'childList'
    });
  });

  const searchProps = reactive<FormPropType[]>([
    {
      name: 'name',
      label: '线路名称',
      type: 'select',
      apiSearch: true,
      apiFn: api.protect.facilityQueryList,
      apiCbFn: data => {
        return data.rows.map((item: any) => {
          return {
            label: item.name,
            value: item.id,
          };
        })
      },
      required: true,
      rules: [{ required: true }]    
    },
    {
      name: 'createTime',
      label: '提报时间',
      type: 'date-picker',
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
    },
    {
      name: 'exterType',
      label: '外破类型',
      type: 'select-api-cascade',
      apiFn: api.structure.structureClassQueryAll,
      apiParams: 'exter',
      apiProps: {
        value: 'id',
        label: 'name',
        children: 'children',
        emitPath: false
      }
    },
    {
      name: 'deviceType',
      label: '设备类型',
      type: 'select',
      options: systemStore.dict.device_type
    },
    {
      name: 'exterLevel',
      label: '事件等级',
      type: 'select',
      options: systemStore.dict.hidden_trouble_level
    },

    {
      name: 'adminAddr',
      label: '隐患位置',
      type: 'text'
    },
    {
      name: 'status',
      label: '流程状态',
      type: 'select',
      options: systemStore.dict.external_status
    },
    {
      name: 'sevenDisposeWay',
      label: '处置方式',
      type: 'select',
      options: systemStore.dict.external_dispose_way
    },
    {
      name: 'voltageLevel',
      label: '电压等级',
      type: 'select',
      options: systemStore.dict.hidden_trouble_voltage
      // optionCbFn: (data, option) => {}
    }
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
      name: 'createTime',
      label: '提报时间',
      type: 'date-picker',
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
    },
    {
      name: 'exterType',
      label: '外破类型',
      type: 'select-api-cascade',
      apiFn: api.structure.structureClassQueryAll,
      apiParams: 'exter',
      apiProps: {
        value: 'id',
        label: 'name',
        children: 'children',
        emitPath: false
      }
    },
    {
      name: 'deviceType',
      label: '设备类型',
      type: 'select',
      options: systemStore.dict.device_type
    },
    {
      name: 'exterLevel',
      label: '事件等级',
      type: 'select',
      options: systemStore.dict.hidden_trouble_level
    },

    {
      name: 'adminAddr',
      label: '隐患位置',
      type: 'text'
    },

    {
      name: 'sevenDisposeWay',
      label: '处置方式',
      type: 'select',
      options: systemStore.dict.external_dispose_way
    },
    {
      name: 'voltageLevel',
      label: '电压等级',
      type: 'select',
      options: systemStore.dict.hidden_trouble_voltage
      // optionCbFn: (data, option) => {}
    }
  ]);

  const tableProps = reactive<TablePropType[]>([
    {
      name: 'cityName',
      label: '城市'
    },
    {
      name: 'name',
      label: '线路名称'
    },
    // {
    //   name: 'voltageLevel',
    //   label: '电压等级',
    //   keyMap: arr2Obj(systemStore.dict.hidden_trouble_voltage)
    // },
    // {
    //   name: 'createTime',
    //   label: '提报时间'
    // },
    // {
    //   name: 'discoverDate',
    //   label: '发现时间'
    // },
    {
      name: 'exterTypeName',
      label: '外破类型'
    },
    // {
    //   name: 'deviceType',
    //   label: '设备类型',
    //   keyMap: arr2Obj(systemStore.dict.device_type)
    // },
    // {
    //   name: 'exterLevel_',
    //   label: '事件等级'
    //   // keyMap: arr2Obj(systemStore.dict.hidden_trouble_level)
    // },
    // {
    //   name: 'position',
    //   label: '隐患位置'
    // },
    // {
    //   name: 'status',
    //   label: '流程状态',
    //   keyMap: arr2Obj(systemStore.dict.external_status)
    // },
    // {
    //   name: 'sevenDisposeWay',
    //   label: '处置方式',
    //   keyMap: arr2Obj(systemStore.dict.external_dispose_way)
    // },
    {
      name: "createTime",
      label: '发现时间'
    }
  ]);

  const dialogPropsGroup = reactive<FormPropGroupType[]>([
    {
      name: 'zone1',
      title: '外破设备信息',
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
          name: 'cityId',
          label: '行政地理位置',
          type: 'text',
          disabled: true,
          defaultValue: () => {
            return authStore.userOrg?.administrationLocation;
          },
          apiFn: api.city.cityQueryList,
          apiProps: {
            value: 'id',
            label: 'name',
            children: 'childList',
            emitPath: false
          },
          cascadeOptions: [],
          required: true,
          rules: [{ required: true }]
        },

        {
          name: 'isVip',
          label: '重要用户',
          type: 'select',
          options: systemStore.dict.yes_no,
          defaultValue: 0,
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
          rules: [{ required: true }],
        },
        {
          name: 'adminAddr',
          label: '行政位置详细',
          type: 'text',
          required: true,
          range: { max: 100 },
          rules: [{ required: true }],
        }
      ]
    },
    {
      name: 'zone1',
      title: '外破基础信息',
      group: [
        {
          name: 'exterType',
          label: '外破类型',
          type: 'select-api-cascade',
          apiFn: api.structure.structureClassQueryAll,
          apiParams: ['exter', { roles: authStore.userRoles }],
          apiProps: {
            value: 'id',
            label: 'name',
            children: 'children',
            // emitPath: false
          },
          layoutProps: {
            span: 24
          },
          required: true,
          rules: [{ required: true }]
        },
        {
          label: '停电',
          name: 'powerCut',
          type: 'select',
          options: systemStore.dict.yes_no,
          rules: [{ required: true }]
        },
        {
          name: 'exterLevel',
          label: '事件等级',
          type: 'select',
          options: systemStore.dict.hidden_trouble_level,
          tip: '有下列情形的，应判定为重大隐患：特高压架空线路杆塔基础出现较大沉陷、严重开裂或显著上拔，塔身出现严重弯曲形变，导地线出现严重损伤、断股和腐蚀。',
          required: true,
          rules: [{ required: true }]
        },
        {
          label: '作业许可',
          name: 'licenses',
          type: 'select',
          options: systemStore.dict.yes_no,
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
            // return systemStore.dict.source.slice(1);
            return op === 'add' || data.source !== 1
              ? systemStore.dict.source.slice(1)
              : systemStore.dict.source;
          },
          disabled: (data, op) => {
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
    {
      name: 'zone2',
      title: '产权人对外破的处置情况',
      display: data => {
        return data.exterType != null;
      },
      group: [
        {
          label: '现场情况简述',
          name: 'siteSituation',
          type: 'checkbox',
          rules: [{ required: true }],
          display(data, op) {
            return data?.exterType && checkOptions.value.length;
          },
          options: (data: any) => {
            return checkOptions.value;
          }
        },
        {
          name: 'siteRemark',
          label: '现场情况备注',
          display(data, op) {
            return data?.exterType && fieldSetMap[data?.exterType];
          },
          type: 'textarea'
        }
      ]
    },
    {
      name: 'zone2',
      title: '外破现场照片',
      group: [
        {
          name: 'sitePhoto',
          // sitePhoto
          label: '上传现场照片',
          type: 'upload',
          uploadConfig: {
            limit: 1000
          },
          disabled: (data, op) => {
            let flag = false;
            if (op === 'edit' || op === 'deal' || op === 'add') {
              flag = true;
            }
            return !flag;
          },
          rules: [{ required: true }]
        }
      ]
    }
  ]);

  const formPageProps: FormPagePropsType = {
    formProps: dialogPropsGroup,
    apiFnMap,
    hookFnMap: {
      beforeSaveFn: data => submitDataFilter(data),
      beforeUpdateFn: data => submitDataFilter(data),
      beforeSubmitFn: data => submitDataFilter(data),
      beforeDetailFn: data => viewDataFilter(data)
    },
    title: `${moduleName}`,
    listRouter: {
      saveSuccess: { name: 'BrokenDrafts' },
      submitSuccess: { name: 'Broken' },
      editSuccess: { name: 'BrokenDrafts' }
    },
    defaultFormData: { userId: authStore.userId }
  };

  // 草稿箱页面配置
  const draftsPageProps = {
    searchProps: searchPropsDrafts,
    tableProps,
    apiFnMap,
    hookFnMap,
    editRouter: 'troubleBrokenBrokenForm',
    defaultParams: {
      statusType: 1
    }
  };

  // 隐患表单处理函数
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
    formPageProps,
    draftsPageProps,
    fieldGroup,
    checkOptions,
    loadFieldsData,
    setCheckFormFields,
    checkValueList
  };
}
