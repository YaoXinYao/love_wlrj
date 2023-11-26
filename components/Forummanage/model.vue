<template>
  <div class="forumModel">
    <!-- 查看帖子 -->
    <el-dialog v-model="lookModel" title="帖子信息" width="440px">
      <el-form :model="postInfos">
        <el-form-item label="发帖人" :label-width="formLabelWidth">
          <el-input :value="postInfos.userName" :disabled="true" />
        </el-form-item>
        <el-form-item label="发帖时间" :label-width="formLabelWidth">
          <el-input :value="postInfos.postTime" :disabled="true" />
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input
            :value="postInfos.postTitle"
            :disabled="true"
            autosize
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="分栏" :label-width="formLabelWidth">
          <el-input :value="postInfos.subName" :disabled="true" />
        </el-form-item>
        <el-form-item label="正文内容" :label-width="formLabelWidth">
          <el-input
            :value="postInfos.postContent"
            :disabled="true"
            autosize
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="收藏量" :label-width="formLabelWidth">
          <el-input :value="postInfos.postCollect" :disabled="true" />
        </el-form-item>
        <el-form-item label="点赞量" :label-width="formLabelWidth">
          <el-input :value="postInfos.postLike" :disabled="true" />
        </el-form-item>
        <el-form-item label="访问量" :label-width="formLabelWidth">
          <el-input :value="postInfos.postView" :disabled="true" />
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <ul class="photos">
            <li v-for="(item, index) in postInfos.photos" :key="index">
              <img :src="item" />
            </li>
          </ul>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="lookModel = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 删除帖子 -->
    <el-dialog v-model="deleteModel" title="提示信息" width="440px">
      <span>确定要删除此帖子？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="deletePost">确定</el-button>
          <el-button @click="deleteModel = false"> 取消 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { forumManage } from "~/store/forum";
const props = defineProps({
  condition: {
    default: {
      title: "",
      content: "",
      subfield: "",
    },
  },
});
let manage = forumManage();
let { lookModel, deleteModel, postInfos, deleteId,currentPage } = storeToRefs(manage);
const formLabelWidth = "80px";
// 删除帖子
function deletePost() {
  manage.deletePosts(deleteId.value).then((res) => {
    if (res == 20000) {
      ElMessage.success("删除成功");
      let subId;
      if (props.condition.subfield == "") {
        subId = undefined;
      } else {
        subId = Number(props.condition.subfield);
      }
      manage.getPosts(1,7,props.condition.title,subId,props.condition.content);
      currentPage.value = 1
    } else {
      ElMessage.error("删除失败");
    }
  });
  deleteModel.value = false;
}
</script>

<style lang="scss" scoped>
.photos {
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  li {
    max-width: 320px;
    max-height: 320px;
    overflow: hidden;
    img {
      width: 100%;
      max-height: 320px;
      object-fit: cover;
    }
  }
}
</style>
