<template>
  <div id="projectdisplay">
    <div class="title">
      <div class="title-top">项目展示</div>
    </div>
    <swiper
      :slides-per-view="3"
      :space-between="50"
      :autoplay="true"
      :free-mode="true"
      :delay="1000"
      :modules="[Autoplay, FreeMode]"
      :loop="true"
      id="swipertran"
    >
      <swiper-slide
        class="swiper-slide"
        v-for="(item, index) in Projectlist"
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
      </swiper-slide>
      <!--  <div class="swiper-button-prev" @click="Prevpage"></div>
      <div class="swiper-button-next"></div> -->
    </swiper>
    <!--   <div class="swiper-button-prev" @click="Prevpage"></div>
        <div class="swiper-button-next"></div> -->
    <div id="mobile">
      <div
        class="swiper-slide"
        v-for="(item, index) in Projectlist || []"
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
import "swiper/css";
import { Autoplay, FreeMode } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { IResultData } from "~/types/Userlogin";
import type { ProjectDesType } from "~/types/disk";
import { Swiper, SwiperSlide } from "swiper/vue";
const Projectlist = ref<ProjectDesType[]>([]);
const { data } = await useFetch<IResultData<ProjectDesType[]>>(
  `${useRequestURL().origin}/api2/project/api/getProjectList`,
  {
    server: false,
    lazy: true,
  }
);
watch(
  data,
  async () => {
    Projectlist.value = data.value?.data || [];
  },
  {
    immediate: true,
  }
);
Projectlist.value = data.value?.data || [];
onMounted(async () => {
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
  min-height: 5.5rem;
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
    min-height: 4rem;
    height: 60vh;
    padding-block: 5vh;
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
        .deleteProject,
        .editProejct {
          opacity: 1;
        }
      }
      .deleteProject {
        position: absolute;
        opacity: 0;
        transition-duration: 0.3s;
        top: 0.1rem;
        right: 0.1rem;
        height: 0.3rem;
        cursor: pointer;
        width: 0.6rem;
      }
      .editProejct {
        position: absolute;
        opacity: 0;
        transition-duration: 0.3s;
        top: 0.1rem;
        left: 0.1rem;
        height: 0.3rem;
        cursor: pointer;
        width: 0.6rem;
      }
    }

    .swiper-slide img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    // 去掉左右箭头默认样式

    // 定义新的样式
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
