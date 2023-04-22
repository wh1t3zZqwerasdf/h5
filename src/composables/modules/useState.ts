export function useState() {
  const loading = ref(false);
  const finished = ref(false);
  const error = ref(false);

  // const refreshing = ref(false);

  watch(loading, val => {
    if (val) {
      finished.value = false;
      error.value = false;
      // refreshing.value = false;
    }
  });

  watch(finished, val => {
    if (val) {
      loading.value = false;
      error.value = false;
    }
  });

  watch(error, val => {
    if (val) {
      loading.value = false;
      finished.value = false;
    }
  });

  function resetState() {
    loading.value = false;
    finished.value = false;
    error.value = false;
    // refreshing.value = false;
  }

  return {
    loading,
    finished,
    error,
    // refreshing,
    resetState
  };
}
