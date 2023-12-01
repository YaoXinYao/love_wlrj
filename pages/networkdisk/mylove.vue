<template>
  <div class="filelist">
    <div class="headertop">
      <div class="Search" @click="dialogVisible = true">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </div>
    </div>
    <div class="filebox">
      <el-empty
        v-show="Mylove.FileList.dataList.length == 0"
        description="还没有收藏文件"
      />
      <el-table
        v-show="Mylove.FileList.dataList.length !== 0"
        v-loading="Mylove.Loading"
        ref="multipleTableRef"
        :data="Mylove.FileList.dataList"
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
              @click="() => Favoritefilesend(scope.row.id, 0)"
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
        v-show="Mylove.FileList.dataList.length !== 0"
        v-model:current-page="Mylove.curIndex"
        @size-change="diskstore.getMylove"
        @current-change="diskstore.getMylove"
        v-model:page-size="Mylove.PageSize"
        :page-sizes="[5, 10, 20]"
        background
        layout="sizes, prev, pager, next"
        :total="Mylove.FileList.count"
      />
    </div>
    <el-dialog
      v-model="dialogVisible"
      @close="BeforeClonehander"
      title="搜索我的收藏"
      width="70%"
    >
      <el-input
        @input="SearchChange"
        v-model="searchInner"
        class="w-50 m-2"
        size="large"
        placeholder="输入文件名"
      />
      <el-table
        v-loading="loading"
        :data="Mylove.SearchItem"
        style="width: 100%"
      >
        <el-table-column prop="name" label="文件名" width="400" />
        <el-table-column prop="uploadDate" label="上传时间" width="180" />
        <el-table-column prop="fileSize" label="文件大小" width="180" />
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
              @click="() => Favoritefilesend(scope.row.id, 1)"
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
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
    <DownCom />
  </div>
</template>
<script setup lang="ts">
import { Favoritefile } from "~/service/homeApi";
import { storeToRefs } from "pinia";
import { useDiskstore } from "~/store/disk";
import { unCollectionFile } from "~/service/disk";
const dialogVisible = ref(false);
const searchInner = ref("");
const diskstore = useDiskstore();
const loading = ref(false);
const { Mylove } = storeToRefs(diskstore);
diskstore.getMylove();
//收藏防抖
const Favoritefilesend = Mythrottle(async (id: number, type: number) => {
  const res = await Favoritefile(id);
  if (res.data.value.code === 20000) {
    type == 0 ? diskstore.changeUncomment2(id) : diskstore.changeUncomment3(id);
    ElMessage({ message: res.data.value.message, type: "success" });
  }
  if (res.data.value.code === 51000) {
    //取消收藏，并且在本地切换收藏状态
    type == 0 ? diskstore.changeUncomment2(id) : diskstore.changeUncomment3(id);
    const res = await unCollectionFile({ fileId: id });
    if (res.data.value.code == 20000) {
      ElMessage({ message: "取消收藏", type: "info" });
    }
  }
}, 1000);
const SearchChange = debounce(async (val: string) => {
  if (val == "") return;
  loading.value = true;
  await diskstore.SearchMylovefile(val);
  loading.value = false;
}, 500);
const BeforeClonehander = () => {
  console.log("关闭");
};
</script>
<style scoped lang="scss">
.filelist {
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 85vh;
  flex-direction: column;
  .headertop {
    padding-right: 0.8rem;
    display: flex;
    justify-content: right;
  }
  .filebox {
    width: 100%;
    height: 80vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
