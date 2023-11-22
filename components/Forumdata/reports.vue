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
import {useHomestore} from "~/store/home"
const router = useRouter()
let userData = useHomestore()
let {userinfo} = storeToRefs(userData)
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);
let selectValue = ref("");
let manages = forumManage();
let forumData = forumStore();
let { subfields, labels } = storeToRefs(manages);
let formImage = reactive<any>({
  files: [],
});
let postImg = ref<any[]>([]);
let postNews = reactive<any>({
  labelId: [],
  postContent: "",
  postSubId: Number(selectValue.value),
  postTitle: "",
  postUserId: userinfo.value.userId,
});
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
  let jage = true;
  postImg.value = [];
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
    let formData = new FormData();
    postImg.value.forEach((item: any, index: number) => {
      formData.append(`postImg[${index}]`, item);
    });
    forumData.addCard(postNews, formData).then((result) => {
      if (result == 20000) {
        ElMessage.success("发布帖子成功");
        router.push("/forum/home")
      } else {
        ElMessage.error("发布帖子失败");
      }
    });
  }
};
function clearNews() {
  formImage.files = [];
  selectValue.value = "";
  postNews.labelId = [];
  postNews.postContent = "";
  postImg.value = [];
  postNews.postTitle = "";
}
//删除图片
const handleRemove = (file: UploadFile) => {
  const index = formImage.files.indexOf(file);
  if (index !== -1) {
    formImage.files.splice(index, 1);
    postImg.value.splice(index, 1);
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
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
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
.el-dialog {
  overflow: hidden;
  img {
    width: 100%;
  }
}
</style>
