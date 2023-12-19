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
              v-if="userinfo.userPicture != '未设置'"
              :src="userinfo.userPicture"
            />
            <img
              v-if="userinfo.userPicture == '未设置'"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201912%2F26%2F20191226135004_nW4Jc.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698651724&t=05cf56641aeb49efcb3ac3375dc04390"
            />
          </div>
        </div>
        <div class="userInfo">
          <div>
            {{ userinfo.userName }}<span>{{ userinfo.roleName }}</span>
          </div>
          <ul>
            <li @click="changeStatus('artic')">作品</li>
            <li @click="changeStatus('like')">点赞</li>
            <li @click="changeStatus('collect')">收藏</li>
            <li class="showHome">
              <NuxtLink to="/forum/report">发布帖子</NuxtLink>
            </li>
            <li class="showHome">
              <NuxtLink to="/forum/home">返回论坛首页</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="newsbg"></div>
    </div>
    <div class="main" v-loading="loadings">
      <div class="introduce">
        <div class="triangle"></div>
        <div class="con">关于我</div>
        <ul>
          <li>姓名：{{ userinfo.userName }}</li>
          <li>班级：{{ userinfo.userClass }}</li>
          <li>年级: {{ userinfo.userGrade }}</li>
          <li>作品: {{ total }}</li>
          <li><NuxtLink to="/forum/report">发布帖子</NuxtLink></li>
          <li><NuxtLink to="/forum/home">返回论坛首页</NuxtLink></li>
        </ul>
      </div>
      <div class="article">
        <ul v-if="posts.length != 0">
          <li class="details" v-for="(item, index) in posts" :key="index">
            <div v-if="item.photos.length == 0" class="noImg">
              <div class="title">
                <NuxtLink
                  @click="
                    navigateTo({
                      path: '/forum/details',
                      query: { data: item.postId },
                    })
                  "
                  >{{ decodeURIComponent(item.postTitle) }}</NuxtLink
                >
              </div>
              <div class="postTime">
                发布博客 <span>{{ item.postTime.split(" ")[0] }}</span>
              </div>
              <div class="content">
                <NuxtLink
                  @click="
                    navigateTo({
                      path: '/forum/details',
                      query: { data: item.postId },
                    })
                  "
                  v-html="decodeURIComponent(item.postContent)"
                >
                </NuxtLink>
              </div>
              <div class="data">
                <div>
                  <span>{{ item.postView }}阅读</span>
                  <span>{{ item.postLike }}点赞</span>
                  <span>{{ item.postCollect }}收藏</span>
                </div>
                <div>
                  <el-button
                    type="danger"
                    v-if="jage == 'artic'"
                    @click="deletePost(item.postId)"
                    >删除</el-button
                  >
                  <el-button
                    type="warning"
                    v-if="jage == 'like'"
                    @click="deleteData(item.postId, 'Like')"
                    >取消</el-button
                  >
                  <el-button
                    type="warning"
                    v-if="jage == 'collect'"
                    @click="deleteData(item.postId, 'Collect')"
                    >取消</el-button
                  >
                </div>
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
                    >{{ decodeURIComponent(item.postTitle) }}</NuxtLink
                  >
                </div>
                <div class="postTime">
                  发布博客 <span>{{ item.postTime.split(" ")[0] }}</span>
                </div>
                <div class="content">
                  <NuxtLink
                    @click="
                      navigateTo({
                        path: '/forum/details',
                        query: { data: item.postId },
                      })
                    "
                    v-html="decodeURIComponent(item.postContent)"
                  ></NuxtLink>
                </div>
                <div class="data">
                  <div style="margin-top: 6px">
                    <span>{{ item.postView }}阅读</span>
                    <span>{{ item.postLike }}点赞</span>
                    <span>{{ item.postCollect }}收藏</span>
                  </div>
                  <div>
                    <el-button
                      type="danger"
                      v-if="jage == 'artic'"
                      @click="deletePost(item.postId)"
                      >删除</el-button
                    >
                    <el-button
                      type="warning"
                      v-if="jage == 'like'"
                      @click="deleteData(item.postId, 'Like')"
                      >取消</el-button
                    >
                    <el-button
                      type="warning"
                      v-if="jage == 'collect'"
                      @click="deleteData(item.postId, 'Collect')"
                      >取消</el-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </li>
          <el-pagination
            v-if="totaType != 0"
            layout="prev, pager, next"
            :total="totaType"
            :page-size="pages"
            v-model:current-page="pageNo"
            @current-change="handleCurrentChange"
          />
        </ul>
        <img class="noData" v-if="posts.length == 0" src="/images/暂无.svg" />
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
let { total, totaType, loadings } = storeToRefs(forums);
let pages = 15;
let pageNo = ref(1);
let posts = ref<any[]>([]);
let jage = ref("artic");
onMounted(() => {
  forums
    .userPosts(1, pages, undefined, undefined, undefined, userinfo.value.userId)
    .then((res) => {
      posts.value = res;
    });
});
//分页
const handleCurrentChange = (val: number) => {
  getStatus(val);
};
//查询帖子
function getStatus(pageNo: number) {
  if (jage.value == "artic") {
    forums
      .userPosts(
        pageNo,
        pages,
        undefined,
        undefined,
        undefined,
        userinfo.value.userId
      )
      .then((res) => {
        posts.value = res;
      });
  } else if (jage.value == "like") {
    forums
      .getKeeps("User", pageNo, pages, "Like", userinfo.value.userId)
      .then((res) => {
        posts.value = res;
      });
  } else {
    forums
      .getKeeps("User", pageNo, pages, "Collect", userinfo.value.userId)
      .then((res) => {
        posts.value = res;
      });
  }
}
//切换状态查询帖子
function changeStatus(status: string) {
  jage.value = status;
  pageNo.value = 1;
  getStatus(1);
}
//取消点赞或收藏
const deleteData = (postId: number, type: string) => {
  forums.addlike(postId, 0, type, userinfo.value.userId).then((res) => {
    if (res == 20000) {
      ElMessage.success("取消成功");
      let index = posts.value.findIndex((item) => {
        if (item.postId == postId) {
          return true;
        }
      });
      posts.value.splice(index, 1);
      totaType.value = totaType.value - 1;
    } else {
      ElMessage.success("取消失败");
    }
  });
};
//删除帖子
const deletePost = (id: number) => {
  let ids = [];
  ids[0] = id;
  forums.deletePosts(ids).then((res) => {
    if (res == 20000) {
      ElMessage.success("删除成功");
      let index = posts.value.findIndex((item) => {
        if (item.postId == id) {
          return true;
        }
      });
      posts.value.splice(index, 1);
      total.value = total.value - 1;
    } else {
      ElMessage.error("删除失败");
    }
  });
};
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
    margin: 20px auto 0px;
    padding: 10px 0px 30px;
    display: flex;
    justify-content: center;
    .introduce {
      flex: 0 0 150px;
      height: 350px;
      border-radius: 3px;
      border: 5px rgba(255, 255, 255, 0.74) solid;
      background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
    }
    .article {
      flex: 1;
      overflow: hidden;
      margin: 0 0 0 20px;
      min-height: 200px;
      position: relative;
      ul {
        list-style: none;
        li {
          height: 210px;
          border-radius: 7px;
          background-color: rgb(237 237 237 / 40%);
          padding: 10px;
          margin-bottom: 20px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        }
      }
      .noData {
        width: 200px;
        height: 100%;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        margin: auto;
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
        .showHome {
          display: none;
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
    .noImg{
      padding: 0 10px;
      .data{
        width: calc(100% - 10px) !important;
      }
    }
    .withImg {
      display: flex;
      .photos {
        flex: 0 0 300px;
        height: 190px;
        border-radius: 7px;
        margin-right: 30px;
        overflow: hidden;
        cursor: pointer;
        img {
          width: 100%;
          height: 190px;
          border-radius: 2px;
          -o-object-fit: cover;
          object-fit: cover;
          display: block;
          border: 1px solid #f5f6f7;
        }
      }
      @media screen and (max-width: 800px) {
        .photos {
          flex: 0 0 175px;
        }
      }
      .news {
        flex: 1;
        overflow: hidden;
      }
    }
    .title {
      height: 20px;
      line-height: 20px;
      font-size: 18px;
      margin-bottom: 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
    }
    .postTime {
      width: 100%;
      height: 16px;
      line-height: 16px;
      font-size: 14px;
      text-align: right;
      padding-right: 20px;
      margin-right: 20px;
    }
    .content {
      line-height: 23px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      cursor: pointer;
      height: 90px;
      margin: 10px 0;
      a {
        display: inline-block;
        p {
          text-indent: 2em;
        }
      }
    }
    .data {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      width: calc(100% - 20px);
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      span {
        display: inline-block;
        margin-right: 15px;
      }
    }
  }
  .el-pagination {
    button {
      background-color: transparent !important;
    }
    li {
      background-color: transparent;
    }
  }
}
//有图片和无图片公用样式
@media screen and (max-width: 800px) {
  .userInfo {
    ul {
      width: 300px !important;
    }
    .showHome {
      display: block !important;
    }
  }
  .introduce {
    display: none;
  }
  .article {
    margin: 0 10px !important;
  }
}
</style>
