<template>
  <div class="desc">
    <div class="desc-comn">
      <div class="titledisplay">小组简介</div>
      <div class="profilebox">
        <div class="profileleft">
         
        </div>
        <div class="profileright"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.desc {
  width: 100%;
  height: 100vh;
  background: linear-gradient(-32.2deg, #f7edfa, #e2ebfa);
  padding: 1rem 0;
  .desc-comn {
    position: relative;
    margin: 0 auto;
    width: 12.65rem;
    margin-bottom: 0.5rem;
    min-height: 1rem;
    font-size: 0.46rem;

    .titledisplay {
      font-size: 0.36rem;
      font-weight: 700;
      line-height: 0.44rem;
      text-align: center;
    }
    .profilebox {
      font-size: 0.24rem;
      padding: 1.4rem 0.7rem 0;
      background: rgba(225, 237, 255, 0.5);
      border: 2px solid hsla(0, 0%, 100%, 0.8);
      border-radius: 0.24rem;
      margin-top: 0.24rem;
      display: flex;
      overflow: hidden;
      padding-bottom: 0.7rem;
      .profileleft {
        flex: 1;
      }
      .profileright {
        flex: 1;
      }
      p {
        text-indent: 0.48rem;
      }
    }
  }
}
</style>
