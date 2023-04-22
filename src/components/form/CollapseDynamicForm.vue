<!-- 动态表单多表单复合页面，可折叠展开 -->
<template>
  <van-collapse
    v-model="activeNames"
    :accordion="accordion"
    @change="onCollapseChange"
    v-for="(collapseFormInfo, index) in collapseFormInfos"
  >
    <div>
      <van-collapse-item :title="collapseFormInfo.title" :name="index">
        <template #icon v-if="collapseFormInfo.iconShow">
          <div class="dynamic-form-collapse-icon">✓</div>
        </template>
        <DynamicFormNew
          :index="index"
          :formInfos="collapseFormInfo.formInfos"
          @onConfirm="onConfirm"
        >
          <template #customForm="data">
            <slot name="customForm" :formEntity="data.formEntity"></slot>
          </template>
        </DynamicFormNew>
      </van-collapse-item>
    </div>
  </van-collapse>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import DynamicFormNew from "./DynamicFormNew.vue";
import { useCollapseFormInfoStore } from "./DynamicFormStore";
const activeNames = ref<number | string | Array<number> | Array<string>>();
const collapseFormInfoStore = useCollapseFormInfoStore();
const { collapseFormInfos } = storeToRefs(collapseFormInfoStore);

const props = defineProps({
  accordion: Boolean
});
//是否开启手风琴模式
let accordion = props.accordion;
if (accordion) {
  activeNames.value = 0;
} else {
  activeNames.value = [0];
  accordion = false;
}
const emit = defineEmits(["onConfirm", "onCollapseChange"]);
function onConfirm(value: any) {
  emit("onConfirm", {
    formData: value.formData,
    currentValue: value.currentValue
  });
}

function onCollapseChange(
  activeNames: number | string | Array<number> | Array<string>
) {
  // console.log("onCollapseChange=====>", activeNames);
  emit("onCollapseChange", activeNames);
}
</script>

<style>
@import "./dynamicForm.css";
</style>
