import type {FormPropType} from '@/types';
import {TablePropType} from '@/types';

export type KeyProps = {
    valueKey: string;
    labelKey: string;
};

export type ModalProps = {
    width?: string;
    title?: string;
    dialogBodyStyle?: { [key: string]: any };
};

export type ValueKey = string | number;


export interface SearchProps {
    // 搜索条件表单配置项
    formProps: FormPropType[];
    display?: Boolean;
    componentsProps?: { [key: string]: any };
}

export type TableProps = {
    // 数据列表标题
    title?: string;
    // 搜索条件表单配置项
    columns: TablePropType[];
    // 加载数据函数
    apiFn: (params?: any) => any; // Promise<ApiResponse<T>>;
    // 接口条件参数
    apiParams?: { [key: string]: any } | any;
    // 接口默认条件参数（不会被清空）
    defaultParams?: { [key: string]: any } | any;
    // 接口数据处理回调
    apiCbFn?: (data?: any) => any;
    // 列表操作插槽（传入组件实例）
    actionSlot?: any;
};

export type SearchTableProps = {
    searchProps: SearchProps;
    tableProps: TableProps;
};
