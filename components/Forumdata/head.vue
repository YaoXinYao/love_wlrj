<template>
  <div class="head">
    <div class="content">
      <div class="text">
        <p><span>下午好</span> TOM</p>
        <div>欢迎来到未来论坛</div>
      </div>
      <div class="search">
        <el-input
          v-model="source"
          class="cardInput"
          size="large"
          placeholder="搜索帖子"
          :prefix-icon="Search"
        />
        <ul class="tag">
          <li>软著</li>
          <li>成绩</li>
          <li>学习</li>
          <li>头脑风暴</li>
          <li>讲课</li>
          <li>生活</li>
          <li>娱乐</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { forumStore } from "~/store/forum";
const forumData = forumStore();
let { source } = storeToRefs(forumData);
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  width: 100%;
  height: 450px;
  padding-top: 175px;
  justify-content: center;
  background-image: url("/public/img/back1.png");
  background-repeat: no-repeat;
  background-size: cover;
  animation: 0.6s ease-in 0s 1 normal forwards running bgShow;
}
@keyframes bgShow {
  100% {
    opacity: 0.85;
    transform: scale(1);
  }
}
.content {
  width: 1000px;
  height: 200px;
  display: flex;
  justify-content: space-around;
}
.text {
  p {
    margin-bottom: 30px;
    font-size: 23px;
    font-weight: 400;
    span {
      color: rgb(138 141 144);
    }
  }
  div {
    font-size: 30px;
    color: black;
    font-weight: 500;
  }
}
.search {
  width: 300px;
  .el-input--large {
    width: 300px;
    border-radius: 8px;
  }
  .tag {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
    li {
      width: 90px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border: 1px rgba(216, 215, 215, 0.92) solid;
      border-radius: 3px;
      margin-bottom: 8px;
      cursor: pointer;
    }
    li:hover{
      color: #409eff;
      background-color: #ecf5ff;
      border-color: #c6e2ff;
    }
  }
}
</style>
