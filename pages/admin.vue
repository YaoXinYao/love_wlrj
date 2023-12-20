<template>
  <div class="admin">
    <NuxtPage></NuxtPage>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "manag",
  roles: 1,
});
</script>

<style lang="scss" scoped>
.admin {
  height: inherit;
}
</style>
