<template>
  <!-- 设计构思，展示面板，我的上传的文件，总大小 -->
  <div class="myfile">
    <div class="header">
      <el-col :span="6">
        <el-statistic
          title="我上传文件的数量为"
          :value="Myfile.FileList.count"
        />
      </el-col>
      <div class="headereright">
        <div class="Search" @click="dialogVisible = true">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-sousuo"></use>
          </svg>
        </div>
        <NuxtLink class="headerUp" to="/networkdisk/uploadfile">
          <TransitionButton innertext="继续上传" />
        </NuxtLink>
      </div>
    </div>
    <div class="filelist">
      <el-empty
        v-show="Myfile.FileList.dataList.length == 0 && !Myfile.Loading"
        description="还没有收藏文件"
      />
      <el-table
        v-show="Myfile.FileList.dataList.length !== 0"
        v-loading="Myfile.Loading"
        ref="multipleTableRef"
        :data="Myfile.FileList.dataList"
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
            <el-switch
              v-model="Filepublic[scope.row.name].public"
              :loading="Filepublic[scope.row.name].loading"
              :before-change="() => beforeChange2(scope.row.name, scope.row.id)"
              class="ml-2"
              inline-prompt
              style="
                --el-switch-on-color: #13ce66;
                --el-switch-off-color: #ff4949;
                margin-left: 0.1rem;
              "
              active-text="公开文件"
              inactive-text="私密文件"
            />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="justify-content: center"
        v-show="Myfile.FileList.dataList.length !== 0"
        v-model:current-page="Myfile.curIndex"
        @size-change="loadingfilelist"
        @current-change="loadingfilelist"
        v-model:page-size="Myfile.PageSize"
        :page-sizes="[5, 10, 20]"
        background
        layout="sizes, prev, pager, next"
        :total="Myfile.FileList.count"
      />
    </div>
    <el-dialog
      v-model="dialogVisible"
      @close="BeforeClonehander"
      title="搜索我的文件"
      width="70%"
    >
      <el-input
        @input="SearchChange"
        v-model="Myfile.Search"
        class="w-50 m-2"
        size="large"
        placeholder="输入文件名"
      />
      <el-table
        v-loading="loading"
        :data="Myfile.SearchItem"
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
            <el-switch
              v-model="Filepublic[scope.row.name].public"
              :loading="Filepublic[scope.row.name].loading"
              :before-change="() => beforeChange2(scope.row.name, scope.row.id)"
              class="ml-2"
              inline-prompt
              style="
                --el-switch-on-color: #13ce66;
                --el-switch-off-color: #ff4949;
                margin-left: 0.1rem;
              "
              active-text="公开文件"
              inactive-text="私密文件"
            />
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { FileToPrivate, FileToPublic } from "~/service/disk";
import { useDiskstore } from "~/store/disk";
const diskstore = useDiskstore();
const dialogVisible = ref(false);
const loading = ref(false);
const { Myfile } = storeToRefs(diskstore);
onMounted(async () => {
  await loadingfilelist();
});
const Filepublic = ref<{
  [key: string]: {
    public: boolean;
    loading: boolean;
  };
}>({});
const beforeChange2 = async (name: string, id: number) => {
  Filepublic.value[name].loading = true;
  try {
    if (Filepublic.value[name].public) {
      //改为私密
      const res = await FileToPrivate({ fileId: id, userId: Authuserid() });
      Filepublic.value[name].loading = false;
      if (res.data.value.code == 20000) {
        return true;
      } else {
        return false;
      }
    } else {
      const res = await FileToPublic({ fileId: id, userId: Authuserid() });
      Filepublic.value[name].loading = false;
      if (res.data.value.code == 20000) {
        return true;
      } else return false;
    }
  } catch (error) {
    ElMessage({ message: "出现错误", type: "error" });
    return false;
  }
};

const loadingfilelist = async () => {
  await diskstore.getMyfile();
  Myfile.value.FileList.dataList.forEach((item) => {
    Filepublic.value[item.name] = {
      public: item.isPublic == "公开" ? true : false,
      loading: false,
    };
  });
};
const SearchChange = debounce(async (val: string) => {
  if (val == "") return;
  loading.value = true;
  await diskstore.getMySearchFile(val);
  Myfile.value.SearchItem.forEach((item) => {
    Filepublic.value[item.name] = {
      public: item.isPublic == "公开" ? true : false,
      loading: false,
    };
  });
  loading.value = false;
}, 500);
const BeforeClonehander = async () => {
  await loadingfilelist();
};
</script>
<style scoped lang="scss">
.myfile {
  width: 100%;
  height: 90vh;
  .filelist {
    width: 100%;
    height: 80vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .header {
    padding-inline: 0.5rem;
    padding-left: 0.1rem;
    display: flex;
    width: 100%;
    display: b;
    justify-content: space-between;
    .headerUp {
      display: block;
      width: 1.5rem;
    }
    .headereright {
      display: flex;
      .Search {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.08rem;
        cursor: pointer;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        margin-right: 0.4rem;
      }
    }
  }
}
</style>
