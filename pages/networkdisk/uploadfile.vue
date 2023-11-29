<template>
  <div class="upload">
    <div
      :class="`uploadfilearea ${isActive ? 'uploadareaActive' : ''}`"
      @dragenter="handleDragEnter"
      @dragleave="handleDragOver"
      @drop.prevent="handleDrop"
      @dragover.prevent
      @click="openFile"
    >
      <svg
        t="1700298662718"
        class="upload-icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1924"
        width="100px"
        height="100px"
      >
        <path
          d="M324.6592 352.13312c7.1168 0 13.34272-2.66752 18.688-8.00768l141.50656-141.51168v443.2128c0 15.12448 11.5712 26.70592 26.7008 26.70592s26.7008-11.58144 26.7008-26.70592V202.61376l141.50656 141.51168c5.34528 5.34016 12.4672 8.00768 18.688 8.00768 6.23616 0 13.35296-2.66752 18.69312-8.00768 10.68032-10.68032 10.68032-27.59168 0-37.38112l-186.9056-186.89536c-0.88576-0.89088-2.66752-2.66752-4.44416-3.5584-0.88576 0-1.77664-0.89088-1.77664-0.89088-0.896-0.88576-1.78688-0.88576-2.67776-1.77664-0.89088 0-1.77664-0.89088-2.66752-0.89088-0.896 0-1.77664-0.89088-2.66752-0.89088a21.67296 21.67296 0 0 0-10.68032 0c-0.89088 0-1.77664 0.89088-2.66752 0.89088-0.89088 0-1.78176 0.89088-2.67264 0.89088-0.89088 0-1.77664 0.89088-2.66752 1.77664-0.89088 0-1.77664 0.89088-1.77664 0.89088-1.78176 0.89088-2.66752 1.78176-4.4544 3.5584L304.18944 306.74432c-10.68032 10.68032-10.68032 27.59168 0 37.38112 7.1168 5.34016 13.34784 8.00768 20.46976 8.00768z"
          fill="#333333"
          p-id="1925"
        ></path>
        <path
          d="M929.84832 556.83072c-15.1296 0-26.7008 11.5712-26.7008 26.7008v206.47936c0 38.272-31.15008 69.42208-69.41696 69.42208H189.37856c-38.26688 0-69.41696-31.15008-69.41696-69.42208v-206.47936c0-15.1296-11.5712-26.7008-26.7008-26.7008s-26.69568 11.5712-26.69568 26.7008v206.47936c0 67.6352 55.17824 122.81856 122.81856 122.81856h645.23776c67.64544 0 122.82368-55.18336 122.82368-122.81856v-206.47936c-0.896-15.1296-12.4672-26.7008-27.5968-26.7008z"
          fill="#333333"
          p-id="1926"
        ></path>
      </svg>
      <p class="uploadtip">拖拽到此处也可添加</p>
      <div class="uploadbt">
        <TransitionButton innertext="添加文件" />
      </div>
      <input
        ref="input"
        @change="loadingfile"
        class="uploadinput"
        type="file"
        multiple
        accept="*"
      />
    </div>
    <div class="uploadarea">
      <Uploaditem
        v-for="(item, index) in filequeue"
        :key="index"
        :file="item"
      />
    </div>
    <div
      class="uploadbt2"
      @click="dialogVisible = true"
      v-show="filequeue.length !== 0"
    >
      <TransitionButton innertext="下一步" />
    </div>
    <el-dialog v-model="dialogVisible" title="请选择文件分类标签" width="30%">
      <div class="Tagselect">
        <el-select-v2
          class="selcet-v2"
          v-model="curTag"
          size="large"
          style="width: max-content; min-width: 240px"
          :options="AllType"
          placeholder="选择分类"
          multiple
        />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleClose"> 开始上传 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      :close-on-press-escape="false"
      :show-close="false"
      :close-on-click-modal="false"
      v-model="dialogVisible2"
      title="正在上传....."
      width="70%"
    >
      <UploadLoding />
      <template #footer></template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useHomestore } from "~/store/home";
import { useDiskstore } from "~/store/disk";
const disstore = useDiskstore();
const homestore = useHomestore();
const { userinfo } = storeToRefs(homestore);
const { filequeue, AllType } = storeToRefs(disstore);
const dialogVisible = ref(false);
const dialogVisible2 = ref(false);
const input = ref<HTMLInputElement>();
const isActive = ref(false);
const curTag = ref([]);
disstore.getAllfiletag();
function loadingfile(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const selectedFile = inputElement.files;
  if (selectedFile) {
    let len = selectedFile.length;
    for (let i = 0; i < len; i++) {
      disstore.changequeue(selectedFile[i]);
    }
  }
}
function openFile() {
  input.value?.click();
}
function handleDragEnter(event: DragEvent) {
  isActive.value = true;
}
function handleDragOver(event: DragEvent) {
  isActive.value = false;
}
function handleDrop(event: DragEvent) {
  event.preventDefault(); // 阻止浏览器默认的拖放行为
  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    let len = files.length;
    for (let i = 0; i < len; i++) {
      disstore.changequeue(files[i]);
    }
  }
  isActive.value = false;
}
const handleClose = () => {
  dialogVisible.value = false;
  console.log(curTag.value); //标签ID
  uploadBt();
};
const uploadBt = async () => {
  // 开始上传列表
  dialogVisible2.value = true;
  //初始化上传片数为0
  disstore.updatereader(1);
  let totalChunk = 0;
  const chunkSize = 1024 * 1024 * 5;
  for (let item of filequeue.value) {
    totalChunk += createChunks(item, chunkSize).length;
  }
  await disstore.updateTotalByte(totalChunk);
  console.log(totalChunk);
  await uploadFileQueue(filequeue.value, 0);
  disstore.updatefilequeue();
  dialogVisible2.value = false;
  //上传完成
};
const uploadFileQueue = async (file: File[], index: number) => {
  if (index > file.length - 1) return; // 终止条件
  //设置正在传送的文件
  disstore.updateFile(file[index]);
  disstore.updateMd5(true);
  // const chunks = createChunks(file[index], 1024 * 1024);
  const md5info = await calculateFileHash(file[index]);
  console.log(md5info);
  disstore.updateMd5(false);
  //计算完成
  await startUpload(
    file[index],
    0,
    md5info as string,
    userinfo.value.userName,
    curTag.value
  );
  //一个文件传输完毕之后进行的操作
  disstore.updateFilename(filequeue.value[index].name);
  disstore.updatereadyByte(1);
  // 修正递归调用
  await uploadFileQueue(file, index + 1);
};
</script>
<style scoped lang="scss">
.upload {
  height: 100%;
  width: 100%;
  padding-top: 0.3rem;
  .uploadfilearea {
    z-index: 9999;
    transition-duration: 0.3s;
    cursor: pointer;
    padding-top: 0.4rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: auto;
    width: 70%;
    height: 3rem;
    border: 2px dashed #ccc;
    .upload-icon {
      margin-bottom: 0.2rem;
      width: 30px;
      height: 30px;
      color: #999;
      fill: currentColor;
      vertical-align: -0.15em;
      overflow: hidden;
      font-size: inherit;
      line-height: inherit;
    }
    .uploadtip {
      font-size: 0.14rem;
      color: #9e9e9e;
      margin-bottom: 0.2rem;
    }
    .uploadbt {
      margin-top: 0.2;
      width: 2.3rem;
      height: 0.6rem;
    }
    .uploadinput {
      display: none;
    }
  }
  .uploadareaActive {
    border: 2px dashed rgb(40, 77, 213) !important;
  }
  .uploadarea {
    width: 70%;
    min-height: 2rem;
    overflow-y: auto;
    margin: auto;
  }
  .uploadbt2 {
    width: 3rem;
    margin: auto;
  }
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.Tagselect {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
