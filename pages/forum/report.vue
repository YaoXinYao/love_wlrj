<template>
  <div class="report">
    <div class="post">
      <div class="head">
        <p class="title">发布新贴</p>
        <p class="smallTitle">请填写以下内容：</p>
      </div>
      <ForumdataReports />
    </div>
  </div>
</template>
<script lang="ts" setup></script>

<style lang="scss" scoped>
.report {
    padding-top: 150px;
  .post {
    width: 1000px;
    margin: 0 auto;
    font-family: "阿里妈妈刀隶体";
    .head {
      margin-bottom: 20px;
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
