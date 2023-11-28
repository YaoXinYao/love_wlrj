<template>
  <div class="main" v-loading="loadings">
    <div class="title">
      <div>相关帖子</div>
      <div class="signleHome" v-if="userinfo.userId != 0">
        <NuxtLink to="/forum/person">个人主页</NuxtLink>
      </div>
    </div>
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
            >{{ item.postTitle }}</NuxtLink
          >
          <div class="cardUser">
            发表于<span>{{ item.postTime }}</span
            >|<span>{{ item.userName }}</span>
          </div>
          <div class="cardContent">
            {{ item.postContent }}
          </div>
          <ul class="icons">
            <li>
              <el-icon><ChatDotRound color="black" /></el-icon>
            </li>
            <li>
              <svg
                v-if="item.likes == true"
                @click="
                  postLike(item.postId, 'Like', 0, index, item.postUserId)
                "
                t="1699003181186"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1536"
                width="18"
                height="18"
              >
                <path
                  d="M981.714286 250.971429a297.188571 297.188571 0 0 0-65.028572-94.628572 302.171429 302.171429 0 0 0-96-63.428571A303.245714 303.245714 0 0 0 703.657143 69.714286c-56.342857 0-111.314286 15.428571-159.085714 44.571428-11.428571 6.971429-22.285714 14.628571-32.571429 22.971429-10.285714-8.342857-21.142857-16-32.571429-22.971429-47.771429-29.142857-102.742857-44.571429-159.085714-44.571428-40.571429 0-79.885714 7.771429-117.028571 23.2-35.885714 14.857143-68.228571 36.228571-96 63.428571a295.36 295.36 0 0 0-65.028572 94.628572c-15.885714 36.914286-24 76.114286-24 116.457142 0 38.057143 7.771429 77.714286 23.2 118.057143 12.914286 33.714286 31.428571 68.685714 55.085715 104 37.485714 55.885714 89.028571 114.171429 153.028571 173.257143 106.057143 97.942857 211.085714 165.6 215.542857 168.342857l27.085714 17.371429c12 7.657143 27.428571 7.657143 39.428572 0l27.085714-17.371429c4.457143-2.857143 109.371429-70.4 215.542857-168.342857 64-59.085714 115.542857-117.371429 153.028572-173.257143 23.657143-35.314286 42.285714-70.285714 55.085714-104 15.428571-40.342857 23.2-80 23.2-118.057143 0.114286-40.342857-8-79.542857-23.885714-116.457142z"
                  p-id="1537"
                  fill="#d81e06"
                ></path>
              </svg>
              <svg
                v-if="item.likes == false"
                @click="
                  postLike(item.postId, 'Like', 1, index, item.postUserId)
                "
                t="1699003334612"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1743"
                width="18"
                height="18"
              >
                <path
                  d="M510.663562 927.365102c-3.371794-0.022513-6.751774-0.654916-10.009981-2.096754-5.13802-2.270716-127.142725-56.824193-242.309698-160.071695-68.322062-61.251016-119.862925-126.960577-153.194055-195.305151-42.255383-86.644359-55.178717-177.434132-38.411844-269.847892 14.393825-79.334883 66.023716-147.431817 138.109497-182.160783 74.214259-35.754319 159.371754-31.628348 239.788272 11.617596 31.80845 17.105586 52.518121 35.221176 65.965387 51.980885 13.447267-16.759709 34.155914-34.875299 65.964365-51.980885 80.415494-43.245943 165.575036-47.371914 239.789294-11.617596C888.438535 152.611793 940.068426 220.709751 954.462251 300.04361c16.766872 92.413759 3.842515 183.203532-38.411845 269.847892-33.331129 68.344574-84.871993 134.054135-153.195078 195.305151-115.165949 103.247502-237.171678 157.799956-242.309698 160.071695a24.38948 24.38948 0 0 1-9.882068 2.096754z m-200.402239-784.52793c-29.217439 0-57.642838 6.357801-84.171028 19.138896-58.020438 27.951609-99.589183 82.832544-111.195522 146.804531-27.077705 149.247162 31.874965 290.276153 175.222767 419.167708 91.187839 81.993432 189.56645 132.928498 220.482577 147.919934 30.91715-14.991436 129.295761-65.926502 220.4836-147.919934C874.430496 599.056752 933.383166 458.027761 906.305461 308.780599 894.699122 244.808612 853.131401 189.9287 795.110963 161.976068c-59.727313-28.77537-129.108496-25.001417-195.365526 10.630105-59.891042 32.208563-80.505545 92.321662-89.14532 92.343151-8.653077 0.021489-29.253254-60.134589-89.146343-92.343151-36.827767-19.805068-74.627674-29.769001-111.192451-29.769001z"
                  fill=""
                  p-id="1744"
                ></path>
              </svg>
              <span>{{ item.postLike }}</span>
            </li>
            <li>
              <el-icon
                v-if="item.collect == false"
                @click="
                  postLike(item.postId, 'Collect', 1, index, item.postUserId)
                "
                ><Star
              /></el-icon>
              <el-icon
                v-if="item.collect == true"
                @click="
                  postLike(item.postId, 'Collect', 0, index, item.postUserId)
                "
                ><StarFilled
                  color="yellow"
                  style="font-size: 23px; margin-top: -4px"
              /></el-icon>
              <span>{{ item.postCollect }}</span>
            </li>
            <li>
              <el-icon><Sunny color="#ca5120" /></el-icon
              ><span>{{ item.postView }}</span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <div class="noDataImg" v-if="pagesData.length == 0">
      <img class="noData" src="/images/暂无.svg" />
    </div>
    <div class="loadText" v-if="shows == 1" @click="nextData">
      <span>点击加载更多</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ChatDotRound, Star, StarFilled, Sunny } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { useWebSocket } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { forumStore } from "~/store/forum";
import { useHomestore } from "~/store/home";
let userData = useHomestore();
let { userinfo } = storeToRefs(userData);
let forums = forumStore();
const { datas, pages, uploadRender, postSubId, postSource, loadings } =
  storeToRefs(forums);
let pageNo = ref(1);
let pagesData = ref<any[]>([]);
let shows = ref(1);
const route = useRoute();
const { status, data, send, open, close } = useWebSocket(
  `ws://152.136.161.44:19491/forum/swagger/forum/websocket/+${userinfo.value.userId}`,
  {
    autoReconnect: {
      retries: 8,
      delay: 1000,
      onFailed() {
        alert("Failed to connect WebSocket after 8 retries");
      },
    },
  }
);
onMounted(() => {
  fetchData(userinfo.value.userId);
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
  console.log("发送成功");
};
//查询帖子
function fetchData(userId: any) {
  if (postSource.value && postSubId.value != 0) {
    forums
      .selectPost(userId, pageNo.value, 30, postSource.value, postSubId.value)
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          pagesData.value.push({ ...res[i] });
        }
        pageNo.value++;
        if (pageNo.value > pages.value) {
          shows.value = 0;
        }
      });
    return;
  } else if (!postSource.value && postSubId.value != 0) {
    forums
      .selectPost(userId, pageNo.value, 30, "", postSubId.value)
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          pagesData.value.push({ ...res[i] });
        }
        pageNo.value++;
        if (pageNo.value > pages.value) {
          shows.value = 0;
        }
      });
    return;
  } else if (postSource.value && postSubId.value == 0) {
    forums
      .selectPost(userId, pageNo.value, 30, postSource.value)
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          pagesData.value.push({ ...res[i] });
        }
        pageNo.value++;
        if (pageNo.value > pages.value) {
          shows.value = 0;
        }
      });
    return;
  } else if (!postSource.value && postSubId.value == 0) {
    forums.selectPost(userId, pageNo.value, 30).then((res) => {
      for (let i = 0; i < res.length; i++) {
        pagesData.value.push({ ...res[i] });
      }
      pageNo.value++;
      if (pageNo.value > pages.value) {
        shows.value = 0;
      }
    });
    return;
  }
}
const nextData = () => {
  fetchData(userinfo.value.userId);
};
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
            sentMessage(postUserId,"点赞了你的帖子","PostLike",postId)
          } else if (res == 53003) {
            ElMessage.warning("请勿重复点赞");
          } else {
            ElMessage.error("点赞失败");
          }
        } else {
          if (res == 20000) {
            pagesData.value[index].collect = true;
            ElMessage.success("收藏成功");
            sentMessage(postUserId,"收藏了了你的帖子","PostCollect",postId)
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
watch(datas, (newValue, oldValue) => {
  if (uploadRender.value) {
    pageNo.value = 1;
    pagesData.value = [];
    uploadRender.value = false;
    fetchData(userinfo.value.userId);
  }
});
</script>

<style lang="scss" scoped>
.main {
  width: 82%;
  margin: 0 auto;
  .title {
    font-size: 24px;
    font-weight: 400;
    font-family: "阿里妈妈刀隶体";
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    .signleHome {
      font-size: 16px;
      cursor: pointer;
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
  margin-bottom: 40px;
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
        width: 200px;
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
        i {
          font-size: 18px;
          margin-top: 5px;
          cursor: pointer;
        }
        svg {
          width: 18px;
          height: 18px;
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
