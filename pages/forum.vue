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
  background-color: rgba(244,248,251);
  min-height: calc(100vh - 136px);
}
</style>
