import { usePage } from './usePage';
import { useState } from './useState';

export function useSearch(apiFn: any /* Function */) {
  const { pageNo, pageSize, showIndex } = usePage(apiFn);
  const { loading } = useState();

  const searchData = ref<any>({});

  const isReset = ref(false);

  function setSearchData(data: any) {
    searchData.value = data;
    if (isReset.value) {
      isReset.value = false;
      onSearch();
    }
  }

  function onReset() {
    searchData.value = {};
    // TODO 重置保留默认值加的定时器
    setTimeout(() => {
      apiFn();
    }, 100);
  }

  function onSearch() {
    pageNo.value = 1;
    apiFn();
  }

  return {
    pageNo,
    pageSize,
    showIndex,
    loading,
    searchData,
    isReset, // TAG: deprecated
    setSearchData, // TAG: deprecated
    onReset,
    onSearch
  };
}
