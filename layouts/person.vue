import import { UnwrapRef from 'vue';
<template>
  <div class="header">
    <div class="headerContent">
      <img class="logo" src="@/assets/image/小组logo.png" />
      <ul class="nav">
        <li>导航1</li>
        <li>导航2</li>
        <li>导航3</li>
        <li>
          <div class="navUser">
            <el-dropdown>
              <span class="el-dropdown-link">
                用户名
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <slot></slot>
</template>

<script setup lang="ts">
import { ArrowDown } from "@element-plus/icons-vue";
</script>

<style lang="scss" scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  color: var(--el-color-primary);
}

.header {
  width: 100%;
  height: 60px;
  background-color: $groupColor;
}

.el-dropdown-link {
  color: aliceblue;
  font-size: 17px;
  cursor: pointer;
}
.headerContent {
  display: flex;
  justify-content: space-between;
  width: $originalWidth;
  margin: 0 auto;
  height: 100%;

  .logo {
    height: 100%;
  }

  .nav {
    display: flex;

    li {
      width: max-content;
      margin: 10px 10px;
      height: 40px;
      line-height: 40px;
      padding: 0 5px;
      color: #fff;
      border-radius: 5px;
      font-size: 17px;
      cursor: pointer;
    }

    li:not(:last-child):hover {
      background-color: #fff;
      color: $groupColor;
    }

    .navUser {
      display: flex;
      align-items: center;
      width: 200px;
      height: 100%;
      padding: 0;
    }
  }
}
</style>
