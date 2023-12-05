<template>
  <template>
    <div id="info">
      <p>温馨提醒：您所访问的页面不存在或者已删除。</p>
      <p>游戏《圈小猫》</p>
    </div>
    <div id="catch-the-cat"></div>
    <div id="returnHome">
      <img src="/img/home2.png" alt="home" width="30px" height="30px" />
      <NuxtLink to="/">
        <TransitionButton innertext="返回首页" />
      </NuxtLink>
    </div>
  </template>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "custom",
});

useHead({
  script() {
    return [{ src: "/staticjs/catch-the-cat.js" }];
  },
  title: "未找到该页面",
});
onMounted(() => {
  //@ts-ignore
  window.game = new CatchTheCatGame({
    w: 11,
    h: 11,
    r: 20,
    backgroundColor: 0xffffff,
    parent: "catch-the-cat",
    statusBarAlign: "center",
  });
});
</script>

<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;
}

body {
  background-color: #eeeeee;
}
/* 游戏画布样式  */
#catch-the-cat {
  width: 100%;
  margin-top: 32px;
  text-align: center;
}

#info,
#returnHome {
  text-align: center;
  /* border: solid 1px 
  grey; */
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#info p {
  font-size: 25px;
}
</style>
