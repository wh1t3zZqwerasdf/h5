import { PropType } from 'vue';

import { FormConfigType, FormPropType } from '@/types';

export const TroubleBrokenCheckFormProps = {
  modelValue: {
    type: Object as PropType<any>,
    default: () => {
      return {};
    }
  },
  formModalProps: {
    type: Object as PropType<FormPropType[]>,
    required: true
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  itemProp: {
    type: Object as PropType<FormPropType>
  },
  formConfig: {
    type: Object as PropType<FormConfigType>
  },
  formData: {
    type: Object as PropType<any>
  },
  parentId: {
    type: String as PropType<string>,
    required: true
  },
  roleType: {
    type: Number as PropType<number>,
    default: 2
  }
} as const;
