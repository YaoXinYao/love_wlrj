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
            @click="() => downFile(scope.row.url, scope.row.name)"
            >下载</ElButton
          >
          <ElButton
            type="info"
            @click="() => copyToClipboard(scope.row.url)"
            plain
            >分享</ElButton
          >
          <ElButton
            style="width: 0.7rem"
            @click="() => Favoritefilesend(scope.row.id)"
            type="warning"
            :color="`${
              scope.row.is_collection == 1
                ? 'rgb(241,243,248)'
                : 'rgb(40,77,213)'
            }`"
          >
            {{ scope.row.is_collection == 1 ? "已收藏" : "收藏" }}
          </ElButton>
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
    <DownCom />
  </div>
</template>

<script setup lang="ts">
import type { FileTyperoot } from "~/types/Home";
import { Favoritefile } from "~/service/homeApi";
import { storeToRefs } from "pinia";
import { useDiskstore } from "~/store/disk";
import { unCollectionFile } from "~/service/disk";
const diskstore = useDiskstore();
const { Filelist, Pagesize, Loading, curIndex, down } = storeToRefs(diskstore);
function iconfontType(val: string) {
  const filetype: FileTyperoot = val.toLocaleLowerCase() as FileTyperoot;
  if (FileType[filetype]) {
    return FileType[filetype];
  } else {
    return FileType.other;
  }
}
//收藏防抖
const Favoritefilesend = Mythrottle(async (id: number) => {
  const res = await Favoritefile(id);
  if (res.data.value.code === 20000) {
    diskstore.changeUncomment(id);
    console.log(res.data.value.message);
    ElMessage({ message: res.data.value.message, type: "success" });
  }
  if (res.data.value.code === 51000) {
    //取消收藏，并且在本地切换收藏状态
    diskstore.changeUncomment(id);
    const res = await unCollectionFile({ fileId: id });
    if (res.data.value.code == 20000) {
      ElMessage({ message: "取消收藏", type: "info" });
    }
  }
}, 1000);
function filetype(val: string) {
  const reg = /\.([a-zA-Z0-9]+)$/;
  return val.match(reg)![1];
}
function downFile(url: string, name: string) {
  down.value.isOpen = true;
  exportFile(
    url,
    name,
    (progress, spend) => {
      down.value.downSpend = Math.floor(spend / 1024) + " kb/s";
      diskstore.changeProgress(progress);
      down.value.downProgress = Math.floor(progress);
      if (progress >= 100) {
        down.value.isOpen = false;
      }
    },
    //文件大小
    (size) => {
      down.value.downSize = size;
    }
  );
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
