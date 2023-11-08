<template>
<div class="forum">
    <NuxtPage></NuxtPage>
</div>
</template>
<script lang="ts" setup>
  definePageMeta({
    layout: "default",
  });
</script>

<style lang="scss" scoped>
.forum {
  background-color: rgb(221 235 255);
  min-height: calc(100vh - 136px);
}
</style>