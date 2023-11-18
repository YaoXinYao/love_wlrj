<template>
  <div class="filelist">
    <el-table
      v-loading="Loading"
      ref="multipleTableRef"
      :data="Filelist.dataList"
      style="width: 100%"
    >
      <el-table-column label="文件名" min-width="60" show-overflow-tooltip>
        <template #default="scope">
          <svg class="icon" aria-hidden="true">
            <use
              :xlink:href="`#${iconfontType(filetype(scope.row.name))}`"
            ></use>
          </svg>
          {{ scope.row.name }}</template
        >
      </el-table-column>
      <el-table-column property="uploadDate" label="时间" min-width="60" />
      <el-table-column
        property="uploadName"
        label="上传者"
        show-overflow-tooltip
      />
      <el-table-column
        property="fileSize"
        label="文件大小"
        show-overflow-tooltip
      />
      <el-table-column property="address" label="操作" show-overflow-tooltip>
        <template #default="scope">
          <ElButton
            type="primary"
            plain
            @click="() => exportFile('scope.row.url', scope.row.name)"
            >下载</ElButton
          >
          <ElButton
            type="info"
            @click="() => copyToClipboard(scope.row.url)"
            plain
            >分享</ElButton
          >
          <ElButton
            @click="() => Favoritefilesend(scope.row.id)"
            type="warning"
            color="rgb(40,77,213)"
            >收藏</ElButton
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="curIndex"
      v-model:page-size="Pagesize"
      :page-sizes="[5, 10, 20, 30, 40]"
      background
      layout="sizes, prev, pager, next"
      :total="Filelist.count"
    />
  </div>
</template>

<script setup lang="ts">
import type { FileTyperoot } from "~/types/Home";
import { Favoritefile } from "~/service/homeApi";
import { storeToRefs } from "pinia";
import { useDiskstore } from "~/store/disk";
const diskstore = useDiskstore();
const { Filelist, Pagesize, Loading, curIndex } = storeToRefs(diskstore);
function iconfontType(val: string) {
  const filetype: FileTyperoot = val.toLocaleLowerCase() as FileTyperoot;
  if (FileType[filetype]) {
    return FileType[filetype];
  } else {
    return FileType.other;
  }
}
async function Favoritefilesend(id: number) {
  const res = await Favoritefile(id);
  if (res.data.value.data === 20000) {
    ElMessage({ message: res.data.value.message });
  }
}
function filetype(val: string) {
  const reg = /\.([a-zA-Z0-9]+)$/;
  return val.match(reg)![1];
}
</script>

<style scoped lang="scss">
.filelist {
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
