<template>
  <ClientOnly>
    <div class="container">
      <div class="mainContent">
        <div class="siderBar">
          <h2>消息中心</h2>
          <ul>
            <li :class="route.path === '/messageCenter/like' ? 'active' : ''">
              <nuxt-link to="/messageCenter/like"
                ><span class="iconfont">&#xec7f;</span>点赞</nuxt-link
              >
            </li>
            <li
              :class="route.path === '/messageCenter/comment' ? 'active' : ''"
            >
              <nuxt-link to="/messageCenter/comment"
                ><span class="iconfont">&#xe8b4;</span>评论</nuxt-link
              >
            </li>
            <li
              :class="route.path === '/messageCenter/collect' ? 'active' : ''"
            >
              <nuxt-link to="/messageCenter/collect"
                ><span class="iconfont">&#xe65e;</span>收藏</nuxt-link
              >
            </li>
            <li :class="route.path === '/messageCenter/notice' ? 'active' : ''">
              <nuxt-link to="/messageCenter/notice"
                ><span class="iconfont">&#xe609;</span>公告</nuxt-link
              >
            </li>
          </ul>
        </div>

        <div class="messageContainer">
          <NuxtPage class="animate__animated animate__fadeIn"></NuxtPage>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import "animate.css";
const route = useRoute();
console.log(route.path);
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "iconfont"; /* Project id 4322481 */
  src: url("//at.alicdn.com/t/c/font_4322481_5xyo2bw9dmt.woff2?t=1699453831156")
      format("woff2"),
    url("//at.alicdn.com/t/c/font_4322481_5xyo2bw9dmt.woff?t=1699453831156")
      format("woff"),
    url("//at.alicdn.com/t/c/font_4322481_5xyo2bw9dmt.ttf?t=1699453831156")
      format("truetype");
}
.container {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("@/assets/image/messageBg.png");
  // background-image: linear-gradient(to right, #74ebd5 0%, #9face6 100%);
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.mainContent {
  display: flex;
  width: $originalWidth;
  height: calc(100% - 200px);
  margin: 0 auto;
  margin-top: 175px;
}

.siderBar {
  width: 150px;
  height: 100%;
  background-color: #8babfc;
  border-radius: 5px;
  color: #fff;

  h2 {
    text-align: center;
    height: 60px;
    line-height: 60px;
  }

  ul {
    li {
      display: flex;
      align-items: center;
      width: 100%;
      height: 45px;
      font-size: 16px;
      line-height: 45px;
      padding-left: 30px;
      box-sizing: border-box;
      cursor: pointer;
      border-radius: 4px;
      transition: color 0.1s;
      transition: background-color 0.1s;

      span {
        margin-right: 8px;
      }

      &:hover {
        background-color: rgba(#fff, 0.7);
        color: #8babfc;
      }
    }
  }
}
// .page-enter-active {
//   animation: slideInLeft 0.5s;
// }
// .page-leave-active {
//   animation: slideOutLeft 0.3s;
// }
.messageContainer {
  flex: 1;
  background-color: rgba(#fff, 0.7);
  margin-left: 20px;
  height: 100%;
  overflow: auto;
}

.active {
  background-color: #fff;
  color: #8babfc;
}
</style>
