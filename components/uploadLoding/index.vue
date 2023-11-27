<template>
  <div class="uploadingbox">
    <div class="header">
      <div class="uploadtip">正在上传中</div>
      <el-progress
        class="progresstotal"
        :duration="1"
        :percentage="Number(totalProgress)"
        :stroke-width="5"
        striped
      />
      <div>已完成 {{ totalProgress }}%</div>
    </div>
    <div class="uploadboxitem" v-for="item in filequeue" :key="item.name">
      <div class="fileitem">
        <div class="fileitemleft">
          <div class="fileitemicon">
            <svg class="icon" aria-hidden="true">
              <use
                :xlink:href="`#${iconfontType(filetype(`${item.name}`))}`"
              ></use>
            </svg>
          </div>
          <div class="fileitemname">
            <div>{{ item.name }}</div>
            <div v-show="!uploadProps.HavePassed.includes(item.name)">
              <span v-show="uploadProps.curUpFile.File?.name == item.name">
                {{ convertFileSize((Number(oneProgress) / 100) * item.size) }}
              </span>
              <span v-show="uploadProps.curUpFile.File?.name !== item.name">
                0
              </span>
              / {{ convertFileSize(item.size) }}
            </div>
          </div>
        </div>
        <!-- <div class="filetime">-- : -- : --</div> -->
        <div
          class="loading"
          v-show="
            uploadProps.curUpFile.File?.name == item.name &&
            !uploadProps.HavePassed.includes(item.name)
          "
        >
          <div class="computedMd5" v-show="uploadProps.curUpFile.ParseMd5">
            正在为传输文件做准备..
          </div>
          <div class="actionUp" v-show="!uploadProps.curUpFile.ParseMd5">
            <el-progress
              class="loading"
              :text-inside="true"
              :duration="1"
              :stroke-width="3"
              :percentage="Number(oneProgress)"
            />
            <div class="spend"></div>
          </div>
        </div>
        <div class="downed" v-show="uploadProps.HavePassed.includes(item.name)">
          上传完成！
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDiskstore } from "~/store/disk";
const diskstore = useDiskstore();
const { filequeue, uploadProps } = storeToRefs(diskstore);
//计算总体进度
const totalProgress = computed(() => {
  let total = uploadProps.value.uploadFileTotalByte || 1;
  let progress = (uploadProps.value.alreadyByte / total) * 100;
  if (progress >= 100) {
    progress = 100;
  }
  return Math.floor(progress).toFixed(1);
});
//计算单个进度
const oneProgress = computed(() => {
  if (uploadProps.value.curUpFile.File == null) return 0;
  let progress: number = 0;
  progress =
    ((uploadProps.value.curUpFile.upedChunk + 1) /
      createChunks(uploadProps.value.curUpFile.File as File, 1024 * 1024 * 5)
        .length) *
    100;
  if (progress >= 100) {
    progress = 100;
  }
  return Math.floor(progress).toFixed(1);
});
//当前文件的下载进度
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
      justify-content: space-between;
      & > div {
        height: 100%;
        display: flex;
      }
      .fileitemicon {
        justify-content: center;
        align-items: center;
      }
      .fileitemname {
        width: 4rem;
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
      .downed {
        align-items: center;
        justify-content: center;
        width: 3.5rem;
      }
    }
  }
}
</style>
