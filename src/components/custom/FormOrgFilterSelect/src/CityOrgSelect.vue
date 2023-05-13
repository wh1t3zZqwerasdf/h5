<template>
  <!--  <el-select-->
  <!--      v-model="_scopeData"-->
  <!--      :disabled="disabled"-->
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
const {defaultOptions, loadOptionData, isCityDepartment} = useOrgSelect();
const authStore = useAuthStore();
/* data */
const reactiveData: { options: IOptions[] } = reactive({
  options: []
});
/* computed */
const _props = computed(() => props);
const _formConfig = computed(() => props.formConfig);
const _scopeData = computed({
  get: () => {
    return props.modelValue;
  },
  set: val => {
    emit('update:modelValue', val);
  }
});

const _options = computed(() => {
  // 市级本部
  if (isCityDepartment()) return [...reactiveData.options];

  return [...defaultOptions, ...reactiveData.options];
});
const _userOrg = computed(() => {
  return authStore.userOrg;
});

watch(_scopeData, val => {
  // 市级本部处理
  setTimeout(() => {
    if (!val && isCityDepartment())
      _scopeData.value = _userOrg.value?.parentId || '';
  }, 50);
});

/* methods */

// function verify

async function handleSelectApi(val = true) {
  if (!val) return;
  const {type, id, parentId} = _userOrg.value || {};
  // 本部
  if (isCityDepartment()) {
    const currOrgData = authStore.userOrg;
    reactiveData.options = [
      {
        value: currOrgData?.parentId as string,
        label: currOrgData?.name as string
      }
    ];
    return;
  }

  const orgId = type === 1 ? parentId : id;

  const params = {
    id: orgId || ''
  };
  const responseData = await loadOptionData(params);

  reactiveData.options = responseData.map(item => ({
    label: item.name,
    value: item.id
    // value: item.type === 1 ? item.parentId : item.id
  }));
}

onMounted(() => {
  if (isCityDepartment()) _scopeData.value = _userOrg.value?.parentId || '';

  handleSelectApi();
});
</script>

<style lang="scss" scoped></style>
