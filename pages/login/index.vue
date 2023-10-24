<template>
  <div>login</div>
</template>
<script setup lang="ts">
import { definePageMeta } from "nuxt/dist/pages/runtime/composables";
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
