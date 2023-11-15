<template>
  <div>
    <div :class="`${Options ? 'box open' : 'box'}`" @click="Options = !Options">
      <i class="iconfont icon-qq"></i>
      <i class="iconfont icon-youtube"></i>
      <i class="iconfont icon-wechat"></i>
      <i class="iconfont icon-douyin"></i>
      <i class="iconfont icon-bilibili"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
const Options = ref(true);
</script>

<style scoped lang="scss">
.box {
  border-radius: 50%;
  background-size: cover;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  transition-duration: 0.3s;
  box-shadow: 0 0 10px #fff;
  border: 5px #fff solid;
}

.box::after {
  content: "";
  display: block;
  width: 0.6rem;
  height: 0.6rem;
  background-image: url("https://p6-passport.byteacctimg.com/img/user-avatar/6971cbaa33a2f797512b9bfb86732e02~80x80.awebp");
  background-size: cover;
  border-radius: 50%;
}

.box i {
  width: 60px;
  opacity: 0;
  height: 60px;
  border-radius: 50%;
  background-color: #ececec;
  font-size: 26px;
  text-align: center;
  line-height: 60px;
  position: absolute;
  left: 0;
  box-shadow: 0 0 10px #fff;
  color: rgb(106, 106, 245);
  background-color: #fff;
  transition-duration: 0.3s;
}

.box i:hover {
  transition-delay: initial !important;
  box-shadow: 0 0 0 5px #babbbc;
  background-color: rgb(106, 106, 245);
  color: #fff;
}

.box.open {
  opacity: 1;
}

.box.open i {
  left: 20px;
  opacity: 1;
}
.box.open i:nth-of-type(1) {
  transform: rotate(180deg) translateX(110px) rotate(90deg);
  transition-delay: 0s;
}
.box.open i:nth-of-type(2) {
  transform: rotate(135deg) translateX(120px) rotate(45deg);
  transition-delay: 0.1s;
}

.box.open i:nth-of-type(3) {
  transform: rotate(90deg) translateX(120px) rotate(0deg);
  transition-delay: 0.2s;
}

.box.open i:nth-of-type(4) {
  transform: rotate(40deg) translateX(120px) rotate(-45deg);
  transition-delay: 0.3s;
}

.box.open i:nth-of-type(5) {
  transform: rotate(0deg) translateX(130px) rotate(-90deg);
  transition-delay: 0.4s;
}
</style>
