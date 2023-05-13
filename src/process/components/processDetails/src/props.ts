import { PropType } from 'vue';
import { FormPropGroupType } from '@/types';
import { IHookFnMap, IBusinessInfo } from '@/process/types';

export const processDetailsProps = {
  // 每个流程节点表单的map
  processPropsMap: {
    type: Object as PropType<{ [key: string]: FormPropGroupType[] }>,
    required: true
  },
  // 业务接口方法(返回业务对象，并且必须包含流程id字段和业务id字段)
  businessInfoApiFn: {
    type: Function as PropType<() => Promise<IBusinessInfo | undefined>>,
    required: true
  },
  hookFnMap: {
    type: Object as PropType<IHookFnMap>
  },
  savePermission: {
    type: Boolean
  }
} as const;