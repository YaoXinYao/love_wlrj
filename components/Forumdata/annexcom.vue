<template>
  <el-upload
    ref="uploadRef"
    class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :auto-upload="false"
  >
    <template #trigger>
      <div class="uploadFile">
        <el-icon><Plus /></el-icon>
      </div>
    </template>
    <template #tip>
      <div class="el-upload__tip">doc/docx files</div>
    </template>
  </el-upload>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import type { UploadInstance } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
const uploadRef = ref<UploadInstance>();
const submitUpload = () => {
  uploadRef.value!.submit();
};
</script>
<style scoped lang="scss">
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
