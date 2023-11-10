<template>
  <div class="container">
    <Info :data="noticeData" />
  </div>
</template>

<script setup lang="ts">
const noticeData = [
  {
    title: "公告一公告一公告一公告一公告一公告一",
    date: "2023/11/4 11:20",
  },
  {
    title: "公告一公告一公告一公告一公告一公告一",
    date: "2023/11/4 11:20",
  },
  {
    title: "公告一公告一公告一公告一公告一公告一",
    date: "2023/11/4 11:20",
  },
  {
    title: "公告一公告一公告一公告一公告一公告一",
    date: "2023/11/4 11:20",
  },
  {
    title: "公告一公告一公告一公告一公告一公告一",
    date: "2023/11/4 11:20",
  },
  {
    title: "公告一公告一公告一公告一公告一公告一",
    date: "2023/11/4 11:20",
  },
  {
    title: "公告一公告一公告一公告一公告一公告一",
    date: "2023/11/4 11:20",
  },
];
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  box-sizing: border-box;
}
</style>
