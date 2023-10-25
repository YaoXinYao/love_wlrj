<template>
  <div>register</div>
</template>
<script setup lang="ts">
interface Inprops {
  title?: string;
}
definePageMeta({
  layout: "custom",
});
const props = withDefaults(defineProps<Inprops>(), {
  title: "",
});
</script>
<style scoped></style>
