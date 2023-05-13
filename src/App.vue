<script lang="ts" setup>
import {getUserInfo} from "@/utils/AppJs";
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
  console.log('app');
  getUserInfo();
  init()
  console.log('appvue', localStorage.getItem('token'));
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
