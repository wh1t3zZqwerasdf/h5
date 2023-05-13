import { FormConfigType, FormPropType } from '@/types';
import { PropType } from 'vue';

export function useFormCustomComponents() {
  // 自定义组件默认props
  const defaultProps = {
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
      type: Object as PropType<any>,
      default: () => {
        return {};
      }
    }
  };

  return { defaultProps };
}
