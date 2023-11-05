<template>
  <div class="article">
    <div :class="`articleleft ${iswidescreen ? 'activeleft' : ''}`">
      <MarkdownDis :mark-text="markText" />
    </div>
    <div :class="`articleright ${iswidescreen ? 'activeright' : ''}`"></div>
    <div class="markdownoptions">
      <div class="optionsitem">
        <i class="iconfont icon-zan-copy"></i>
      </div>
      <div class="optionsitem" @click="changewide">
        <i
          :class="`iconfont ${
            iswidescreen ? 'icon-shousuo' : 'icon-moduanzuoyouzhankai'
          }`"
        ></i>
      </div>
      <div class="optionsitem">
        <i class="iconfont icon-JC_054"></i>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const iswidescreen = ref(false);
const markText = ref("");
useHeader();
const { data, pending, error, refresh } = await useFetch<any>(
  `http://localhost:3000/api/v1/user/${route.params.id}`
);
markText.value = data.value!.username;
function changewide() {
  iswidescreen.value = !iswidescreen.value;
}
</script>
<style scoped lang="scss">
//媒体查询布局
@media screen and (max-width: 998px) {
  .articleleft {
    transition-duration: 0.3s;
    width: 100% !important;
    height: auto;
    background: #fff;
    margin-right: 0.5rem;
    border-radius: 0.1rem;
    padding: 0.68rem 0.46rem 0;
    padding-bottom: 0.5rem;
    width: 100%;
  }
  .articleright {
    display: none;
    display: none !important;
  }
  .article {
    width: 100% !important;
  }
  .markdownoptions {
    visibility: hidden;
  }
}
.article {
  background-color: #f4f8fb;
  margin: auto;
  height: auto;
  width: 11.3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 1rem 0;
  .articleleft {
    transition-duration: 0.3s;
    width: 8rem;
    height: auto;
    background: #fff;
    margin-right: 0.5rem;
    border-radius: 0.1rem;
    margin-right: 0.14rem;
    padding-inline: 0.4rem;
    padding-block: 0.5rem;
  }

  .articleright {
    position: sticky;
    border-radius: 10px;
    top: 1rem;
    width: 2.5rem;
    height: 5rem;
    background-color: rgb(255, 255, 255);
  }
  .activeright {
    display: none;
  }
  .activeleft {
    width: 100%;
  }
  .markdownoptions {
    position: fixed;
    margin-left: -12rem;
    top: 140px;
    z-index: 2;
    width: 0.5rem;
    height: auto;
    .optionsitem {
      width: 0.5rem;
      height: 0.5rem;
      background-color: white;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      cursor: pointer;
      align-items: center;
      margin-bottom: 0.1rem;
      i {
        font-size: 0.26rem;
      }
    }
  }
}
</style>
