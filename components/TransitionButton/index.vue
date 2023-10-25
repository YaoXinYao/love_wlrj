<template>
  <div class="login">
    <a class="loginbt">{{ innertext }}</a>
  </div>
</template>
<script setup lang="ts">
const { innertext = "进入后台" } = defineProps(["innertext"]);
</script>

<style scoped lang="scss">
.login {
  .loginbt {
    align-items: center;
    background-color: #284dd5;
    border: 1px solid #284dd5;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    display: flex;
    justify-content: center;
    line-height: 1;
    padding: 0.12rem 0.24rem;
    overflow: hidden;
    position: relative;
    transition: all 0.3s ease; // 将所有属性的过渡效果设置为0.3秒，使用ease缓动函数
    &:hover {
      box-shadow: 0.08rem 0.08rem 0.2rem 0 rgba(0, 0, 0, 0.24);
      transform: translateY(-3px);
      &::before {
        left: 100%; // 修复伪元素位置
        visibility: visible; // 修复伪元素可见性
      }
    }
    &::before {
      background: linear-gradient(
        90deg,
        hsla(0, 0%, 100%, 0) 0,
        hsla(0, 0%, 100%, 0.03) 1%,
        hsla(0, 0%, 100%, 0.6) 30%,
        hsla(0, 0%, 100%, 0.85) 50%,
        hsla(0, 0%, 100%, 0.85) 70%,
        hsla(0, 0%, 100%, 0.85) 71%,
        hsla(0, 0%, 100%, 0)
      );
      bottom: auto;
      content: "";
      height: 2.2rem;
      left: -1rem;
      opacity: 0.1;
      position: absolute;
      right: auto;
      top: -0.4rem;
      transform: skew(-12deg, 0deg);
      transition: all 0.5s ease 0s; // 将所有属性的过渡效果设置为0.5秒，使用ease缓动函数
      width: 0.5rem;
      z-index: -1;
    }
  }
}
</style>
