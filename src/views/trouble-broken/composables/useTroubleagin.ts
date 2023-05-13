import api from "@/api";
import type { FormPropGroupType } from "@/types";
import { PROCESS_TROUBLE } from "@/data";
import { useAuthStore, useSystemStore } from "@/store";
import { ProcessOperationType } from "@/process/types";
import { utcTime } from "@/utils";
import { ProcessCardTableProps } from '@/process/components/processCard';
import { useTroubleBrokenFieldsSet } from '@/views/trouble-broken/composables/useTroubleBrokenFieldsSet';
import { useTrouble as useDetailInfo } from '@/views/trouble-broken/composables/useTrouble';
import TroubleBrokenCheckForm from '@/views/workbenches/troubleWork/components/TroubleBrokenCheckForm.vue'
import SevenProofCustom from '@/views/workbenches/troubleWork/components/SevenProofCustom.vue'
import FormTableSelectModal from '@/components/formBuild/components/FormTableSelectModal';
import { FormPropType } from "@/types";
import { useTroubleSet } from '@/data/fieldTroubleSet';

export function useTroubleaging() {
  const businessData = ref();
  const authStore = useAuthStore();
  const {
    dialogPropsGroup,
    loadFieldsData,
    checkValueList,
    setCheckFormFields
  } = useDetailInfo();

  const systemStore = useSystemStore();
  const { dealWorkbench } = useTroubleSet(systemStore);
  const {
    resetCheckFormFields,
    getFormFieldsAndCheckData,
    getCheckFormFields
  } = useTroubleBrokenFieldsSet();
  const currentTime = utcTime();

  const parentId = computed(() => businessData.value?.hiddenTroubleType || '');

  const tableProps = reactive<ProcessCardTableProps[]>([
    {
      name: 'submitStr',
      label: '电力设施产权人'
    },
    {
      label: '线路名称',
      name: 'name'
    },
    {
      label: '发现时间',
      name: 'discoverDate',
      timeFields: true
    },

    // {
    //   label: '隐患类型',
    //   name: 'hiddenTroubleTypeName'
    // },

    {
      name: 'position',
      label: '行政地理位置'
    },
    {
      name: 'createTime',
      label: '提报时间'
    }
  ]);

  const userTableSelectProps = {
    multiple: false,
    searchTableProps: {
      searchProps: {
        formProps: reactive<FormPropType[]>([
          {
            name: 'name',
            label: '人员名称',
            type: 'text',
          }
        ]),
        componentsProps: {
          orgSearch: true
        }
      },
      tableProps: {
        title: '数据列表',
        columns: [
          {
            name: 'name',
            label: '成员名称'
          },
          {
            name: 'organizationName',
            label: '所属机构'
          }
        ],
        apiFn: api.users.queryDispenseUser,
        apiCbFn: (data: any) => {
          return data;
        }
      }
    },
    modalProps: {
      width: '60%',
      title: '选择指派人'
    },
    defaultValueLoad: async (val: string) => {
      if (!val || !val.length) return;
      console.log(val,'val');
      
      const { code, data } = await api.users.getUserMsg({
        id: val[0]
      });
      return [data];
    },
    keyProps: {
      valueKey: 'id',
      labelKey: 'name'
    }
  };

  /* 电力设施产权人提报 */
  const userTask1 = dialogPropsGroup;
  userTask1.push({
    name: '',
    title: '',
    group: [
      {
        name: 'status',
        label: '状态',
        type: 'hidden',
        defaultValue: PROCESS_TROUBLE.STEP_3
      },
      {
        name: 'processOperationType',
        label: '流程操作类型',
        type: 'hidden',
        defaultValue: (data: any) => {
          return ProcessOperationType.COMPLETE;
        }
      }
    ]
  });

  /* 执法办经办审核 */
  const userTask2 = reactive<FormPropGroupType[]>([
    {
      name: 'zone2',
      title: '执法办经办审核',
      group: [
        {
          name: 'fiveIsAccept',
          alias: 'isNext',
          label: '是否受理',
          type: 'select',
          options: systemStore.dict.yes_no,
          rules: [{ required: true }],
        },
        {
          name: 'fiveReason',
          label: '不受理原因',
          type: 'textarea',
          rules: [{ required: true }],
          display(data) {
            return data.isNext === 0;
          }
        },
        {
          name: 'uid',
          label: '指派人',
          type: 'custom',
          // apiFn: api.users.getUserMsg,
          // apiParams: (data: any) => {
          //   return {
          //   id:authStore.userInfo?.id
          //   };
          // },
          // apiCbFn: data => {
          //   return data.rows.map((item: any) => {
          //     return {
          //       label: item.name,
          //       value: item.id,
          //       phone: item.phone
          //     };
          //   });
          // },
          // rules: [{ required: true }],
          // display(data) {
          //   return data.isNext === 1;
          // },
          customComponent: markRaw(FormTableSelectModal),
          customProps: userTableSelectProps,
          rules: [{ required: true }],
          display(data) {
            return data.isNext === 1;
          },
        },

        {
          name: 'fiveHandleOpinion',
          label: '初步处置意见',
          type: 'textarea',
          rules: [{ required: true }],
          display(data) {
            return data.isNext === 1;
          }
        },
        {
          name: 'acceptTime',
          label: '受理时间',
          type: 'hidden',
          defaultValue: utcTime()
        },
        {
          name: 'processStatus',
          label: '流程状态',
          type: 'hidden',
          defaultValue: (data: any) => {
            return data.isNext === 0 ? 3 : 1;
          }
        },
        {
          name: 'processOperationType',
          label: '流程操作类型',
          type: 'hidden',
          defaultValue: (data: any) => {
            return data.isNext === 0
              ? ProcessOperationType.REJECT
              : ProcessOperationType.DELEGATE;
          }
        },
        {
          name: 'status',
          label: '状态',
          type: 'hidden',
          defaultValue: (data: any) => {
            return data.isNext === 0
              ? PROCESS_TROUBLE.STEP_2
              : PROCESS_TROUBLE.STEP_4;
          }
        }
      ]
    }
  ]);
  /* 执法办负责人审核 */
  const userTask3 = reactive<FormPropGroupType[]>([
    {
      name: 'zone3',
      title: '执法办负责人审核',
      group: [
        {
          name: 'sixIsAgree',
          alias: 'isNext',
          label: '是否同意',
          type: 'select',
          options: systemStore.dict.yes_no,
          rules: [{ required: true }],
        },
        {
          name: 'sixOpinion',
          label: '意见',
          type: 'textarea',
          rules: [{ required: true }],
          display(data) {
            return data.isNext === 0;
          }
        },
        {
          name: 'status',
          label: '状态',
          type: 'hidden',
          defaultValue: (data: any) => {
            return data.isNext === 0
              ? PROCESS_TROUBLE.STEP_2
              : PROCESS_TROUBLE.STEP_5;
          }
        },
        {
          name: 'processOperationType',
          label: '流程操作类型',
          type: 'hidden',
          defaultValue: (data: any) => {
            return data.isNext === 1
              ? ProcessOperationType.COMPLETE
              : ProcessOperationType.REJECT;
          }
        }
      ]
    }
  ]);

  /* 执法办经办处置 */
  const userTask4 = reactive<FormPropGroupType[]>([
    {
      name: 'arrayCard',
      title: '',
      group: [
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
              name: 'zone4',
              title: '执法办经办处置详情',
              group: [
                {
                  name: 'sevenDisposeTime',
                  label: '处置时间',
                  type: 'datetime-picker',
                  rules: [{ required: true }],
                  defaultValue: utcTime(),
                },
                {
                  name: 'sevenDisposeWay',
                  label: '处置方式',
                  type: 'select',
                  options: systemStore.dict.hidden_trouble_dispose_way,
                  rules: [{ required: true }],
                }
              ]
            },
            {
              name: 'zone4',
              title: '',
              group: [
                {
                  name: 'sevenDisposeSituationData',
                  label: '',
                  type: 'custom',
                  customComponent: markRaw(TroubleBrokenCheckForm),
                  customProps: {
                    parentId,
                    roleType: 2
                  },
                  display(data, op) {
                    return data.sevenDisposeWay === 1;
                  },
                },
                {
                  label: '协调情况备注',
                  name: 'siteRemarkWork',
                  display(data, op) {
                    return data.sevenDisposeWay === 1;
                  },
                  type: 'textarea',
                },
                {
                  name: 'sevenInterviewTime',
                  label: '约谈时间',
                  type: 'date-picker',
                  required: true,
                  rules: [{ required: true }],
                  display(data, op) {
                    return data.sevenDisposeWay === 2;
                  },
                  disabledDate: (time: Date) => {
                    return (
                      time.getTime() >
                      new Date(
                        new Date().setDate(new Date().getDate())
                      ).getTime()
                    );
                  },
                },
                {
                  name: 'sevenInterviewPlace',
                  label: '约谈地点',
                  type: 'text',
                  required: true,
                  rules: [{ required: true }],
                  display(data, op) {
                    return data.sevenDisposeWay === 2;
                  },
                },
                {
                  name: 'sevenInterviewObject',
                  label: '被约谈对象',
                  type: 'text',
                  required: true,
                  rules: [{ required: true }],
                  display(data, op) {
                    return data.sevenDisposeWay === 2;
                  },
                },
                {
                  name: 'sevenPartakeOrg',
                  label: '其他相关参与单位',
                  type: 'text',
                  required: true,
                  rules: [{ required: true }],
                  display(data, op) {
                    return data.sevenDisposeWay === 2;
                  },
                },
                {
                  name: 'sevenDisposePhoto',
                  label: '现场照片',
                  type: 'upload',
                  uploadConfig: {
                    limit: 1000
                  },
                  display(data, op) {
                    return (
                      data.sevenDisposeWay === 1 || data.sevenDisposeWay === 2
                    );
                  },
                  rules: [{ required: true }],
                },
                {
                  name: 'sevenInterviewFile',
                  label: '约谈记录',
                  type: 'upload-file',
                  required: true,
                  display(data, op) {
                    return data.sevenDisposeWay === 2;
                  },
                  rules: [{ required: true }],
                  uploadConfig: {
                    tipText: '支持pdf和word的格式',
                    accept: [
                      '.doc',
                      '.docx',
                      'application/msword',
                      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                      '.pdf',
                      'application/pdf'
                    ]
                  }
                },
                {
                  label: '约谈情况备注',
                  name: 'sevenInterviewRemarks',
                  display(data, op) {
                    return data.sevenDisposeWay === 2;
                  },
                  type: 'textarea',
                },
                {
                  name: 'nineUniteOrg',
                  label: '联合执法部门',
                  type: 'text',
                  required: true,
                  rules: [{ required: true }],
                  display(data, op) {
                    return data.sevenDisposeWay === 3;
                  },
                },
                {
                  name: 'nineScenePhoto',
                  label: '上传现场执法照片',
                  type: 'upload',
                  required: true,
                  display(data, op) {
                    return data.sevenDisposeWay === 3;
                  },
                  rules: [{ required: true }]
                },
                {
                  name: 'nineUniteFile',
                  label: '上传相关文件',
                  display(data, op) {
                    return data.sevenDisposeWay === 3;
                  },
                  type: 'upload-file'
                },

                {
                  name: 'baseRegulations',
                  label: '法律依据说明',
                  required: true,
                  type: 'custom',
                  display(data, op) {
                    return data.sevenDisposeWay !== undefined;
                  },
                  customComponent: markRaw(SevenProofCustom),
                  rules: [{ required: true }]
                },

                {
                  name: 'sevenProoRemark',
                  label: '法律依据备注',
                  type: 'textarea',
                  display(data, op) {
                    return data.baseRegulations;
                  },
                },
                {
                  name: 'isNext',
                  label: '协调结束',
                  type: 'select',
                  display(data, op) {
                    return data.sevenDisposeWay !== undefined;
                  },
                  options: systemStore.dict.yes_no,
                  rules: [{ required: true }],
                },
                {
                  name: 'status',
                  label: '状态',
                  type: 'hidden',
                  defaultValue: (data: any) => {
                    return data.isNext === 0
                      ? PROCESS_TROUBLE.STEP_5 // 自己
                      : PROCESS_TROUBLE.STEP_6;
                  }
                },
                {
                  name: 'processOperationType',
                  label: '流程操作类型',
                  type: 'hidden',
                  display: (data: any) => {
                    return data.status === 1;
                  },
                  defaultValue: (data: any) => {
                    return ProcessOperationType.COMPLETE;
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]);

  /* 电力设施产权人核实 */
  const userTask5 = reactive<FormPropGroupType[]>([
    {
      name: 'zone5',
      title: '电力设施产权人核实',
      group: [
        {
          name: 'eightVerifyUser',
          label: '核实人',
          type: 'text',
          defaultValue: authStore.userInfo?.name ?? '',
          readonly: true,
          rules: [{ required: true }]
        },
        {
          name: 'eightVerifyTime',
          label: '核实时间',
          type: 'datetime-picker',
          rules: [{ required: true }],
          defaultValue: utcTime()
        },
        {
          name: 'eightVerifySituation',
          label: '核实情况',
          type: 'textarea',
          rules: [{ required: true }],
        },
        // {
        //   name: 'hiddenTroubleType',
        //   label: '隐患类型',
        //   type: 'hidden',
        //   defaultValue: ''
        // },
        {
          name: 'eightDisposeEffect',
          label: '处置成效',
          type: 'checkbox-multiple',
          options: systemStore.dict.dispose_result,
          rules: [{ required: true }],
        },

        {
          name: 'eightPhoto',
          label: '现场照片',
          type: 'upload',
          uploadConfig: {
            limit: 1000
          },
          rules: [{ required: true }],
        },
        // {
        //   name: 'isNext',
        //   label: '是否整改',
        //   type: 'radio',
        //   defaultValue: 0,
        //   options: systemStore.dict.yes_no_rectification,
        //   rules: [{ required: true }]
        // },
        {
          name: 'disposeTime',
          label: '反馈时间',
          type: 'hidden',
          defaultValue: utcTime(),
          display(data) {
            return data.isNext === '1';
          },
        },
        {
          name: 'disposeResult',
          label: '受理结果',
          type: 'hidden',
          defaultValue: (data: any) => {
            return data.eightVerifySituation;
          },
          display(data) {
            return data.isNext === 1;
          }
        },
        {
          name: 'status',
          label: '状态',
          type: 'hidden',
          defaultValue: (data: any) => {
            return PROCESS_TROUBLE.STEP_7; //  新流程 直接走的是下一步
          }
        },
        {
          name: 'processOperationType',
          label: '流程操作类型',
          type: 'hidden',
          display: (data: any) => {
            return data.status === 7;
          },
          defaultValue: (data: any) => {
            return ProcessOperationType.COMPLETE;
          }
        }
      ]
    }
  ]);

  async function customDetailsFormPropsHookFn(
    props: FormPropGroupType[],
    formData: any,
    taskDefKey: string
  ) {
    if (taskDefKey !== 'userTask1') return props;
    resetCheckFormFields(props);
    const { success, data } = await api.structure.structureClassQueryInfo({
      id: formData.hiddenTroubleType
    });
    
    const childrenData = getFormFieldsAndCheckData(data);
    const checkValueList: string[] =
      formData.hiddenTroubleHarmonize?.split(',');
    props[2].title = childrenData.fieldGroup.title;
    props[2].group = childrenData.fieldGroup.group;
    props[4].group[0].options = (data: any) => childrenData.checkOptions;
    const checkOptionsMap = {};
    childrenData.checkOptions.forEach(item => {
      checkOptionsMap[item.value] = item;
    });

    const checkDataList = checkValueList?.map(item => checkOptionsMap[item]);
    props.push(...(getCheckFormFields(checkDataList) as FormPropGroupType[]));
    return props;
  }

  return {
    tableProps,
    userTask1,
    businessData,
    processPropsMap: {
      // start: dialogPropsGroup,
      userTask1,
      userTask2,
      userTask3,
      userTask4,
      userTask5
    },
    loadFieldsData,
    checkValueList,
    setCheckFormFields,
    customDetailsFormPropsHookFn
  };
}
