<template>
  <div>
    <div class="containerTital">
      <div
        class="aboutbox"
        @mouseleave="mouseover"
        @mouseenter="mouseenter"
        :style="{
          transform: `translateY(${styles.x}rem)`,
          transitionDuration: `${styles.time}ms`,
        }"
      >
        <div class="title EN1">
          <span class="about">{{ title }}</span>
        </div>
        <div class="title EN2">
          <span class="about">{{ title }}</span>
        </div>
        <div class="title EN3">
          <span class="about">{{ title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { title = "关于未来" } = defineProps(["title"]);
const styles = ref({
  x: 0,
  time: 0,
});
//按钮切换效果
function mouseenter() {
  styles.value = {
    x: -0.5,
    time: 300,
  };
}
function mouseover() {
  styles.value = {
    x: -1.0,
    time: 300,
  };
  setTimeout(() => {
    styles.value = {
      x: 0,
      time: 0,
    };
  }, 300);
}
</script>

<style scoped lang="scss">
.containerTital {
  position: relative;
  text-align: right;
  width: 100%;
  height: 0.5rem;
  display: flex;
  justify-content: center;
  overflow: hidden;
  .aboutbox {
    position: relative;
    transition-duration: 0.3s;
    z-index: 9999;
    .title {
      width: 2.4rem;
      height: 0.5rem;
      cursor: pointer;
      transition-duration: 0.3s;
      background-color: transparent;
      color: rgb(0, 0, 0);
      display: flex;
      font-size: 0.16rem;
      justify-content: center;
      align-items: center;
    }
    .EN2 {
      background-color: RGB(55, 120, 229);
      color: white;
    }
  }
}
</style>
