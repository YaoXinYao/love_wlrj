<!-- 消息中心 -->
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
              <span
                @click="
                  handleClick('postLike', 'PostLike', notReadNum.postLikeCnt)
                "
                ><el-badge
                  :value="notReadNum.postLikeCnt"
                  :hidden="!(notReadNum.postLikeCnt > 0)"
                  :max="99"
                  class="item"
                  ><span class="iconfont">&#xec7f;</span>帖子点赞</el-badge
                ></span
              >
            </li>
            <li
              :class="
                route.path === '/messageCenter/postCollect' ? 'active' : ''
              "
            >
              <span
                @click="
                  handleClick(
                    'postCollect',
                    'PostCollect',
                    notReadNum.postCollectCnt
                  )
                "
                ><el-badge
                  :value="notReadNum.postCollectCnt"
                  :hidden="!(notReadNum.postCollectCnt > 0)"
                  :max="99"
                  class="item"
                  ><span class="iconfont">&#xe65e;</span>帖子收藏</el-badge
                >
              </span>
            </li>
            <li
              :class="
                route.path === '/messageCenter/postComment' ? 'active' : ''
              "
            >
              <span
                @click="
                  handleClick(
                    'postComment',
                    'PostComment',
                    notReadNum.postCommentCnt
                  )
                "
                ><el-badge
                  :value="notReadNum.postCommentCnt"
                  :hidden="!(notReadNum.postCommentCnt > 0)"
                  :max="99"
                  class="item"
                  ><span class="iconfont">&#xe8b4;</span>帖子评论</el-badge
                >
              </span>
            </li>
            <li
              :class="
                route.path === '/messageCenter/commentLike' ? 'active' : ''
              "
            >
              <span
                @click="
                  handleClick(
                    'commentLike',
                    'CommentLike',
                    notReadNum.commentLikeCnt
                  )
                "
                ><el-badge
                  :value="notReadNum.commentLikeCnt"
                  :hidden="!(notReadNum.commentLikeCnt > 0)"
                  :max="99"
                  class="item"
                >
                  <span class="iconfont">&#xec7f;</span>评论点赞</el-badge
                >
              </span>
            </li>

            <li
              :class="
                route.path === '/messageCenter/commentReply' ? 'active' : ''
              "
            >
              <span
                @click="
                  handleClick(
                    'commentReply',
                    'CommentReply',
                    notReadNum.commentReplyCnt
                  )
                "
                ><el-badge
                  :value="notReadNum.commentReplyCnt"
                  :hidden="!(notReadNum.commentReplyCnt > 0)"
                  :max="99"
                  class="item"
                  ><span class="iconfont">&#xe8b4;</span>评论回复</el-badge
                >
              </span>
            </li>
          </ul>
        </div>

        <div class="messageContainer">
          <NuxtPage class="animate__animated animate__fadeIn"></NuxtPage>
          <el-pagination
            v-show="pageInfo.total"
            class="pagination"
            v-model:current-page="pageInfo.currentPage"
            v-model:page-size="pageInfo.pageSize"
            :page-sizes="[5, 10]"
            :small="true"
            :background="true"
            :layout="paginationLayout"
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
import { fastReadService, getNotReadInfo } from "~/service/message";
import { useHomestore } from "~/store/home";
import { storeToRefs } from "pinia";
import { debounce } from "lodash";
import { useMessageStore } from "~/store/message";
import { useGetMessageInfo } from "~/hooks/useGetMessageInfo";
import { useGetNotReadMessage } from "~/hooks/useGetNotReadMessage";
const homeStore = useHomestore();
let { userinfo } = storeToRefs(homeStore);
const messageStore = useMessageStore();
const windowWidth = ref(window.innerWidth);
let paginationLayout = ref<string>("total, sizes, prev, pager, next, jumper");
const { curType, pageInfo, infoList, notReadNum } = storeToRefs(messageStore);
const route = useRoute();
definePageMeta({
  layout: "person",
  roles: 1,
});

onMounted(() => {
  getInfo();
  //获取未读信息数量并存于store
  useGetNotReadMessage();
  if (window.innerWidth <= 800) {
    paginationLayout.value = "total, prev, pager, next";
  } else {
    paginationLayout.value = "total, sizes, prev, pager, next, jumper";
  }
  window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const handleResize = debounce(() => {
  windowWidth.value = window.innerWidth;

  if (windowWidth.value <= 800) {
    paginationLayout.value = "total, prev, pager, next";
  } else {
    paginationLayout.value = "total, sizes, prev, pager, next, jumper";
  }
}, 200); // 设置防抖延迟时间，单位为毫秒

let timer: NodeJS.Timeout | null = null;
const clickCount = ref(0);

const handleClick = async (
  page: string,
  msgType: string,
  notReadInfoNum: number
): Promise<void> => {
  clickCount.value++;

  if (clickCount.value === 1) {
    timer = setTimeout(() => {
      if (clickCount.value === 1) {
        navigateTo("/messageCenter/" + page);
      }

      clickCount.value = 0;
    }, 300); // 设置延迟时间，单位为毫秒
  } else {
    if (timer) {
      clearTimeout(timer);
    }
    clickCount.value = 0;

    if (route.path.split("/")[2] == page) {
      // 执行双击事件
      if (notReadInfoNum) {
        ElMessageBox.confirm("确定要全部已读该类型消息吗？", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          let fastReadRes = await fastReadService({
            msgAccept: userinfo.value.userId,
            msgType: msgType,
          });
          if (fastReadRes.data.value.code == 20000) {
            ElMessage({
              type: "success",
              message: "操作成功~",
            });

            //获取未读信息数量并存于store
            useGetNotReadMessage();
          } else {
            ElMessage({
              type: "error",
              message: "操作失败！请检查网络~",
            });
          }
        });
      }
    } else {
      navigateTo("/messageCenter/" + page);
    }
  }
};

//利用自己封装的hook获取消息数据
const getInfo = async () => {
  let messageRes = await useGetMessageInfo({
    pageNo: pageInfo.value.currentPage,
    pageSize: pageInfo.value.pageSize,
    type: curType.value,
    userId: userinfo.value.userId,
  });

  if (messageRes) {
    let { current, pages, total, pageSize } = messageRes?.resPageInfo;
    messageStore.ChangePageInfo({
      pageSize: pageSize,
      currentPage: current,
      total: total,
    });

    infoList.value = messageRes.infoResList;
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
  height: 100vh;
  overflow: auto;
}

.mainContent {
  display: flex;
  width: $originalWidth;
  // height: calc(100% - 60px);
  margin: 0 auto;
  margin-top: 100px;
  transition: width 0.3s;
}

.siderBar {
  width: 170px;
  height: max-content;
  background-color: #8babfc;
  border-radius: 5px;
  color: #fff;
  overflow: auto;
  position: sticky;
  top: 100px;

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

    li:last-child {
      margin: 0 0;
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
  border-radius: 5px;
  overflow-x: auto;
  min-height: 400px;
  // overflow: auto;
}

.active {
  background-color: #fff;
  color: #8babfc;
}

.pagination {
  height: 50px;
  width: max-content;
  margin-left: 20px;
  margin-bottom: 20px;
}
@media screen and (max-width: 1050px) {
  .mainContent {
    width: $scaleWidth1;
  }
}

@media screen and (max-width: 850px) {
  .mainContent {
    width: $scaleWidth2;
  }
}
@media screen and (max-width: 650px) {
  .mainContainer {
    width: $scaleWidth3;
  }
}
</style>
