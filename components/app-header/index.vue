<template>
  <div
    class="app-header"
    :style="isRequireanim ? { ...header } : { ...headertype }"
  >
    <div class="container">
      <div class="logo">
        <NuxtLink to="/">
          <img src="/images/小组logo.png" alt="" />
        </NuxtLink>
      </div>
      <nav :class="header.isSpread ? 'NavBar' : 'NavBar2'">
        <div class="HeaderNavItem">
          <NuxtLink to="/blog">
            <span>博客展示</span>
          </NuxtLink>
        </div>
        <!--  <div class="HeaderNavItem">
          <span>
            产品
            <i
              :class="`iconfont ${
                header.isSpread ? 'icon-xiangxia' : 'icon-xiangxia-copy'
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
        </div> -->
        <div class="HeaderNavItem">
          <NuxtLink to="/networkdisk">
            <span
              >小组网盘
              <i
                :class="`iconfont ${
                  header.isSpread ? 'icon-xiangxia' : 'icon-xiangxia-copy'
                }`"
              ></i>
            </span>
          </NuxtLink>
          <div class="header-dropdown">
            <ul>
              <li>
                <NuxtLink to="/networkdisk/uploadfile">上传文件</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/networkdisk/documentcommunity"
                  >文件社区</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/networkdisk/mylove">我的收藏</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/networkdisk/myfile">我的文件</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <!--  <div class="HeaderNavItem">
          <span
            >技术文档
            <i
              :class="`iconfont ${
                header.isSpread ? 'icon-xiangxia' : 'icon-xiangxia-copy'
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
        </div> -->
        <div class="HeaderNavItem">
          <NuxtLink to="/proclamation">
            <span>公告</span>
          </NuxtLink>
        </div>
        <div class="HeaderNavItem">
          <NuxtLink to="/forum/home">
            <span>论坛</span>
          </NuxtLink>
        </div>
        <div class="HeaderNavItem">
          <span
            >关于我们
            <i
              :class="`iconfont ${
                header.isSpread ? 'icon-xiangxia' : 'icon-xiangxia-copy'
              }`"
            ></i>
          </span>
          <div class="header-dropdown">
            <ul>
              <li>
                <NuxtLink to="/grouphistory">小组历程</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="login">
        <NuxtLink v-if="user.token == ''" to="/login">
          <TransitionButton innertext="登录"></TransitionButton>
        </NuxtLink>
        <el-dropdown v-if="user.token !== ''" :hide-on-click="false">
          <el-badge
            :value="messagetotal"
            :max="99"
            :hidden="messagetotal == 0"
            class="item"
          >
            <div class="loginbox" style="">
              <div
                class="boximg"
                :style="{
                  backgroundImage: `url(${
                    userinfo.userPicture ||
                    'https://p6-passport.byteacctimg.com/img/user-avatar/6971cbaa33a2f797512b9bfb86732e02~120x120.awebp'
                  })`,
                }"
              ></div>
            </div>
          </el-badge>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-badge
                  :value="messagetotal"
                  :hidden="messagetotal == 0"
                  :max="99"
                  class="item"
                >
                  <NuxtLink to="/personalInfoPage/modules"> 个人中心 </NuxtLink>
                </el-badge>
              </el-dropdown-item>
              <el-dropdown-item>
                <NuxtLink to="/networkdisk"> 我的网盘 </NuxtLink>
              </el-dropdown-item>
              <el-dropdown-item>
                <NuxtLink to="/admin/staff"> 进入后台 </NuxtLink>
              </el-dropdown-item>
              <el-dropdown-item>
                <NuxtLink to="/forum/person"> 我的帖子 </NuxtLink>
              </el-dropdown-item>
              <el-dropdown-item @click="exit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHomestore } from "~/store/home";
import { storeToRefs } from "pinia";
import { useMessageStore } from "~/store/message";
const messagestore = useMessageStore();
const homestore = useHomestore(); //获取顶部状态
const { header, isRequireanim, user, userinfo } = storeToRefs(homestore);
const { notReadNum } = storeToRefs(messagestore);
const headertype = {
  height: "0.8rem",
  backgroundColor: "white",
  color: "black",
  boxShadow: "-7px 3px 10px 0 rgba(0, 0, 0, 0.06)",
  isSpread: false,
};
const messagetotal = computed(() => {
  return (
    notReadNum.value.commentLikeCnt +
    notReadNum.value.commentReplyCnt +
    notReadNum.value.postCollectCnt +
    notReadNum.value.postCommentCnt +
    notReadNum.value.postLikeCnt
  );
});
const exit = () => {
  homestore.exitlogin();
};
//注册插件
gsap.registerPlugin(ScrollTrigger);
//组件挂载完毕
onMounted(() => {
  document.addEventListener("scroll", handlerscroll);
  //绑定事件
});
onBeforeUnmount(() => {
  //卸载解绑
  document.removeEventListener("scroll", handlerscroll);
});
//切换演示
function handlerscroll() {
  if (!isRequireanim.value) return;
  let scrolly = window.scrollY;
  if (scrolly >= 100) {
    homestore.ChangeHeader({
      height: "0.8rem",
      backgroundColor: "white",
      color: "black",
      isSpread: false,
    });
  } else {
    homestore.ChangeHeader({
      height: "1.8rem",
      backgroundColor: "transparent",
      color: "white",
      isSpread: true,
    });
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
  z-index: 999;

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
      .loginbox {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        font-size: 26px;
        text-align: center;
        padding: 0.05rem;
        line-height: 60px;
        box-shadow: 0 0 10px #fff;
        outline: none;
        color: rgb(106, 106, 245);
        background-color: #fff;
        transition-duration: 0.3s;

        .boximg {
          content: "";
          display: block;
          width: 0.4rem;
          height: 0.4rem;
          background-size: cover;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
