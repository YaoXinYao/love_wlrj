<template>
  <div class="home">
    <ForumdataHead></ForumdataHead>
    <ForumdataMain></ForumdataMain>
    <div class="addPost">
      <NuxtLink to="/forum/report">
        <el-icon><Plus /></el-icon>
      </NuxtLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { forumStore } from "~/store/forum";
import { Plus } from "@element-plus/icons-vue";
let forums = forumStore()
onMounted(()=>{
  forums.getUser(8)
})
</script>

<style lang="scss" scoped>
.home {
  .addPost {
    position: fixed;
    right: 10px;
    bottom: 200px;
    padding: 7px;
    border-radius: 50%;
    background-color: #8ad0ff;
    .el-icon {
      color: aliceblue;
      font-size: 20px;
      cursor: pointer;
    }
  }
}
</style>
