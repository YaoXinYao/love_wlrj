<template>
  <el-config-provider :locale="zhCn">
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </el-config-provider>
</template>
<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
useHead({
  title: "未来软件工作室", //网站标题
});
</script>
<style></style>
