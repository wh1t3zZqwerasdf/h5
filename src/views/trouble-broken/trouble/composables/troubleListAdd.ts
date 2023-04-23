import type { FormPropGroupType, FormPropType, TablePropType, } from '@/types';
import {  StructureClassInfo } from '@/types';
import api from '@/api';
import { useSystemStore, useAuthStore } from '@/store';
import FormTableSelectModal from '@/components/formBuild/components/FormTableSelectModal';
import { useTroubleBrokenFieldsSet } from '@/views/trouble-broken/trouble/composables/useTroubleBrokenFieldsSet';
// import { useFormProps } from '@/composables/modules/useFormProps';

export function troubleListAdd(hookFnMap?: any) {
  const authStore = useAuthStore();
  const systemStore = useSystemStore();
    const {
    submitDataFilter,
    viewDataFilter,
    getFormFieldsAndCheckData,
    checkOptionsMap,
    checkValueList,
    resetCheckFormFields,
    getCheckFormFields
  } = useTroubleBrokenFieldsSet();


  const checkOptions = ref<{ value: string; label: string }[]>([]);
  const fieldGroup = reactive<FormPropGroupType>({
    name: 'fieldGroup',
    title: ``,
    group: []
  });


  const dialogPropsGroup = reactive<FormPropGroupType[]>([
    {
      name: 'zone1',
      title: '隐患设备信息',
      group: [
        {
          name: 'facilityId',
          label: '线路名称',
          type: 'select',
          // customComponent: markRaw(FormTableSelectModal),
          // customProps: tableSelectProps,
          apiFn: api.hid.protectFacilityQueryList,
          apiCbFn: data => {
            return data.rows.map((item: any) => {
              return {
                label: item.name,
                value: item.id,
              };
            })
          },
          required: true,
          rules: [{ required: true }],
        },
        {
          name: 'cityId',
          label: '行政地理位置',
          type: 'text',
          disabled: true,
          defaultValue: () => {
            return authStore.userOrg?.administrationLocation;
          },
          rules: [{ required: true }]
        },
        {
          name: 'isVip',
          label: '重要用户',
          type: 'radio',
          options: systemStore.dict.yes_no,
          defaultValue: 0,
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
          layoutProps: {
            span: 12
          }
        },
        {
          name: 'adminAddr',
          label: '行政位置详细',
          type: 'text',
          range: { max: 100 },
          rules: [{ required: true }],
          layoutProps: {
            span: 12
          }
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
          apiFn: api.structure.structureClassQueryAll,
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
          rules: [{ required: true }]
        },
        {
          name: 'hiddenTroubleLevel',
          label: '隐患等级',
          type: 'select',
          options: systemStore.dict.hidden_trouble_level,
          tip: '有下列情形的，应判定为重大隐患：特高压架空线路杆塔基础出现较大沉陷、严重开裂或显著上拔，塔身出现严重弯曲形变，导地线出现严重损伤、断股和腐蚀。',
          rules: [{ required: true }]
        },
        {
          name: 'discoverDate',
          label: '发现日期',
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
          rules: [{ required: true }]
        }
      ]
    },
    fieldGroup,
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
          type: 'upload-file',
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
          type: 'checkbox-multiple',
          rules: [{ required: true }],
          display(data, op) {
            return data?.hiddenTroubleType && checkOptions.value.length;
          },
          options: (data: any) => { 
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
    if (JSON.stringify(checkOptionsMap) === '{}') {
      setTimeout(() => {
        setCheckFormFields();
      }, 200);
      return;
    }
    const checkDataList =
      checkValueList.value?.map(item => checkOptionsMap[item]) || [];
    resetCheckFormFields(dialogPropsGroup);
    dialogPropsGroup.splice(
      dialogPropsGroup.length - 1,
      0,
      ...(getCheckFormFields(checkDataList) as FormPropGroupType[])
    );
  }


  return {
    dialogPropsGroup,
     setCheckFormFields,
     loadFieldsData,
     checkValueList
  };
}
