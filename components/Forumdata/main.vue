<template>
  <div class="main" v-loading="loadings">
    <div class="search">
      <div>搜索帖子</div>
      <div>
        <el-input
          v-model="postSource"
          class="w-50 m-2"
          placeholder="搜索帖子"
          :suffix-icon="Search"
          @keyup.enter="searchPost(postSubId)"
        />
      </div>
    </div>
    <ul class="classify">
      <li :class="{ active: postSubId === 0 }" @click="searchPost(0)">全部</li>
      <li
        v-for="item in subfields"
        :key="item.subId"
        @click="searchPost(item.subId)"
        :class="{ active: postSubId === item.subId }"
      >
        {{ item.subName }}
      </li>
    </ul>
    <div
      v-infinite-scroll="loadData"
      :infinite-scroll-distance="200"
      :infinite-scroll-immediate="true"
      :infinite-scroll-delay="300"
    >
      <ul class="posts" v-if="pagesData.length != 0">
        <li class="card" v-for="(item, index) in pagesData" :key="index">
          <div class="cardPhotos">
            <NuxtLink
              @click="
                navigateTo({
                  path: '/forum/details',
                  query: { data: item.postId },
                })
              "
            >
              <img
                :src="
                  item.photos.length != 0
                    ? item.photos[0]
                    : 'https://img2.baidu.com/it/u=2312383180,3750420672&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800'
                "
              />
            </NuxtLink>
          </div>
          <div class="cardInfo">
            <NuxtLink
              @click="
                navigateTo({
                  path: '/forum/details',
                  query: { data: item.postId },
                })
              "
              class="cardTitle"
              >{{ decodeURIComponent(item.postTitle) }}</NuxtLink
            >
            <div class="cardUser">
              发表于<span>{{ item.postTime }}</span
              >|<span>{{ item.userName }}</span>
            </div>
            <div
              class="cardContent"
              v-html="decodeURIComponent(item.postContent)"
            ></div>
            <ul class="icons">
              <li>
                <svg
                  v-if="item.likes == false"
                  @click="
                    postLike(item.postId, 'Like', 1, index, item.postUserId)
                  "
                  t="1701500911398"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1162"
                  width="200"
                  height="200"
                >
                  <path
                    d="M510.93 882.57A49 49 0 0 1 476 868.12L173.93 566l1.75-1.75a238.3 238.3 0 0 1 189-383h0.32a236.47 236.47 0 0 1 146.15 50 238.33 238.33 0 0 1 335.41 333.4l1.35 1.35-21.38 21.4-0.15 0.15-280.57 280.57a49 49 0 0 1-34.88 14.45zM261.27 566l249.66 249.69L760.6 566l21.82-21.83 0.45-0.44c68.68-68.85 68.63-180.74-0.15-249.53a176.55 176.55 0 0 0-249.49-0.17l-22 21.94-21.78-21.67c-68.83-68.42-180.65-68.26-249.28 0.37s-68.79 180.46-0.38 249.33l21.72 21.85z"
                    p-id="1163"
                  ></path>
                </svg>
                <svg
                  v-if="item.likes == true"
                  @click="
                    postLike(item.postId, 'Like', 0, index, item.postUserId)
                  "
                  t="1701500927693"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1309"
                  width="200"
                  height="200"
                >
                  <path
                    d="M895.86 419.06a238.52 238.52 0 0 0-13.19-78.52c-0.09-0.24-0.17-0.49-0.25-0.73-0.48-1.35-1-2.69-1.47-4-0.15-0.42-0.31-0.84-0.47-1.26-0.55-1.47-1.12-2.92-1.71-4.37-0.06-0.17-0.13-0.34-0.2-0.5a238.46 238.46 0 0 0-367.72-98.38 236.47 236.47 0 0 0-146.15-50h-0.34a238.33 238.33 0 0 0-189 383l300.37 303.82a48.94 48.94 0 0 0 30.64 14.26 20.14 20.14 0 0 0 10.59-0.23 48.94 48.94 0 0 0 28.54-14l300.75-303.48a236.51 236.51 0 0 0 49.61-145.61z"
                    p-id="1310"
                    fill="#d81e06"
                  ></path>
                </svg>
              </li>
              <li>
                <svg
                  v-if="item.collect == false"
                  @click="
                    postLike(item.postId, 'Collect', 1, index, item.postUserId)
                  "
                  t="1701500961038"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1496"
                  width="200"
                  height="200"
                >
                  <path
                    d="M720.56 905.18A49.24 49.24 0 0 1 696.7 899L510.56 796.08l-1 0.56L324.42 899a49.26 49.26 0 0 1-72.44-51l36.18-221.78L132.57 466.7a49.26 49.26 0 0 1 27.82-83.09l212.76-32.5L466 153.34a49.26 49.26 0 0 1 89.17 0L648 351.11l1.1 0.16 211.65 32.34a49.26 49.26 0 0 1 27.83 83.09L733 626.16l0.17 1 36 220.74a49.37 49.37 0 0 1-48.57 57.24zM190.12 439.77l162.13 166.17-37.49 229.82 195.8-108.23 195.79 108.23-37.49-229.82L831 439.77l-223.74-34.19-96.7-206-96.7 206z"
                    p-id="1497"
                  ></path>
                </svg>
                <svg
                  v-if="item.collect == true"
                  @click="
                    postLike(item.postId, 'Collect', 0, index, item.postUserId)
                  "
                  t="1701500971988"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1643"
                  data-spm-anchor-id="a313x.manage_type_myprojects.0.i10.63463a81oLwQ58"
                  width="200"
                  height="200"
                >
                  <path
                    d="M900 416.67a49 49 0 0 0-39.27-33.06l-211.66-32.34-1.1-0.16-92.83-197.77A48.8 48.8 0 0 0 510.56 125 48.82 48.82 0 0 0 466 153.34L373.62 350.1l-0.47 1-212.76 32.5a49.26 49.26 0 0 0-27.82 83.09l155.59 159.47L252 847.94a49.25 49.25 0 0 0 72.44 51l186.12-102.86L696.7 899a49.26 49.26 0 0 0 72.43-51L733 626.16 888.55 466.7A49.06 49.06 0 0 0 900 416.67z"
                    p-id="1644"
                    fill="#f0ea43"
                  ></path>
                </svg>
              </li>
              <li>
                <svg
                  t="1701501024430"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1962"
                  width="200"
                  height="200"
                >
                  <path
                    d="M808.29 492.73c-7.34-40.8-20.3-77.42-38.54-108.82-23.14-39.86-54.75-71.26-93.93-93.34a19.997 19.997 0 0 0-21.47 1.17 20.014 20.014 0 0 0-8.01 19.95c0.07 0.38 7.12 38.49 4.84 81.07-1.22 22.83-5.33 49.82-16.43 70.87-0.05 0.1-0.21 0.08-0.22-0.04-2.69-23.22-8.63-52.83-21.28-84.5-16.54-41.43-41.16-77.9-73.18-108.39-39.13-37.28-89.31-65.52-149.18-83.96h-0.01a20.146 20.146 0 0 0-24.96 7.29 20.002 20.002 0 0 0 2.04 24.74c0.01 0.01 0.01 0.02 0.02 0.03 10.43 20.99 58.24 159.32 0.64 260.3-5.47 9.59-2.13 21.81 7.46 27.28 9.6 5.47 21.81 2.13 27.28-7.46 38.09-66.78 36.45-144.41 28.36-197.78-3.79-24.99-9.15-46.23-13.85-61.89-0.03-0.1 0.07-0.18 0.16-0.14 36.5 15.44 67.89 35.47 93.64 59.81 27.8 26.27 49.26 57.71 63.78 93.45 25.08 61.71 20.86 115.73 20.82 116.22-0.76 8.44 3.9 16.59 11.91 20.12 5.73 2.52 12.32 1.98 17.87-0.92 22.32-11.65 39.23-31.43 50.28-58.82 8.28-20.53 13.25-45.45 14.78-74.06 0.86-16.01 0.54-31.36-0.26-44.72-0.01-0.1 0.12-0.16 0.2-0.09 17.13 14.99 31.78 32.84 43.78 53.39 15.89 27.21 27.29 59.25 33.87 95.26 11.44 62.55 4.25 115.75 4.18 116.26-0.02 0.13-0.03 0.25-0.05 0.38-7.38 60.32-31.02 107.43-70.28 140.02-29.59 24.57-68.69 41.59-116.81 50.95 18.89-27.24 23.67-64.61 14.17-111.28-0.6-2.96-6.36-29.44-26.61-58.47-19.25-27.61-55.91-63.41-121.2-77.15-7.8-1.64-15.93 1.31-20.54 7.8-4.59 6.47-5.04 14.85-0.97 21.65 1.44 2.71 19.8 39.36-8.31 90.53 0 0 0 0.01-0.01 0.01-2.68 3.89-11.56 17.36-18.66 34.99-11.77 29.22-13.16 56.3-4.03 78.29 1.95 4.7 4.34 9.14 7.16 13.3-41.35-9.92-75.16-28.15-100.99-54.54-51.07-52.2-53.69-118.44-53.28-137.51 1.31-60.04 39.32-106.53 39.67-106.95 0.06-0.08 0.13-0.15 0.19-0.23 51.94-63.82 48.85-126.1 48.6-130.07h-0.02c-0.64-10.46-9.3-18.73-19.91-18.73-11.05 0-20 8.95-20 20 0 0.47 0.04 0.93 0.07 1.4h-0.02s2.37 50.38-39.64 102.05c-3.24 3.9-47.29 58.36-48.89 131.64-0.4 18.58 1.49 47.71 12.78 81.04 11.11 32.77 28.57 61.48 51.89 85.31 22.92 23.43 51.24 41.69 84.15 54.3 36.62 14.02 79.35 21.13 126.99 21.13 104.19 0 184.86-23.12 239.78-68.71 47.33-39.3 75.74-95.07 84.42-165.78 0.62-4.46 7.86-60.34-4.24-127.65zM455.5 701.74c0.46-0.63 0.88-1.29 1.26-1.97 20.08-35.99 22.78-67.67 20.2-90.84-0.01-0.09 0.08-0.16 0.16-0.12 25.79 10.81 46.7 27.3 62.41 49.26 16.3 22.79 20.92 43.6 21.17 44.78 0.01 0.08 0.01 0.06 0.04 0.18 7.79 38.27 4.09 66.74-10.98 84.62-17.85 21.18-47.98 22.56-53.81 22.62h-0.02c-32.53-5.39-52.49-16.43-59.35-32.83-10.67-25.52 10.05-63.32 18.92-75.7z"
                    p-id="1963"
                    fill="#e16531"
                  ></path>
                </svg>
                <span>{{ item.postView }}</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="noDataImg" v-if="pagesData.length == 0">
      <img class="noData" src="/images/暂无.svg" />
    </div>
    <div class="loadText" v-if="show == 1">
      <span>加载中，请稍候</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { useWebSocket } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { forumStore, forumManage } from "~/store/forum";
import { useHomestore } from "~/store/home";
let userData = useHomestore();
let { userinfo } = storeToRefs(userData);
let forums = forumStore();
let manages = forumManage();
let { subfields } = storeToRefs(manages);
const { pages, postSubId, postSource, loadings } = storeToRefs(forums);
let show = ref(0);
let pageNo = ref(1);
let pagesData = ref<any[]>([]);
const route = useRoute();
const { status, data, send, open, close } = useWebSocket(
  `ws://152.136.161.44:19491/forum/swagger/forum/websocket/+${userinfo.value.userId}`,
  {
    autoReconnect: {
      retries: 8,
      delay: 1000,
    },
  }
);
onMounted(() => {
  manages.subfieldInfo(1, 100);
  fetchData()
});
//发送消息
const sentMessage = (
  msgAccept: number,
  msgContent: string,
  msgType: string,
  msgContentId: number
) => {
  let obj = {
    msgAccept,
    msgContent,
    msgSend: userinfo.value.userId,
    msgType,
    msgContentId,
  };
  send(JSON.stringify(obj));
};
//搜索帖子
const searchPost = (ids: number) => {
  //非空值操作判断
  postSubId.value = ids;
  pageNo.value = 1;
  pagesData.value = [];
  fetchData();
};
//查询帖子
function loadData() {
  console.log(11111);
  console.log("pageNo", pageNo.value);
  if (pages.value > pageNo.value) {
    console.log("33333");
    if (show.value == 0) {
      console.log("222222");
      show.value = 1;
      fetchData();
    }
  }
}
function fetchData() {
  show.value = 1
  if (postSubId.value == 0) {
    console.log("pageNo.value", pageNo.value);
    forums
      .selectPost(userinfo.value.userId, pageNo.value, 10, postSource.value)
      .then((res) => {
        console.log("结果", res);
        console.log("页码", pageNo.value);
        for (let i = 0; i < res.length; i++) {
          pagesData.value.push({ ...res[i] });
        }
        show.value = 0;
        pageNo.value++;
        console.log("show", show.value);
      });
  } else {
    forums
      .selectPost(
        userinfo.value.userId,
        pageNo.value,
        10,
        postSource.value,
        postSubId.value
      )
      .then((res) => {
        console.log("结果", res);
        console.log("页码", pageNo.value);
        for (let i = 0; i < res.length; i++) {
          pagesData.value.push({ ...res[i] });
        }
        show.value = 0;
        pageNo.value++;
        console.log("show", show.value);
      });
  }
}
//点赞/收藏
function postLike(
  postId: number,
  type: string,
  status: number,
  index: number,
  postUserId: number
) {
  if (userinfo.value.userId == 0) {
    ElMessage.warning("请先登录");
  } else {
    forums.addlike(postId, status, type, userinfo.value.userId).then((res) => {
      if (status == 1) {
        if (type == "Like") {
          if (res == 20000) {
            pagesData.value[index].likes = true;
            ElMessage.success("点赞成功");
            sentMessage(postUserId, "点赞了你的帖子", "PostLike", postId);
          } else if (res == 53003) {
            ElMessage.warning("请勿重复点赞");
          } else {
            ElMessage.error("点赞失败");
          }
        } else {
          if (res == 20000) {
            pagesData.value[index].collect = true;
            ElMessage.success("收藏成功");
            sentMessage(postUserId, "收藏了了你的帖子", "PostCollect", postId);
          } else if (res == 53003) {
            ElMessage.warning("请勿重复收藏");
          } else {
            ElMessage.error("收藏失败");
          }
        }
      } else {
        if (type == "Like") {
          if (res == 20000) {
            pagesData.value[index].likes = false;
            ElMessage.success("取消点赞");
          } else if (res == 53004) {
            ElMessage.warning("请勿重复取消");
          } else {
            ElMessage.error("取消点赞失败");
          }
        } else {
          if (res == 20000) {
            pagesData.value[index].collect = false;
            ElMessage.success("取消收藏");
          } else if (res == 53004) {
            ElMessage.warning("请勿重复取消");
          } else {
            ElMessage.error("取消收藏失败");
          }
        }
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.main {
  max-width: 1100px;
  margin: 0 auto;
  .search {
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
    font-size: 18px;
  }
  .classify {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 0px 20px;
    overflow: hidden;
    li {
      display: inline-block;
      width: max-content;
      padding: 5px 12px;
      white-space: nowrap;
      text-align: center;
      background: #eaf6ff;
      border-radius: 15px;
      cursor: pointer;
    }
    li:hover {
      background-color: #86c8f8;
      color: #eaf6ff;
    }
    .active {
      background-color: #86c8f8;
      color: #eaf6ff;
    }
  }
  .footer {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    text-align: center;
    font-family: "阿里妈妈刀隶体";
    span {
      display: inline-block;
      width: max-content;
    }
  }
}
.posts {
  width: 100%;
  min-height: 100px;
  list-style: none;
  padding-bottom: 40px;
  .card {
    width: 98%;
    min-height: 16em;
    margin: auto;
    margin-top: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    display: flex;
    flex-wrap: wrap;
    .cardPhotos {
      overflow: hidden;
      width: 400px;
      height: 100%;
      img {
        width: 100%;
        height: 16em;
        object-fit: cover;
        transition: filter 375ms ease-in 0.2s, transform 0.6s;
      }
      img:hover {
        transform: scale(1.1);
      }
    }
    .cardInfo {
      flex: 1;
      min-width: 290px;
      margin: auto 0;
      padding: 0 30px;
      line-height: 2;
      overflow: hidden;
      font-family: "阿里妈妈刀隶体";
      .cardTitle {
        font-size: 20px;
        font-weight: 600;
        cursor: pointer;
      }
      .cardUser {
        color: rgb(125 2 2 / 75%);
        font-size: 14px;
        span {
          margin: 0 4px;
        }
      }
      .cardContent {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .icons {
        width: 150px;
        margin-top: 3px;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        overflow: hidden;
        li {
          height: 30px;
          width: max-content;
          line-height: 30px;
          text-align: center;
        }
        svg {
          width: 24px;
          height: 25px;
          cursor: pointer;
        }
      }
    }
  }
  .card:nth-of-type(odd) {
    flex-direction: row;
    .cardPhotos {
      border-radius: 15px 0 0 15px;
    }
  }
  .card:nth-of-type(even) {
    flex-direction: row-reverse;
    .cardPhotos {
      border-radius: 0 15px 15px 0;
    }
  }
}
.noDataImg {
  width: 100%;
  height: 220px;
  position: relative;
  .noData {
    width: 200px;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
.loadText {
  width: 100%;
  text-align: center;
  height: 25px;
  line-height: 25px;
  font-size: 17px;
  font-family: "阿里妈妈刀隶体";
  margin-bottom: 15px;
  cursor: pointer;
  span:hover {
    color: rgb(46, 158, 202);
  }
}
@media (max-width: 1015px) {
  .cardPhotos {
    width: 100% !important;
    border-radius: 15px 15px 0 0 !important;
  }
}
</style>
