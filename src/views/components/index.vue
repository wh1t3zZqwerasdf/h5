<template>
    <div class="bnt">
        <hyDetail :instanceId="'a47426ee67f745ff9e4cd0f1a89d15e0'" :processPropsMap="processPropsMap"/>
    </div>
</template>



  
<script lang="ts" setup>
import hyDetail from './hyDetail.vue'
import { useTrouble } from "@/views/workbenches/troubleWork/composables/useTrouble";

const {
  processPropsMap,
  loadFieldsData,
  checkValueList,
  setCheckFormFields,
  userTask1,
  businessData,
  customDetailsFormPropsHookFn
} = useTrouble();

</script>
  
<style lang="less" scoped>


</style>
  