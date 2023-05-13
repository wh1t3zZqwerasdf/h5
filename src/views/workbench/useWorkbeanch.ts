export function useWorkbench() {
    const routerPushArray = {
        HIDDEN_TROUBLE_EVENT: "WorkDetailTrouble",
        EXTERNAL_DAMAGE_CASE:   'WorkDetailBreak'
    }
    const workbenchTypeArr = [
        {
            label: '举报管理流程',
            value: 'REPORT'
        },
        {
            label: '隐患管理流程',
            value: 'HIDDEN_TROUBLE_EVENT'
        },
        {
            label: '外破管理流程',
            value: 'EXTERNAL_DAMAGE_CASE'
        },
        {
            label: '新闻审核流程',
            value: 'NEWS_ADD_FLOW,NEWS_RECOMMEND_SECPART_FLOW,NEWS_SET_HEAD_FLOW,NEWS_SET_TOP_FLOW,NEWS_COLLECT_FLOW,NEWS_RECOMMEND_FLOW,NEWS_ALTER_FLOW'
        },
        {
            label: '普法素材管理流程',
            value: 'MATERIAL_NEW_REVIEW'
        },
        {
            label: '保护区划定批复审核',
            value: 'PROTECTION_DELIMIT_APPLY'
        },
        {
            label: '保护区划定公告流程',
            value: 'PROTECTION_NOTICE'
        },
        {
            label: '保护区划定标识流程',
            value: 'PROTECTION_MARK'
        },
        {
            label: '保护区抽检管理',
            value: 'PROTECTION_INSPECTION'
        },
        {
            label: '保护区抽检任务管理',
            value: 'PROTECTION_CHECK_TASK'
        },
        {
            label: '咨询流程',
            value: 'INTERACT_MASSES'
        },
        {
            label: '工作会议流程',
            value: 'MEETING'
        },
        {
            label: '工作会议回执',
            value: 'MEETING_RECEIPT'
        },
        {
            label: '工作纪要流程',
            value: 'MEETING_MATERIALS'
        },
        {
            label: '保护区制定整改清单',
            value: 'RECTIFICATION_LIBRARY_PROTECT2'
        },
        {
            label: '保护区整改通知审批',
            value: 'RECTIFICATION_LIBRARY_PROTECT'
        },
        {
            label: '保护区产权人整改任务',
            value: 'RECTIFICATION_LIST_PROTECT'
        },
        {
            label: '保护区整改清单复检',
            value: 'RECTIFICATION_INVENTORY_PROTECT2'
        },
        {
            label: '调研检查通知审批',
            value: 'WORK_SURVEY'
        },
        {
            label: '调研检查执行任务',
            value: 'WORK_TASK_GO'
        },
        {
            label: '调研检查汇总审批',
            value: 'WORK_SURVEY_SUMMARY'
        }
    ]

    return {
        routerPushArray,
        workbenchTypeArr
    }

}
