<script lang="ts" setup>
import AppJs from "@/utils/AppJs";
import {useSystemStore} from "@/store";

const systemStore = useSystemStore()

const init = () => {
  if (localStorage.getItem('token')) {
    systemStore.getDict()
  } else {
    setTimeout(() => {
      init()
    }, 1000)
  }
}

onMounted(() => {
  AppJs.getUserInfo();
  init()
  console.log(localStorage.getItem('token'));
});
</script>

<template>
  <div>
    <router-view/>
  </div>
</template>

<style scoped>
#app {
  text-align: left;
}
</style>
