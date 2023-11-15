<template>
  <div class="deatils">
    <div class="bgphoto"></div>
    <div class="signle">
      <div class="header">
        <NuxtLink to="/">首页</NuxtLink> >
        <NuxtLink to="/forum/home">论坛</NuxtLink> > 帖子详情
      </div>
      <ul class="photos">
        <li v-for="(item, i) in singleData.photos">
          <img :src="item" />
        </li>
      </ul>
      <div class="content">
        <div class="text">
          <h3>{{ singleData.postTitle }}</h3>
          <div>{{ singleData.postContent }}</div>
          <div class="disscussHead"><span>评论</span></div>
          <ForumdataComment
            v-if="discuss.length != 0"
            :cimmentData="discuss"
          ></ForumdataComment>
          <div class="discussNull" v-if="discuss.length == 0">
            <div></div>
          </div>
        </div>
        <div class="comment">
          <h4>欢迎大家进行交流</h4>
          <el-input
            v-model="commentNews.comContent"
            maxlength="600"
            placeholder="留言评论"
            show-word-limit
            type="textarea"
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
            v-model:file-list="commentNews.comImg"
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
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" style="max-width: 400px">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { forumStore } from "~/store/forum";
import { ref } from "vue";
import type { UploadFile } from "element-plus";
import { Delete, Plus, ZoomIn } from "@element-plus/icons-vue";
let commentNews = reactive<any>({
  comContent: "",
  comFatherId: 0,
  comImg: [],
  comPostId: 0,
  comRootId: 0,
  comUserId: 8,
});
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);
let forums = forumStore();
const { discuss, singleData } = storeToRefs(forums);
let data = useRoute().query.data;
commentNews.comPostId = data;
onMounted(() => {
  let id = Number(data);
  forums.getSingle(id);
  forums.selectComment(id);
  forums.getUser(8)
});
//删除图片
const handleRemove = (file: UploadFile) => {
  const index = commentNews.comImg.indexOf(file);
  if (index !== -1) {
    commentNews.comImg.splice(index, 1);
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
  commentNews.comContent = "";
  commentNews.comImg = [];
}
//发布评论
function submitData(comFatherId: number, comRootId: number) {
  let jage = true;
  for (let i = 0; i < commentNews.comImg.length; i++) {
    jage = commentNews.comImg[i].raw.type.startsWith("image/");
    if (!jage) {
      ElMessage.warning("文件类型错误");
      return;
    }
  }
  if (jage) {
    let formData = new FormData();
    commentNews.comFatherId = comFatherId;
    commentNews.comRootId = comRootId;
    Object.keys(commentNews).forEach((key: string) => {
      if (Array.isArray(commentNews[key])) {
        commentNews[key].forEach((item: any, index: number) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else {
        formData.append(key, commentNews[key]);
      }
    });

    forums.addComment(formData).then((result) => {
      if (result == 20000) {
        ElMessage.success("评论成功");
        commentNews.comContent = "";
        commentNews.comImg = "";
      }else{
        ElMessage.error("评论失败")
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.deatils {
  .bgphoto {
    width: 100%;
    height: 380px;
    background-image: url("/assets/image/back.jpeg");
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
  }
  .signle {
    max-width: 1100px;
    margin: 15px auto 0px;
    padding: 0 20px 20px 20px;
    .header {
      margin: 15px 0px 15px;
      a {
        cursor: pointer;
      }
    }
  }
}

.photos {
  width: 100%;
  margin-bottom: 20px;
  list-style: none;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  li {
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 15px;
    margin-right: 15px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 15px;
    }
  }
}
.content {
  min-height: 400px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  h3 {
    margin-bottom: 8px;
  }
  .comment {
    width: 460px;
    .uploadimg {
      margin: 15px 0px;
    }
  }
  .text {
    flex: 1;
    margin-right: 40px;
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
  }
}
.discussNull {
  width: 100%;
  display: flex;
  align-items: center;
  div {
    width: 200px;
    height: 200px;
    margin-left: 50px;
    background-image: url("/assets/image/暂无.svg");
    background-repeat: no-repeat;
    background-position: center;
  }
}
.el-dialog {
  overflow: hidden;
  img {
    width: 100%;
  }
}
</style>
