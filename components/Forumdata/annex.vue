<template>
  <div class="annex">
    <div class="uploadFile">
      <el-input
        input-style="position: absolute;height:148px;width:137px;margin-left:-11px;z-index:5; opacity: 0;"
        type="file"
        accept="image/*"
      />
      <el-icon><Plus /></el-icon>
    </div>
    <ul>
      <li>文件名称</li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { Plus } from "@element-plus/icons-vue";
</script>

<style lang="scss" scoped>
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
