<template>
  <div class="wrapperMixd">
    <div class="mixed">
      <div class="mixedinner">
        <div class="header-title EN0">未来软件工作室</div>
        <div class="header-title EN">Future software Studio</div>
        <div class="header-title EN2">做一个有影响力的人</div>
        <div class="header-title EN3">做一个有影响力的团队</div>
        <div class="header-title EN4">
          <NuxtLink to="/grouphistory">
            <TransitionButton innertext="了解更多"></TransitionButton>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div class="spcial">
        <div @click="prepage" class="arrow wrapperarrowleft">
          <div class="arrowTip"></div>
          <div class="arrowicon">
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </div>
      </div>
      <el-carousel ref="carousel" height="100vh" :interval="5000" arrow="never">
        <el-carousel-item v-for="(item, index) in wrapper" :key="index">
          <img class="carouselimg" :src="item.carouselUrl" alt="" />
        </el-carousel-item>
      </el-carousel>
      <div class="spcial2">
        <div @click="nextpage" class="arrow wrapperarrowright">
          <div class="arrowicon">
            <i class="iconfont icon-xiangyou-white"></i>
          </div>
          <div class="arrowTip"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import type { IResultData } from "~/service/forum";
import type { WrapperType } from "~/types/Home";
const wrapper = ref<WrapperType[]>([]);
//服务端渲染，获取数据,同时也支持客户端获取数据，但是部署之后会出现问题，真的让人头疼
const { data } = await useFetch<IResultData<WrapperType[]>>(
  `${useRequestURL().href}api/user/swagger/user/carousel/selectAllCarousel`,
  {
    server: false,
  }
);
watch(
  data,
  () => {
    wrapper.value = data.value?.data || [];
  },
  { immediate: true }
);
const carousel = ref();
onMounted(() => {
  const dom: HTMLDivElement = document.getElementsByClassName(
    "el-carousel__container"
  )[0] as HTMLDivElement;
  dom.style.minHeight = "7rem";
  //首屏划入标题
  const line = gsap.timeline();
  line
    .fromTo(
      ".EN0",
      { translateY: 50, opacity: 0 },
      { translateY: 0, opacity: 1 }
    )
    .fromTo(
      ".EN",
      { translateY: 50, opacity: 0 },
      { translateY: 0, opacity: 1 }
    )
    .fromTo(
      ".EN2",
      { translateY: 50, opacity: 0 },
      { translateY: 0, opacity: 1 }
    )
    .fromTo(
      ".EN3",
      { translateY: 50, opacity: 0 },
      { translateY: 0, opacity: 1 }
    )
    .fromTo(
      ".EN4",
      { translateY: 50, opacity: 0 },
      { translateY: 0, opacity: 1 }
    );
});
function nextpage() {
  carousel.value.next();
}
function prepage() {
  carousel.value.prev();
}
</script>
<style scoped lang="scss">
@media screen and (max-width: 998px) {
  .mixedinner {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.el-carousel--horizontal {
  height: 100vh;
  min-height: 7rem;
}
.wrapperMixd {
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
  .wrapper {
    height: 100vh;
    min-height: 7rem;
    width: 100%;
    position: relative;
    .carouselimg {
      width: 100%;
      height: 100%;
      min-height: 7rem;
      object-fit: cover;
    }
    .spcial {
      height: 100%;
      position: absolute;
      width: 1rem;
      left: 0px;
      display: flex;
      align-items: center;
    }
    .spcial2 {
      height: 100%;
      position: absolute;
      width: 1rem;
      right: 0px;
      top: 0px;
      display: flex;
      align-items: center;
      justify-content: right;
    }
    .arrow {
      height: 2rem;
      width: 0.5rem;
      display: flex;
      align-items: center;
      cursor: pointer;
      flex-direction: row;
      background-color: transparent;
      z-index: 1;
      &:hover {
        .arrowTip {
          transform: scaleY(2);
        }
        .arrowicon {
          opacity: 1;
        }
      }
    }
    .wrapperarrowleft {
      padding-left: 25px;
      transition-duration: 0.3s;

      .arrowTip {
        width: 0.02rem;
        height: 0.5rem;
        transition-duration: 0.3s;
        background-color: white;
      }
      .arrowicon {
        transition-duration: 0.3s;
        opacity: 0;
      }
    }
    .wrapperarrowright {
      padding-right: 25px;
      transition-duration: 0.3s;

      .arrowTip {
        width: 0.02rem;
        height: 0.5rem;
        transition-duration: 0.3s;
        background-color: white;
      }
      .arrowicon {
        transition-duration: 0.3s;
        opacity: 0;
      }
    }
  }
  .mixed {
    position: absolute;
    top: 0;
    min-height: 7rem;
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
