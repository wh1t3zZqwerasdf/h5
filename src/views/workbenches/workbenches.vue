<template>
  <div>
    <van-sticky>
      <van-nav-bar title="工作台" />
    </van-sticky>
  </div>
  <div class="word-center">
    <management></management>
    <meetings></meetings>
    <popularizeLaw></popularizeLaw>
    <protectionZone></protectionZone>
    <rectify></rectify>
    <foundation></foundation>
  </div>
</template>

<script lang="ts">
import management from './components/management.vue'
import meetings from './components/meetings.vue'
import popularizeLaw from './components/popularizeLaw.vue'
import protectionZone from './components/protectionZone.vue'
import rectify from './components/rectify.vue'
import foundation from './components/foundation.vue'
export default {
  components: {
    management,
    meetings,
    popularizeLaw,
    protectionZone,
    rectify,
    foundation
  }
}
</script>

<style>
.word-center {
  background-color: RGBA(243, 243, 243, 1);
  width: 100%;
  /* height: 1500px; */
  padding: 10px 0 0 0;
}
</style>