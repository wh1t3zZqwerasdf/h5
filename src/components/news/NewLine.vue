<template>
  <iframe
    id="myiframe"
    :width="innerWidth"
    :height="innerHeight"
    :srcdoc="doc"
  ></iframe>
</template>

<script lang="ts" setup>
const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;
// import { ref } from "vue";

// const style = ref({ width: 0, height: 0 });
// style.value.width = window.innerWidth;
// style.value.height = window.innerHeight;
// console.log(style.value);
const doc =
  "<h2>普法动态</h2><p><img src='http://139.9.83.47:9000/dev/2022/12/06/eaf0cb8a144a3fd62f0995fc7ed2fd1a_u=3881051708,1318727812&fm=193&f=GIF_20221206141354.jpg' alt='eaf0cb8a144a3fd62f0995fc7ed2fd1a_u=3881051708,1318727812&fm=193&f=GIF_20221206141354.jpg' data-href='' style=''/></p>";

let iframe = document.getElementById("myiframe");
console.log(iframe);
if (iframe) {

}
</script>
