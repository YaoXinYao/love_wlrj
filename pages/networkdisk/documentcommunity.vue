<template>
  <div class="documentcommunity">
    <div class="documentheader">
      <div class="selectTag" v-if="searchModel == 0">
        <el-select-v2
          class="selcet-v2"
          v-model="curTag"
          size="default"
          style="width: max-content; min-width: 240px"
          :options="AllType"
          placeholder="选择分类"
          multiple
        />
      </div>
      <div
        @click="searchModel = 0"
        class="changefilelist"
        v-if="searchModel == 1"
      >
        <i class="iconfont icon-xiangzuo1"></i>
        返回
      </div>
      <div class="searchinput">
        <input placeholder="搜索文件" v-model="searchText" type="text" />
        <span @click="searchFile">搜索</span>
      </div>
    </div>
    <Tagfile v-if="searchModel == 0" />
    <NameSeatch v-if="searchModel == 1" />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDiskstore } from "~/store/disk";
const diskstore = useDiskstore();
const searchText = ref("");
const searchModel = ref(0); // 0 标签搜索  1，name搜索
function searchFile() {
  if (searchText.value == "")
    return ElMessage({ message: "请输入搜索内容", type: "warning" });
  searchModel.value = 1;
  diskstore.changeSearch(searchText.value);
  // ElMessage({ message: "搜索功能暂未开放", type: "warning" });
}
//监听 curIndex 的变化，页数切换，watch巧妙监听
const { AllType, curTag, Pagesize, curIndex } = storeToRefs(diskstore);
diskstore.getAllfiletag();
diskstore.getFilelistitem();
watch([curIndex, Pagesize, curTag], async () => {
  await diskstore.getFilelistitem();
});
</script>
<style scoped lang="scss">
.documentcommunity {
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 100%;
  .documentheader {
    padding-inline: 0.1rem;
    width: 100%;
    height: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .searchinput {
      width: 3rem;
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
        width: 3rem;
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
    .selectTag {
      width: auto;
      height: auto;
      margin-right: 0.3rem;
    }
    .changefilelist {
      width: 0.8rem;
      font-size: 0.22rem;
      display: flex;
      justify-content: center;
      cursor: pointer;
      align-items: center;
      height: 100%;
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
.el-select-v2__selection {
  display: flex;
  flex-wrap: nowrap !important;
}
</style>
