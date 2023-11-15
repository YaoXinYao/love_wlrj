<template>
  <div class="actionPage">
    <div class="diskcontainer">
      <div
        class="img"
        :style="{ backgroundImage: `url(${imgdata[curIndex]})` }"
      ></div>
      <div class="linkitem">
        <NuxtLink to="/networkdisk/documentcommunity">
          <div class="linkitemroot" @mouseenter="curIndex = 0">
            <div class="linkitemrootleft">
              <h3>文件社区</h3>
              <p>文件分享专区</p>
            </div>
            <div class="linkitemrootright">
              <i class="iconfont icon-xiangyou-copy-copy"></i>
            </div>
          </div>
        </NuxtLink>
        <NuxtLink to="/networkdisk/uploadfile">
          <div class="linkitemroot" @mouseenter="curIndex = 1">
            <div class="linkitemrootleft">
              <h3>上传文件</h3>
              <p>分享自己的好东西</p>
            </div>
            <div class="linkitemrootright">
              <i class="iconfont icon-xiangyou-copy-copy"></i>
            </div>
          </div>
        </NuxtLink>
        <NuxtLink to="/networkdisk/mylove">
          <div class="linkitemroot" @mouseenter="curIndex = 2">
            <div class="linkitemrootleft">
              <h3>我的收藏</h3>
              <p>我最爱的文件</p>
            </div>
            <div class="linkitemrootright">
              <i class="iconfont icon-xiangyou-copy-copy"></i>
            </div>
          </div>
        </NuxtLink>
        <NuxtLink to="/networkdisk/myfile">
          <div class="linkitemroot" @mouseenter="curIndex = 3">
            <div class="linkitemrootleft">
              <h3>我的文件</h3>
              <p>我的传家宝</p>
            </div>
            <div class="linkitemrootright">
              <i class="iconfont icon-xiangyou-copy-copy"></i>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//切换侧栏图片
const curIndex = ref(0);
const imgdata = ref([
  "/images/getassets.52484027.png",
  "/images/getfile.dd00da7a.png",
  "/images/mylove.png",
  "/images/myfile.png",
]);
</script>

<style scoped lang="scss">
.actionPage {
  width: 100%;
  height: 100%;
  padding: 1rem;
  padding-top: 0.5rem;
  .diskcontainer {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    .img {
      width: 50%;
      height: 100%;
      background-image: url("/images/getassets.52484027.png");
      background-size: cover;
      background-repeat: no-repeat;
      background-size: 80%;
    }
    .linkitem {
      width: 50%;
      height: 100%;
      .linkitemroot {
        width: 3.3rem;
        height: 0.9rem;
        margin-bottom: 0.18rem;
        padding-block: 0.25rem;
        padding-inline: 0.1rem;
        padding-left: 0.3rem;
        border-radius: 0.15rem;
        -webkit-box-shadow: 0 2px 20px 0 rgba(175, 179, 191, 0.2);
        box-shadow: 0 2px 20px 0 rgba(175, 179, 191, 0.2);
        cursor: pointer;
        opacity: 0.9;
        transition-duration: 0.3s;
        display: flex;
        flex-direction: row;
        background: #fff;
        .linkitemrootleft {
          width: 90%;
          height: 100%;
          h3 {
            margin-bottom: 0.1rem;
          }
          p {
            font-size: 0.13rem;
          }
        }
        .linkitemrootright {
          display: flex;
          align-items: center;
          transform: scale(0.8);
          width: 10%;
          height: 100%;
        }
        &:hover {
          color: white;
          background: linear-gradient(125deg, #42d8ff, #06a8ff);
        }
      }
    }
  }
}
</style>
