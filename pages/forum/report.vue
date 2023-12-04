<template>
  <div class="report">
    <div class="header">
      <div class="headerMain">
        <span>发布新贴</span>
        <div class="navRight">
          <div>
            <el-button type="primary" @click="dialog = true">发布</el-button>
          </div>
          <div>
            <img :src="userinfo.userPicture" alt="头像" />
          </div>
        </div>
      </div>
    </div>
    <ForumdataReportEdit />
    <el-drawer
      ref="drawerRef"
      v-model="dialog"
      title="发布文章"
      direction="ltr"
      class="demo-drawer"
      size="50%"
    >
      <div class="demo-drawer__content">
        <el-form
          label-position="top"
          label-width="100px"
          ref="rulesFormRef"
          :model="postNews"
          :rules="rules"
          status-icon
        >
          <el-form-item label="新帖标签" prop="labelId" :label-width="formLabelWidth">
            <el-select
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
          <el-form-item label="新帖分栏" prop="postSubId" :label-width="formLabelWidth">
            <el-select placeholder="选择分栏">
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
                    <span class="el-upload-list__item-preview">
                      <el-icon><zoom-in /></el-icon>
                    </span>
                    <span class="el-upload-list__item-delete">
                      <el-icon><Delete /></el-icon>
                    </span>
                  </span>
                </div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">确定并发布</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useHomestore } from "~/store/home";
import { forumManage } from "~/store/forum";
import type { FormInstance } from "element-plus";
import { Delete, Plus, ZoomIn } from "@element-plus/icons-vue";
let userData = useHomestore();
let manages = forumManage();
let { userinfo } = storeToRefs(userData);
let { subfields, labels } = storeToRefs(manages);

let dialog = ref(false);
const formLabelWidth = '80px'
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
const rulesFormRef = ref<FormInstance>();
let postNews = reactive<RuleForm>({
  labelId: [],
  postContent: "",
  postSubId: "",
  postTitle: "",
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
definePageMeta({
  layout: "custom",
});
onMounted(() => {
  manages.labelInfo(1, 100);
  manages.subfieldInfo(1, 100);
});
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
    }
  }
}
</style>
