<template>
  <div class="filelist">
    <el-table
      v-loading="Loading2"
      ref="multipleTableRef"
      :data="Filelist2.dataList"
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
            @click="() => exportFile(scope.row.url, scope.row.name)"
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
      style="margin-top: 0.2rem"
      v-model:current-page="curIndex2"
      v-model:page-size="Pagesize2"
      :page-sizes="[5, 10, 20]"
      background
      layout="sizes, prev, pager, next"
      :total="1000"
    />
  </div>
</template>

<script setup lang="ts">
import type { FileTyperoot } from "~/types/Home";
import { Favoritefile } from "~/service/homeApi";
import { storeToRefs } from "pinia";
import { useDiskstore } from "~/store/disk";
const diskstore = useDiskstore();
const { Filelist2, Pagesize2, Loading2, curIndex2, Searchtext } =
  storeToRefs(diskstore);
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
watch([Pagesize2, curIndex2, Searchtext], () => {
  diskstore.getNameFile();
});
</script>

<style scoped lang="scss">
.filelist {
  max-height: 80vh;
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
