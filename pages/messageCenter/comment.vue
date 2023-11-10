<template>
  <div class="container">
    <Info :data="commentData" />
  </div>
</template>

<script setup lang="ts">
import "animate.css";
const commentData = [
  {
    title: "xxx评论了xxxxxxxx",
    date: "2023/11/4 11:20",
  },
  {
    title: "xxx评论了xxxxxxxx",
    date: "2023/11/4 11:20",
  },
  {
    title: "xxx评论了xxxxxxxx",
    date: "2023/11/4 11:20",
  },

  {
    title: "xxx评论了xxxxxxxx",
    date: "2023/11/4 11:20",
  },
  {
    title: "xxx评论了xxxxxxxx",
    date: "2023/11/4 11:20",
  },
  {
    title: "xxx评论了xxxxxxxx",
    date: "2023/11/4 11:20",
  },
  {
    title: "xxx评论了xxxxxxxx",
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
