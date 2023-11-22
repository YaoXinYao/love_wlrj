<template>
  <div class="downOpen" v-if="down.isOpen">
    <div class="downloadingbox">
      <div class="downheader">
        <span class="spend">{{ down.downSpend }}</span>
        <el-progress
          style="width: 90%"
          :percentage="down.downProgress"
          :stroke-width="10"
          striped
        />
      </div>
      <div class="filename">
        {{ downByte }} / {{ convertFileSize(Number(down.downSize)) }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDiskstore } from "~/store/disk";
const diskstore = useDiskstore();
const { down } = storeToRefs(diskstore);
const downByte = computed(() => {
  return convertFileSize(
    (Number(down.value.downSize) * down.value.downProgress) / 100
  );
});
</script>
<style scoped lang="scss">
.downOpen {
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 999999999999;
  top: 0px;
  left: 0px;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .downloadingbox {
    padding-block: 0.4rem;
    padding-inline: 0.3rem;
    width: 60%;
    height: 1rem;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;

    .downheader {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.1rem;
      .spend {
        font-weight: 700;
        color: rgb(0, 149, 255);
      }
    }
  }
}
</style>
