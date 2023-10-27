<template>
  <div class="scoreTypeList">
    <div
      class="scoreTypeItem"
      v-for="(s, index) in scoreTypes"
      :key="index"
      :style="`background-color: rgba(${colors[index % colors.length]},0.5);`"
    >
      {{ s }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { colors } from "../../../assets/data/tsConstant";
const scoreTypes = [
  "头脑风暴",
  "项目",
  "考核",
  "讲课",
  "头脑风暴",
  "项目",
  "考核",
  "讲课",
];
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "阿里妈妈刀隶体";
  src: url("@/assets/fonts/AlimamaDaoLiTi.ttf");
}
.scoreTypeList {
  display: grid;
  width: 90%;
  margin: 0 5%;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, 200px);
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}
.scoreTypeItem {
  display: inline-block;
  height: 130px;
  border-radius: 7px;
  font-family: "阿里妈妈刀隶体";
  font-size: 35px;
  color: aliceblue;
  box-shadow: 5px 5px 15px rgb(201, 198, 198), -5px -5px 10px #fff;
  cursor: pointer;
  transition: all 0.3s;
  transform-style: preserve-3d;

  &:hover {
    animation-name: rotateAni;
    animation-duration: 0.4s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
    // animation-fill-mode: forwards;
    // box-shadow: 5px 5px 10px rgb(219, 218, 218) inset, -5px -5px 10px #fff inset;
  }
}

@keyframes rotateAni {
  0% {
    transform: rotateY(0);
  }
  50% {
    transform: rotateY(35deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}
</style>
