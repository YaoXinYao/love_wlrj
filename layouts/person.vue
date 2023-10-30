<template>
  <div class="header">
    <div class="headerContent">
      <div class="logoBox">
        <img class="logo" src="@/assets/image/小组logo.png" />
        <span class="logoText">未来软件</span>
      </div>

      <ul class="nav">
        <li>导航1</li>
        <li>导航2</li>
        <li>导航3</li>
      </ul>
      <div class="navUser">
        <el-dropdown trigger="click" class="dropDown">
          <span class="el-dropdown-link">
            用户名<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item> Action 2 </el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
  <slot></slot>
</template>

<script setup lang="ts">
import { ArrowDown } from "@element-plus/icons-vue";
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "阿里妈妈黑体";
  src: url("@/assets/fonts/AlimamaShuHeiTi-Bold.ttf");
}
.block-col-2 .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px) saturate(1.5);
  border-bottom: 1px solid #ddd;
  z-index: 9999;
}

.headerContent {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  width: $originalWidth;
  margin: 0 auto;
  height: 100%;
}
.logoBox {
  display: flex;
  height: 100%;
  cursor: pointer;
}
.logo {
  height: 60px;
}

.logoText {
  display: inline-block;
  height: 100%;
  line-height: 70px;
  font-size: 28px;
  font-family: "阿里妈妈黑体";
  margin-left: -10px;
}

.nav {
  display: flex;

  justify-content: center;

  li {
    width: max-content;
    margin: 10px 10px;
    height: 40px;
    line-height: 40px;
    padding: 0 5px;
    border-radius: 5px;
    font-size: 17px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 700;
    transition: all 0.3s;
  }
}

.navUser {
  display: flex;
  justify-content: right;
  align-items: center;
  width: 200px;
  height: 100%;
}

.dropDown {
  cursor: pointer;
  color: #666;
  font-size: 18px;
  font-weight: 700;
}
</style>
