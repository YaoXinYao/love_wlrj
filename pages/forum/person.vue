<template>
  <div class="home">
    <div class="header">
      <div class="userNews">
        <div class="photo">
          <span class="left"></span>
          <span class="right"></span>
          <span class="top"></span>
          <div class="userHead">
            <img
              :src="
                userinfo.userPicture === '未设置'
                  ? '/images/female.png'
                  : userinfo.userPicture
              "
            />
          </div>
        </div>
        <div class="userInfo">
          <div>
            {{ userinfo.userName }}<span>{{ userinfo.roleName }}</span>
          </div>
          <ul>
            <li>作品</li>
            <li>点赞</li>
            <li>收藏</li>
          </ul>
        </div>
      </div>
      <div class="newsbg"></div>
    </div>
    <div class="main">
      <div class="introduce">
        <div class="triangle"></div>
        <div class="con">关于我</div>
        <ul>
          <li>姓名：{{ userinfo.userName }}</li>
          <li>班级：{{ userinfo.userClass }}</li>
          <li>年级: {{ userinfo.userGrade }}</li>
          <li>作品: {{ total }}</li>
        </ul>
      </div>
      <div class="article">
        <ul>
          <li class="details" v-for="(item, index) in posts" :key="index">
            <div v-if="item.photos.length == 0" class="noImg">
              <div class="detailsTitle">
                <NuxtLink
                  @click="
                    navigateTo({
                      path: '/forum/details',
                      query: { data: item.postId },
                    })
                  "
                  >{{ item.postTitle }}</NuxtLink
                >
                <span>{{ item.postTime }}</span>
              </div>
              <div class="detailsContent">
                <NuxtLink
                  @click="
                    navigateTo({
                      path: '/forum/details',
                      query: { data: item.postId },
                    })
                  "
                >
                  {{ item.postContent }}
                </NuxtLink>
              </div>
              <div class="detailsData">
                <span>{{ item.postView }}阅读</span>
                <span>{{ item.postLike }}点赞</span>
                <span>{{ item.postCollect }}收藏</span>
              </div>
            </div>
            <div v-if="item.photos.length != 0" class="withImg">
              <div class="photos">
                <NuxtLink
                  @click="
                    navigateTo({
                      path: '/forum/details',
                      query: { data: item.postId },
                    })
                  "
                >
                  <img :src="item.photos[0]" />
                </NuxtLink>
              </div>
              <div class="news">
                <div class="title">
                  <NuxtLink
                    @click="
                      navigateTo({
                        path: '/forum/details',
                        query: { data: item.postId },
                      })
                    "
                    >{{ item.postTitle }}</NuxtLink
                  >
                </div>
                <div class="timer">{{ item.postTime }}</div>
                <div class="content">
                  <NuxtLink
                    @click="
                      navigateTo({
                        path: '/forum/details',
                        query: { data: item.postId },
                      })
                    "
                    >{{ item.postContent }}</NuxtLink
                  >
                </div>
                <div class="data">
                  <span>{{ item.postView }}阅读</span>
                  <span>{{ item.postLike }}点赞</span>
                  <span>{{ item.postCollect }}收藏</span>
                </div>
              </div>
            </div>
          </li>
          <el-pagination layout="prev, pager, next" :total="total" 
          @current-change="handleCurrentChange"
          />
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { forumStore } from "~/store/forum";
import { useHomestore } from "~/store/home";
let userData = useHomestore();
let { userinfo } = storeToRefs(userData);
let forums = forumStore();
let { total} = storeToRefs(forums);

let posts = ref<any[]>([]);
onMounted(() => {
  forums
    .userPosts(1, 8, undefined, undefined, undefined, userinfo.value.userId)
    .then((res) => {
      posts.value = res;
    });
});
const handleCurrentChange = (val: number) => {
    forums
    .userPosts(val, 8, undefined, undefined, undefined, userinfo.value.userId)
    .then((res) => {
      posts.value = res;
    });
}
</script>

<style lang="scss" scoped>
.home {
  margin: 0 auto;
  .header {
    width: 100%;
    height: 400px;
    position: relative;
    background-image: url("@/assets/image/person.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
  }
  .main {
    max-width: 1000px;
    margin: 20px auto;
    padding: 10px 0px;
    display: flex;
    justify-content: center;
    .introduce {
      flex: 0 0 150px;
      height: 300px;
      border-radius: 3px;
      border: 5px rgba(255, 255, 255, 0.74) solid;
      background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
    }
    .article {
      flex: 1;
      overflow: hidden;
      margin-left: 20px;
      ul {
        list-style: none;
        li {
          min-height: 150px;
          max-height: 170px;
          border-radius: 7px;
          background-color: rgb(237 237 237 / 40%);
          padding: 10px;
          margin-bottom: 20px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
}
.header {
  .userNews {
    position: absolute;
    max-width: 1040px;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    z-index: 5;
    margin-bottom: 10px;
    padding: 0 20px;
    .photo {
      position: relative;
      .left,
      .right {
        position: absolute;
        width: 7px;
        height: 57px;
        background-color: rgb(176 167 167 / 43%);
      }
      .top {
        position: absolute;
        height: 7px;
        width: 100px;
        background-color: rgb(176 167 167 / 43%);
      }
      .left {
        left: -7px;
        top: -7px;
        border-top-left-radius: 8px;
      }
      .right {
        left: 100px;
        top: -7px;
        border-top-right-radius: 8px;
      }
      .top {
        top: -7px;
      }
      .userHead {
        height: 100px;
        width: 100px;
        border: 5px rgba(255, 255, 255, 0.74) solid;
        border-radius: 4px;
        background-color: rgb(215, 212, 211);
        img {
          height: 100px;
          width: 100px;
          border-radius: 3px;
        }
      }
    }
    .userInfo {
      margin-left: 30px;
      div {
        height: 50px;
        line-height: 60px;
        color: aliceblue;
        font-size: 22px;
        font-family: "阿里妈妈刀隶体";
        span {
          font-size: 15px;
          margin-left: 10px;
        }
      }
      ul {
        width: 200px;
        height: 50px;
        line-height: 50px;
        list-style: none;
        display: flex;
        justify-content: space-around;
        color: rgba(240, 248, 255, 0.845);
        li {
          cursor: pointer;
          position: relative;
        }
        li::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background-color: rgba(255, 255, 255, 0.836);
          transition: all 0.3s;
          transform: scaleX(0);
        }
        li:hover::after {
          transform: scaleX(1);
        }
        li:hover {
          color: rgb(0, 128, 255);
        }
      }
    }
  }
  .newsbg {
    position: absolute;
    width: 100%;
    height: 60px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: rgb(176 167 167 / 43%);
  }
}
.introduce {
  .triangle {
    width: 0;
    height: 0;
    border-top: 80px solid #f4f1f138;
    border-right: 80px solid transparent;
    border-bottom: 0;
    border-left: 80px solid transparent;
  }

  .con {
    color: azure;
    font-size: 17px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 0px 15px;
  }
  ul {
    list-style: none;
    padding: 20px 15px;
    margin: 0 auto;
    li {
      margin-bottom: 10px;
      font-size: 14px;
      color: azure;
    }
  }
}
.article {
  .details {
    position: relative;
    .noImg {
      .detailsTitle {
        height: 20px;
        width: 100%;
        line-height: 20px;
        font-size: 18px;
        position: relative;
        margin-bottom: 10px;
        cursor: pointer;
        span {
          display: inline-block;
          position: absolute;
          right: 50px;
          font-size: 16px;
        }
      }
      .detailsContent {
        text-indent: 2em;
        line-height: 23px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        cursor: pointer;
      }
      .detailsData {
        position: absolute;
        display: flex;
        min-width: 200px;
        justify-content: space-around;
        bottom: 10px;
        span {
          display: inline-block;
        }
      }
    }
    .withImg {
      display: flex;
      .photos {
        flex: 0 0 300px;
        height: 150px;
        border-radius: 7px;
        margin-right: 30px;
        overflow: hidden;
        cursor: pointer;
        img {
          width: 100%;
          height: 150px;
          border-radius: 2px;
          -o-object-fit: cover;
          object-fit: cover;
          display: block;
          border: 1px solid #f5f6f7;
        }
      }
      @media screen and (max-width: 768px) {
        .photos {
          flex: 0 0 175px;
        }
      }
      .news {
        flex: 1;
        .title {
          cursor: pointer;
          height: 20px;
          line-height: 20px;
          font-size: 18px;
          margin-bottom: 10px;
        }
        .timer {
          font-size: 16px;
          margin-bottom: 10px;
        }
        .content {
          text-indent: 2em;
          line-height: 23px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          cursor: pointer;
        }
        .data {
          position: absolute;
          display: flex;
          min-width: 200px;
          justify-content: space-around;
          bottom: 10px;
          span {
            display: inline-block;
          }
        }
      }
    }
  }
  .el-pagination {
    --el-pagination-bg-color: rgb(244, 248, 251);
    --el-pagination-button-disabled-bg-color: rgb(244, 248, 251);
  }
}
</style>
