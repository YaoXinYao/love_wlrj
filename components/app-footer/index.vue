<template>
  <div class="app-footer">
    <div class="container">
      <div class="containerleft">
        <img src="/images/小组logo.png" alt="" />
      </div>
      <div class="containerright"></div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>

<style lang="scss" scoped>
.app-footer {
  height: 30vh;
  .container {
    height: 100%;
    margin: auto;
    background-color: white;
    width: 11rem;
    display: flex;
    .containerleft {
      width: 30%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 50%;
      }
    }
    .containerright {
      width: 70%;
      height: 100%;
      background-color: skyblue;
    }
  }
}
</style>
