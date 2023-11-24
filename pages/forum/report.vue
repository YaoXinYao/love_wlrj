<template>
  <div class="report">
    <div class="post">
      <div class="head">
        <p class="home"><NuxtLink to="/forum/home">返回论坛社区</NuxtLink></p>
        <p class="title">
          发布新贴
        </p>
        <p class="smallTitle">请填写以下内容：</p>
      </div>
      <ForumdataReports />
    </div>
  </div>
</template>
<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.report {
  padding-top: 170px;
  .post {
    margin: 0 auto;
    font-family: "阿里妈妈刀隶体";
    .head {
      max-width: 900px;
      margin: 0 auto;
      margin-bottom: 20px;
      .home {
        text-align: right;
        font-size: 18px;
        font-weight: 200;
        margin-bottom: 5px;
        a:hover{
          color: rgb(11, 143, 215);
          cursor: pointer;
        }
      }
    }
    p {
      width: 100%;
      text-align: center;
    }
    .title {
      font-size: 25px;
      font-weight: 800;
      margin-bottom: 5px;
    }
    .smallTitle {
      font-weight: 600;
    }
  }
}
</style>
