<template>
  <div id="desc">
    <div class="container">
      <TransitionButton2 class="containerTital" title="关于未来" />
      <div class="home-about-container">
        <div class="about-intro">
          <div class="about-vision">
            <div class="about-intro__title about-intro__title1">
              我们的目标
              <b> Our target</b>
            </div>
            <div class="about-intro__vision-slg">
              <div class="anim">
                <p style="white-space: pre-wrap">做一个有影响力的团队</p>
                <p style="white-space: pre-wrap; text-align: right">
                  做一个有影响力的人
                </p>
              </div>
            </div>
          </div>
          <div class="about-intro__weilai">
            <div class="about-intro__title about-intro__title2">
              关于未来软件工作室
              <b> About the future software studio </b>
            </div>
            <div class="about-intro__weilai-desc">
              <div>
                <p style="white-space: pre-wrap">
                  未来软件工作室由
                  <strong>高国红</strong>， <strong>李士勇</strong> 两位老师于
                  <strong>2011年6月</strong> 创办，以提高学 生软件开发技术为
                  核心培养目标,秉承追求卓越，采取理论基础、实践能力与
                  综合素质并重的人才培养理念，
                  旨在全方位提高学生的就业质量和创新创业能力。
                </p>
                <p style="white-space: pre-wrap">
                  工作室成立以来，逐步形成了
                  <strong>Web设计开发</strong> 、大前端设计开发两大学习方 向以及
                  <strong>Java Web</strong> 、数据处理、移动开发、UI设计等若干细
                  分方向，凝练了成 熟的学习路线和培养方案。
                </p>
                <p style="white-space: pre-wrap">
                  一路走来我们成绩斐然，先后获得国家级创新创业
                  项目5项，河南省创业扶持资金项目2项，校级创新创业项目8项，在各类学科
                  竞赛中获
                  国家级奖项12项，省级奖项91项，设计开发各类软件产品40余个
                  培养毕业生40余人，均
                  就职于京东、联想、新浪等知名企业，平均就业年薪达
                  <strong>20万元</strong> 以上。未来，做一个有影响力
                  的团队，未来人，做一个有影响力的人. 未来有你，未来可期。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const styles = ref({
  x: 0,
  time: 0,
});
onMounted(() => {
  const line = gsap.timeline();
  scrollTrigg();
});
//滚动动画
function scrollTrigg() {
  ScrollTrigger.create({
    trigger: "#desc",
    start: "top-=500",
    end: "+=100",
    markers: false,
    animation: gsap
      .timeline()
      .fromTo(
        ".containerTital",
        { translateY: 50, opacity: 0 },
        { translateY: 0, opacity: 1 }
      )
      .fromTo(
        ".about-intro__title1",
        { translateY: 50, opacity: 0 },
        { translateY: 0, opacity: 1 }
      )
      .fromTo(
        ".about-intro__vision-slg",
        { translateY: 50, opacity: 0 },
        { translateY: 0, opacity: 1 }
      )
      .fromTo(
        ".about-intro__title2",
        { translateY: 50, opacity: 0 },
        { translateY: 0, opacity: 1 }
      )
      .fromTo(
        ".about-intro__weilai-desc",
        { translateY: 50, opacity: 0 },
        { translateY: 0, opacity: 1 }
      ),
  });
}
//按钮切换效果
function mouseenter() {
  styles.value = {
    x: -0.5,
    time: 300,
  };
}
function mouseover() {
  styles.value = {
    x: -1.0,
    time: 300,
  };
  setTimeout(() => {
    styles.value = {
      x: 0,
      time: 0,
    };
  }, 300);
}
</script>

<style scoped lang="scss">
#desc {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(-32.2deg, #f7edfa, #e2ebfa);
  padding-top: 0.7rem;
  position: relative;
  .container {
    width: 9.6rem;
    height: auto;
    margin: auto;
    display: flex;
    flex-direction: column;
    position: relative;
    .containerTital {
      position: relative;
      text-align: right;
      width: 100%;
      height: 0.5rem;
      display: flex;
      justify-content: center;
      overflow: hidden;
      .aboutbox {
        position: relative;
        transition-duration: 0.3s;
        z-index: 9999;
        .title {
          width: 2.4rem;
          height: 0.5rem;
          cursor: pointer;
          transition-duration: 0.3s;
          background-color: transparent;
          color: rgb(0, 0, 0);
          display: flex;
          font-size: 0.16rem;
          justify-content: center;
          align-items: center;
        }
        .EN2 {
          background-color: RGB(55, 120, 229);
          color: white;
        }
      }
    }
    .home-about-container {
      width: 100%;
      height: auto;
      position: relative;
      .about-intro {
        user-select: none;

        top: 0;
        width: 98%;
        height: 100%;
        padding-right: 0.4rem;
        .about-vision {
          max-height: 2.84rem;
          .about-intro__title {
            position: relative;
            margin-bottom: 0.4rem;
            font-size: 0.2rem;
            font-weight: bold;
            color: #242933;
            b {
              position: absolute;
              left: 1.04rem;
              bottom: -0.16rem;
              font-size: 0.1rem;
              font-weight: normal;
              color: #ccc;
              letter-spacing: 0.1em;
              font-family: HarmonyOS, Arial, Helvetica, sans-serif;
              text-transform: uppercase;
            }
          }
          .about-intro__vision-slg {
            position: relative;
            display: inline-block;
            width: calc(100% - 0.76rem);
            padding-left: 0.2rem;
            margin-bottom: 1.4rem;
            margin-left: 0.64rem;
            font-size: 0.54rem;
            line-height: 0.8rem;
            letter-spacing: 0.1em;
            font-weight: lighter;
            color: #4ea1d9;
            .anim {
              @include mihayoutext();
            }
            &:before {
              left: 0;
              top: 0;
              background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAZCAYAAAAMhW+1AAAAAXNSR0IArs4c6QAAACZJREFUOE9j9Ft48z8DHsBIXQWb4tUZ0W1DsWJUASR4RsNhcIcDADoPYG82O/IpAAAAAElFTkSuQmCC);
              content: "";
              position: absolute;
              width: 0.08rem;
              height: 0.25rem;
              background-repeat: 0;
              background-size: cover;
              background-position: center center;
            }
            &:after {
              content: "";
              position: absolute;
              width: 0.08rem;
              height: 0.25rem;
              background-repeat: 0;
              background-size: cover;
              background-position: center center;
              right: 0;
              bottom: 0;
              background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAZCAYAAAAMhW+1AAAAAXNSR0IArs4c6QAAAChJREFUOE9jZMACrsx98h8mzDiqABwCo+EASQhDIxyQUzC2BMxIsQIAEOdTTmAeOPYAAAAASUVORK5CYII=);
            }
          }
        }
        .about-intro__weilai {
          height: auto;
          .about-intro__title {
            position: relative;
            margin-bottom: 0.4rem;
            font-size: 0.2rem;
            font-weight: bold;
            color: #242933;
            b {
              position: absolute;
              left: 1.04rem;
              bottom: -0.16rem;
              font-size: 0.1rem;
              font-weight: normal;
              color: #ccc;
              letter-spacing: 0.1em;
              font-family: HarmonyOS, Arial, Helvetica, sans-serif;
              text-transform: uppercase;
            }
          }
          .about-intro__weilai-desc {
            text-align: left;
            margin-bottom: 0.7rem;
            font-size: 0.15rem;
            color: #3d424d;
            line-height: 0.34rem;
            height: auto;
            p {
              text-indent: 0.3rem;
            }
            strong {
              color: #4ea1d9;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>
