<template>
  <div class="Adviser">
    <div class="AdviserContainer">
      <div class="Adviserperson">指导老师</div>
      <div class="Adviserbox">
        <div class="Advcard AdviserLi">
          <div class="Advcardavter">
            <img src="/images/l1.jpg" alt="" />
          </div>
          <div class="Advcardname">高国红</div>
          <div class="position">
            <p>
              <strong>职位：</strong>
              副教授，在职博士，现任计算机科学与技术学院院长。
            </p>
            <p>
              <strong>主要研究方向：</strong>
              云计算与物联网技术
            </p>
            <p>
              <strong>导师寄语：</strong>
              胜利贵在坚持，要取得胜利就要坚持不
              解地努力，饱尝了许多次的失败之后才能成功，即
              所谓的失败乃成功之母，成功也就是胜利的标志
              也可以这样说，坚持就是胜利
            </p>
          </div>
        </div>
        <div class="Advcard AdviserLi2">
          <div class="Advcardavter">
            <img src="/images/l2.png" alt="" />
          </div>
          <div class="Advcardname">李士勇</div>
          <div class="position">
            <p>
              <strong>职位：</strong>
              讲师，硕士。研究方向:人工智能、数据挖掘
            </p>
            <p>
              <strong>主要研究方向：</strong>《Java面向对象》课程研究、
              《JSP程序 设计》、 基于.NET的智能网络教学系统开发等
            </p>
            <p>
              <strong>导师寄语：</strong>
              成功的意义不在于你取得多人的成就
              也不在于你有多么的伟大。因为，成功总会与努力
              过的人握手，只要享受了努力的过程，我们就不是失败者
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
onMounted(() => {
  loading();
});
function loading() {
  const line = gsap.timeline();
  ScrollTrigger.create({
    trigger: ".Adviser",
    start: "top-=100",
    end: "+=100",
    animation: line.fromTo(
      ".Advcard",
      {
        // rotateY: 0,
        translateY: 50,
        opacity: 0,
        duration: 0.4,
        scale: 0.9,
      },
      {
        translateY: 0,
        opacity: 1,
        duration: 0.4,
        scale: 0.9,
      }
    ),
  });
}
</script>

<style scoped lang="scss">
@media screen and (max-width: 998px) {
  .Adviser {
    height: auto !important;
  }
  .Adviserbox {
    height: auto !important;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
  .AdviserContainer {
    width: 100% !important;
  }
  .Advcard {
    width: 90% !important;
  }
}
.Adviser {
  width: 100%;
  height: 100vh;
  padding: 1.5rem;
  background: linear-gradient(-32.2deg, #f7edfa, #e2ebfa);
  color: white;
  padding: 1rem 0;
  padding-top: 0.5rem;
  .AdviserContainer {
    width: 10.6rem;
    height: auto;
    margin: auto;
    .Adviserperson {
      font-size: 0.36rem;
      user-select: none;
      font-weight: 700;
      padding-bottom: 0.5rem;
      color: black;
      text-align: center;
    }
    .Adviserbox {
      width: 100%;
      height: 5rem;
      display: flex;
      justify-content: space-between;
      .Advcard {
        box-shadow: 0.1rem 0.1rem 0.3rem rgba(40, 77, 213, 0.1);
        transition-duration: 0.3s;
        width: 40%;
        line-height: 0.3rem;
        color: black;
        height: 100%;
        border-radius: 0.15rem;
        background-color: rgb(255, 255, 255);
        padding: 0.2rem;
        &:hover {
          transform: scale(1) !important;
        }
        .Advcardavter {
          width: 100%;
          height: 1.3rem;

          display: flex;
          justify-content: center;
          img {
            height: 1.3rem;
            width: 1.3rem;
            border-radius: 50%;
          }
        }
        .Advcardname {
          margin-top: 0.1rem;
          color: black;
          height: 0.3rem;
          font-size: 0.24rem;
          font-weight: bold;
          text-align: center;
          width: 100%;
        }
        .position {
          font-size: 0.18rem;
        }
      }
    }
  }
}
</style>
