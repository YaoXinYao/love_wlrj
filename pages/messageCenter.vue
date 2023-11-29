<template>
  <ClientOnly>
    <div class="container">
      <div class="mainContent">
        <div class="siderBar">
          <h2>消息中心</h2>
          <ul>
            <li
              :class="route.path === '/messageCenter/postLike' ? 'active' : ''"
            >
              <nuxt-link to="/messageCenter/postLike"
                ><el-badge
                  :value="notReadInfo.postLikeCnt"
                  :hidden="!(notReadInfo.postLikeCnt > 0)"
                  :max="99"
                  class="item"
                  ><span class="iconfont">&#xec7f;</span>帖子点赞</el-badge
                ></nuxt-link
              >
            </li>
            <li
              :class="
                route.path === '/messageCenter/postCollect' ? 'active' : ''
              "
            >
              <nuxt-link to="/messageCenter/postCollect"
                ><el-badge
                  :value="notReadInfo.postCollectCnt"
                  :hidden="!(notReadInfo.postCollectCnt > 0)"
                  :max="99"
                  class="item"
                  ><span class="iconfont">&#xe65e;</span>帖子收藏</el-badge
                >
              </nuxt-link>
            </li>
            <li
              :class="route.path === '/messageCenter/comment' ? 'active' : ''"
            >
              <nuxt-link to="/messageCenter/comment"
                ><el-badge
                  :value="notReadInfo.postCommentCnt"
                  :hidden="!(notReadInfo.postCommentCnt > 0)"
                  :max="99"
                  class="item"
                  ><span class="iconfont">&#xe8b4;</span>帖子评论</el-badge
                >
              </nuxt-link>
            </li>
            <li
              :class="
                route.path === '/messageCenter/commentLike' ? 'active' : ''
              "
            >
              <nuxt-link to="/messageCenter/commentLike"
                ><el-badge
                  :value="notReadInfo.commentLikeCnt"
                  :hidden="!(notReadInfo.commentLikeCnt > 0)"
                  :max="99"
                  class="item"
                >
                  <span class="iconfont">&#xec7f;</span>评论点赞</el-badge
                >
              </nuxt-link>
            </li>

            <li
              :class="
                route.path === '/messageCenter/commentReply' ? 'active' : ''
              "
            >
              <nuxt-link to="/messageCenter/commentReply"
                ><el-badge
                  :value="notReadInfo.commentReplyCnt"
                  :hidden="!(notReadInfo.commentReplyCnt > 0)"
                  :max="99"
                  class="item"
                  ><span class="iconfont">&#xe8b4;</span>评论回复</el-badge
                >
              </nuxt-link>
            </li>
          </ul>
        </div>

        <div class="messageContainer">
          <NuxtPage class="animate__animated animate__fadeIn"></NuxtPage>
          <el-pagination
            v-show="pageInfo.total"
            style="height: 100px; width: max-content; margin-left: 10px"
            v-model:current-page="pageInfo.currentPage"
            v-model:page-size="pageInfo.pageSize"
            :page-sizes="[5, 10, 15]"
            :background="true"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import "animate.css";
import { useRoute } from "vue-router";
import { useWebSocket } from "@vueuse/core";
import { getNotReadInfo } from "~/service/message";
import { useHomestore } from "~/store/home";
import { storeToRefs } from "pinia";
const homeStore = useHomestore();
let { userinfo } = storeToRefs(homeStore);
import { useMessageStore } from "~/store/message";
import { useGetMessageInfo } from "../hooks/useGetMessageInfo";
const messageStore = useMessageStore();
const { curType, pageInfo, infoList } = storeToRefs(messageStore);
const route = useRoute();
let notReadInfo = reactive({
  commentLikeCnt: 0,
  commentReplyCnt: 0,
  postCollectCnt: 0,
  postCommentCnt: 0,
  postLikeCnt: 0,
});

onMounted(() => {
  getInfo();
});

const { status, data, send, open, close } = useWebSocket(
  `ws://152.136.161.44:19491/forum/swagger/forum/websocket/${userinfo.value.userId}`,
  {
    autoReconnect: {
      retries: 8,
      delay: 1000,
      onFailed() {
        alert("Failed to connect WebSocket after 8 retries");
      },
    },
    onConnected() {
      console.log("连接成功");
    },
    onDisconnected() {
      console.log("断开");
    },
    onMessage() {
      console.log("来消息了");

      const msg = JSON.parse(data.value);
      console.log("消息", msg);
    },
    onError(err) {
      console.error(err);
    },
  }
);

let notReadInfoRes = await getNotReadInfo(userinfo.value.userId);
const {
  commentLikeCnt,
  commentReplyCnt,
  postCollectCnt,
  postCommentCnt,
  postLikeCnt,
} = notReadInfoRes.data.value.data;
notReadInfo.commentLikeCnt = commentLikeCnt;
notReadInfo.commentReplyCnt = commentReplyCnt;
notReadInfo.postCollectCnt = postCollectCnt;
notReadInfo.postCommentCnt = postCommentCnt;
notReadInfo.postLikeCnt = postLikeCnt;
console.log(notReadInfoRes);

const getInfo = async () => {
  let messageRes = await useGetMessageInfo({
    pageNo: pageInfo.value.currentPage,
    pageSize: pageInfo.value.pageSize,
    type: curType.value,
    userId: userinfo.value.userId,
  });

  console.log(messageRes);
  if (messageRes) {
    let { current, pages, total, pageSize } = messageRes?.resPageInfo;
    messageStore.ChangePageInfo({
      pageSize: pageSize,
      currentPage: current,
      total: total,
    });

    infoList.value = messageRes.infoResList;
    console.log(pageInfo.value);
  }
};

const handleSizeChange = (val: number) => {
  pageInfo.value.pageSize = val;
  getInfo();
};

const handleCurrentChange = (val: number) => {
  pageInfo.value.currentPage = val;
  getInfo();
};
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
  // height: 100vh;
  overflow: hidden;
}

.mainContent {
  display: flex;
  width: $originalWidth;
  // height: calc(100% - 200px);
  margin: 0 auto;
  margin-top: 175px;
  padding-bottom: 50px;
}

.siderBar {
  width: 150px;
  height: max-content;
  background-color: #8babfc;
  border-radius: 5px;
  color: #fff;
  overflow: auto;

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
      height: 50px;
      font-size: 16px;
      line-height: 45px;
      padding-left: 30px;
      box-sizing: border-box;
      cursor: pointer;
      border-radius: 4px;
      transition: color 0.1s;
      transition: background-color 0.1s;
      margin: 10px 0;

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

.item {
  line-height: 35px;
}
// .page-enter-active {
//   animation: slideInLeft 0.5s;
// }
// .page-leave-active {
//   animation: slideOutLeft 0.3s;
// }
.messageContainer {
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: space-between;
  flex: 1;
  background-color: rgba(#fff, 0.7);
  margin-left: 20px;
  height: max-content;
  position: relative;
  border-radius: 10px;
  overflow-x: hidden;
  min-height: 400px;
  // overflow: auto;
}

.active {
  background-color: #fff;
  color: #8babfc;
}
</style>
