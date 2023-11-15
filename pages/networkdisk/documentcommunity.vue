<template>
  <div class="documentcommunity">
    <div class="documentheader">
      <div class="searchinput">
        <input placeholder="搜索文件" type="text" />
        <span>搜索</span>
      </div>
    </div>
    <div class="filelist">
      <el-table
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="文件名" min-width="60" show-overflow-tooltip>
          <template #default="scope">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="`#${iconfontType(scope.row.filetype)}`"></use>
            </svg>
            {{ scope.row.date }}</template
          >
        </el-table-column>
        <el-table-column property="time" label="时间" min-width="60" />
        <el-table-column
          property="uploaduser"
          label="上传者"
          show-overflow-tooltip
        />
        <el-table-column property="address" label="操作" show-overflow-tooltip>
          <template #default="scope">
            <ElButton type="primary" plain>下载</ElButton>
            <ElButton type="info" plain>分享</ElButton>
            <ElButton type="warning" color="rgb(40,77,213)">收藏</ElButton>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FileTyperoot } from "~/types/Home";

const multipleSelection = ref<any[]>([]);
const handleSelectionChange = (val: any[]) => {
  multipleSelection.value = val;
};
const tableData: any[] = [
  {
    date: "JDK1.8",
    time: "Tom",
    uploaduser: "张三",
    filetype: "mp4",
  },
  {
    date: "JDK18",
    time: "Tom",
    uploaduser: "张三",
    filetype: "exe",
  },
  {
    date: "中国共产党宣言",
    time: "Tom",
    uploaduser: "张三",
    filetype: "docx",
  },
  {
    date: "马克思主义",
    time: "Tom",
    uploaduser: "张三",
    filetype: "java",
  },
  {
    date: "信号与系统",
    time: "Tom",
    uploaduser: "张三",
    filetype: "PPT",
  },
  {
    date: "时间简史",
    time: "Tom",
    uploaduser: "张三",
    filetype: "pdf",
  },
  {
    date: "三体",
    time: "Tom",
    uploaduser: "张三",
    filetype: "mp3",
  },
];
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
  width: 100%;
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
}
</style>
