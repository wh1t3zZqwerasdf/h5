import api from '@/api';
import type {TablePropType} from '@/types';
import {BooleanAndFn, FormPropType} from '@/types';
import {useAuthStore, useSystemStore} from '@/store';
import {arr2Obj} from '@/utils';
import {CityOrgSelect, DistrictOrgSelect} from '@/components/custom/FormOrgFilterSelect';

interface IPropsParams {
  name: string;
  label: string;
  defaultValue?: any;
  disabled?: any;
  layoutSpan?: number;
  required?: boolean;
  apiParams?: object;
  rootId?: string;
  display?: BooleanAndFn;
}

export function useFormProps() {
  const systemStore = useSystemStore();
  const authStore = useAuthStore();

  const getOrgFilterSelectProp = (): FormPropType[] => {
    const city: FormPropType = {
      name: 'city',
      label: '所在城市',
      type: 'custom',
      customComponent: markRaw(CityOrgSelect)
    };
    const district: FormPropType = {
      name: 'district',
      label: '所在区县',
      type: 'custom',
      customComponent: markRaw(DistrictOrgSelect)
    };
    if (authStore.userOrg?.level === 3 && authStore.userOrg?.type !== 1)
      return [district];

    return [city, district];
  };


  // 当前机构用户下拉选择
  const getCurrOrgUserSelect = (config: IPropsParams): FormPropType => {
    return {
      name: config.name,
      label: config.label,
      type: 'select-api',
      apiFn: api.users.usersGetCurrentUser,
      layoutProps: {
        span: config.layoutSpan ||24
      },
      defaultValue: () => {
        return config.defaultValue
            ? config.defaultValue
            : authStore.userInfo?.id;
      },

      disabled: config.disabled,
      required: config.required || false,
      rules: [{required: config.required || false}],
      options: [],
      apiProps: {
        value: 'id',
        label: 'name'
      },
      apiCbFn: (resData: any) => {
        return resData
            .filter((v: any) => v.status)
            .map((item: any) => {
              return {
                value: item.id,
                label: item.name
              };
            });
      }
    };
  };

  // 获取当前机构对应角色的用户下拉选择
  const getCurrOrgUserByRoleSelect = (config: IPropsParams): FormPropType => {
    return {
      name: config.name,
      label: config.label,
      type: 'select-multiple',
      mult: false,
      apiFn: api.users.getRoleUserListByOrg,
      apiParams: config.apiParams,
      layoutProps: {
        span: config.layoutSpan || 24
      },
      required: config.required || false,
      rules: [{required: config.required || false}],
      options: [],
      apiProps: {
        value: 'id',
        label: 'name'
      },
      apiCbFn: (resData: any) => {
        return resData
            .filter((v: any) => v.status)
            .map((item: any) => {
              return {
                value: item.id,
                label: item.name
              };
            });
      }
    };
  };


  const SelectTableProps = reactive<TablePropType[]>([
    {
      name: 'name',
      label: '线路名称',
      keyMap: arr2Obj(systemStore.dict.meeting_mode)
    },
    {
      name: 'specialty',
      label: '专业分类',
      keyMap: arr2Obj(systemStore.dict.specialty)
    },
    {
      name: 'voltageLevel',
      label: '电压等级',
      keyMap: arr2Obj(systemStore.dict.hidden_trouble_voltage)
    }
  ]);
  const getCircuitTypeTitle = () => {
    let type = '输电';
    if (authStore.userRoles?.includes('ROLE_PROPERTY_RIGHT_TRANSMISSION'))
      type = '输电';
    else if (authStore.userRoles?.includes('ROLE_PROPERTY_RIGHT_SUBSTATION'))
      type = '变电';
    else if (authStore.userRoles?.includes('ROLE_PROPERTY_RIGHT_DISTRIBUTING'))
      type = '配电';
    return `选择${type}线路`;
  };
  const tableSelectProps = {
    multiple: false,
    searchTableProps: {
      searchProps: {
        formProps: reactive<FormPropType[]>([
          {
            name: 'name',
            label: '线路名称',
            type: 'text',
            layoutProps: {
              span: 23
            }
          },
          {
            name: 'deviceType',
            label: '设备类型',
            type: 'select',
            options: (data, op) => {
              return systemStore.dict.protection_type;
            }
          },
          {
            name: 'propertyOrg',
            label: '运维单位',
            type: 'text'
          }
        ])
      },
      tableProps: {
        title: '数据列表',
        columns: SelectTableProps,
        apiFn: api.protect.facilityQueryList,
        apiParams: {
          roles: authStore.userRoles,
          district:
              authStore.userOrg?.id === '241457306124951552'
                  ? ''
                  : authStore.userOrg?.id
        }
      }
    },
    modalProps: {
      width: '60%',
      title: getCircuitTypeTitle()
    },
    defaultValueLoad: async (val: string) => {
      if (!val || !val.length) return;

      const {code, data} = await api.protect.facilityQueryInfo({
        id: val[0]
      });
      return [data];
    },
    keyProps: {
      valueKey: 'id',
      labelKey: 'name'
    }
  };
  return {
    getOrgFilterSelectProp,
    getCurrOrgUserSelect,
    getCurrOrgUserByRoleSelect,
    tableSelectProps
  };
}
