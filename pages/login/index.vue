<template>
  <div class="loginpage">
    <div class="layer1"></div>
    <div class="layer2"></div>
    <div class="layer3"></div>
    <div class="layer4"></div>
    <div class="container">
      <div :class="`loginbox ${isshow ? 'activebox' : ''}`">
        <div class="loginboxleft"></div>
        <div class="loginboxright">
          <title>登录</title>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Inprops {
  title?: string;
}
//定义登录的模板
definePageMeta({
  layout: "custom",
});
const isshow = ref(false);
function changeback(val: boolean) {
  console.log(111);
  isshow.value = val;
}
</script>
<style scoped lang="scss">
@function getshadows($n) {
  $showdows: "#{random(100)}vw #{random(100)}vh #fff";
  @for $i from 2 through $n {
    $showdows: "#{$showdows},#{random(100)}vw #{random(100)}vh #fff";
  }
  @return unquote($showdows);
}
@keyframes moveUp {
  100% {
    transform: translateY(-100vh);
  }
}
$duration: 400s;
$count: 1000;
@for $i from 1 through 4 {
  $duration: floor(calc($duration / 2));
  $count: floor(calc($count / 2));
  .layer#{$i} {
    $size: #{$i}px;
    position: fixed;
    width: $size;
    height: $size;
    border-radius: 50%;
    background-color: white;
    left: 0px;
    top: 0px;
    animation: moveUp $duration linear infinite;
    box-shadow: getshadows($count);
    &::after {
      content: "";
      position: fixed;
      top: 100vh;
      width: $size;
      height: $size;
      left: 0;
      border-radius: inherit;
      box-shadow: inherit;
    }
  }
}
.loginpage {
  background-color: black;
  width: 100%;
  height: 100vh;
  .container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .loginbox {
      z-index: 9999;
      width: 8rem;
      height: 4rem;
      padding: 0.5rem;
      padding-top: 0.2rem;
      left: 50%;
      top: 50%;
      background-color: white;
      border-radius: 10px;
      background-image: url(https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login-v2/img/22_open.4ea5f239.png),
        url(https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login-v2/img/33_open.f7d7f655.png);
      box-shadow: 0 4px 14px 0 rgba(126, 134, 142, 0.16);
      background-position: 0 100%, 100% 100%;
      background-repeat: no-repeat, no-repeat;
      background-size: 14%;
      display: flex;

      .loginboxleft {
        width: 40%;
        height: 100%;
        background-image: url(/images/小组logo.png);
        background-position: center;
        background-size: 50%;
        background-repeat: no-repeat;
      }
      .loginboxright {
        width: 60%;
        height: 100%;
        background-color: salmon;
      }
    }
    .activebox {
      background-image: url("https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login-v2/img/22_close.9382a5a8.png"),
        url("https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login-v2/img/33_close.a8c18fc8.png") !important;
    }
  }
}
</style>
