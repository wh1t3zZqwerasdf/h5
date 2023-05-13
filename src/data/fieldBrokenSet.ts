/**
 * 外破类型 相关字段显示
 */

import { GroupSetType } from '@/types';
import { flatArrToObj } from '@/utils';

export function useBrokenSet(systemStore: any) {
  const otherMap = {
    ground: { name: 'ground', label: '对地距离', type: 'number' },
    horizontal: { name: 'horizontal', label: '水平距离', type: 'number' },
    vertical: { name: 'vertical', label: '垂直距离', type: 'number' },
    dropHeight: { name: 'dropHeight', label: '落差高度', type: 'number' },
    baseArea: { name: 'baseArea', label: '基面占用面积', type: 'number' },
    licenses: {
      name: 'licenses',
      label: '作业许可',
      type: 'select',
      options: systemStore.dict.yes_no
    }
  };
  /* 施工 */
  const Construction = [
    { name: 'constructionOrg', label: '施工单位' },
    { name: 'constructionPhone', label: '施工单位联系电话' }
  ];
  /* 肇事 */
  const Incident = [
    { name: 'accidentOrg', label: '肇事单位（人）' },
    { name: 'accidentPhone', label: '肇事方联系电话' }
  ];
  /* 业主 */
  const Owner = [
    { name: 'ownerOrg', label: '业主单位' },
    { name: 'ownerPhone', label: '业主联系电话' }
  ];
  const OwnerUn = [
    { name: 'ownerOrg', label: '业主单位', rules: [{ required: false }] },
    { name: 'ownerPhone', label: '业主联系电话', rules: [{ required: false }] }
  ];
  const TreeRelate = [
    { name: 'ownerName', label: '林权人' },
    { name: 'ownerPhone', label: '林权人联系电话' },
    otherMap.horizontal,
    otherMap.vertical,
    // { name: 'treeQuantity', label: '林木棵树', rules: [{ required: false }] },
    { name: 'treeQuantity', label: '林木棵树' },
    {
      name: 'ownerType',
      label: '林权类型',
      type: 'select',
      options: systemStore.dict.forest_type
    }
  ];

  /* 施工作业 */
  const ConstructionWork = [...Owner, ...Construction];

  // 协调情况 (业务)
  const dealSituation = [];

  // 处置情况 (工作台)
  const dealWorkbench = [
    '现场核查',
    '签发安全隐患整改通知书',
    '协助追回赔偿金',
    '针对性普法宣传',
    '约谈责任方',
    '协调督促整改',
    '联合执法',
    '行政立案'
  ];

  const fieldSet = [
    {
      id: '85708563472731087',
      parentId: '85708563472731002',
      name: '输电',
      level: 1,
      type: 2,
      childList: [
        {
          id: '85708563472731090',
          parentId: '85708563472731087',
          name: '杆塔',
          level: 2,
          type: 2,
          childList: [
            {
              id: '85708563472731098',
              parentId: '85708563472731090',
              name: '外力破坏',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...Incident],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '追回经济赔偿金',
                '肇事方登报检讨'
              ]
            },
            {
              id: '85708563472731099',
              parentId: '85708563472731090',
              name: '施工作业',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...ConstructionWork],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '中止施工用电',
                '追回经济赔偿金',
                '肇事方登报检讨'
              ]
            }
          ]
        },
        {
          id: '85708563472731091',
          parentId: '85708563472731087',
          name: '通道（导线）',
          level: 2,
          type: 2,
          childList: [
            {
              id: '85708563472731100',
              parentId: '85708563472731091',
              name: '施工作业',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...OwnerUn, ...Construction],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '中止施工用电',
                '追回经济赔偿金',
                '肇事方登报检讨'
              ]
            },
            {
              id: '85708563472731101',
              parentId: '85708563472731091',
              name: '树竹砍伐',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...Incident],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '追回经济赔偿金',
                '肇事方登报检讨'
              ]
            },
            {
              id: '85708563472731102',
              parentId: '85708563472731091',
              name: '违章搭建',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...ConstructionWork],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报“两违办”',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '追回经济赔偿金',
                '肇事方登报检讨'
              ]
            },
            {
              id: '85708563472731103',
              parentId: '85708563472731091',
              name: '爆破作业',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...Incident],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '追回经济赔偿金',
                '肇事方登报检讨'
              ]
            },
            {
              id: '85708563472731104',
              parentId: '85708563472731091',
              name: '烧荒炼荒',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...Incident],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '追回经济赔偿金',
                '肇事方登报检讨'
              ]
            },
            {
              id: '85708563472731105',
              parentId: '85708563472731091',
              name: '垂钓',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...Incident],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '追回经济赔偿金',
                '肇事方登报检讨'
              ]
            },
            {
              id: '85708563472731124',
              parentId: '85708563472731091',
              name: '易漂浮物',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...Owner, otherMap.horizontal],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '追回经济赔偿金',
                '肇事方登报检讨'
              ]
            }
          ]
        },
        {
          id: '85708563472731092',
          parentId: '85708563472731087',
          name: '通道（电缆）',
          level: 2,
          type: 2,
          childList: [
            {
              id: '85708563472731106',
              parentId: '85708563472731092',
              name: '施工作业',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...ConstructionWork],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '中止施工用电',
                '追回经济赔偿金',
                '肇事方登报检讨'
              ]
            },
            {
              id: '85708563472731125',
              parentId: '85708563472731092',
              name: '外力破坏',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...Incident],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '追回经济赔偿金',
                '肇事方登报检讨'
              ]
            }
          ]
        }
      ]
    },
    {
      id: '85708563472731088',
      parentId: '85708563472731002',
      name: '变电',
      level: 1,
      type: 2,
      childList: [
        {
          id: '85708563472731093',
          parentId: '85708563472731088',
          name: '变电站',
          level: 2,
          type: 2,
          childList: [
            {
              id: '85708563472731107',
              parentId: '85708563472731093',
              name: '外力破坏',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...Incident],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '追回经济赔偿金',
                '肇事方登报检讨'
              ]
            },
            {
              id: '85708563472731108',
              parentId: '85708563472731093',
              name: '施工作业',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...ConstructionWork],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '中止施工用电',
                '追回经济赔偿金',
                '肇事方登报检讨'
              ]
            },
            {
              id: '85708563472731126',
              parentId: '85708563472731093',
              name: '易漂浮物',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...Owner, otherMap.horizontal],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '追回经济赔偿金',
                '肇事方登报检讨'
              ]
            }
          ]
        }
      ]
    },
    {
      id: '85708563472731089',
      parentId: '85708563472731002',
      name: '配电',
      level: 1,
      type: 2,
      childList: [
        {
          id: '85708563472731094',
          parentId: '85708563472731089',
          name: '杆塔',
          level: 2,
          type: 2,
          childList: [
            {
              id: '85708563472731109',
              parentId: '85708563472731094',
              name: '外力破坏',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...Incident],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '申报保险理赔'
              ]
            },
            {
              id: '85708563472731110',
              parentId: '85708563472731094',
              name: '施工作业',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...ConstructionWork],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '中止施工用电',
                '申报保险理赔'
              ]
            },
            {
              id: '85708563472731111',
              parentId: '85708563472731094',
              name: '违章搭挂',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...Incident],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '追回经济赔偿金',
                '肇事方登报检讨'
              ]
            }
          ]
        },
        {
          id: '85708563472731095',
          parentId: '85708563472731089',
          name: '通道（导线）',
          level: 2,
          type: 2,
          childList: [
            {
              id: '85708563472731112',
              parentId: '85708563472731095',
              name: '施工作业',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...ConstructionWork],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '中止施工用电',
                '申报保险理赔'
              ]
            },
            {
              id: '85708563472731113',
              parentId: '85708563472731095',
              name: '树竹砍伐',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...Incident],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '申报保险理赔'
              ]
            },
            {
              id: '85708563472731114',
              parentId: '85708563472731095',
              name: '违章搭建',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...ConstructionWork],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报“两违办”',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '申报保险理赔'
              ]
            },
            {
              id: '85708563472731115',
              parentId: '85708563472731095',
              name: '爆破作业',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...Incident],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '申报保险理赔'
              ]
            },
            {
              id: '85708563472731116',
              parentId: '85708563472731095',
              name: '烧荒炼荒',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...Incident],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '申报保险理赔'
              ]
            },
            {
              id: '85708563472731117',
              parentId: '85708563472731095',
              name: '垂钓',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...Incident],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '申报保险理赔'
              ]
            },
            {
              id: '85708563472731127',
              parentId: '85708563472731095',
              name: '易漂浮物',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...Owner, otherMap.horizontal],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '申报保险理赔'
              ]
            }
          ]
        },
        {
          id: '85708563472731096',
          parentId: '85708563472731089',
          name: '变压器',
          level: 2,
          type: 2,
          childList: [
            {
              id: '85708563472731118',
              parentId: '85708563472731096',
              name: '外力破坏',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...Incident],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '申报保险理赔'
              ]
            },
            {
              id: '85708563472731119',
              parentId: '85708563472731096',
              name: '超高树竹',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...TreeRelate],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '申报保险理赔'
              ]
            },
            {
              id: '85708563472731120',
              parentId: '85708563472731096',
              name: '违章搭建',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...ConstructionWork],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报“两违办”',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '申报保险理赔'
              ]
            },
            {
              id: '85708563472731121',
              parentId: '85708563472731096',
              name: '设备偷盗',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...Incident],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '申报保险理赔'
              ]
            },
            {
              id: '85708563472731122',
              parentId: '85708563472731096',
              name: '违章搭挂',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...Incident],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '申报保险理赔'
              ]
            },
            {
              id: '85708563472731128',
              parentId: '85708563472731096',
              name: '施工作业',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...ConstructionWork],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '中止施工用电',
                '申报保险理赔'
              ]
            }
          ]
        },
        {
          id: '85708563472731097',
          parentId: '85708563472731089',
          name: '通道（电缆）',
          level: 2,
          type: 2,
          childList: [
            {
              id: '85708563472731123',
              parentId: '85708563472731097',
              name: '施工作业',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...ConstructionWork],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '中止施工用电',
                '申报保险理赔'
              ]
            },
            {
              id: '85708563472731129',
              parentId: '85708563472731097',
              name: '外力破坏',
              level: 3,
              type: 2,
              childList: [],
              fieldList: [...Incident],
              dealSituation: [
                '反馈调控部门',
                '提报公安机关',
                '提报电力执法机构',
                '查找责任人',
                '现场拍照留证',
                '组织抢修',
                '申报保险理赔'
              ]
            }
          ]
        }
      ]
    }
  ];

  const fieldSetMap: Record<string, GroupSetType> = {};
  flatArrToObj(fieldSet, fieldSetMap);

  return { fieldSet, fieldSetMap, dealWorkbench };
}
