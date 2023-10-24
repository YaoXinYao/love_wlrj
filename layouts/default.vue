<template>
  <div class="rootbox">
    <app-header />
    <slot></slot>
    <app-footer />
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.rootbox {
  position: relative;
}
</style>
