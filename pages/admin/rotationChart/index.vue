<template>
  <div class="chart">
    <el-carousel :interval="2000" height="calc(100vh - 160px)">
      <el-carousel-item
        v-if="carouselItem.length != 0"
        v-for="(item, index) in carouselItem"
        :key="index"
      >
        <div
          class="carousel-item-wrapper"
          :style="{ backgroundImage: `url(${item.src})` }"
        >
          <div class="operate">
            <div class="upload">
              <input type="file" class="files" accept="image/*"/>
              <el-icon class="add" @click="rotatinState = true">
                <CirclePlus
              /></el-icon>
            </div>
            <div>
              <el-icon class="delete" @click="rotatinDelete = true"
                ><CircleClose
              /></el-icon>
            </div>
          </div>
        </div>
      </el-carousel-item>
      <el-carousel-item v-if="carouselItem.length == 0">
        <div
          class="carousel-item-wrapper"
          :style="{
            backgroundImage:
              'url(https://img0.baidu.com/it/u=101714381,3578597708&fm=253&fmt=auto&app=138&f=JPEG?w=767&h=300)',
          }"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <RotationModel />
  </div>
</template>
<script lang="ts" setup>
import { CirclePlus, CircleClose } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { useRotationStore } from "~/store/rotation";
const rotations = useRotationStore();
const { rotatinDelete, rotatinState } = storeToRefs(rotations);
const carouselItem: any[] = [
  {
    src: "/images/wallhaven-kxj3l1_1920x1080.png",
  },
  {
    src: "/images/wallhaven-vqeyxl_3840x2160.png",
  },
  {
    src: "/images/wallhaven-yxkm5k_3840x2160.png",
  },
];
</script>
<style lang="scss">
.carousel-item-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  .operate {
    display: flex;
    height: 30px;
    margin: 0 auto;
    div {
      display: inline-block;
      width: 30px;
      height: 30px;
      margin-left: 20px;
      input {
        position: relative;
        width: 30px;
        height: 30px;
        z-index: 5;
        left: 20px;
        opacity: 0;
      }
      .upload:hover {
        cursor: pointer !important;
      }
      .add {
        position: relative;
        top: -30px;
      }
    }
    .el-icon {
      font-size: 30px;
      color: #fcfcfc;
      margin-left: 20px;
    }
    .el-icon:hover {
      cursor: pointer;
    }
  }
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
