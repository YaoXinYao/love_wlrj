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
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  min-height: calc(100vh - 136px);
}
</style>