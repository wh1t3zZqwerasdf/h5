import api from '@/api';
import { useMessage } from '@/composables';
import { useAuthStore } from '@/store';

export function useOrgSelect() {
  const { handleResponse } = useMessage();
  const authStore = useAuthStore();
  // 自定义组件默认props
  const defaultOptions = [
    {
      label: '全部',
      value: ''
    }
  ];

  // 本部门
  function isCityDepartment() {
    const { type, level } = authStore.userOrg || {};
    if (type === 1 && level === 3) return true;

    return false;
  }

  // 区县
  function isDistrict() {
    const { type, level } = authStore.userOrg || {};
    if (type !== 1 && level === 3) return true;

    return false;
  }

  async function loadOptionData(params: { id: string }) {
    const res = await api.org.orgTreeChildren(params);
    if (!handleResponse(res)) return [];
    return res.data;
  }

  return { defaultOptions, loadOptionData, isCityDepartment, isDistrict };
}
