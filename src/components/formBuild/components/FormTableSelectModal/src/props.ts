import { PropType } from 'vue';
import { FormConfigType, FormPropType } from '@/types';
// import type { TreeProps } from '@/components/tree/src/typing';
// import type { SearchTableProps } from '@/components/searchTable/src/typing';
import type { KeyProps, ModalProps } from './typing';

export const formTableSelectProps = {
  modelValue: {
    type: String,
    default: ''
  },
  itemProp: {
    type: Object as PropType<FormPropType>
  },
  formConfig: {
    type: Object as PropType<FormConfigType>
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  formData: {
    type: Object as PropType<any>,
    default: () => {}
  },
  treeProps: {
    // type: Object as PropType<TreeProps>
  },
  searchTableProps: {
    // type: Object as PropType<SearchTableProps>,
    required: true
  },
  defaultValueLoad: {
    type: Function,
    required: true
  },
  placeholder: {
    type: String as PropType<string>
  },
  multiple: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  modalProps: {
    type: Object as PropType<ModalProps>,
    default: () => {
      return {
        width: '80%',
        dialogBodyStyle: {
          height: '600px'
        }
      };
    }
  },
  keyProps: {
    type: Object as PropType<KeyProps>,
    default: () => {
      return {
        valueKey: 'id',
        labelKey: 'name'
      };
    }
  },
  // 选择器类型select | table
  viewType: {
    type: String as PropType<'select' | 'table'>,
    default: 'select'
  },
  // 选择器组件绑定参数
  viewComponentProps: {
    type: Object as PropType<{ [key: string]: any }>
  }
};

export const formTableSelectModalProps = {
  selectedDataIds: {
    type: Array as PropType<any[]>
  },
  selectedData: {
    type: Array as PropType<any[]>
  },
  modelValue: {
    type: Array as PropType<any[]>
  },
  itemProp: {
    type: Object as PropType<FormPropType>
  },
  formConfig: {
    type: Object as PropType<FormConfigType>
  },
  treeProps: {
    // type: Object as PropType<TreeProps>
  },
  searchTableProps: {
    // type: Object as PropType<SearchTableProps>,
    required: true
  },
  defaultValueLoad: {
    type: Function,
    required: true
  },
  placeholder: {
    type: String as PropType<string>
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  formData: {
    type: Object as PropType<any>,
    default: () => {}
  },
  multiple: {
    type: Boolean as PropType<boolean>,
    required: true
  },
  modalProps: {
    type: Object as PropType<ModalProps>,
    default: () => {
      return {
        width: '80%',
        dialogBodyStyle: {
          height: '600px'
        }
      };
    }
  },
  keyProps: {
    type: Object as PropType<KeyProps>,
    default: () => {
      return {
        valueKey: 'id',
        labelKey: 'name'
      };
    }
  },
  viewComponentProps: {
    type: Object as PropType<{ [key: string]: any }>
  },
  // 选择器类型select | table
  viewType: {
    type: String as PropType<'select' | 'table'>,
    default: 'select'
  }
};

export const SelectDataProps = {
  dataSource: {
    type: Array as PropType<any[]>
  },
  keyProps: {
    type: Object as PropType<KeyProps>,
    default: () => {
      return {
        valueKey: 'id',
        labelKey: 'name'
      };
    }
  }
};
