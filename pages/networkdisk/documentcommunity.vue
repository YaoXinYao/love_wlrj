<template>
  <div class="documentcommunity">
    <div class="documentheader">
      <div class="searchinput">
        <input placeholder="搜索文件" type="text" />
        <span>搜索</span>
      </div>
    </div>
    <div class="filelist">
      <el-table ref="multipleTableRef" :data="tableData" style="width: 100%">
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
          property="uploaderId"
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
        background
        layout="prev, pager, next"
        :page-size="10"
        :total="1000"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Favoritefile } from "~/service/homeApi";
import type { FileTyperoot, Fileprops } from "~/types/Home";
function filetype(val: string) {
  const reg = /\.([a-zA-Z0-9]+)$/;
  return val.match(reg)![1];
}
const tableData: Fileprops[] = [
  {
    id: 28,
    name: "网易云音乐商城-接口文档.md",
    format: "other",
    types: ["Java", "后端"],
    uploaderId: 7,
    url: "http://124.222.153.56:9000/wlgzs-disk/7/5187c3dc-b296-4a50-8913-640796064d11.md",
    collections: 0,
    isPublic: "公开",
    uploadDate: "2023-11-17 21:06:59",
  },
  {
    id: 28,
    name: "网易云音乐商城-接口文档.md",
    format: "other",
    types: ["Java", "后端"],
    uploaderId: 7,
    url: "http://124.222.153.56:9000/wlgzs-disk/7/5187c3dc-b296-4a50-8913-640796064d11.md",
    collections: 0,
    isPublic: "公开",
    uploadDate: "2023-11-17 21:06:59",
  },
  {
    id: 28,
    name: "网易云音乐商城-接口文档.md",
    format: "other",
    types: ["Java", "后端"],
    uploaderId: 7,
    url: "http://124.222.153.56:9000/wlgzs-disk/7/5187c3dc-b296-4a50-8913-640796064d11.md",
    collections: 0,
    isPublic: "公开",
    uploadDate: "2023-11-17 21:06:59",
  },
];
async function Favoritefilesend(id: number) {
  const res = await Favoritefile(id);
  if (res.data.value.data === 20000) {
    ElMessage({ message: res.data.value.message });
  }
}
function iconfontType(val: string) {
  const filetype: FileTyperoot = val.toLocaleLowerCase() as FileTyperoot;
  if (FileType[filetype]) {
    return FileType[filetype];
  } else {
    return FileType.other;
  }
}
</script>
<style scoped lang="scss">
.documentcommunity {
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 100%;
  .documentheader {
    padding-inline: 0.2rem;
    width: 100%;
    height: 0.5rem;
    .searchinput {
      width: 2.5rem;
      position: relative;
      padding-block: 0.05rem;
      input {
        border: none;
        padding-left: 0.2rem;
        padding-right: 0.6rem;
        transition-duration: 0.3s;
        background-color: rgb(241, 243, 248);
        border: 1px white solid;
        border-radius: 25px;
        outline: none;
        height: 0.4rem;
        width: 2.5rem;
        &:hover {
          border: 1px solid rgb(6, 167, 255);
        }
      }
      span {
        cursor: pointer;
        user-select: none;
        border-left: 1px solid rgb(179, 179, 179);
        padding-left: 0.1rem;
        position: absolute;
        color: rgb(6, 167, 255);
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .filelist {
    display: flex;
    width: 100%;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
