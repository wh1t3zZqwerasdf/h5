export function usePage(
  apiFn?: any /* Function */,
  config?: {
    sizes?: number[];
    pageSize?: number;
  }
) {
  const sizes = ref([15, 30, 50, 100]);
  const pageNo = ref(1);
  const pageSize = ref(sizes.value[0]);
  const pageLayout = ref('total, sizes, ->, prev, pager, next, jumper');
  const workbenchPageLayout = ref('total, ->, prev, pager, next, jumper');
  const total = ref(0);

  if (config) {
    if (config.sizes) sizes.value = config.sizes;

    if (config.pageSize) {
      sizes.value.splice(0, 1, config.pageSize);
      pageSize.value = sizes.value[0];
    }
  }

  function showIndex(index: number) {
    return index + 1 + (pageNo.value - 1) * pageSize.value;
  }

  /* 改变每页条数 */
  function _handleSizeChange(val: number) {
    pageNo.value = 1;
    pageSize.value = val;

    if (apiFn) apiFn();
  }

  /* 改变页数 */
  function _handleCurrentChange(val: number) {
    pageNo.value = val;
    if (apiFn) apiFn();
  }

  watch(
    () => pageNo.value,
    val => {
      _handleCurrentChange(val);
    }
  );
  watch(
    () => pageSize.value,
    val => {
      _handleSizeChange(val);
    }
  );

  return {
    pageNo,
    pageSize,
    pageLayout,
    workbenchPageLayout,
    sizes,
    total,
    showIndex
  };
}
