<template>
  <div class="smooth-wrapper">
    <!-- 首页第一屏 -->
    <Wrapper />
    <!-- 第二屏 -->
    <GroupIntroduction />
    <!-- 第三屏 -->
    <ProjectDisplay />
    <!-- 第四屏 -->
    <Adviser />
    <!-- 第五屏 -->
    <Advisory />
  </div>
</template>
<script setup lang="ts">
useHead({
  script: [
    { src: "https://api.vvhan.com/api/denglong2", async: true },
    { src: "https://api.vvhan.com/api/snow", async: true },
  ],
});
</script>
<style lang="scss">
.vvhan-com-denglong-c {
  font-size: 0.24rem !important;
}
.smooth-wrapper {
  height: auto;
  width: 100%;
}
</style>
