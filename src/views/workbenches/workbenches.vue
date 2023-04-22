<template>
  <div>
    <div class="work-title">
      <span>工作台</span>
    </div>
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

<script>
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
.work-title {
  width: 100%;
  margin-top: 40px;
  margin-bottom: 14px;
}

.work-title span {
  width: 54px;
  height: 18px;
  font-size: 18px;
  font-family: 微软雅黑;
  font-weight: 400;
  color: #000000;
  line-height: 27px;
}

.word-center {
  background-color: RGBA(243, 243, 243, 1);
  width: 100%;
  height: 1500px;
  padding: 10px 0 0 0;
}
</style>