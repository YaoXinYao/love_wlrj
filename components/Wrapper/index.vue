<template>
  <div class="wrapperMixd">
    <div class="mixed">
      <div class="mixedinner">
        <div class="header-title EN0">未来软件工作室</div>
        <div class="header-title EN">Future software Studio</div>
        <div class="header-title EN2">做一个有影响力的人</div>
        <div class="header-title EN3">做一个有影响力的团队</div>
        <div class="header-title EN4">
          <TransitionButton innertext="了解更多"></TransitionButton>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <el-carousel height="100vh" :interval="5000" arrow="always">
        <el-carousel-item v-for="(item, index) in carouselItem" :key="index">
          <img height="100%" width="100%" :src="item.src" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
onMounted(() => {
  const line = gsap.timeline();
  line
    .fromTo(".EN0", { x: "-2000px" }, { x: "0" }, 1)
    .fromTo(".EN", { x: "2000px" }, { x: "0" }, ">")
    .fromTo(".EN2", { x: "-2000px" }, { x: "0" }, ">")
    .fromTo(".EN3", { x: "2000px" }, { x: "0" }, ">")
    .fromTo(".EN4", { x: "-2000px" }, { x: "0" }, ">");
});
const carouselItem = [
  {
    src: "/images/wallhaven-3l2vm3_1920x1080.png",
  },
  {
    src: "/images/wallhaven-kxj3l1_1920x1080.png",
  },
  {
    src: "/images/wallhaven-vqeyxl_3840x2160.png",
  },
  {
    src: "/images/wallhaven-yxkm5k_3840x2160.png",
  },
];
</script>
<style scoped lang="scss">
.wrapperMixd {
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
  .wrapper {
    height: 100vh;
    width: 100%;
  }
  .mixed {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    padding-top: 1.8rem;
    z-index: 1;
    display: flex;
    justify-content: center;
    background-color: rgba($color: #000000, $alpha: 0.1);
    .mixedinner {
      width: 10.6rem;
      background-color: transparent;
      margin: 0 auto;
      padding-top: 1rem;
      .header-title {
        cursor: pointer;
        font-size: 0.6rem;
        color: rgb(255, 255, 255);
        font-weight: 700;
        text-align: start;
      }
      .EN {
        margin-top: 0.2rem;
        font-size: 0.3rem;
        /* 渐变色 */
        @include gradual();
      }

      .EN2 {
        margin-top: 0.2rem;
        font-size: 0.2rem;
        color: rgb(255, 255, 255);
      }
      .EN3 {
        margin-top: 0.2rem;
        font-size: 0.2rem;
        color: rgb(255, 255, 255);
      }
      .EN4 {
        margin-top: 1rem;
        font-size: 0.2rem;
        width: 2rem;
        height: 0.5rem;
        color: rgb(255, 255, 255);
      }
    }
  }
}
</style>
