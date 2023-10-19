<template>
  <div>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
interface Inprops {
  title?: string;
}
const props = withDefaults(defineProps<Inprops>(), {
  title: "未来软件工作室",
});
</script>
<style scoped></style>
