<template>
  <div ref="fileitem" class="filelistitem animate__animated animate__fadeInUp">
    <div>
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="`#${iconfontType(filetype2(file.name))}`"></use>
      </svg>
      <span>{{ file.name }}</span>
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
  fileitem.value?.classList.remove("animate__fadeInUp");
  fileitem.value?.classList.add("animate__fadeOutRight");
  setTimeout(() => {
    diskstore.deletequeue(val);
  }, 1000);
}
</script>

<style scoped lang="scss">
.filelistitem {
  transition-duration: 0.3s;
  padding-inline: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  height: 0.5rem;
  span {
    margin-left: 0.1rem;
  }
  .icon-guanbi2 {
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
