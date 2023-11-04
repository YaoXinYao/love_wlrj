<template>
  <div class="tablePost">
    <el-form label-position="right" label-width="100px">
      <el-form-item label="新帖标题">
        <el-input />
      </el-form-item>
      <el-form-item label="正文内容">
        <el-input />
      </el-form-item>
      <el-form-item label="添加图片">
        <div>
          <ForumdataUpload/>
        </div>
      </el-form-item>
      <el-form-item label="上传附件">
        <el-input />
      </el-form-item>
      <el-form-item label="新帖标签">
        <el-input />
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
</style>
