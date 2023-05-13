import type {FormPropType, TablePropType} from '@/types';
import {useSystemStore} from '@/store';
import {useFormProps} from "@/components/formBuild/composables";
import api from '@/api';

export function troubleList() {
    const systemStore = useSystemStore();
    const {tableSelectProps} = useFormProps()
    const tableProps = reactive<TablePropType[]>([
        {
            name: 'submitOrg',
            label: '提报单位',
        },
        {
            name: 'name',
            label: '线路名称',
        },
        {
            name: 'hiddenTroubleTypeName',
            label: '隐患类型',
        },
        {
            name: 'discoverDate',
            label: '发现时间',
        },
    ]);

    const searchProps = reactive<FormPropType[]>([
        {
            name: 'name',
            label: '线路名称',
            type: 'select',
            // customComponent: markRaw(FormTableSelectModal),
            // customProps: tableSelectProps,
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
            rules: [{required: true}],
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
    ]);


    return {
        tableProps,
        searchProps
    };
}
