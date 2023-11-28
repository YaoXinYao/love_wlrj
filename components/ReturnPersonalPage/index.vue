import { NuxtLink } from '../../.nuxt/components';
<template>
  <NuxtLink to="/personalInfoPage/modules"
    ><el-tag class="ml-2" type="success">返回个人主页</el-tag></NuxtLink
  >
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.linkTag {
  font-size: 17px;
}
</style>
