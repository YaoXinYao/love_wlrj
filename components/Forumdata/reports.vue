<template>
  <div class="tablePost">
    <el-form label-position="top" label-width="100px">
      <el-form-item label="新帖标题">
        <el-input v-model="postNews.postTitle" />
      </el-form-item>
      <el-form-item label="正文内容">
        <el-input type="textarea" v-model="postNews.postContent" />
      </el-form-item>
      <el-form-item label="新帖标签">
        <el-select
          v-model="postNews.labelId"
          multiple
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="3"
          placeholder="请选择标签"
        >
          <el-option
            v-for="item in labels"
            :key="item.labelId"
            :label="item.labelName"
            :value="item.labelId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="新帖分栏">
        <el-select v-model="selectValue" placeholder="选择分栏">
          <el-option
            v-for="(item, index) in subfields"
            :key="index"
            :label="item.subName"
            :value="item.subId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="添加图片">
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
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="uploadPhoto"> 发布 </el-button>
        <el-button @click="clearNews">重置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-model="dialogVisible" style="max-width: 400px">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Delete, Plus, ZoomIn } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { forumManage, forumStore } from "~/store/forum";
import type { UploadFile } from "element-plus";
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);
let selectValue = ref("");
let formImage = reactive<any>({
  files: [],
});
let postNews = reactive<any>({
  labelId: [],
  postContent: "",
  postImg: [],
  postSubId: Number(selectValue.value),
  postTitle: "",
  postUserId: 3,
});
let manages = forumManage();
let forumData = forumStore();
let { subfields, labels } = storeToRefs(manages);
onMounted(() => {
  manages.labelInfo(1, 100);
  manages.subfieldInfo(1, 100);
});
watch(selectValue, (newValue) => {
  postNews.postSubId = Number(newValue);
});
//--------------获取上传文件-----------
//文件上传
const uploadPhoto = () => {
  for (let i = 0; i < formImage.files.length; i++) {
    postNews.postImg[i] = formImage.files[i].raw;
    console.log(postNews.postImg[0].type);
    const jage = postNews.postImg[0].type.startsWith("image/");
    if (!jage) {
      ElMessage.warning("文件类型错误");
      break;
    }
  }
  let formData = new FormData();
  Object.keys(postNews).forEach((key: string) => {
    if (Array.isArray(postNews[key])) {
      postNews[key].forEach((item: any, index: number) => {
        formData.append(`${key}[${index}]`, item);
      });
    } else {
      formData.append(key, postNews[key]);
    }
  });
  forumData.addCard(formData).then((result) => {
    if (result == 20000) {
      ElMessage.success("发布帖子成功");
      formImage.files=[]
      selectValue.value=""
      postNews.labelId=[]
      postNews.postContent=""
      postNews.postImg=[]
      postNews.postTitle=""
    } else {
      ElMessage.error("发布帖子失败");
    }
  });
};
function clearNews(){
  formImage.files=[]
      selectValue.value=""
      postNews.labelId=[]
      postNews.postContent=""
      postNews.postImg=[]
      postNews.postTitle=""
}
//删除图片
const handleRemove = (file: UploadFile) => {
  console.log(file);
  const index = formImage.files.indexOf(file);
  if (index !== -1) {
    formImage.files.splice(index, 1);
    postNews.postImg.splice(index,1)
    ElMessage.success("移除成功");
  }
};
//图片预览
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};
</script>

<style lang="scss" scoped>
.tablePost {
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 20px;
  .el-form-item {
    margin-bottom: 0px;
    margin-top: 15px;
  }
  .el-form {
    width: 100%;
    .el-input__inner {
      height: 36px;
      line-height: 36px;
    }
    .el-select {
      width: 100%;
    }
  }
}
.uploadFile {
  width: 148px;
  height: 148px;
  margin-right: 6px;
  background-color: #fafafa;
  border: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .el-icon {
    position: absolute;
    width: 28px;
    height: 28px;
    font-size: 28px;
    color: #909399;
  }
}
.el-dialog {
  overflow: hidden;
  img {
    width: 100%;
  }
}
</style>
