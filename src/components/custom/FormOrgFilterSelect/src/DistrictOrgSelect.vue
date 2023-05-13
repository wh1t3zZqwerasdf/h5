<template>
  <!--  <el-select-->
  <!--      v-model="_scopeData"-->
  <!--      :disabled="disabled"-->
  <!--      :loading="reactiveData.loading"-->
  <!--      filterable-->
  <!--      placeholder="请选择"-->
  <!--      remote-->
  <!--      @visible-change="handleSelectApi"-->
  <!--  >-->
  <!--    <el-option-->
  <!--        v-for="option in _options"-->
  <!--        :key="option.value"-->
  <!--        :label="option.label"-->
  <!--        :value="option.value"-->
  <!--    />-->
  <!--  </el-select>-->
  <TagSelect v-model="_scopeData" :disabled="disabled" :mult="false" :options="_options"></TagSelect>
</template>

<script lang="ts" setup>
import TagSelect from "@/components/formBuild/components/FormTagSelect/TagSelect.vue";
import {orgFilterSelectProps} from './props';
import {useMessage} from '@/composables';
import {useOrgSelect} from '@/components/custom/FormOrgFilterSelect/src/composables/useOrgSelect';
import {useAuthStore} from '@/store';

const props = defineProps(orgFilterSelectProps);
const emit = defineEmits(['update:modelValue']);

interface IOptions {
  label: string;
  value: string | number;
}

/* hook */
const {handleResponse} = useMessage();
const {defaultOptions, loadOptionData, isDistrict} = useOrgSelect();
const authStore = useAuthStore();
/* data */
const reactiveData: { options: IOptions[]; cityId: string; loading: boolean } =
    reactive({
      options: [],
      loading: false,
      cityId: ''
    });
/* computed */
const _props = computed(() => props);
const _formConfig = computed(() => props.formConfig);
const _watchFieldsValue = computed(() => props.formData['city']) || '';
const _scopeData = computed({
  get: () => {
    return props.modelValue;
  },
  set: val => {
    emit('update:modelValue', val);
  }
});
const _userOrg = computed(() => {
  return authStore.userOrg;
});

const _options = computed(() => {
  // 县级自己
  if (isDistrict()) return [...reactiveData.options];

  return [...defaultOptions, ...reactiveData.options];
});

/* watch */
watch(
    _watchFieldsValue,
    val => {
      reactiveData.cityId = val;
      _scopeData.value = '';
      handleSelectApi();
    },
    {deep: true}
);

watch(_scopeData, val => {
  // 县级自己重置处理
  setTimeout(() => {
    if (!val && isDistrict()) _scopeData.value = _userOrg.value?.id || '';
  }, 50);
});

/* methods */
async function handleSelectApi(val = true) {
  if (!val) return;
  reactiveData.loading = true;

  // 县级自己
  if (isDistrict()) {
    reactiveData.options = [
      {
        value: _userOrg.value?.id as string,
        label: _userOrg.value?.name as string
      }
    ];
    reactiveData.loading = false;
    return;
  }

  const orgId = reactiveData.cityId;
  if (!orgId) {
    reactiveData.options = [];
    reactiveData.loading = false;
    return;
  }
  const params = {
    id: orgId || ''
  };
  const responseData = await loadOptionData(params);

  reactiveData.options = responseData.map(item => ({
    label: item.name,
    value: item.id
  }));
  reactiveData.loading = false;
}

onMounted(() => {
  if (isDistrict()) _scopeData.value = _userOrg.value?.id || '';

  handleSelectApi();
});
</script>

<style lang="scss" scoped></style>
