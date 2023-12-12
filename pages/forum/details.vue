<template>
  <div class="deatils" v-loading = "detailLoading">
    <div
      class="bgphoto"
      v-if="singleData.photoShow == true"
      :style="{ backgroundImage: `url(${singleData.photos[0]})` }"
    ></div>
    <div class="bgphoto NoData" v-else></div>
    <div class="header">
      <NuxtLink to="/">首页</NuxtLink> >
      <NuxtLink to="/forum/home">论坛</NuxtLink> > 帖子详情
    </div>
    <div class="signle">
      <div class="content">
        <div class="text">
          <h2>{{ decodeURIComponent(singleData.postTitle) }}</h2>
          <div class="autorInfo">
            {{ singleData.userName }}<span>{{ singleData.postTime }}</span>
            <span>
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
              {{ singleData.postView }}
            </span>
          </div>
          <div
            class="textContent"
            v-html="decodeURIComponent(singleData.postContent)"
          ></div>
        </div>
      </div>
    </div>
    <div class="comments">
      <div :style="{ fontSize: '20px' }">评论</div>
      <div class="comment">
        <el-input
          type="textarea"
          v-model="conten"
          maxlength="200"
          placeholder="留言评论"
          show-word-limit
          :autosize="{ minRows: 5, maxRows: 8 }"
          input-style="background:#edf1f2"
        />
        <el-upload
          v-if="showImg || formImage.files.length != 0"
          class="uploadimg"
          action=""
          list-type="picture-card"
          :auto-upload="false"
          :multiple="true"
          accept="image/*"
          v-model:file-list="formImage.files"
        >
          <el-icon><Plus /></el-icon>
          <template #file="{ file }">
            <div>
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <el-icon><zoom-in /></el-icon>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>
        <div class="btn">
          <el-button type="primary" @click="submitData(0, 0)">提交</el-button>
          <el-button type="info" @click="cleardata()">清空</el-button>
          <el-button type="warning" @click="addImg">{{
            showImg ? "取消图片" : "添加图片"
          }}</el-button>
        </div>
      </div>
      <div class="disscussHead"><span>全部评论</span></div>
      <div class="discussNull" v-if="discuss.length == 0">
        <div></div>
      </div>
      <ul class="discuss">
        <li v-for="(item, index) in discuss" :key="index">
          <div class="cardTop">
            <div class="userInfo">
              <div>
                <img :src="item.head" alt="" />
              </div>
              <div>
                <p>{{ item.comUserName }}</p>
                <p class="time">{{ item.comTime }}</p>
              </div>
            </div>
          </div>
          <div class="cardContent">
            {{ item.comContent }}
          </div>
          <div class="cardImage">
            <img v-for="(u, o) in item.photos" :key="o" :src="u" />
          </div>
          <div class="icon">
            <el-icon
              ><ChatDotRound
                color="black"
                @click="addCom(item.comId, item.comUserId)"
            /></el-icon>
            <svg
              v-if="item.likes == true"
              @click="comLike(item.comId, 0, index, item.comUserId)"
              t="1699003181186"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1536"
            >
              <path
                d="M981.714286 250.971429a297.188571 297.188571 0 0 0-65.028572-94.628572 302.171429 302.171429 0 0 0-96-63.428571A303.245714 303.245714 0 0 0 703.657143 69.714286c-56.342857 0-111.314286 15.428571-159.085714 44.571428-11.428571 6.971429-22.285714 14.628571-32.571429 22.971429-10.285714-8.342857-21.142857-16-32.571429-22.971429-47.771429-29.142857-102.742857-44.571429-159.085714-44.571428-40.571429 0-79.885714 7.771429-117.028571 23.2-35.885714 14.857143-68.228571 36.228571-96 63.428571a295.36 295.36 0 0 0-65.028572 94.628572c-15.885714 36.914286-24 76.114286-24 116.457142 0 38.057143 7.771429 77.714286 23.2 118.057143 12.914286 33.714286 31.428571 68.685714 55.085715 104 37.485714 55.885714 89.028571 114.171429 153.028571 173.257143 106.057143 97.942857 211.085714 165.6 215.542857 168.342857l27.085714 17.371429c12 7.657143 27.428571 7.657143 39.428572 0l27.085714-17.371429c4.457143-2.857143 109.371429-70.4 215.542857-168.342857 64-59.085714 115.542857-117.371429 153.028572-173.257143 23.657143-35.314286 42.285714-70.285714 55.085714-104 15.428571-40.342857 23.2-80 23.2-118.057143 0.114286-40.342857-8-79.542857-23.885714-116.457142z"
                p-id="1537"
                fill="#d81e06"
              ></path>
            </svg>
            <svg
              v-if="item.likes == false"
              @click="comLike(item.comId, 1, index, item.comUserId)"
              t="1699003334612"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1743"
            >
              <path
                d="M510.663562 927.365102c-3.371794-0.022513-6.751774-0.654916-10.009981-2.096754-5.13802-2.270716-127.142725-56.824193-242.309698-160.071695-68.322062-61.251016-119.862925-126.960577-153.194055-195.305151-42.255383-86.644359-55.178717-177.434132-38.411844-269.847892 14.393825-79.334883 66.023716-147.431817 138.109497-182.160783 74.214259-35.754319 159.371754-31.628348 239.788272 11.617596 31.80845 17.105586 52.518121 35.221176 65.965387 51.980885 13.447267-16.759709 34.155914-34.875299 65.964365-51.980885 80.415494-43.245943 165.575036-47.371914 239.789294-11.617596C888.438535 152.611793 940.068426 220.709751 954.462251 300.04361c16.766872 92.413759 3.842515 183.203532-38.411845 269.847892-33.331129 68.344574-84.871993 134.054135-153.195078 195.305151-115.165949 103.247502-237.171678 157.799956-242.309698 160.071695a24.38948 24.38948 0 0 1-9.882068 2.096754z m-200.402239-784.52793c-29.217439 0-57.642838 6.357801-84.171028 19.138896-58.020438 27.951609-99.589183 82.832544-111.195522 146.804531-27.077705 149.247162 31.874965 290.276153 175.222767 419.167708 91.187839 81.993432 189.56645 132.928498 220.482577 147.919934 30.91715-14.991436 129.295761-65.926502 220.4836-147.919934C874.430496 599.056752 933.383166 458.027761 906.305461 308.780599 894.699122 244.808612 853.131401 189.9287 795.110963 161.976068c-59.727313-28.77537-129.108496-25.001417-195.365526 10.630105-59.891042 32.208563-80.505545 92.321662-89.14532 92.343151-8.653077 0.021489-29.253254-60.134589-89.146343-92.343151-36.827767-19.805068-74.627674-29.769001-111.192451-29.769001z"
                fill=""
                p-id="1744"
              ></path>
            </svg>
            <span
              v-if="item.comUserId == userinfo.userId"
              @click="deleteCom(item.comId)"
              >删除</span
            >
          </div>
          <ForumdataComment
            v-if="item.children.length != 0"
            :cimmentData="item.children"
          ></ForumdataComment>
        </li>
      </ul>
    </div>
    <el-dialog v-model="dialogVisible" style="max-width: 400px">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
    <el-dialog v-model="commentVisible" style="max-width: 450px">
      <h4>请文明发言</h4>
      <el-input
        type="textarea"
        v-model="contens"
        maxlength="200"
        placeholder="追加评论"
        show-word-limit
        :autosize="{ minRows: 5, maxRows: 8 }"
        input-style="margin-top:10px"
      />
      <el-upload
        class="uploadimg"
        action=""
        list-type="picture-card"
        :auto-upload="false"
        :multiple="true"
        accept="image/*"
        v-model:file-list="formImages.files"
      >
        <el-icon><Plus /></el-icon>
        <template #file="{ file }">
          <div>
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <el-icon><zoom-in /></el-icon>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemoves(file)"
              >
                <el-icon><Delete /></el-icon>
              </span>
            </span>
          </div>
        </template>
      </el-upload>
      <div class="btn">
        <el-button type="primary" @click="sureCom">提交</el-button>
        <el-button type="info" @click="cleardatas()">清空</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import { useWebSocket } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { forumStore } from "~/store/forum";
import { ref, watch } from "vue";
import type { UploadFile } from "element-plus";
import { Delete, Plus, ZoomIn, ChatDotRound } from "@element-plus/icons-vue";
import { useHomestore } from "~/store/home";
let userData = useHomestore();
let { userinfo } = storeToRefs(userData);
let forums = forumStore();
const { singleData, discuss,detailLoading } = storeToRefs(forums);
let conten = ref("");
let contens = ref("");
let commentNews = reactive<any>({
  comContent: "",
  comFatherId: 0,
  comPostId: 0,
  comRootId: 0,
  comUserId: userinfo.value.userId,
});
let formImage = reactive<any>({
  files: [],
});
let sendFatherId = ref(0);
let formImages = reactive<any>({
  files: [],
});
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);
let commentVisible = ref(false);
let showImg = ref(false);
let datas = useRoute().query.data;
commentNews.comPostId = datas;
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
let a = "<h1>111</h1>";
onMounted(() => {
  let id = Number(datas);
  forums.getSingle(id, userinfo.value.userId);
  forums.selectComment(id, userinfo.value.userId);
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
//父评论添加图片
const addImg = () => {
  if (showImg) {
    formImage.files = [];
  }
  showImg.value = !showImg.value;
};
//删除图片
const handleRemove = (file: UploadFile) => {
  const index = formImage.files.indexOf(file);
  if (index !== -1) {
    formImage.files.splice(index, 1);
    ElMessage.success("移除成功");
  }
};
//图片预览
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};
//清空数据
function cleardata() {
  conten.value = "";
  formImage.files = [];
}
//发布评论
const submitData = (comFatherId: number, comRootId: number) => {
  if (userinfo.value.userId == 0) {
    ElMessage.warning("请先登录");
  } else {
    let jage = true;
    let formData = new FormData();
    let comImg: any[] = [];
    let reg = /^\s+$/g;
    if (!reg.test(conten.value)) {
      if (formImage.files.length == 0 && conten.value == "") {
        ElMessage.warning("评论数据为空");
      } else {
        for (let i = 0; i < formImage.files.length; i++) {
          jage = formImage.files[i].raw.type.startsWith("image/");
          if (!jage) {
            ElMessage.warning("文件类型错误");
            i = formImage.files.length;
          } else {
            comImg.push(formImage.files[i].raw);
            formData.append(`comImg[${i}]`, formImage.files[i].raw);
          }
        }
        if (jage) {
          commentNews.comContent = conten.value;
          commentNews.comRootId = comRootId;
          commentNews.comFatherId = comFatherId;
          forums.addComment(commentNews, formData).then((res) => {
            if (res == 20000) {
              ElMessage.success("评论成功");
              if (singleData.value.postUserId != userinfo.value.userId) {
                sentMessage(
                  singleData.value.postUserId,
                  conten.value,
                  "PostComment",
                  singleData.value.postId
                );
              }
              forums.selectComment(Number(datas), userinfo.value.userId);
              conten.value = "";
              formImage.files = [];
            } else {
              ElMessage.error("评论失败");
            }
          });
        }
      }
    } else {
      ElMessage.warning("输入的内容为空格");
    }
  }
};
//删除评论
const deleteCom = (ids: number) => {
  let arr = [];
  arr.push(ids);
  forums.deleteComments(arr).then((res) => {
    if (res == 20000) {
      ElMessage.success("删除成功");
      let index = discuss.value.findIndex((item) => {
        if (item.comId == ids) {
          return true;
        }
      });
      discuss.value.splice(index, 1);
    } else {
      ElMessage.error("删除失败");
    }
  });
};
//添加评论弹窗
const addCom = (id: number, fatherId: number) => {
  commentVisible.value = true;
  commentNews.comFatherId = id;
  commentNews.comRootId = id;
  sendFatherId.value = fatherId;
};
//确认添加二级评论
const sureCom = () => {
  if (userinfo.value.userId == 0) {
    ElMessage.warning("请先登录");
  } else {
    let jage = true;
    let formData = new FormData();
    let comImg: any[] = [];
    let reg = /^\s+$/g;
    if (!reg.test(contens.value)) {
      if (formImages.files.length == 0 && contens.value == "") {
        ElMessage.warning("评论数据为空");
      } else {
        for (let i = 0; i < formImages.files.length; i++) {
          jage = formImages.files[i].raw.type.startsWith("image/");
          if (!jage) {
            ElMessage.warning("文件类型错误");
            i = formImages.files.length;
          } else {
            comImg.push(formImages.files[i].raw);
            formData.append(`comImg[${i}]`, formImages.files[i].raw);
          }
        }
        if (jage) {
          commentNews.comContent = contens.value;
          forums.addComment(commentNews, formData).then((res) => {
            if (res == 20000) {
              ElMessage.success("评论成功");
              if (userinfo.value.userId != sendFatherId.value) {
                sentMessage(
                  sendFatherId.value,
                  contens.value,
                  "CommentReply",
                  singleData.value.postId
                );
              }
              forums.selectComment(Number(datas), userinfo.value.userId);
              contens.value = "";
              formImages.files = [];
            } else {
              ElMessage.error("评论失败");
            }
          });
        }
        commentVisible.value = false;
      }
    } else {
      ElMessage.warning("输入的内容为空格");
    }
  }
};
//删除图片
const handleRemoves = (file: UploadFile) => {
  const index = formImages.files.indexOf(file);
  if (index !== -1) {
    formImages.files.splice(index, 1);
    ElMessage.success("移除成功");
  }
};
//清空数据
function cleardatas() {
  contens.value = "";
  formImages.files = [];
}
//点赞
function comLike(
  comId: number,
  status: number,
  index: number,
  comUserId: number
) {
  if (userinfo.value.userId == 0) {
    ElMessage.warning("请先登录");
  } else {
    forums.LikesComment(comId, status, userinfo.value.userId).then((res) => {
      if (status == 1) {
        if (res == 20000) {
          discuss.value[index].likes = true;
          ElMessage.success("点赞成功");
          if (comUserId != userinfo.value.userId) {
            sentMessage(
              comUserId,
              "点赞了你的评论",
              "CommentLike",
              singleData.value.postId
            );
          }
        } else if (res == 53003) {
          ElMessage.warning("请勿重复点赞");
        } else {
          ElMessage.error("点赞失败");
        }
      } else {
        if (res == 20000) {
          discuss.value[index].likes = false;
          ElMessage.success("取消点赞");
        } else if (res == 53004) {
          ElMessage.warning("请勿重复取消");
        } else {
          ElMessage.error("取消点赞失败");
        }
      }
    });
  }
}
watch(status, (newStatus) => {
  if (newStatus === "OPEN") {
    console.log("WebSocket connection established");
  }
});
</script>

<style lang="scss" scoped>
.deatils {
  padding: 0 0 30px;
  .bgphoto {
    width: 100%;
    height: 380px;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    background-position: center;
  }
  .bgphoto.NoData {
    background-image: url("/assets/image/back.jpeg");
  }
  .header {
    max-width: 1100px;
    margin: 15px auto 25px;
    a {
      cursor: pointer;
    }
  }
  .signle {
    max-width: 1100px;
    margin: 15px auto 25px;
    padding: 30px 30px 30px 30px;
    background: #f9fdff;
    border-radius: 5px;
    min-height: 200px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    .content {
      h3 {
        margin-bottom: 8px;
      }
      .text {
        margin-right: 40px;
        line-height: 24px;
        .autorInfo {
          margin: 10px 0px;
          color: rgb(124, 123, 123);
          span {
            margin-left: 40px;
          }
        }
        .textContent {
          overflow: hidden;
        }
      }
    }
  }
}
.discussNull {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    width: 200px;
    height: 250px;
    margin-left: 50px;
    background-image: url("/assets/image/暂无.svg");
    background-repeat: no-repeat;
    background-position: center;
  }
}
.comments {
  max-width: 1100px;
  margin: 0px auto;
  padding: 30px;
  background: #f9fdff;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  .comment {
    margin-top: 20px;
    .uploadimg {
      margin: 15px 0px;
    }
    .btn {
      margin-top: 10px;
    }
  }
  .disscussHead {
    margin-top: 15px;
    span {
      display: inline-block;
      width: max-content;
      padding-bottom: 4px;
      font-weight: bolder;
      border-bottom: 2px solid rgb(45 43 43 / 50%);
    }
  }
  .discuss {
    width: 100%;
    min-height: 100px;
    list-style: none;
    margin-top: 20px;
    li {
      min-height: 80px;
      width: 98%;
      margin: auto;
      margin-top: 15px;
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
              margin-top: 10px;
            }
          }
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
      }
      .cardContent {
        word-break: break-all;
        line-height: 22px;
        margin-bottom: 5px;
      }
      .cardImage {
        img {
          width: 300px;
          max-height: 500px;
          object-fit: cover;
        }
      }
      .icon {
        overflow: hidden;
        margin-top: 3px;
        width: 100%;
        height: 36px;
        display: flex;
        i {
          font-size: 18px;
          margin-left: 15px;
          margin-right: 20px;
          cursor: pointer;
        }
        svg {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }
        span {
          margin-left: 20px;
          cursor: pointer;
        }
        span:hover {
          color: #03a4f6;
        }
      }
    }
  }
}
.el-dialog {
  overflow: hidden;
  img {
    width: 100%;
  }
  .uploadimg {
    margin: 10px 10px 10px 0;
    max-width: 90%;
    overflow: hidden;
  }
}
p {
  word-wrap: break-word;
}
</style>
