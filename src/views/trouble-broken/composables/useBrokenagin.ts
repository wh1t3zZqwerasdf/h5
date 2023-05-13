import api from "@/api";
import { PROCESS_BROKEN } from '@/data';
import type { FormPropGroupType } from "@/types";
import { PROCESS_TROUBLE } from "@/data";
import { useAuthStore, useSystemStore } from "@/store";
import { ProcessOperationType } from "@/process/types";
import { utcTime } from "@/utils";
import { ProcessCardTableProps } from '@/process/components/processCard';
import { useTroubleBrokenFieldsSet } from '@/views/trouble-broken/composables/useTroubleBrokenFieldsSet';
import { useBroken as useDetailInfo } from '@/views/trouble-broken/composables/useBroken';
import TroubleBrokenCheckForm from '@/views/workbenches/troubleWork/components/TroubleBrokenCheckForm.vue'
import SevenProofCustom from '@/views/workbenches/troubleWork/components/SevenProofCustom.vue'
import { useBrokenSet } from '@/data/fieldBrokenSet';
import FormTableSelectModal from '@/components/formBuild/components/FormTableSelectModal';

import { FormPropType } from "@/types";

export function useBrokenagin() {
  const businessData = ref();
  const authStore = useAuthStore();
  const {
    dialogPropsGroup,
    loadFieldsData,
    checkValueList,
    setCheckFormFields
  } = useDetailInfo();

  const systemStore = useSystemStore();
  const { dealWorkbench } = useBrokenSet(systemStore);
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
            layoutProps: {
              span: 23
            }
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

  const coordination = reactive<FormPropGroupType[]>([
    {
      name: 'userTask4',
      title: '',
      group: [
        {
          name: 'sevenDisposeSituation',
          label: '处置情况',
          type: 'checkbox',

          options: (data: any, op?: OpStatus) => {
            return dealWorkbench.map(item => {
              return {
                label: item,
                value: item
              };
            });
          },
          rules: [{ required: true }]
        },
        {
          label: '协调情况备注',
          name: 'siteRemarkWork',

          type: 'textarea'
        },
        {
          name: 'sevenSitePhoto',
          label: '现场照片',
          type: 'upload',
          uploadConfig: {
            limit: 1000
          },
          rules: [{ required: true }]
        },
        {
          name: 'isNext',
          label: '协调结束',
          type: 'select',
          display: data => {
            return (
              data.sevenDisposeWay === 1 ||
              (data.sevenDisposeWay === 2 && data.mode === 1)
            );
          },
          options: systemStore.dict.yes_no,

          rules: [{ required: true }]
        },
        {
          name: 'status',
          label: '状态',
          type: 'hidden',
          display: data => {
            return data.sevenDisposeWay === 1;
          },
          defaultValue: (data: any) => {
            return data.isNext == 1
              ? PROCESS_BROKEN.STEP_8
              : PROCESS_BROKEN.STEP_4;
          }
        }
      ]
    }
  ]);
  const dotPublic = reactive<FormPropGroupType[]>([
    {
      name: 'dotPublic',
      title: '',
      group: [
        {
          name: 'xxxxx',
          label: '处置时间',
          type: 'date-picker',
          rules: [{ required: true }],
          defaultValue: utcTime(),
          layoutProps: {
            span: 10
          }
        },
        {
          name: 'mode',
          alias: 'mode',
          label: '处置方式',
          type: 'select',
          options: systemStore.dict.external_dispose_way
            .map((item: any) => {
              if (item.label != '移送公安') {
                return item;
              }
            })
            .filter((e: any) => {
              return e != undefined;
            }),
          rules: [{ required: true }],
          layoutProps: {
            span: 10
          }
        },
        ...coordination.flatMap(item => {
          return item.group;
        })
      ]
    }
  ]);

  const sendPublic = reactive<FormPropGroupType[]>([
    {
      name: 'sendPublic',
      title: '',
      group: [
        {
          name: 'sevenOliceIsAccept',
          label: '公安是否受理',
          type: 'radio',
          options: systemStore.dict.yes_no,
          rules: [{ required: true }],
          defaultValue: 1,
          layoutProps: {
            span: 23
          }
        },
        {
          name: 'sevenFkh',
          label: '公安机关反馈函',
          type: 'upload-file',
          rules: [{ required: true }],
          layoutProps: {
            span: 23
          }
        },
        {
          name: 'sevenDisposeResult',
          label: '公安机关处置结果',
          type: 'textarea',
          rules: [{ required: true }],
          display: data => {
            return data.sevenOliceIsAccept === 1;
          },
          layoutProps: {
            span: 23
          }
        },
        {
          name: 'status',
          label: '状态',
          type: 'hidden',
          defaultValue: (data: any) => {
            return data.sevenOliceIsAccept == 1
              ? PROCESS_BROKEN.STEP_8
              : data.mode == 3
                ? PROCESS_BROKEN.STEP_5
                : data.isNext == 1
                  ? PROCESS_BROKEN.STEP_8
                  : PROCESS_BROKEN.STEP_4;
          }
        }
      ]
    },
    {
      name: 'sendPublic',
      title: '',
      display(data, _op?) {
        return data.sevenOliceIsAccept === 0;
      },
      group: dotPublic.flatMap(item => {
        if (item.display) {
          {
            return item.group.map(child => {
              // 将父级 display 赋值给 子级
              return Object.assign({ display: item.display }, child);
            });
          }
        } else {
          return item.group;
        }
      })
    }
  ]);




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
      name: 'userTask2',
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
        // {
        //     name: 'uid',
        //     label: '指派人',
        //     type: 'select',
        //     apiFn: api.users.queryDispenseUser,
        //     apiParams: (data: any) => {
        //       return {
        //         size: 100,
        //         organizationPath: data.path
        //       };
        //     },
        //     apiCbFn: data => {
        //       return data.rows.map((item: any) => {
        //         return {
        //           label: item.name,
        //           value: item.id,
        //           phone: item.phone
        //         };
        //       });
        //     },
        //     rules: [{required: true}],
        //     display(data) {
        //       return data.isNext === 1;
        //     },
        //   },
          {
          name: 'uid',
          label: '指派人',
          type: 'custom',
          customComponent: markRaw(FormTableSelectModal),
          customProps: userTableSelectProps,
          required: true,
          rules: [{ required: true }],
          display(data) {
            return data.isNext === 1;
          },
        },
        {
          name: 'fiveReason',
          label: '不受理原因',
          type: 'textarea',
          rules: [{ required: true }],
          display: data => data.fiveIsAccept === 0
        },
        {
          name: 'fiveHandleOpinion',
          label: '初步处置意见',
          type: 'textarea',
          display(data) {
            return data.fiveIsAccept === 1;
          },
          rules: [{ required: true }]
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
          name: 'status',
          label: '状态',
          type: 'hidden',
          defaultValue: (data: any) => {
            return data.isNext === 0
              ? PROCESS_BROKEN.STEP_1
              : PROCESS_BROKEN.STEP_3;
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
      name: 'zone4',
      title: '',
      group: [
        {
          name: 'arrayUserTask',
          label: '',
          hiddenLabel: true,
          type: 'arrayCard',
          arrayCardConfig: {},
          items: [
            {
              name: 'zone4',
              title: '处置情况',
              group: [
                {
                  name: 'sevenDisposeTime',
                  label: '处置时间',
                  type: 'date-picker',
                  rules: [{ required: true }],
                  defaultValue: utcTime(),
                },
                {
                  name: 'sevenDisposeWay',
                  alias: 'way',
                  label: '处置方式',
                  type: 'select',
                  options: systemStore.dict.external_dispose_way,
                  rules: [{ required: true }],
                }
              ]
            },
            {
              name: 'coordination',
              title: '现场协调',
              display(data, _op?) {
                return data.sevenDisposeWay === 1;
              },
              group: coordination.flatMap(item => {
                if (item.display) {
                  {
                    return item.group.map(child => {
                      // 将父级 display 赋值给 子级
                      return Object.assign({ display: item.display }, child);
                    });
                  }
                } else {
                  return item.group;
                }
              })
            },
            {
              name: 'public',
              title: '移送公安',
              display(data, _op?) {
                return data.sevenDisposeWay === 2;
              },
              group: sendPublic.flatMap(item => {
                if (item.display) {
                  {
                    return item.group.map(child => {
                      // 将父级 display 赋值给 子级
                      return Object.assign({ display: item.display }, child);
                    });
                  }
                } else {
                  return item.group;
                }
              })
            },
            {
              name: 'coordination',
              title: '行政立案',
              display(data, _op?) {
                return data.sevenDisposeWay === 3;
              },
              group: [
                ...coordination.flatMap(item => {
                  if (item.display) {
                    {
                      return item.group.map(child => {
                        // 将父级 display 赋值给 子级
                        return Object.assign({ display: item.display }, child);
                      });
                    }
                  } else {
                    return item.group;
                  }
                }),
                {
                  name: 'status',
                  label: '状态',
                  type: 'hidden',
                  defaultValue: PROCESS_BROKEN.STEP_5
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
      name: 'userTask5',
      title: '',
      group: [
        {
          name: 'sevenJbajdjb',
          label: '举报案件登记表',
          type: 'upload-file',
          rules: [{ required: true }],
          tip: '<p style="text-align: center; font-size: 18px;margin-bottom: 10px;"><span style="font-family: 黑体;">举报案件登记表注意事项</span></p><p style="text-indent: 28pt; text-align: left;">举报案件登记表是对来访、来电、来函举报、投诉违法行为时，用以记录相关情况的内部文书。</p><p style="text-indent: 28pt; text-align: left;">填写举报案件登记表应当注意下列事项：</p><p style="text-indent: 28pt; text-align: left;">1.举报方式：根据举报渠道勾选相应方式。</p><p style="text-indent: 28pt; text-align: left;">2.举报人：填写举报人的基本情况。</p><p style="text-indent: 28pt; text-align: left;">3.被举报人：是自然人的，应写明其姓名、性别、年龄和家庭住址，有效证件号码填写身份证号；举报人是法人或其他组织的，应写明其全称、主要办事机构所在地地址、法定代表人或主要负责人的姓名，有效证件号码填写统一社会信用代码。</p><p style="text-indent: 28pt; text-align: left;">4.举报内容：主要填写举报人反映的违法行为的具体情况，包括违法行为人、时间、地点、违法行为</p><p style="text-indent: 28pt;">5.承办部门意见：填写受理部门提出进行调查的意见。如：建议调查核实。</p><p style="text-indent: 28pt;">6.行政机关分管领导审批意见：填写“同意/不同意调查核实”。</p>',
          uploadConfig: {
            fileTemplateUrl: './docs-template/举报案件登记表.docx'
          }
        },
        {
          name: 'sevenXzcflaspb',
          label: '行政处罚立案审批表',
          type: 'upload-file',
          rules: [{ required: true }],
          tip: '<p style="text-align: center; font-size: 18px;margin-bottom: 10px;"><span style="font-family: 黑体;">立案审批表注意事项</span></p><p style="text-align: justify;"> &nbsp; &nbsp;1.案由：处于立案阶段，案由书写形式为“涉嫌+违法行为类别+案”，如“涉嫌擅自设置使用无线电台案”。</p><p style="text-align: justify;"> &nbsp; &nbsp;2.案件来源：包括检查发现、媒体曝光、监督抽检、群众举报或投诉、上级交办、有关部门移送、违法行为人交待等。</p><p style="text-align: justify;"> &nbsp; &nbsp;3.违法事实及立案依据：应当简要叙述初步掌握的违法事实，包括涉嫌违法行为时间、地点、事实、情节等内容，如有检举材料、投诉材料、检测报告等书面材料，可作出说明并附在此表后面。 </p><p style="text-align: justify;"> &nbsp; &nbsp;4.承办机构意见：指具体执法处室负责人的审核意见，是否同意立案查处。 </p><p style="text-align: justify;"> &nbsp; 5.行政机关负责人审批意见：包括厅机关主要负责人及分管领导。各无线电派出机构由地市无线电管理局领导审批，签发“同意立案”或者“不同意立案”，不能仅以签名代替处理意见。签发日期即为立案日期。</p><p style="text-align: justify;"> &nbsp; &nbsp;6.行政处罚文书多处涉及“单位负责人审批意见”，均参照上述说明填写。</p>',
          uploadConfig: {
            fileTemplateUrl: './docs-template/行政处罚立案审批表.docx'
          }
        },
        {
          name: 'sevenOtherFile',
          label: '其他附件',
          type: 'upload',
          uploadConfig: {
            limit: 1000
          }
        },
        {
          name: 'status',
          label: '状态',
          type: 'hidden',
          defaultValue: PROCESS_BROKEN.STEP_6
        }
      ]
    }
  ]);

  /* 行政立案调查 */
  const userTask6 = reactive<FormPropGroupType[]>([
    {
      name: 'zone6',
      title: '',
      group: [
        {
          name: 'sevenJsdctzs',
          label: '接受调查通知书',
          type: 'upload-file',
          tip: '<p style="text-align: center;"><span style="font-size: 16px; font-family: 黑体;"><strong>接受调查通知书注意事项</strong></span></p><p style="text-align: justify;"> &nbsp; &nbsp;1.文号填写：本文书文号适用于厅机关执法处室制作的文书，文号书写格式为“闽工信+执法类别+执法类别（执法性质）+〔年份〕+序号”；例如，由节能处制作的文书，文号书写为“闽工信节能调查字〔2020〕第1号”，序号每年的1月1日起从“1”号编起。各设区市无线电管理局制作的文书文号格式建议书写为“设区市简称+无线+执法性质+〔年份〕+序号”，例如“榕无线调查字〔2020〕第1号”。</p><p style="text-align: justify;"> &nbsp; &nbsp;2.涉嫌违反的规定：应填写法律依据名称及条、款、项具体内容。</p><p style="text-indent: 28pt; text-align: justify;">3.携带材料：勾选相应的材料选项，如需携带其他材料，应在“其他”选项中具体列出。</p><p>4.行政处罚文书涉及文号填写的，均参照上述规定书写。</p>',
          uploadConfig: {
            fileTemplateUrl: './docs-template/接受调查通知书.docx'
          }
        },
        // {
        //   name: "sevenXcjcjl",
        //   label: "现场检查记录",
        //   type: "upload-file",
        //   rules: [{ required: true }]
        // },
        {
          name: 'sevenXcjcjlky',
          label: '现场检查（勘察）记录',
          type: 'upload-file',
          rules: [{ required: true }],
          uploadConfig: {
            fileTemplateUrl: './docs-template/现场检查（勘察）笔录.docx'
          }
        },
        {
          name: 'sevenDcbl',
          label: '调查（询问）笔录',
          type: 'upload-file',
          rules: [{ required: true }],
          uploadConfig: {
            fileTemplateUrl: './docs-template/调查（询问）笔录.docx'
          }
        },
        {
          name: 'sevenAjdczjbg',
          label: '案件调查终结报告',
          type: 'upload-file',
          rules: [{ required: true }],
          uploadConfig: {
            fileTemplateUrl: './docs-template/案件调查终结报告.docx'
          }
        },
        {
          name: 'sevenRecordDate',
          label: '立案日期',
          type: 'date-picker',
          rules: [{ required: true }],
          defaultValue: utcTime()
        },
        {
          name: 'status',
          label: '状态',
          type: 'hidden',
          defaultValue: PROCESS_BROKEN.STEP_7
        }
      ]
    }
  ]);

  /* 行政立案结案 */
  const userTask7 = reactive<FormPropGroupType[]>([
    {
      name: 'zone7',
      title: '',
      group: [
        {
          name: 'sevenCaseParty',
          label: '案件当事人',
          type: 'text',
          // placeholder: '请输入当事人（空格隔开）',
          rules: [
            { required: true }
            // {
            //   validator(rule, value, callback, source, options) {
            //     if (value.split(' ').length !== 2)
            //       callback(new Error('当事人有且仅有两人'));
            //     else callback();
            //   }
            // }
          ]
        },
        {
          name: 'sevenCaseOrigin',
          label: '案由',
          type: 'textarea',
          rules: [{ required: true }],
          // placeholder: 'XXX涉嫌破坏电力设施案'
          defaultValue: (data: any) =>
            data.sevenCaseOrigin ||
            `${data?.sevenCaseParty ?? 'XXX'}涉嫌破坏电力设施案`
        },
        {
          name: 'sevenXzcfgzs',
          label: '行政处罚告知书',
          type: 'upload-file',
          rules: [{ required: true }],
          tip: '<p style="text-align: center;"><span style="font-size: 16px; font-family: 黑体;"><strong>行政处罚事先告知书注意事项</strong></span></p><p style="text-align: justify;"> &nbsp; &nbsp;行政处罚告知书是指在作出行政处罚之前，依法告知当事人给予行政处罚决定的事实、理由、依据以及享有陈述权、申辩权或听证权所制作的通知性文书。</p><p style="text-align: justify;"> &nbsp; &nbsp;注意事项：</p><p style="text-align: justify;"> &nbsp; &nbsp;1.行政处罚告知是作出行政处罚决定之前必须履行的一项法定程序，如果下达行政处罚决定前没有履行告知义务，则属于程序违法，行政处罚无效。</p><p style="text-align: justify;"> &nbsp; &nbsp;2.适用简易程序和一般程序实施行政处罚的案件，都应当有告知程序；告知一般采用书面告知形式。</p><p style="text-align: justify;"> &nbsp; &nbsp;3.行政处罚事先告知书应当采用阐述式，有说理性的内容，不宜用填空式。</p><p> &nbsp; &nbsp;4.作出行政处罚决定之前，应当告知当事人依法享有的权利。当事人有权进行陈述和申辩。作出吊销许可证、较大数额罚款等处罚决定时，应告知当事人有要求举行听证的权利。</p>',
          uploadConfig: {
            fileTemplateUrl: './docs-template/行政处罚事先告知书.docx'
          }
        },
        {
          name: 'sevenWssdhz',
          label: '行政处罚文书送达回证', // （行政处罚告知书）
          type: 'upload-file',
          rules: [{ required: true }],
          tip: '<p style="text-align: center;"><span style="font-size: 16px; font-family: 黑体;"><strong>送达回证注意事项：</strong></span></p><p style="text-indent: 28pt;">送达回证是行政执法机关在送达行政执法文书时，记载相关文书已经送达的书面凭证。</p><p style="text-indent: 28pt;">1.受送达人：填写该文书所送达的当事人的姓名和名称。受送达人为法人或其他组织的，应使用全称；受送达人名称或姓名，应与案件当事人一致。</p><p style="text-indent: 28pt;">2.送达文件名称、文号：应写明所送达的文书的具体名称及文号。</p><p style="text-indent: 28pt;">3.受送达人（单位）盖章：由当事人签字或盖章。</p><p style="text-indent: 28pt;">4.代收人：当事人不在时，由代收人签收，并注明与受送达人的关系。代收人包括同住的成年家属，法人或者其他组织负责收件的人。</p><p style="text-indent: 28pt;">受送达人（单位）、代收人签收日期为送达日期。</p><p style="text-indent: 28pt;">5.送达方式:填写“直接送达”“留置送达”“公告送达”“委托送达”或者“邮寄送达”等。邮寄送达要采取特快专递的方式，并将挂号函件收据入卷存档；公告送达应将公告文书归档入卷；留置送达必须有当事人所在地的有关基层组织或者所在单位的代表见证签字；关于送达地址参照《最高法关于进一步加强民事送达工作的若干意见》。</p><p style="text-indent: 28pt;">6.拒收原因:受送达人或其他法定签收人拒收时，由送达人填写此栏。受送达人拒收的，送达人应在备注栏注明拒收的理由，并请见证人签名或盖章。</p><p style="text-indent: 28pt;">7.见证人：受送达人拒收时才需要见证人。见证人一般是被邀请的有关基层组织或其所在单位的代表。</p><p style="text-indent: 28pt;">8.送达人：由两名执法人员签名。</p>',
          uploadConfig: {
            fileTemplateUrl: './docs-template/行政执法文书送达回证.docx'
          }
        },
        {
          name: 'sevenXzcfjds',
          label: '行政处罚决定书',
          type: 'upload-file',
          rules: [{ required: true }],
          tip: '<p style="text-align: center;"><span style="font-size: 16px; font-family: 黑体;"><strong>行政处罚决定书注意事项：</strong></span></p><p style="text-indent: 28pt;">1.行政处罚决定书应有说理性内容，说明事理、情理和法理。主要包括：（1）对违法行为的构成要件、因果关系和违法事实的认定过程等陈述清楚；（2）阐述证据形式和证据所要证明的内容；（3）适用法律依据时应当完整地引用定性依据和处罚依据；（4）对当事人陈述申辩理由、证据或听证的过程、结论和无线电管理机构是否采纳意见的理由、依据，应当详细阐述，当事人放弃陈述申辩或听证的也应予以说明；（5）作出从重、从轻、减轻或其他有裁量幅度的行政处罚的，应当在行政处罚决定书中说明法定理由和依据。</p><p style="text-indent: 28pt;">2.当事人提起行政复议的途径有两种方式：一是向具体行政行为发生地的县级人民政府提请行政复议申请，二是以福建省工信厅名义作出的行政处罚决定，复议机关为福建省人民政府或工业和信息化部。各设区市无线电管理局作出的行政处罚决定，复议机关为福建省工业和信息化厅或福建省人民政府。</p><p style="text-indent: 28pt;">3.本文书要求同样适用于当场行政处罚决定书。</p>',
          uploadConfig: {
            fileTemplateUrl: './docs-template/行政处罚决定书.docx'
          }
        },
        {
          name: 'sevenPunishWay',
          label: '处罚方式',
          type: 'select',
          options: systemStore.dict.punish_way.slice(0, 2),
          rules: [{ required: true }]
        },
        {
          name: 'sevenMoneyLoss',
          label: '造成经济损失（元）',
          type: 'number',
          rules: [{ required: true }],
          display: data => data.sevenPunishWay === 1
        },
        {
          name: 'sevenPunishMoney',
          label: '行政处罚金额（元）',
          type: 'number',
          rules: [{ required: true }]
        },

        {
          name: 'status',
          label: '状态',
          type: 'hidden',
          defaultValue: PROCESS_BROKEN.STEP_8
        }
      ]
    },
    {
      name: 'userTask8',
      title: '',
      group: [
        {
          name: 'sevenFolderNumber',
          label: '案卷号',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          name: 'sevenFolderUser',
          label: '立卷人',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          name: 'sevenCaseUser',
          label: '案件办理人',
          type: 'text',
          placeholder: '请输入办理人（逗号隔开）',
          rules: [
            { required: true },
            {
              validator(rule, value, callback, source, options) {
                if (value.split('，').length < 2)
                  callback(new Error('至少两位办理人'));
                else callback();
              }
            }
          ]
        },
        {
          name: 'sevenCloseCaseDate',
          label: '结案日期',
          type: 'date-picker',
          rules: [{ required: true }]
        },
        {
          name: 'sevenStoragePeriod',
          label: '保管期限（年）',
          type: 'number',
          rules: [
            { required: true },
            {
              // pattern: REGEXP.number,
              message: '请输入数字'
            }
          ]
        },
        {
          name: 'sevenOtherAffixFile',
          label: '其他资料附件',
          type: 'upload-file',
          uploadConfig: {
            limit: 1000
          }
        }
      ]
    }
  ]);

  /* 电力设施产权人处置 */
  const userTask8 = reactive<FormPropGroupType[]>([
    {
      name: 'zone8',
      title: '电力设施产权人处置',
      group: [
        {
          name: 'eightRedeemLoss',
          label: '挽回经济损失',
          type: 'text',
          rules: [{ required: true }]
        },
        {
          name: 'eightHandlingUsername',
          label: '经办人',
          type: 'text',
          rules: [{ required: true }],
          readonly: true,
          defaultValue: authStore.userInfo?.name ?? ''
        },
        {
          name: 'eightHandlingUser',
          label: '经办人ID',
          type: 'hidden',
          defaultValue: authStore.userInfo?.id ?? ''
        },
        {
          name: 'eightHandlingTime',
          alias: 'disposeTime',
          label: '经办时间',
          type: 'datetime-picker',
          rules: [{ required: true }],
          defaultValue: utcTime()
        },
        {
          name: 'powerLoss',
          label: '电量损失',
          type: 'number',
          display: data => {
            return data.powerCut === 1;
          }
        },
        {
          name: 'eightSitePhoto',
          label: '现场照片',
          type: 'upload',
          uploadConfig: {
            limit: 1000
          }
          // rules: [{ required: true }]
        },
        {
          name: 'eightResult',
          alias: 'disposeResult',
          label: '处理结果',
          type: 'textarea',
          rules: [{ required: true }]
        },
        {
          name: 'eightJudgementFile',
          label: '附件（判决书）',
          type: 'upload',
          uploadConfig: {
            limit: 1000
          }
          // rules: [{ required: true }]
        },
        // {
        //   name: 'isNext',
        //   label: '是否整改',
        //   type: 'hidden',
        //   options: systemStore.dict.yes_no,
        //   defaultValue: 1,
        //   rules: [{ required: true }]
        // },
        {
          name: 'status',
          label: '状态',
          type: 'hidden',
          defaultValue: PROCESS_BROKEN.STEP_9
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

    console.log(taskDefKey,formData,props,props[3].group[0],'formData----------');
    
    resetCheckFormFields(props);
    const { success, data } = await api.structure.structureClassQueryInfo({
      id: formData.exterType
    });
    console.log(data,'data');
    
    const childrenData = getFormFieldsAndCheckData(data);
    console.log(childrenData,'childrenData');
    const checkValueList: string[] =
      formData.exterTypeData?.split(',');
    props[2].title = childrenData.fieldGroup.title;
    props[2].group = childrenData.fieldGroup.group;
    props[3].group[0].options = (data: any) => childrenData.checkOptions;
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
      userTask1,
      userTask2,
      userTask3,
      userTask4,
      userTask5,
      userTask6,
      userTask7,
      userTask8
    },
    loadFieldsData,
    checkValueList,
    setCheckFormFields,
    customDetailsFormPropsHookFn
  };
}
