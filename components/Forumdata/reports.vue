<template>
  <div class="tablePost">
    <el-form
      label-position="top"
      label-width="100px"
      ref="rulesFormRef"
      :model="postNews"
      :rules="rules"
      status-icon
    >
      <el-form-item label="新帖标题" prop="postTitle">
        <el-input v-model="postNews.postTitle" />
      </el-form-item>
      <el-form-item label="正文内容" prop="postContent">
        <el-input type="textarea" v-model="postNews.postContent" />
      </el-form-item>
      <el-form-item label="新帖标签" prop="labelId">
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
      <el-form-item label="新帖分栏" prop="postSubId">
        <el-select v-model="postNews.postSubId" placeholder="选择分栏">
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
        <el-button type="primary" @click="uploadPhoto(rulesFormRef)">
          发布
        </el-button>
        <el-button @click="clearNews(rulesFormRef)">重置</el-button>
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
import type { FormInstance, FormRules, UploadFile } from "element-plus";
import { useHomestore } from "~/store/home";
const router = useRouter();
let userData = useHomestore();
let { userinfo } = storeToRefs(userData);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);
let manages = forumManage();
let forumData = forumStore();
let { subfields, labels } = storeToRefs(manages);
let formImage = reactive<any>({
  files: [],
});
interface RuleForm {
  labelId: any[];
  postContent: string;
  postSubId: string;
  postTitle: string;
  postUserId: number;
}
let postImg = ref<any[]>([]);
const rulesFormRef = ref<FormInstance>();
let postNews = reactive<RuleForm>({
  labelId: [],
  postContent: "",
  postSubId: "",
  postTitle: "",
  postUserId: userinfo.value.userId,
});
const rules = reactive({
  postTitle: [
    { required: true, message: "请输入标题", trigger: "blur" },
    { min: 3, max: 20, message: "长度应该在3到20之间", trigger: "blur" },
  ],
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
  postContent: [{ required: true, message: "请输入内容", trigger: "blur" }],
});
onMounted(() => {
  manages.labelInfo(1, 100);
  manages.subfieldInfo(1, 100);
});
//--------------获取上传文件-----------
//文件上传
const uploadPhoto = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
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
        let sid = Number(postNews.postSubId);
        const otherContent = {
          labelId: postNews.labelId,
          postContent: postNews.postContent,
          postTitle: postNews.postTitle,
          postUserId: postNews.postUserId,
          postSubId:sid
        };
        
        forumData.addCard(otherContent,formData).then((result) => {
          if (result == 20000) {
            ElMessage.success("发布帖子成功");
            router.push("/forum/home");
          } else {
            ElMessage.error("发布帖子失败");
          }
        });
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
function clearNews(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.resetFields();
  formImage.files = [];
  postImg.value = [];
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