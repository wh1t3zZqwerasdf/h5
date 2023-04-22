<!-- 同一部门的用户列表 -->
<template>
  <van-popup
    v-model:show="isShow"
    position="bottom"
    class="popup"
    round
    @close="onCancel"
  >
    <van-picker
      :columns="data"
      :default-index="0"
      :columns-field-names="customFieldName"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </van-popup>
</template>

<script lang="ts" setup>
import { Toast } from "vant";
import { ref, watch } from "vue";
import Api from "../../http/Api";
import { ApiResponse } from "../../http/request";
const customFieldName = {
  text: "name",
  values: "id",
  children: "childList"
};
const props = defineProps({
  show: Boolean
});
const emit = defineEmits(["onConfirm", "onCancel"]);
let isShow = ref(false);
// const show = computed(() => {
//   isShow = false;
//   if (props.show === true) {
//     isShow = true;
//   }
//   return isShow;
// });

watch(
  props,
  (newValue, oldValue) => {
    isShow.value = newValue.show;
  },
  { immediate: true, deep: true }
);

const data = ref<Array<any>>([]);
Api.getSystemUsersGetThis(function (res: ApiResponse<[]>) {
  if (res.success) {
    console.log("获取到用户信息", res.data);
    for (let i = 0; i < res.data.length; i++) {
      const element: any = res.data[i];
      data.value.push({
        id: element.id,
        name: element.name,
        childList: null
      });
    }
    // data.value = res.data;
  }
});

function onConfirm(currentValue: any) {
  // console.log(currentValue);
  // Toast(currentValue);
  emit("onConfirm", currentValue);
  isShow.value = false;
  emit("onCancel", isShow.value);
}
function onCancel() {
  isShow.value = false;
  emit("onCancel", isShow.value);
}
</script>
