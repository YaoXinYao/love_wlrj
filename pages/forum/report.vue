<template>
  <div class="report">
    <div class="header">
      <div class="headerMain">
        <span>发布新贴</span>
        <div class="navRight">
          <div>
            <el-button type="primary" @click="openForm">发布</el-button>
          </div>
          <div>
            <img :src="userinfo.userPicture" alt="头像" />
          </div>
          <div>
            <span><NuxtLink to="/forum/home">返回论坛社区</NuxtLink></span>
          </div>
        </div>
      </div>
    </div>
    <div v-loading="uploading">
      <ClientOnly>
        <WangEdit />
      </ClientOnly>
      <el-drawer
        v-model="dialog"
        direction="ltr"
        class="demo-drawer"
        :show-close="false"
        size="400"
      >
        <template #header="{ titleId, titleClass }">
          <h4 :id="titleId" :class="titleClass" class="my-title">发布新帖</h4>
        </template>
        <div class="demo-drawer__content">
          <el-form
            label-position="top"
            label-width="100px"
            ref="rulesFormRef"
            :model="postNews"
            :rules="rules"
            status-icon
          >
            <el-form-item
              label="新帖标签"
              prop="labelId"
              :label-width="formLabelWidth"
            >
              <el-select
                multiple
                collapse-tags
                collapse-tags-tooltip
                :max-collapse-tags="3"
                placeholder="请选择标签"
                v-model="postNews.labelId"
              >
                <el-option
                  v-for="item in labels"
                  :key="item.labelId"
                  :label="item.labelName"
                  :value="item.labelId"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="新帖分栏"
              prop="postSubId"
              :label-width="formLabelWidth"
            >
              <el-select placeholder="选择分栏" v-model="postNews.postSubId">
                <el-option
                  v-for="(item, index) in subfields"
                  :key="index"
                  :label="item.subName"
                  :value="item.subId"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="添加图片" :label-width="formLabelWidth">
              <el-upload
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
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <el-icon><Delete /></el-icon>
                      </span>
                    </span>
                  </div>
                </template>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="uploadPhoto(rulesFormRef)"
                >确定并发布</el-button
              >
              <el-button @click="cancelForm(rulesFormRef)">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-drawer>
    </div>

    <el-dialog v-model="dialogVisible" style="max-width: 400px">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import "~/assets/css/edit.scss";
import { storeToRefs } from "pinia";
import { useHomestore } from "~/store/home";
import { forumManage, forumStore } from "~/store/forum";
import type { FormInstance, UploadFile } from "element-plus";
import { Delete, Plus, ZoomIn } from "@element-plus/icons-vue";
const router = useRouter();
let userData = useHomestore();
let manages = forumManage();
let forums = forumStore();
let { userinfo } = storeToRefs(userData);
let { subfields, labels } = storeToRefs(manages);
let { newPostContent, newPostTitle, uploading } = storeToRefs(forums);

let dialog = ref(false);
let dialogImageUrl = ref("");
let dialogVisible = ref(false);
const formLabelWidth = "80px";
let postImg = ref<any[]>([]);
let formImage = reactive<any>({
  files: [],
});
const rulesFormRef = ref<FormInstance>();
let postNews = reactive<any>({
  labelId: [],
  postSubId: "",
  postUserId: userinfo.value.userId,
});
const rules = reactive({
  postSubId: [
    {
      required: true,
      message: "请选择分栏",
      trigger: "change",
    },
  ],
  labelId: [
    {
      required: true,
      message: "请选择标签",
      trigger: "change",
    },
  ],
});
let reg = new RegExp("<[^>]+>", "g");
let imgReg = /<img.*?>/g;
definePageMeta({
  layout: "custom",
  roles:1,
});
onMounted(() => {
  manages.labelInfo(1, 100);
  manages.subfieldInfo(1, 100);
});
//点击发布，打开抽屉
const openForm = () => {
  if (!newPostTitle.value.trim()) {
    ElMessage.warning("帖子标题不能为空");
  } else {
    if (imgReg.test(newPostContent.value)) {
      dialog.value = true;
    } else {
      let filterContents = newPostContent.value.replace(reg, "");
      if (!filterContents.trim()) {
        ElMessage.warning("帖子内容不能为空");
      } else {
        dialog.value = true;
      }
    }
  }
};
//上传帖子
const uploadPhoto = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      let jage = true;
      postImg.value = [];
      if (formImage.files.length != 0) {
        for (let i = 0; i < formImage.files.length; i++) {
          jage = formImage.files[i].raw.type.startsWith("image/");
          if (!jage) {
            ElMessage.warning("文件类型错误");
            return;
          } else {
            postImg.value.push(formImage.files[i].raw);
          }
        }
        if (jage) {
          dialog.value = false;
          let formData = new FormData();
          postImg.value.forEach((item: any, index: number) => {
            formData.append("postImgs", item);
          });
          let sid = Number(postNews.postSubId);
          const otherContent = {
            labelId: postNews.labelId,
            postContent: newPostContent.value,
            postSubId: sid,
            postTitle: newPostTitle.value,
            postUserId: postNews.postUserId,
          };
          Object.keys(otherContent).forEach((key) => {
            //使用类型断言key as keyof typeof otherContent来告诉 TypeScript key 的类型
            const value = otherContent[key as keyof typeof otherContent];
            formData.append(`${key}`, value);
          });
          forums.addCard(formData).then((result) => {
            if (result == 20000) {
              ElMessage.success("发布帖子成功");
              newPostContent.value = "";
              newPostTitle.value = "";
              postNews.labelId = [];
              postNews.postSubId = "";
              formImage.files = [];
              postImg.value = [];
              router.push("/forum/home");
            } else {
              ElMessage.error("发布帖子失败");
            }
          });
        }
      } else {
        ElMessage.warning("至少上传一张图片");
      }
    }
  });
};
//关闭抽屉
const cancelForm = (formEl: FormInstance | undefined) => {
  dialog.value = false;
  if (!formEl) return;
  formEl.resetFields();
  formImage.files = [];
  postImg.value = [];
};
//图片预览
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};
//删除图片
const handleRemove = (file: UploadFile) => {
  const index = formImage.files.indexOf(file);
  if (index !== -1) {
    formImage.files.splice(index, 1);
    postImg.value.splice(index, 1);
    ElMessage.success("移除成功");
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 70px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 2px 5px rgb(154, 154, 154);
  margin-bottom: 10px;
  .headerMain {
    max-width: 1180px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      line-height: 70px;
      cursor: pointer;
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #222226;
      text-align: center;
    }
    .navRight {
      display: flex;
      align-items: center;
      margin-left: 20px;
      img {
        width: 50px;
        height: 50px;
        cursor: pointer;
        overflow: hidden;
        margin-left: 20px;
        border-radius: 50%;
        border: 1px solid rgb(208, 208, 208);
      }
      span {
        margin-left: 20px;
        line-height: 50px;
        cursor: pointer;
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: normal;
        color: #222226;
        text-align: center;
      }
      span:hover {
        color: rgb(57, 182, 231);
      }
    }
  }
}
.el-form {
  width: 100%;
  .el-form-item {
    margin-bottom: 0px;
    margin-top: 15px;
  }
  .el-input__inner {
    height: 36px;
    line-height: 36px;
  }
  .el-select {
    width: 100%;
  }
}
.my-title {
  font-size: 20px;
}
.el-dialog {
  overflow: hidden;
  img {
    width: 100%;
  }
}
</style>
