<template>
  <div class="w-full select-input" @click="showDialog">
    <SelectDataList :data-source="selectData" :disabled="disabled" :key-props="keyProps" @deleteItem="handleDeleteItem">
    </SelectDataList>
    <!--    <span v-for="(item, index) in selectData" :key="index">{{ item[keyProps.labelKey] }}</span>-->
  </div>
  <van-popup v-model:show="dialogVisible" position="right" style="width:90vw; height: 100vh">
    <van-nav-bar :title="modalProps.title">
      <template #right>
        <MySearchNew v-model="searchData" :formProps="searchFormProps" :orgSearch="true" @onSearch="onSearch">
        </MySearchNew>
      </template>
    </van-nav-bar>
    <div class="search-input">
      <van-search v-model="searchData[firstSearchKey]" placeholder="请输入搜索关键词"
                  @update:model-value="onKeywordSearch"/>
    </div>
    <div class="options">
      <PullRefreshLoadMore v-model:isEnd="isEnd" v-model:page-no="pageNo" :loading="loading" :openRefresh="true"
                           :pageSize="pageSize" :total="total">
        <van-checkbox-group ref="checkboxGroupRef" v-model="selectIds">
          <van-cell-group inset>
            <van-cell v-for="(item, index) in tableData" :key="item[keyProps.valueKey]" clickable
                      @click.stop="onCheck(item)">
              <template #title>
                <p>{{ item.name }}</p>
              </template>
              <template #right-icon>
                <van-checkbox :ref="el => checkboxRefs[item[keyProps.valueKey]] = el" :disabled="!multiple"
                              :name="item[keyProps.valueKey]"/>
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </PullRefreshLoadMore>
    </div>
    <div v-show="multiple" class="btn-box w-full">
      <van-button class="mr-5px" size="large" type="default" @click="onReset">重置</van-button>
      <van-button size="large" type="primary" @click="onSelect">确认</van-button>
    </div>
  </van-popup>
</template>

<script lang="ts" setup>
import MySearchNew from '@/components/search';
import PullRefreshLoadMore from '@/components/PullRefreshLoadMore'
import SelectDataList from './components/SelectDataList.vue'
import {formTableSelectProps} from './props';
import type {TableProps} from './typing';
import {useDialogNew, useFormNew, useMessage, usePage, useSearch} from "@/composables";
import {ValueKey} from "@/components/formBuild/components/FormTableSelectModal/src/typing";
/* props */
const props = defineProps(formTableSelectProps);

/* emits */
const emits = defineEmits<{
  (e: "update:modelValue", value: any): void;
  (e: "update:selectedData", value: any): void;
}>();

/* hook */
const {isDisabled, getOptions, isReadonly, isRequired, setFormConfig} =
    useFormNew(props.formConfig);
const {
  dialogVisible,
  openDialog,
  closeDialog,
  dialogConfig,
  dialogData,
  dialogLoading,
  setDialogConfig
} = useDialogNew();
const {pageNo, pageSize, showIndex, loading, searchData, onReset, onSearch} =
    useSearch(loadData);
const {sizes, total, pageLayout} = usePage();
const {handleResponse, handleDeleteConfirm} = useMessage();

/* data */
const tableData = ref([]);
const selectIds = ref<any>([]);
const selectData = ref<any[]>([]);
const checkboxRefs = ref([]);
const checkboxGroupRef = ref()
const isEnd = ref(false)
const keyword = ref('')
/* computed */
const prop = computed(() => props.itemProp)
const tableProps = computed(() => props.searchTableProps?.tableProps as TableProps);
const modalProps = computed(() => props.modalProps || {});
const firstSearchKey = computed(() => props.searchTableProps?.searchProps?.formProps[0].name);
const searchFormProps = computed(() => props.searchTableProps?.searchProps?.formProps);
const keyProps = computed(() => {
  return props.keyProps;
});
const _modelValue = computed(() => {
  if (typeof props.modelValue === 'string') {
    return props.modelValue.split(',')
  }
  console.log(props.modelValue);
  return props.modelValue || []
})

/* watch */
watch(_modelValue, val => {
  selectIds.value = val;
  initSelectData()
}, {immediate: true})

/* methods */
const showDialog = () => {
  if (props.disabled) return
  openDialog('add')
}

async function loadData() {
  isEnd.value = false
  const params = {
    page: pageNo.value,
    size: pageSize.value,
    ...tableProps.value?.apiParams,
    ...searchData.value
  };
  loading.value = true;
  const {code, message, data} = await tableProps.value.apiFn(params);
  loading.value = false;
  if (!data.rows.length) {
    isEnd.value = true;
    return
  }
  if (!handleResponse({code, message})) return;
  total.value = +data.total;
  if (tableProps.value?.apiCbFn) {
    if (pageNo.value === 1) {
      tableData.value = tableProps.value?.apiCbFn(data.rows ? data.rows : data);
      return
    }
    tableData.value.push(...tableProps.value?.apiCbFn(data.rows ? data.rows : data));
    return;
  }

  if (pageNo.value === 1) {
    tableData.value = data.rows;
    return
  }
  tableData.value.push(...data.rows)
}

async function initSelectData() {
  selectData.value = [];
  if (!props.defaultValueLoad) return;
  selectData.value = await props.defaultValueLoad(selectIds.value);
  await nextTick();
}


const onSelect = () => {
  emits('update:modelValue', selectIds.value.join(','))
  closeDialog()
}

const onCheck = (option) => {
  if (props.multiple) {
    if (!selectData.value.some(item => item[keyProps.value.valueKey] === option[keyProps.value.valueKey])) {
      selectData.value.push(option)
    }
  } else {
    checkboxGroupRef.value.toggleAll(false)
    selectIds.value = []
    selectData.value = [option];
    emits('update:modelValue', option[keyProps.value.valueKey])
    closeDialog()
  }
  setTimeout(() => {
    checkboxRefs.value[option[keyProps.value.valueKey]].toggle(true);
  }, 50)
};

const handleDeleteItem = (value: ValueKey) => {
  selectIds.value = selectIds.value.filter((item: ValueKey) => item !== value);
  selectData.value = selectData.value.filter(
      (item: any) => item[keyProps.value.valueKey] !== value
  );
  console.log(selectData);
  emits('update:modelValue', selectIds.value.join(','))
};

const onKeywordSearch = () => {
  pageNo.value = 1;
  isEnd.value = true
  loadData()
}

onBeforeUpdate(() => {
  checkboxRefs.value = [];
});

onMounted(() => {
  // console.log(props);
  pageSize.value = 20;
  // loadData();
});
</script>

<style lang="less" scoped>
.popup {
  height: 70vh;
}

.select-input {
  min-height: 24px;
}

.options {
  height: calc(100vh - 100px);
  //overflow-y: hidden;
  overflow-y: auto;
}

.btn-box {
  position: fixed;
  bottom: 0;
  padding: 5px 0;
  display: flex;
  justify-content: center;

  button {
    width: 47%;
    //margin: 5px;
  }
}

.search-input {
  :deep(.van-field__label--top) {
    width: 10px;
  }
}
</style>
