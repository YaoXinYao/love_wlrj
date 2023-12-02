<template>
  <div class="head">
    <div class="content">
      <div class="text">
        <p><span style="margin-right:7px">{{time}}</span>{{ userinfo.userName }}</p>
        <div class="weclome">欢迎来到未来论坛</div>
        <div class="desc">在这里，你可以畅所欲言,分享你的生活，倾听他人的声音</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import {useHomestore} from "~/store/home"
let userData = useHomestore()
let {userinfo} = storeToRefs(userData)
let time = ref("今天好");
let timer;
let d = new Date();
timer = d.getHours();
if (timer < 11) {
  time.value = "上午好";
} else if (timer < 14) {
  time.value = "中午好";
} else if (timer < 19) {
  time.value = "下午好";
} else {
  time.value = "晚上好";
}
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  width: 100%;
  height:360px;
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
  display: flex;
  padding: 0 50px 0 0;
  flex-wrap: wrap;
  justify-content: space-between;
}
.text {
  p {
    margin-bottom: 20px;
    font-size: 23px;
    font-weight: 400;
    span {
      color: rgb(138 141 144);
    }
  }
  .weclome {
    font-size: 30px;
    color: black;
    font-weight: 500;
  }
  .desc{
    font-size: 15px;
    margin-top: 20px;
  }
}
</style>
