<template>
  <div ref="fileitem" class="filelistitem animate__animated animate__fadeInUp">
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="`#${iconfontType(filetype2(file.name))}`"></use>
    </svg>
    <div class="filename">
      <p>
        945--day141_网页云商城Nextjs项目实战-项目打包和部署_15-(掌握)-首页-编辑推荐商品列表的实现【海量资源：666java.com】.mp4945--day141_网页云商城Nextjs项目实战-项目打包和部署_15-(掌握)-首页-编辑推荐商品列表的实现【海量资源：666java.com】.mp4945--day141_网页云商城Nextjs项目实战-项目打包和部署_15-(掌握)-首页-编辑推荐商品列表的实现【海量资源：666java.com】.mp4
      </p>
    </div>
    <i @click="() => deletefile(file.name)" class="iconfont icon-guanbi2"></i>
  </div>
</template>

<script setup lang="ts">
import "animate.css";
import type { FileTyperoot } from "~/types/Home";
import { useDiskstore } from "~/store/disk";
const fileitem = ref<HTMLDivElement>();
const diskstore = useDiskstore();
const { file } = defineProps<{
  file: File;
}>();
function iconfontType(val: string) {
  const filetype: FileTyperoot = val.toLocaleLowerCase() as FileTyperoot;
  if (FileType[filetype]) {
    return FileType[filetype];
  } else {
    return FileType.other;
  }
}
function deletefile(val: string) {
  diskstore.deletequeue(val);
  ElMessage({ message: `${val}已删除`, type: "info", offset: 64 });
}
</script>

<style scoped lang="scss">
.filelistitem {
  transition-duration: 0.3s;
  padding-inline: 0.2rem;
  align-items: center;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 0.5rem;
  overflow: hidden;
  padding-right: 0.5rem;
  .icon {
    position: absolute;
    left: 0.1rem;
    top: 0.1rem;
    float: left;
    width: 0.3rem !important;
    height: 0.3rem !important;
  }
  .filename {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding-block: 0.2rem;
    padding-left: 0.3rem;
    overflow: hidden;
    padding-right: 0.5rem;
    p {
      text-wrap: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .icon-guanbi2 {
    position: absolute;
    right: 0.2rem;
    top: 0.15rem;
    float: right;
    visibility: hidden;
  }
  &:hover {
    background-color: #d1d1d1;
    .icon-guanbi2 {
      visibility: visible;
    }
  }
}
</style>
