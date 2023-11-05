<template>
  <div class="app-header2">
    <div class="unfold" @click="openbox">
      <i class="iconfont icon-caidan"></i>
    </div>
    <Unfoldbox ref="unfold" />
  </div>
</template>
<script setup lang="ts">
const unfold = ref<any>(null);
function openbox() {
  console.log("123");
  unfold.value!.changeflod(true);
}
</script>
<style scoped lang="scss">
.app-header2 {
  position: fixed;
  top: 0rem;
  width: 100%;
  background-color: transparent;
  display: flex;
  justify-content: right;
  height: 0.8rem;
  transition-duration: 0.3s;
  font-size: 0.16rem;
  z-index: 999;
  padding-right: 0.1rem;
  padding-top: 0.1rem;
  .unfold {
    cursor: pointer;
    height: 0.8rem;
    width: 0.8rem;
    border-radius: 50%;
    color: rgb(0, 0, 0);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(4, 4, 4, 0.6);
    i {
      font-size: 0.24rem;
    }
    .unfoldbox {
      width: 100% !important;
      font-size: 0.14rem !important;
      .el-drawer {
        width: 100% !important;
      }
    }
  }
}
</style>
