<template>
  <div id="projectdisplay">
    <div class="title">
      <div class="title-top">项目展示</div>
    </div>
    <div id="swipertran">
      <div class="swiper mySwiper">
        <div class="swiper-wrapper">
          <NuxtLink
            class="swiper-slide"
            v-for="(item, index) in MyProjectDis"
            :key="index"
            :to="item.projectUrl"
            target="_blank"
          >
            <div class="img">
              <img :src="item.projectImage" alt="" />
            </div>
            <div class="swipertext">
              <div class="title">{{ item.projectName }}</div>
              <div class="desc">
                {{ item.projectIntroduce }}
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <div id="mobile">
      <div
        class="swiper-slide"
        v-for="(item, index) in MyProjectDis || []"
        :key="index"
      >
        <div class="img">
          <img :src="item.projectImage" alt="" />
        </div>
        <div class="swipertext">
          <div class="title">{{ item.projectName }}</div>
          <div class="desc">
            {{ item.projectIntroduce }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { IResultData } from "~/types/Userlogin";
import type { ProjectDesType } from "~/types/disk";
const MyProjectDis = ref<ProjectDesType[]>([]);
const { data } = await useFetch<IResultData<ProjectDesType[]>>(
  "/api2/project/api/getProjectList",
  {
    method: "get",
    server: false,
  }
);
watch(
  data,
  () => {
    MyProjectDis.value = data.value?.data || [];
    console.log(data.value?.data);
  },
  {
    immediate: true,
  }
);
onMounted(async () => {
  //@ts-ignore
  let swiper = new Swiper(".mySwiper", {
    slidesPerView: 3, // 轮播区域展示的数量
    spaceBetween: 30,
    mousewheel: false,
    keyboard: true,
    loop: true, // 循环播放
    speed: 1000,
    autoplay: {
      // 自动播放
      delay: 1000,
      disableOnInteraction: true,
    },
    navigation: {
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  let swiperContainer = document.querySelector(".mySwiper");
  // 监听鼠标进入事件，禁用轮播
  swiperContainer!.addEventListener("mouseenter", function () {
    swiper!.autoplay.stop();
  });
  // 监听鼠标离开事件，启用轮播
  swiperContainer!.addEventListener("mouseleave", function () {
    swiper!.autoplay.start();
  });
  loading();
});
function loading() {
  ScrollTrigger.create({
    trigger: "#projectdisplay",
    start: "top-=200",
    end: "+=40",
    markers: false,
    animation: gsap.timeline().fromTo(
      "#swipertran",
      {
        translateY: 50,
        opacity: 0,
        duration: 5,
        ease: "elastic.out(1.7,0.3)",
      },
      { translateY: 0, opacity: 1, duration: 1, ease: "elastic.out(1.7,0.3)" }
    ),
  });
}
</script>
<style scoped lang="scss">
@media screen and (max-width: 998px) {
  #projectdisplay {
    height: auto !important;
    #swipertran {
      display: none;
    }
    #mobile {
      padding-inline: 0.5rem !important;
      display: flex !important;
      opacity: 1 !important;
    }
  }
}
#projectdisplay {
  position: relative;
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .title {
    height: 0.6rem;
    position: relative;
    width: 100%;
    .title-top {
      user-select: none;
      align-items: center;
      display: flex;
      font-weight: 700;
      height: 100%;
      justify-content: center;
      left: 0;
      line-height: 1.3rem;
      position: absolute;
      font-size: 0.36rem;
      right: 0;
      width: 100%;
    }
  }
  #swipertran {
    position: relative;
    width: 11.6rem;
    .swiper {
      width: 100%;
      height: 60vh;
      padding-block: 5vh;
    }
    .swiper-slide {
      box-shadow: 0.1rem 0.1rem 0.3rem rgba(40, 77, 213, 0.1);
      position: relative;
      width: 1.92rem;
      display: flex;
      justify-content: center;
      border-radius: 10px;
      overflow: hidden;
      flex-direction: column;
      .img {
        overflow: hidden;
        width: 100%;
        height: 50%;
        img {
          width: 100%;
          object-fit: cover;
        }
      }
      .swipertext {
        box-sizing: border-box;
        height: 50%;
        transition-duration: 0.3s;
        width: 100%;
        padding: 0.2rem;
        background-color: white;
        display: flex;
        flex-direction: column;
        .title {
          padding-left: 0.1rem;
          padding-top: 0.2rem;
          font-size: 0.2rem;
          height: auto;
          font-weight: 700;
          margin-bottom: 0.16rem;
        }
        .desc {
          width: 100%;
          user-select: none;
          font-size: 0.18rem;
          max-height: 0.72rem; /* 设置div的最大高度 */
          overflow-y: hidden;
          color: #999;
          text-overflow: ellipsis;
          padding: 0.1rem; /* 添加内边距用于示例 */
        }
      }
      &:hover {
        .swipertext {
          height: 100%;
          background-color: #0093e9;
          color: white;
          background-image: linear-gradient(
            160deg,
            rgb(50, 100, 224) 0%,
            rgb(76, 159, 252) 100%
          );

          .desc {
            color: white;
            font-size: 0.14rem;
            max-height: 1.3rem;
          }
        }
      }
    }
    .swiper-button-prev {
      background: #ff0000;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .swiper-button-next {
      background: #fe0000;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .swiper-slide img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    // 去掉左右箭头默认样式
    .swiper-button-prev:after {
      display: none;
    }
    .swiper-button-next:after {
      display: none;
    }
    // 定义新的样式
    .swiperbtcommont {
      background-color: white;
      box-shadow: 5px 5px 0.16rem 0 rgba(0, 0, 0, 0.16);
      width: 0.35rem;
      height: 0.35rem;
      bottom: 0.15rem;
      position: absolute;
      transition-duration: 0.3s;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 40%;
      top: 50%;
      &:hover {
        background-color: rgb(55, 112, 229);
      }
    }
    .swiper-button-prev {
      @extend .swiperbtcommont;
      background-image: url("/images/targetleft.png");
      left: -0.5rem;
      &:hover {
        background-image: url("/images/targetleftwhite.png");
      }
    }
    .swiper-button-next {
      @extend .swiperbtcommont;
      background-image: url("/images/targetright.png");
      background-position: center;
      right: -0.5rem;
      &:hover {
        background-image: url("/images/targetrightwhite.png");
      }
    }
  }
  #mobile {
    display: none;
    opacity: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
    .swiper-slide img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .swiper-slide {
      box-shadow: 0.1rem 0.1rem 0.3rem rgba(40, 77, 213, 0.1);
      position: relative;
      width: 100%;
      height: 4.5rem;
      display: flex;
      justify-content: center;
      margin-bottom: 0.5rem;
      border-radius: 10px;
      overflow: hidden;
      flex-direction: column;
      .img {
        overflow: hidden;
        width: 100%;
        height: 50%;
        img {
          width: 100%;
          object-fit: cover;
        }
      }
      .swipertext {
        box-sizing: border-box;
        height: 50%;
        transition-duration: 0.3s;
        width: 100%;
        padding: 0.2rem;
        background-color: white;
        display: flex;
        flex-direction: column;
        .title {
          padding-left: 0.1rem;
          padding-top: 0.2rem;
          font-size: 0.2rem;
          height: auto;
          font-weight: 700;
          margin-bottom: 0.16rem;
        }
        .desc {
          width: 100%;
          user-select: none;
          font-size: 0.18rem;
          max-height: 0.72rem; /* 设置div的最大高度 */
          overflow-y: hidden;
          color: #999;
          text-overflow: ellipsis;
          padding: 0.1rem; /* 添加内边距用于示例 */
        }
      }
      &:hover {
        .swipertext {
          height: 100%;
          background-color: #0093e9;
          color: white;
          background-image: linear-gradient(
            160deg,
            rgb(50, 100, 224) 0%,
            rgb(76, 159, 252) 100%
          );

          .desc {
            color: white;
            font-size: 0.2rem;
            max-height: 3rem;
          }
        }
      }
    }
  }
}
</style>
