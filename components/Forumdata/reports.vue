<template>
  <div class="tablePost">
    <el-form label-position="top" label-width="100px">
      <el-form-item label="新帖标题">
        <el-input />
      </el-form-item>
      <el-form-item label="正文内容">
        <el-input type="textarea" />
      </el-form-item>
      <el-form-item label="新帖标签">
        <el-input />
      </el-form-item>
      <el-form-item label="添加图片">
        <div>
          <ForumdataUpload />
        </div>
      </el-form-item>
      <el-form-item label="上传附件">
        <!-- <ForumdataAnnex/> -->
        <ForumdataAnnexcom/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"> 提交 </el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
const formLabelAlign = reactive({
  name: "",
  region: "",
  type: "",
});
</script>

<style lang="scss" scoped>
.tablePost {
  max-width: 700px;
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
</style>
