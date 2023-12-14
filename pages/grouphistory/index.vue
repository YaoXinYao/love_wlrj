<template>
  <div class="history">
    <div class="historycontainer">
      <div class="progress mySwiper">
        <div class="swiper-wrapper">
          <div
            v-for="(item, index) in yearDate"
            @click="curYear = index"
            :class="`swiper-slide ${curYear == index ? 'slider-active' : ''}`"
          >
            {{ item.time }}
          </div>
        </div>
      </div>
      <div class="about-progress1">
        <div class="progressdesc">
          <div class="progressimg">
            <img
              src="https://download.cocos.com/CocosPortal/image/b830ac37732c4326a7bac9fcde5cae5d/b830ac37732c4326a7bac9fcde5cae5d.png"
              alt=""
            />
          </div>
          <div class="descright">
            <div class="descrighttop">
              未来软件
              <br />
              发展历程
            </div>
            <div class="desctext">
              {{ yearDate[curYear].desc.content }}
            </div>
          </div>
        </div>
        <div ref="num" class="progressyear">2011</div>
        <div class="progressButton">
          <div @click="Pagedele" class="progress-prev">
            <i class="iconfont icon-a-youjiantouzhixiangyoujiantou-copy"></i>
          </div>
          <div @click="changecur" class="progress-next">
            <i class="iconfont icon-a-youjiantouzhixiangyoujiantou"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
useHeader();
useHead({
  title: "小组历史",
});
const num = ref(null);
const curYear = ref(0);
const yearDate = ref([
  {
    time: "2011",
    desc: {
      imgSrc:
        "https://download.cocos.com/CocosPortal/image/b830ac37732c4326a7bac9fcde5cae5d/b830ac37732c4326a7bac9fcde5cae5d.png",
      content: "成立嵌入式小组",
    },
  },
  {
    time: "2012",
    desc: {
      imgSrc:
        "https://download.cocos.com/CocosPortal/image/b830ac37732c4326a7bac9fcde5cae5d/b830ac37732c4326a7bac9fcde5cae5d.png",
      content: "成立未来软件工作室",
    },
  },
  {
    time: "2015",
    desc: {
      imgSrc:
        "https://download.cocos.com/CocosPortal/image/b830ac37732c4326a7bac9fcde5cae5d/b830ac37732c4326a7bac9fcde5cae5d.png",
      content: "成立河南艾维特网络科技有限公司",
    },
  },
  {
    time: "2017",
    desc: {
      imgSrc:
        "https://download.cocos.com/CocosPortal/image/b830ac37732c4326a7bac9fcde5cae5d/b830ac37732c4326a7bac9fcde5cae5d.png",
      content: "成立新乡市惠农软件技术有限公司",
    },
  },
  {
    time: "2023.06",
    desc: {
      imgSrc:
        "https://download.cocos.com/CocosPortal/image/b830ac37732c4326a7bac9fcde5cae5d/b830ac37732c4326a7bac9fcde5cae5d.png",
      content:
        "截至目前共50多名毕业生，大多在今日头条，京东、腾讯等知名企业工作，就业率达100%，集中在北京上海等一线城市。",
    },
  },
  {
    time: "2024",
    desc: {
      imgSrc:
        "https://download.cocos.com/CocosPortal/image/b830ac37732c4326a7bac9fcde5cae5d/b830ac37732c4326a7bac9fcde5cae5d.png",
      content: "成立拼少少公司，一举拿下拼多多❗",
    },
  },
  {
    time: "2025.06",
    desc: {
      imgSrc:
        "https://download.cocos.com/CocosPortal/image/b830ac37732c4326a7bac9fcde5cae5d/b830ac37732c4326a7bac9fcde5cae5d.png",
      content: "拼少少公司成功上市，总产值700亿美元，占国家GDP的2%",
    },
  },
]);
watch(curYear, (cur, preval) => {
  const durantion = Math.abs(
    Number(yearDate.value[cur].time.slice(0, 4)) -
      Number(yearDate.value[preval].time.slice(0, 4))
  );
  //let duration = Math.abs(Number(preval) - Number(cur)) / 1000;
  tranform(Number(yearDate.value[curYear.value].time), durantion / 10);
});
onMounted(() => {
  //@ts-ignore
  let swiper = new Swiper(".mySwiper", {
    slidesPerView: 5,
    centeredSlides: false,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".progress-next",
      prevEl: ".progress-prev",
    },
  });
});
function tranform(nums: number, dur: number) {
  gsap.to(num.value, {
    duration: dur, // 动画持续时间
    innerHTML: nums, // 最终的数字值
    roundProps: "innerHTML", // 四舍五入，确保最终值为整数
    ease: "power1.inOut", // 缓动函数
  });
}
//BUG 已修复
function changecur() {
  const pagenum = curYear.value;
  if (pagenum >= yearDate.value.length - 1) {
    return;
  } else {
    curYear.value = curYear.value + 1;
  }
}
function Pagedele() {
  const pagenum = curYear.value;
  if (pagenum <= 0) return;
  curYear.value = curYear.value - 1;
}
</script>

<style scoped lang="scss">
@media screen and (max-width: 998px) {
  .progressimg {
    display: none !important;
  }
  .progress {
    width: 100% !important;
    padding-inline: 0.3rem !important;
  }
  .progressdesc {
    width: 100% !important;
    height: auto;
    align-items: center !important;
    justify-content: center !important;
  }
  .progressyear {
    text-align: center !important;
  }
  .about-progress1 {
    width: 100% !important;
  }
  .descright {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.history {
  width: 100%;
  height: auto;
  padding-block: 0.8rem;
  padding-bottom: 0.2rem;
  background-color: rgb(40, 77, 213);
  .historycontainer {
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: rgb(40, 77, 213);
    .progress {
      overflow: hidden;
      margin: auto;
      width: 11rem;
      height: 14vh;
      background-color: transparent;
      display: flex;
      flex-wrap: nowrap;
      .swiper-wrapper {
        width: 100%;
        height: auto;
        .swiper-slide {
          cursor: pointer;
          height: 100%;
          display: flex;
          position: relative;
          color: #5476f1;
          font-size: 0.28rem;
          user-select: none;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }
        .slider-active {
          color: white;
          font-weight: 700;
        }
      }
    }
    .about-progress1 {
      position: relative;
      overflow: hidden;
      padding: 0.5rem;
      border-radius: 0.1rem;
      width: 11rem;
      height: 75vh;
      background-color: white;
      margin: auto;
      .progressdesc {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: auto;
        .progressimg {
          height: 2.4rem;
          width: auto;
          img {
            height: 100%;
            object-fit: cover;
          }
        }

        .descrighttop {
          font-weight: 700;
          color: #999;
          text-align: right;
          font-size: 0.2rem;
          line-height: 1.35;
          margin-bottom: 0.2rem;
        }
        .desctext {
          min-height: rem;
          height: auto;
          font-size: 0.2rem;
          padding-left: 0.4rem;
          font-weight: bold;

          line-height: 1.5;
        }
      }
      .progressyear {
        font-size: 1.8rem;
        text-align: right;
        color: #dfdfdf;
      }
      .progressButton {
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100%;
        height: 10vh;
        display: flex;
        .progressbt {
          transition-duration: 0.2s;
          cursor: pointer;
          height: 100%;
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover {
            background-color: rgb(241, 241, 241);
          }
        }
        .progress-prev {
          @extend .progressbt;
        }
        .progress-next {
          @extend .progressbt;
        }
      }
    }
  }
}
</style>
