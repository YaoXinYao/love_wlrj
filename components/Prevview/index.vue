<template>
  <div>
    <el-dialog v-model="dialogVisible" title="文件预览(点击可放大)" width="30%">
      <div v-show="PrevViewdata.length !== 0" class="demo-image__lazy">
        <el-image
          v-for="(item, index) in PrevViewdata"
          :src="item"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="PrevViewdata"
          :initial-index="index"
          fit="cover"
        />
      </div>
      <el-empty
        v-show="PrevViewdata.length == 0"
        description="此文件暂无预览图"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="handleClick">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getFilePreviewList } from "~/service/homeApi";
const dialogVisible = ref(true);
const PrevViewdata = ref<string[]>([]);
//接收文件id，
const props = defineProps({
  fileid: {
    type: Number,
    required: true,
  },
  downOpen: {
    type: Function,
    required: true,
  },
});
watch(
  () => props.fileid,
  async () => {
    const res = await getFilePreviewList(props.fileid);
    PrevViewdata.value = res.data.value.data.map((item) => {
      return item.filePreviewUrl;
    });
  },
  {
    immediate: true,
  }
);
// 定义这个组件的事件，，关闭组件
const handleClick = () => {
  props.downOpen();
};
</script>

<style scoped lang="scss">
.demo-image__lazy {
  height: 4rem;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: auto;
}
.demo-image__lazy .el-image {
  border: 1px solid beige;
  width: 100%;
  display: block;
  margin-bottom: 10px;
  margin-left: 0.2rem;
}
.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}
</style>
