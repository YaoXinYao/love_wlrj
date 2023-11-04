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
import { Plus } from "@element-plus/icons-vue";
</script>

<style lang="scss" scoped>
.home {
    .addPost{
        position: fixed;
        right: 10px;
        bottom: 200px;
        padding: 7px;
        border-radius: 50%;
        background-color: #8ad0ff;
        .el-icon{
            color: aliceblue;
            font-size: 20px;
            cursor: pointer;
        }
    }
}
</style>