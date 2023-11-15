<template>
  <div id="top" class="rootbox">
    <app-header class="app-header" />
    <app-header2 class="app-header2"></app-header2>
    <slot></slot>
    <rocket />
    <app-footer />
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.rootbox {
  position: relative;
  background-color: #f4f8fb;
  width: 100%;
  height: auto;
  .app-header2 {
    display: none;
  }
}
@media screen and (max-width: 998px) {
  .app-header {
    display: none;
  }
  .app-header2 {
    display: flex !important;
  }
}
</style>
