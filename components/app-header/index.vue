<template>
  <div class="app-header" :style="{ ...headerTop }">
    <div class="container">
      <div class="logo">
        <a href="">
          <img src="/images/小组logo.png" alt="" />
        </a>
      </div>
      <nav :class="headerTop.isSpread ? 'NavBar' : 'NavBar2'">
        <div class="HeaderNavItem">
          <span>
            产品
            <i
              :class="`iconfont ${
                headerTop.isSpread ? 'icon-xiangxia' : 'icon-xiangxia-copy'
              }`"
            ></i>
          </span>
          <div class="header-dropdown">
            <ul>
              <li>
                <a href="">未来软件工作室</a>
              </li>
              <li>
                <a href="">未来软件工作室</a>
              </li>
              <li>
                <a href="">未来软件工作室</a>
              </li>
              <li>
                <a href="">未来软件工作室</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="HeaderNavItem">
          <span
            >小组网盘
            <i
              :class="`iconfont ${
                headerTop.isSpread ? 'icon-xiangxia' : 'icon-xiangxia-copy'
              }`"
            ></i>
          </span>
          <div class="header-dropdown">
            <ul>
              <li>
                <a href="">未来软件工作室</a>
              </li>
              <li>
                <a href="">未来软件工作室</a>
              </li>
              <li>
                <a href="">未来软件工作室</a>
              </li>
              <li>
                <a href="">未来软件工作室</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="HeaderNavItem">
          <span
            >技术文档
            <i
              :class="`iconfont ${
                headerTop.isSpread ? 'icon-xiangxia' : 'icon-xiangxia-copy'
              }`"
            ></i>
          </span>
          <div class="header-dropdown">
            <ul>
              <li>
                <a href="">未来软件工作室</a>
              </li>
              <li>
                <a href="">未来软件工作室</a>
              </li>
              <li>
                <a href="">未来软件工作室</a>
              </li>
              <li>
                <a href="">未来软件工作室</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="HeaderNavItem">
          <span>资讯</span>
        </div>
        <div class="HeaderNavItem">
          <span>论坛</span>
        </div>
        <div class="HeaderNavItem">
          <span
            >关于我们
            <i
              :class="`iconfont ${
                headerTop.isSpread ? 'icon-xiangxia' : 'icon-xiangxia-copy'
              }`"
            ></i>
          </span>
          <div class="header-dropdown">
            <ul>
              <li>
                <a href="">博客展示</a>
              </li>
              <li>
                <a href="">小组介绍</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="login">
        <a class="loginbt">进入后台</a>
        <div class=""></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scollactive } from "~/types/Home";
//注册插件
gsap.registerPlugin(ScrollTrigger);
const headerTop = ref<Scollactive>({
  height: "1.8rem",
  backgroundColor: "transparent",
  color: "white",
  isSpread: true,
});
//组件挂载完毕
onMounted(() => {
  //绑定事件
  document.addEventListener("scroll", handlerscroll);
});
onBeforeUnmount(() => {
  //卸载解绑
  document.removeEventListener("scroll", handlerscroll);
});
//切换演示
function handlerscroll() {
  let scrolly = window.scrollY;
  console.log(scrolly);
  if (scrolly >= 100) {
    headerTop.value = {
      height: "0.8rem",
      backgroundColor: "white",
      color: "black",
      isSpread: false,
    };
  } else {
    headerTop.value = {
      height: "1.8rem",
      backgroundColor: "transparent",
      color: "white",
      isSpread: true,
    };
  }
}
</script>
<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0rem;
  width: 100%;
  text-align: center;
  background-color: rgba(101, 165, 255, 0.7);
  display: flex;
  justify-content: center;
  height: 1.8rem;
  transition-duration: 0.3s;
  font-size: 0.16rem;
  color: white;
  .container {
    position: relative;
    width: 10.6rem;
    height: 100%;
    display: flex;
    .logo {
      position: absolute;
      align-items: center;
      display: flex;
      justify-content: flex-start;
      left: -10%;
      width: 1.2rem;
      height: 100%;
      img {
        object-fit: cover;
        width: 0.8rem;
      }
    }
    .NavBar {
      align-items: center;
      display: flex;
      height: 100%;
      width: 100%;
      justify-content: start;
      .HeaderNavItem {
        cursor: pointer;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin-left: 0.4rem;
        .header-dropdown {
          background-color: #fff;
          border-radius: 0.1rem;
          box-shadow: 5px 5px 0.16rem 0 rgba(0, 0, 0, 0.23);
          box-sizing: border-box;
          color: #000;
          display: flex;
          font-size: 0.16rem;
          left: -0.3rem;
          opacity: 0;
          padding: 0.14rem 0.2rem;
          position: absolute;
          top: 1.5rem;
          transform: translateY(0.2rem);
          transition: all 0.3s linear;
          visibility: hidden;
          z-index: 888;
          ul {
            li {
              cursor: pointer;
              font-weight: 700;
              letter-spacing: 0.5px;
              line-height: 1.4;
              min-width: 2.2rem;
              white-space: nowrap;
              text-align: start;
              border-radius: 0.1rem;
              a {
                box-sizing: border-box;
                cursor: pointer;
                display: block;
                line-height: 1.4;
                padding: 0.14rem 0.2rem;
                width: 100%;
              }
              &:hover {
                background-color: rgb(232, 233, 234);
              }
            }
          }
          &:before {
            border-bottom: 0.1rem solid #fff;
            border-left: 0.1rem solid transparent;
            border-right: 0.1rem solid transparent;
            content: "";
            left: 0.3rem;
            position: absolute;
            top: -0.08rem;
          }
        }
        span {
          position: relative;
          &:before {
            content: "";
            display: block;
            position: absolute;
            left: 4%;
            bottom: -0.1rem;
            width: 0;
            transition-duration: 0.4s;
            background-color: rgb(255, 255, 255);
            height: 0.03rem;
          }
        }
        &:hover {
          span:before {
            width: 92%;
          }
          .header-dropdown {
            visibility: inherit;
            transition-duration: 0.4s;
            opacity: 1;
            top: 1.2rem;
          }
        }
      }
    }
    .NavBar2 {
      align-items: center;
      display: flex;
      height: 100%;
      width: 100%;
      justify-content: start;
      .HeaderNavItem {
        cursor: pointer;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin-left: 0.4rem;
        .header-dropdown {
          background-color: #fff;
          border-radius: 0.1rem;
          box-shadow: 5px 5px 0.16rem 0 rgba(0, 0, 0, 0.23);
          box-sizing: border-box;
          color: #000;
          display: flex;
          font-size: 0.16rem;
          left: -0.3rem;
          opacity: 0;
          padding: 0.14rem 0.2rem;
          position: absolute;
          top: 1.5rem;
          transform: translateY(0.2rem);
          transition: all 0.3s linear;
          visibility: hidden;
          z-index: 888;
          ul {
            li {
              cursor: pointer;
              font-weight: 700;
              letter-spacing: 0.5px;
              line-height: 1.4;
              min-width: 2.2rem;
              white-space: nowrap;
              text-align: start;
              border-radius: 0.1rem;
              a {
                box-sizing: border-box;
                cursor: pointer;
                display: block;
                line-height: 1.4;
                padding: 0.14rem 0.2rem;
                width: 100%;
              }
              &:hover {
                background-color: rgb(232, 233, 234);
              }
            }
          }
          &:before {
            border-bottom: 0.1rem solid #fff;
            border-left: 0.1rem solid transparent;
            border-right: 0.1rem solid transparent;
            content: "";
            left: 0.3rem;
            position: absolute;
            top: -0.08rem;
          }
        }
        span {
          position: relative;
          color: black;
          &:before {
            content: "";
            display: block;
            position: absolute;
            left: 4%;
            bottom: -0.1rem;
            width: 0;
            transition-duration: 0.4s;
            background-color: rgb(40, 77, 213);
            height: 0.03rem;
          }
        }
        &:hover {
          span:before {
            width: 92%;
          }
          .header-dropdown {
            visibility: inherit;
            transition-duration: 0.4s;
            opacity: 1;
            top: 0.65rem;
          }
        }
      }
    }
    .login {
      position: absolute;
      right: -10%;
      height: 100%;
      width: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
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
  }
}
</style>
