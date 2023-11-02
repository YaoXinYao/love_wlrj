<template>
  <div class="rota">
    <el-dialog
      v-model="rotatinDelete"
      title="提示信息"
      width="30%"
    >
      <span>确定要删除这个轮播图？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="rotatinDelete = false">确定</el-button>
          <el-button @click="rotatinDelete = false">
            取消
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useRotationStore } from "~/store/rotation";
const rotations = useRotationStore();
const { rotatinDelete, rotatinState } = storeToRefs(rotations);
</script>

<style lang="scss">
.rota {
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
}
</style>
