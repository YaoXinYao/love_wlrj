<template>
  <div class="uploadingbox">
    <div class="header">
      <div class="uploadtip">正在上传中</div>
      <el-progress
        class="progresstotal"
        :percentage="50"
        :stroke-width="5"
        striped
      />
      <div>已完成 {{ Totalprogress }}%</div>
    </div>
    <div class="uploadboxitem" v-for="item in filequeue" :key="item.name">
      <div class="fileitem">
        <div class="fileitemicon">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="`#${iconfontType(filetype(item.name))}`"></use>
          </svg>
        </div>
        <div class="fileitemname">
          <div>{{ item.name }}</div>
          <div>
            {{ convertFileSize(uploadProps.curuploadFile.Filespend) }} /
            {{ convertFileSize(item.size) }}
          </div>
        </div>
        <div class="filetime">-- : -- : --</div>
        <div class="loading">
          <div
            class="computedMd5"
            v-if="uploadProps.curuploadFile.isComptedMd5"
          >
            正在为传输文件做准备..
          </div>
          <div class="actionUp" v-if="!uploadProps.curuploadFile.isComptedMd5">
            <el-progress
              class="loading"
              :text-inside="true"
              :stroke-width="3"
              :percentage="70"
              v-show="uploadProps.curuploadFile.FileFlag == item.name"
            />
            <div
              v-show="uploadProps.curuploadFile.FileFlag != item.name"
              class="spend"
            >
              {{ convertFileSize(uploadProps.curuploadFile.Filespend) }} / S
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDiskstore } from "~/store/disk";
const diskstore = useDiskstore();
const { uploadProps, filequeue } = storeToRefs(diskstore);
console.log(
  uploadProps.value.alreadyByte,
  uploadProps.value.uploadFileTotalByte
);
const Totalprogress = computed(() => {
  return (
    (uploadProps.value.alreadyByte / uploadProps.value.uploadFileTotalByte) *
    100
  ).toFixed(1);
});
</script>
<style scoped lang="scss">
.uploadingbox {
  width: 100%;
  height: auto;
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3rem;
    .uploadtip {
      color: rgb(15, 174, 254);
    }
    .progresstotal {
      width: 80%;
    }
  }
  .uploadboxitem {
    width: 100%;
    height: auto;
    .fileitem {
      display: flex;
      align-items: center;
      width: 100%;
      height: 0.8rem;
      & > div {
        height: 100%;
        display: flex;
      }
      .fileitemicon {
        justify-content: center;
        align-items: center;
      }
      .fileitemname {
        width: 50%;
        flex-direction: column;
        align-items: center;
        padding-left: 0.2rem;
        justify-content: center;
        & > div {
          overflow: hidden;
          text-wrap: nowrap;
          text-overflow: ellipsis;
          width: 100%;
        }
      }
      .filetime {
        width: 1.5rem;
        align-items: center;
        justify-content: center;
      }
      .loading {
        align-items: center;
        justify-content: center;
        width: 3.5rem;
        .computedMd5 {
          display: none;
        }
        .actionUp {
          flex-direction: column;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top: 0.1rem;
          width: 100%;
          height: 100%;
          .loading {
            width: 80%;
          }
          .spend {
            margin-top: 0.1rem;
            width: 80%;
          }
        }
      }
    }
  }
}
</style>
