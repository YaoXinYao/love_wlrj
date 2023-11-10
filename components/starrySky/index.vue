<template>
  <div>
    <div class="layer1"></div>
    <div class="layer2"></div>
    <div class="layer3"></div>
    <div class="layer4"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@function getshadows($n) {
  $showdows: "#{random(100)}vw #{random(100)}vh #fff";
  @for $i from 2 through $n {
    $showdows: "#{$showdows},#{random(100)}vw #{random(100)}vh #fff";
  }
  @return unquote($showdows);
}
@keyframes moveUp {
  100% {
    transform: translateY(-100vh);
  }
}
$duration: 400s;
$count: 1000;
@for $i from 1 through 4 {
  $duration: floor(calc($duration / 2));
  $count: floor(calc($count / 2));
  .layer#{$i} {
    $size: #{$i}px;
    position: fixed;
    width: $size;
    height: $size;
    border-radius: 50%;
    background-color: white;
    left: 0px;
    top: 0px;
    animation: moveUp $duration linear infinite;
    box-shadow: getshadows($count);
    &::after {
      content: "";
      position: fixed;
      top: 100vh;
      width: $size;
      height: $size;
      left: 0;
      border-radius: inherit;
      box-shadow: inherit;
    }
  }
}
</style>
