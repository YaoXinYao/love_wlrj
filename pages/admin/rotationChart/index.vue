<template>
  <div class="chart">
    <div class="addPhoto">
      <el-button type="success" @click="rotatinState = true">添加</el-button>
    </div>
    <el-carousel :interval="2000" height="calc(100vh - 160px)">
      <el-carousel-item
        v-if="carouselItem.length != 0"
        v-for="(item, index) in carouselItem"
        :key="index"
      >
        <div
          class="carousel-item-wrapper"
          :style="{ backgroundImage: `url(${item.carouselUrl})` }"
        >
          <div class="operate">
            <div>
              <el-icon class="delete" @click="deletajage(item.carouselId)"
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
    <el-dialog v-model="rotatinDelete" title="提示信息" width="300px">
      <span>确定要删除这个轮播图？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="deleteInfo">确定</el-button>
          <el-button @click="rotatinDelete = false"> 取消 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="rotatinState" title="提示信息" width="450px">
      <el-form label-width="5em">
        <el-form-item label="标题">
          <el-input v-model="carouselTitle" />
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="carouselContent" />
        </el-form-item>
        <el-form-item label="轮播图">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :limit="1"
            :on-exceed="exceedFun"
            accept="image/*"
            v-model:file-list="photos"
          >
            <el-icon><Plus /></el-icon>
            <template #file="{ file }">
              <div>
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <el-icon><zoom-in /></el-icon>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <el-icon><Delete /></el-icon>
                  </span>
                </span>
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="subminInfo">确定</el-button>
          <el-button @click="shutInfo"> 取消 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="dialogVisible"
      class="previews"
      style="max-width: 400px"
    >
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { CircleClose, Plus, Delete, ZoomIn } from "@element-plus/icons-vue";
import type { UploadFile, UploadUserFile } from "element-plus";
import { storeToRefs } from "pinia";
import { useRotationStore } from "~/store/rotation";
let rotatinDelete = ref(false);
let rotatinState = ref(false);
const rotationsInfo = useRotationStore();
const { carouselItem } = storeToRefs(rotationsInfo);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);
let carouselContent = ref("");
let carouselTitle = ref("");
let photos = ref<any[]>([]);
let deleId:number;
onMounted(() => {
  rotationsInfo.getCarousel();
});
const handleRemove = (file: UploadFile) => {
  photos.value = [];
};
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};
//超出文件数量的钩子
const exceedFun = (files: File[], uploadFiles: UploadUserFile[]) => {
  ElMessage.warning("只允许上传一个文件");
};
const subminInfo = () => {
  let formdata = new FormData();
  formdata.append("carouselContent", carouselContent.value);
  formdata.append("carouselTitle", carouselTitle.value);
  formdata.append("file", photos.value[0].raw);
  useFetch("/zinfo/user/carousel/insertCarousel", {
    method: "POST",
    body: formdata,
  }).then((res) => {
    ElMessage.success("添加成功");
    rotationsInfo.getCarousel();
    rotatinState.value = false;
    carouselContent.value = "";
    carouselTitle.value = "";
    photos.value = [];
  });
};
const shutInfo = () => {
  rotatinState.value = false;
  carouselContent.value = "";
  carouselTitle.value = "";
  photos.value = [];
};

const deletajage = (id:number)=>{
  deleId = id
  rotatinDelete.value = true;
}
const deleteInfo = () => {
  rotationsInfo.deleteCarousel(deleId).then(res=>{
    if(res == 20000){
    ElMessage.success("移除成功")
    rotationsInfo.getCarousel();
    }else{
    ElMessage.error("操作失败")
    }
  })
  rotatinDelete.value = false;
};
</script>
<style lang="scss" scoped>
.addPhoto {
  margin-bottom: 10px;
}
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
.dialog-footer button:first-child {
  margin-right: 10px;
}
.el-dialog.previews {
  overflow: hidden;
  img {
    width: 100%;
    object-fit: cover;
  }
}
</style>
