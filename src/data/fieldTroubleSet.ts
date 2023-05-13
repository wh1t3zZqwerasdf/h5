import { GroupSetType } from '@/types';
import { flatArrToObj } from '@/utils';
/**
 * 隐患类型 相关字段显示
 */

export function useTroubleSet(systemStore: any) {
  /* 其他 */
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

  const TreeRelate = [
    { name: 'ownerName', label: '林权人' },
    { name: 'ownerPhone', label: '林权人联系电话' },
    otherMap.horizontal,
    otherMap.vertical,
    { name: 'treeQuantity', label: '林木棵树', rules: [{ required: false }] },
    {
      name: 'ownerType',
      label: '林权类型',
      type: 'select',
      options: systemStore.dict.forest_type
    }
  ];

  const Construction = [
    { name: 'constructionOrg', label: '施工单位' },
    { name: 'constructionPhone', label: '施工单位联系电话' }
  ];

  /* 业主 */
  const Owner = [
    { name: 'ownerOrg', label: '业主单位' }, // 业主
    { name: 'ownerPhone', label: '业主联系电话' }
  ];

  /* 施工作业 */
  const ConstructionWork = [
    ...Owner,
    ...Construction,
    otherMap.licenses,
    otherMap.horizontal,
    otherMap.vertical
  ];

  /* 违章搭建 */
  const illegalBuild = [
    ...Owner,
    otherMap.horizontal,
    otherMap.vertical,
    otherMap.licenses
  ];

  // export const  dealSituation = [];

  // 处置情况 (工作台)
  const dealWorkbench = [
    '现场核查',
    '签发安全隐患整改通知书',
    '签发责令整改文书',
    '针对性普法宣传',
    '约谈责任方',
    '协调督促整改',
    '联合执法',
    '行政立案'
  ];

  const fieldSet = [
    {
      id: '85708563472731003',
      parentId: '85708563472731001',
      name: '输电',
      level: 1,
      childList: [
        {
          id: '85708563472731006',
          parentId: '85708563472731003',
          name: '杆塔',
          level: 2,
          childList: [
            {
              id: '85708563472731011',
              parentId: '85708563472731006',
              name: '施工作业',
              level: 3,
              childList: [],
              fieldList: [...ConstructionWork],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '要求办理保护区作业申请',
                '签订安全协议书',
                '安全技术交底',
                '建立联系群',
                '定期发送安全提醒信息',
                '装设警示标志',
                '装设限高装置',
                '安装视频（图像）监控',
                '协调整改',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731013',
              parentId: '85708563472731006',
              name: '拉线变动',
              level: 3,
              childList: [],
              fieldList: [...Owner],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '要求办理保护区作业申请',
                '签订安全协议书',
                '安全技术交底',
                '建立联系群',
                '定期发送安全提醒信息',
                '装设警示标志',
                '安装视频（图像）监控',
                '协调整改',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731014',
              parentId: '85708563472731006',
              name: '违章搭挂',
              level: 3,
              childList: [],
              fieldList: [...Owner],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '装设警示标志',
                '协调整改',
                '提报电力执法机构'
              ]
            }
          ]
        },
        {
          id: '85708563472731007',
          parentId: '85708563472731003',
          name: '基础',
          level: 2,
          childList: [
            {
              id: '85708563472731015',
              parentId: '85708563472731007',
              name: '人为取土',
              level: 3,
              childList: [],
              fieldList: [...Owner, otherMap.horizontal, otherMap.dropHeight],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '定期发送安全提醒信息',
                '装设警示标志',
                '安装视频（图像）监控',
                '协调整改',
                '提报政府相关职能部门',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731018',
              parentId: '85708563472731007',
              name: '基面占用',
              level: 3,
              childList: [],
              fieldList: [...Owner, otherMap.baseArea],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '装设警示标志',
                '协调整改',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731019',
              parentId: '85708563472731007',
              name: '腐蚀物质',
              level: 3,
              childList: [],
              fieldList: [...Owner, otherMap.horizontal],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '装设警示标志',
                '协调整改',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731130',
              parentId: '85708563472731007',
              name: '施工作业',
              level: 3,
              childList: [],
              fieldList: [...ConstructionWork],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '要求办理保护区作业申请',
                '签订安全协议书',
                '安全技术交底',
                '建立联系群',
                '定期发送安全提醒信息',
                '装设警示标志',
                '装设限高装置',
                '安装视频（图像）监控',
                '协调整改',
                '提报电力执法机构'
              ]
            }
          ]
        },
        {
          id: '85708563472731008',
          parentId: '85708563472731003',
          name: '通道（导线）',
          level: 2,
          childList: [
            {
              id: '85708563472731020',
              parentId: '85708563472731008',
              name: '施工作业',
              level: 3,
              childList: [],
              fieldList: [...ConstructionWork],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '要求办理保护区作业申请',
                '签订安全协议书',
                '安全技术交底',
                '建立联系群',
                '定期发送安全提醒信息',
                '装设警示标志',
                '装设限高装置',
                '安装视频（图像）监控',
                '协调整改',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731021',
              parentId: '85708563472731008',
              name: '超高树竹',
              level: 3,
              childList: [],
              fieldList: [...TreeRelate],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '装设警示标志',
                '安装视频（图像）监控',
                '协调整改',
                '签订青赔协议',
                '砍伐修剪',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731022',
              parentId: '85708563472731008',
              name: '违章搭建',
              level: 3,
              childList: [],
              fieldList: [...illegalBuild],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '定期发送安全提醒信息',
                '装设警示标志',
                '装设限高装置',
                '安装视频（图像）监控',
                '协调整改',
                '提报“两违办”',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731023',
              parentId: '85708563472731008',
              name: '易漂浮物',
              level: 3,
              childList: [],
              fieldList: [...Owner, otherMap.horizontal],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '建立联系群',
                '定期发送安全提醒信息',
                '装设警示标志',
                '安装视频（图像）监控',
                '协调整改',
                '提报政府相关职能部门',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731024',
              parentId: '85708563472731008',
              name: '易燃易爆物',
              level: 3,
              childList: [],
              fieldList: [...Owner, otherMap.horizontal],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '定期发送安全提醒信息',
                '装设警示标志',
                '安装视频（图像）监控',
                '协调整改',
                '提报政府相关职能部门',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731025',
              parentId: '85708563472731008',
              name: '爆破作业',
              level: 3,
              childList: [],
              fieldList: [
                ...Owner,
                otherMap.horizontal,
                ...Construction,
                otherMap.licenses
              ],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '要求办理保护区爆破作业申请',
                '签订安全协议书',
                '安全技术交底',
                '建立联系群',
                '定期发送安全提醒信息',
                '装设警示标志',
                '安装视频（图像）监控',
                '爆破现场监护',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731026',
              parentId: '85708563472731008',
              name: '烧荒炼荒',
              level: 3,
              childList: [],
              fieldList: [...Owner, otherMap.horizontal],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '签订安全协议书',
                '安全技术交底',
                '建立联系群',
                '定期发送安全提醒信息',
                '装设警示标志',
                '安装视频（图像）监控',
                '协调整改',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731027',
              parentId: '85708563472731008',
              name: '垂钓',
              level: 3,
              childList: [],
              fieldList: [...Owner],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '签订安全协议书',
                '安全技术交底',
                '建立联系群',
                '定期发送安全提醒信息',
                '装设警示标志',
                '装设限高装置',
                '安装视频（图像）监控',
                '协调整改',
                '提报电力执法机构'
              ]
            }
          ]
        },
        {
          id: '85708563472731009',
          parentId: '85708563472731003',
          name: '通道（电缆）',
          level: 2,
          childList: [
            {
              id: '85708563472731031',
              parentId: '85708563472731009',
              name: '违章搭建',
              level: 3,
              childList: [],
              fieldList: [...illegalBuild],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '定期发送安全提醒信息',
                '装设警示标志',
                '安装视频（图像）监控',
                '协调整改',
                '提报“两违办”',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731132',
              parentId: '85708563472731009',
              name: '施工作业',
              level: 3,
              childList: [],
              fieldList: [...ConstructionWork],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '要求办理保护区作业申请',
                '签订安全协议书',
                '安全技术交底',
                '建立联系群',
                '定期发送安全提醒信息',
                '装设警示标志',
                '安装视频（图像）监控',
                '协调整改',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731133',
              parentId: '85708563472731009',
              name: '通道占用',
              level: 3,
              childList: [],
              fieldList: [...Owner],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '装设警示标志',
                '协调整改',
                '提报电力执法机构'
              ]
            }
          ]
        }
      ]
    },
    {
      id: '85708563472731004',
      parentId: '85708563472731001',
      name: '变电',
      level: 1,

      childList: [
        {
          id: '85708563472731032',
          parentId: '85708563472731004',
          name: '变电站',
          level: 2,
          childList: [
            {
              id: '85708563472731037',
              parentId: '85708563472731032',
              name: '易飘浮物',
              level: 3,
              childList: [],
              fieldList: [...Owner, otherMap.horizontal],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '安装视频（图像）监控',
                '协调整改',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731038',
              parentId: '85708563472731032',
              name: '易燃易爆物',
              level: 3,
              childList: [],
              fieldList: [...Owner, otherMap.horizontal],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '安装视频（图像）监控',
                '协调整改',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731042',
              parentId: '85708563472731032',
              name: '违章搭建',
              level: 3,
              childList: [],
              fieldList: [...illegalBuild],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '安装视频（图像）监控',
                '协调整改',
                '提报“两违办”',
                '提报电力执法机构'
              ]
            }
          ]
        }
      ]
    },
    {
      id: '85708563472731005',
      parentId: '85708563472731001',
      name: '配电',
      level: 1,

      childList: [
        {
          id: '85708563472731033',
          parentId: '85708563472731005',
          name: '杆塔',
          level: 2,
          childList: [
            {
              id: '85708563472731050',
              parentId: '85708563472731033',
              name: '腐蚀物质',
              level: 3,
              childList: [],
              fieldList: [...Owner, otherMap.horizontal],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '建立联系群',
                '协调整改',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731054',
              parentId: '85708563472731033',
              name: '拉线变动',
              level: 3,
              childList: [],
              fieldList: [...Owner],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '协调整改',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731134',
              parentId: '85708563472731033',
              name: '施工作业',
              level: 3,
              childList: [],
              fieldList: [...ConstructionWork],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '要求办理保护区作业申请',
                '签订安全协议书',
                '安全技术交底',
                '建立联系群',
                '装设警示标志',
                '装设防外破装置',
                '协调整改',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731135',
              parentId: '85708563472731033',
              name: '违章搭建', // 违章搭建or违章搭挂?
              level: 3,
              childList: [],
              fieldList: [...illegalBuild],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '建立联系群',
                '协调整改',
                '提报电力执法机构'
              ]
            }
          ]
        },
        {
          id: '85708563472731034',
          parentId: '85708563472731005',
          name: '通道（导线）',
          level: 2,
          childList: [
            {
              id: '85708563472731058',
              parentId: '85708563472731034',
              name: '烧荒炼荒',
              level: 3,
              childList: [],
              fieldList: [...Owner],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '建立联系群',
                '协调整改',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731062',
              parentId: '85708563472731034',
              name: '三线搭挂',
              level: 3,
              childList: [],
              fieldList: [...Owner],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '建立联系群',
                '协调整改',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731063',
              parentId: '85708563472731034',
              name: '超高树竹',
              level: 3,
              childList: [],
              fieldList: [...Owner],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '协调整改',
                '签订青赔协议',
                '砍伐修剪',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731064',
              parentId: '85708563472731034',
              name: '违章搭建',
              level: 3,
              childList: [],
              fieldList: [...illegalBuild],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '建立联系群',
                '协调整改',
                '提报“两违办”',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731065',
              parentId: '85708563472731034',
              name: '爆破作业',
              level: 3,
              childList: [],
              fieldList: [
                ...Owner,
                otherMap.horizontal,
                ...Construction,
                otherMap.licenses
              ],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '要求办理保护区爆破作业申请',
                '签订安全协议书',
                '安全技术交底',
                '建立联系群',
                '爆破现场监护',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731069',
              parentId: '85708563472731034',
              name: '易飘浮物',
              level: 3,
              childList: [],
              fieldList: [...Owner, otherMap.horizontal],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '协调整改',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731070',
              parentId: '85708563472731034',
              name: '易燃易爆物',
              level: 3,
              childList: [],
              fieldList: [...Owner, otherMap.horizontal],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '协调整改',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731140',
              parentId: '85708563472731034',
              name: '施工作业',
              level: 3,
              type: 1,
              childList: [],
              fieldList: [...ConstructionWork],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '要求办理保护区作业申请',
                '签订安全协议书',
                '安全技术交底',
                '建立联系群',
                '装设警示标志',
                '装设防外破装置',
                '协调整改',
                '提报电力执法机构'
              ]
            }
          ]
        },
        {
          id: '85708563472731035',
          parentId: '85708563472731005',
          name: '变压器',
          level: 2,
          childList: [
            {
              id: '85708563472731072',
              parentId: '85708563472731035',
              name: '超高树竹',
              level: 3,
              childList: [],
              fieldList: [...TreeRelate],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '协调整改',
                '签订青赔协议',
                '砍伐修剪',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731073',
              parentId: '85708563472731035',
              name: '违章搭建',
              level: 3,
              childList: [],
              fieldList: [...illegalBuild],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '建立联系群',
                '协调整改',
                '提报“两违办”',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731074',
              parentId: '85708563472731035',
              name: '易飘浮物',
              level: 3,
              childList: [],
              fieldList: [...Owner, otherMap.horizontal],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '协调整改',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731075',
              parentId: '85708563472731035',
              name: '爆破作业',
              level: 3,
              childList: [],
              fieldList: [...Owner, otherMap.horizontal],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '要求办理保护区爆破作业申请',
                '签订安全协议书',
                '安全技术交底',
                '建立联系群',
                '爆破现场监护',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731077',
              parentId: '85708563472731035',
              name: '设备偷盗',
              level: 3,
              childList: [],
              fieldList: [...Owner],
              dealSituation: [
                '公安机关报案',
                '固定证据后及时修复',
                '装设警示与宣传标语',
                '提报电力执法机构'
              ],
              dealWorkbench: ['现场核查情况', '移送公安机关']
            },
            {
              id: '85708563472731080',
              parentId: '85708563472731035',
              name: '违章搭挂',
              level: 3,
              childList: [],
              fieldList: [...Owner],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '建立联系群',
                '协调整改',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731141',
              parentId: '85708563472731035',
              name: '施工作业',
              level: 3,
              type: 1,
              childList: [],
              fieldList: [...ConstructionWork],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '要求办理保护区作业申请',
                '签订安全协议书',
                '安全技术交底',
                '建立联系群',
                '装设警示标志',
                '装设防外破装置',
                '协调整改',
                '提报电力执法机构'
              ]
            }
          ]
        },
        {
          id: '85708563472731036',
          parentId: '85708563472731005',
          name: '通道（电缆）',
          level: 2,
          childList: [
            {
              id: '85708563472731086',
              parentId: '85708563472731036',
              name: '违章搭建',
              level: 3,
              childList: [],
              fieldList: [...illegalBuild],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '建立联系群',
                '协调整改',
                '提报“两违办”',
                '提报电力执法机构'
              ]
            },
            {
              id: '85708563472731142',
              parentId: '85708563472731036',
              name: '施工作业',
              level: 3,
              type: 1,
              childList: [],
              fieldList: [...ConstructionWork],

              dealSituation: [
                '查找责任人',
                '签发安全隐患告知书',
                '要求办理保护区作业申请',
                '签订安全协议书',
                '安全技术交底',
                '建立联系群',
                '装设警示标志',
                '装设防外破装置',
                '协调整改',
                '提报电力执法机构'
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
