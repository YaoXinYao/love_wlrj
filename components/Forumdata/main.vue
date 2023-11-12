<template>
  <div class="main">
    <div class="title">相关帖子</div>
    <ul class="posts">
      <li v-for="(item, index) in pagesData" :key="index">
        <div class="cardTop">
          <div class="userInfo">
            <div>
              <img v-if="item.head" :src="item.head" />
            </div>
            <div>
              <p>{{ item.userName }}</p>
              <p class="time">{{ item.postTime }}</p>
            </div>
          </div>
        </div>
        <h4 class="cardTitle">{{ item.postTitle }}</h4>
        <div class="cardContent">{{ item.postContent }}</div>
        <div class="cardImage">
          <img v-for="(u, o) in item.photos" :key="o" :src="u" />
        </div>
        <div class="icon">
          <el-icon><ChatDotRound color="black" /></el-icon>
          <svg
            v-if="item.likes == true"
            @click="item.likes = false"
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
            @click="item.likes = true"
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
        </div>
      </li>
    </ul>
    <div class="footer">
      <span>{{ footNews }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ChatDotRound } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { forumStore } from "~/store/forum";
let forums = forumStore();
const { datas, pages, uploadRender, postSubId, postSource } =
  storeToRefs(forums);
let pageNo = ref(1);
let pagesData = ref<any[]>([]);
let isLoading = ref(false);
let footNews = ref("加载中，请耐心等待...");
function fetchData() {
  if (isLoading.value) return;
  isLoading.value = true;
  if (postSource.value && postSubId.value != 0) {
    forums
      .selectPost(pageNo.value, 4, postSource.value, postSubId.value)
      .then((res) => {
        if (res) {
          pagesData.value = [...pagesData.value, ...res];
          pageNo.value++;
        }
        isLoading.value = false;
      });
  } else if (!postSource.value && postSubId.value != 0) {
    forums.selectPost(pageNo.value, 4, "", postSubId.value).then((res) => {
      if (res) {
        pagesData.value = [...pagesData.value, ...res];
        pageNo.value++;
      }
      isLoading.value = false;
    });
  } else if (postSource.value && postSubId.value == 0) {
    forums.selectPost(pageNo.value, 4, postSource.value).then((res) => {
      if (res) {
        pagesData.value = [...pagesData.value, ...res];
        pageNo.value++;
      }
      isLoading.value = false;
    });
  } else {
    forums.selectPost(pageNo.value, 4).then((res) => {
      if (res) {
        pagesData.value = [...pagesData.value, ...res];
        pageNo.value++;
      }
      isLoading.value = false;
    });
  }
}
function handleScroll() {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = window.innerHeight;
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    if (pageNo.value <= pages.value) {
      fetchData();
    } else if (pageNo.value > pages.value) {
      footNews.value = "已加载全部数据";
    }
  }
}

onMounted(() => {
  fetchData();
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
watch(datas, (newValue, oldValue) => {
  if (uploadRender.value) {
    footNews.value = "加载中，请耐心等待...";
    pageNo.value = 1;
    pagesData.value = [];
    uploadRender.value = false;
    handleScroll();
  }
});
</script>

<style lang="scss" scoped>
.main {
  max-width: 1100px;
  margin: 0 auto;
  .title {
    font-size: 24px;
    font-weight: 400;
    font-family: "阿里妈妈刀隶体";
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
  li {
    min-height: 100px;
    width: 98%;
    margin: auto;
    margin-top: 15px;
    padding-bottom: 15px;
    .cardTop {
      height: 50px;
      margin-bottom: 8px;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      .userInfo {
        display: flex;
        div {
          margin-right: 10px;
          font-size: 14px;
          p {
            margin-bottom: 0px;
            font-size: 12px;
          }
          .time {
            color: rgb(210 146 26);
          }
        }
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
      .regard {
        width: 80px;
        height: 30px;
        line-height: 28px;
        text-align: center;
        border-radius: 15px;
        color: black;
        cursor: pointer;
        background-color: rgb(252, 174, 72);
      }
    }
    .cardContent {
      margin-bottom: 9px;
      margin-top: 9px;
      text-indent: 2em;
    }
    .cardImage {
      img {
        width: 300px;
        height: 200px;
        object-fit: cover;
      }
    }
    .icon {
      overflow: hidden;
      margin-top: 3px;

      i {
        font-size: 18px;
        margin-left: 15px;
        margin-right: 20px;
        margin-top: 5px;
        cursor: pointer;
      }
      svg {
        cursor: pointer;
      }
    }
  }
}
</style>
