<template>
  <el-card class="box-card">
    <div v-if="icon" slot="header">
      <div class="box-card-icon-span">
        <img class="box-card-icon" :src="icon" alt="icon" />
        <span class="box-card-span">{{ header }}</span>
      </div>
    </div>
    <div v-else slot="header">
      <span class="box-card-span">{{ header }}</span>
    </div>
    <div v-for="(item, index) in items" :key="index" class="text-card">
      {{ item.title }}
      <span class="text-card-span">{{ item.name }}</span>
    </div>
    <button class="box-button" @click.stop="$emit('button-click')">
      <span>{{ buttonText }}</span>
    </button>
  </el-card>
</template>

<script >
export default {
  props: {
    header: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    }
  },

};
</script>

<style src="./style/myCard.css"></style>