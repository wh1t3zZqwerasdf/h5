<script lang="ts" setup>
import { useEventBus, useFormHandler, useFormNew } from '@/composables';
import type { FormConfigType, FormPropGroupType } from '@/types';
import type { FormInstance } from 'vant';
import FormItem from './FormItem.vue'

const props = defineProps({
  // 双向绑定数据
  modelValue: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  },
  /* 表单属性group */
  formPropsGroup: {
    type: Array as PropType<FormPropGroupType[]>,
    required: true
  },
  /* 表单配置 */
  formConfig: {
    type: Object as PropType<FormConfigType>
  },
  scrollTab: {
    type: Boolean as PropType<boolean>,
    default: false
  }
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();

const formData = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});
const eventBus = useEventBus();
const { handlePropsGroupFilter, validateForm } = useFormNew();

const formRef = ref<FormInstance>();
const activeStep = ref(0);
const asyncSign = ref(false)
const formVerifyRes = reactive<boolean[]>([]);

const {
  // formData,
  clearValidate
} = useFormHandler();

/* ========== 表单配置 ========== */
/**
 * op 会覆盖 formConfig 中的 disabled
 * 并不会
 */
const config = computed<FormConfigType>(() => {
  const _config = Object.assign(
    {
      inline: false,
      labelWidth: '124px',
      disabled: false,
      isPreview: false
    },
    props.formConfig
  );

  // return _config;
  // 如果 view 操作，表单不可编辑
  const _disabled = _config.op ? ['view'].includes(_config.op) : false;

  return Object.assign(_config, {
    disabled: _disabled
  });
});

function clearValidForm(name?: string) {
  clearValidate(formRef?.value, name);
}

/* propsGroup */
const filterPropsGroupList = computed(() => {
  return handlePropsGroupFilter(
    props.formPropsGroup,
    formData.value,
    props.formConfig
  );
});

const getFormRef = () => {
  return formRef;
};

const onSubmit = async () => {
  const valid = await validateForm(formRef?.value);
  eventBus.emit('FORM_SUBMIT');
  return await new Promise((resolve, reject) => {
    if (!valid) return reject(false);
    // TODO暂用定时器解决
    setTimeout(() => {
      const result = formVerifyRes.every(item => item);
      console.log(result);
      formVerifyRes.length = 0;
      resolve(result);
    }, 200);
  });
};

// tab点击跳转
const groupItemJump = (index: number) => {
  activeStep.value = index;
  asyncSign.value = true;
  setTimeout(() => {
    asyncSign.value = false;
  }, 1000)
  const items = document.querySelectorAll(".form-group-box");
  for (let i = 0; i < items.length; i++) {
    if (index === i) {
      items[i].scrollIntoView({
        block: "start",//默认跳转到顶部
        behavior: "smooth"//滚动的速度
      });
    }
  }
}

// tab滚动监听
const onScroll = (e: any) => {
  // console.log(asyncSign.value);
  if (asyncSign.value) return
  let scrollItems = document.querySelectorAll(".form-group-box") as unknown as HTMLElement[];
  for (let i = scrollItems.length - 1; i >= 0; i--) {
    // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
    let judge =
      e.target.scrollTop >
      scrollItems[i].offsetTop - scrollItems[0].offsetTop;
    if (judge) {
      activeStep.value = i;
      break;
    }
  }
}


onMounted(() => {
  eventBus.on('CHILDREN_FORM_SUBMIT', (res: boolean) => {
    formVerifyRes.push(res);
  });
});

defineExpose({ onSubmit, getFormRef, clearValidForm });
</script>

<template>
  <van-form ref="formRef" :class="config.op === 'view' && config.isPreview && config.disabled
    ? 'form-preview'
    : ''
    " :disabled="config.disabled" :inline="config.inline" :label-align="config.inline ? 'right' : 'top'"
    :model="formData" :scroll-to-error="true" class="form-box" scroll-to-error>
    <slot name="formHeader"></slot>
    <div class="form-content form-body flex">
      <template v-if="scrollTab">
        <div class="tabs">
          <template v-for="(item, index) in filterPropsGroupList" :key="index">
            <div v-if="item.title && item.group && item.group.length" :class="{ 'active': activeStep === index }"
              class="tab" @click="groupItemJump(index)">
              {{ item.title }}
            </div>
          </template>
        </div>
        <div class="scroll-box" @scroll="onScroll">
          <template v-for="(list, index) in filterPropsGroupList" :key="index">
            <div v-if="list.group && list.group.length" class="my-form-group content-dialog form-group-box">
              <van-cell-group :title="list.title" inset>
                <van-row :gutter="20" class="form-row">
                  <FormItem v-for="prop in list.group" :key="prop.name" v-model="formData"
                    :complexData="props.complexData" :formConfig="config" :formRef="formRef" :itemProp="prop"></FormItem>
                </van-row>
              </van-cell-group>
            </div>
          </template>
        </div>
      </template>
      <template v-else>
        <div class="scroll-box">
          <div v-for="(list, index) in filterPropsGroupList" :key="index"
            class="my-form-group content-dialog form-group-box">
            <van-cell-group :title="list.title" inset>
              <van-row :gutter="20" class="form-row">
                <FormItem v-for="prop in list.group" :key="prop.name" v-model="formData" :complexData="props.complexData"
                  :formConfig="config" :formRef="formRef" :itemProp="prop"></FormItem>
              </van-row>
            </van-cell-group>
          </div>
        </div>
      </template>
      <slot name="container"></slot>
    </div>

    <slot :formRef="formRef" name="formFooter"></slot>
  </van-form>
</template>
<style lang="less" scoped>
.form-box {

  :deep(.van-cell-group) {
    margin: 0;
  }

  .form-body {
    overflow-y: hidden;
    height: calc(100vh - 110px);
  }

  .scroll-box {
    flex: 1;
    height: 100%;
    overflow-y: auto;
  }

  .active {
    background: var(--hy-primary-color);
    color: #fff;
  }

  .tabs {
    width: 80px;
    background: #fff;
    border-right: 1px solid var(--hy-border-color);

    .tab {
      width: 100%;
      padding: 5px;
      font-size: var(--hy-xs-text-size);
    }
  }
}
</style>
