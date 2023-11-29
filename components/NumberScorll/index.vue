<template>
  <div class="counter-container">
    <div
      v-for="(item, index) in numArr"
      :key="index"
      :class="{ 'num-item': item !== ',', 'mark-item': item === ',' }"
    >
      <span
        v-if="item !== ','"
        ref="numberItem"
        class="num"
        :style="`transform: translate(-50%, -${parseInt(item) * 10}%)`"
      >
        {{ flipNum }}
      </span>
      <span class="num" v-else>{{ item }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRouter();
const props = defineProps({
  num: {
    require: true,
    default: 0,
  },
  duration: {
    require: true,
    default: 1,
  },
});
// let numArr = ref<string[]>([]);
let numArr = ref(["0", "0", ",", "0", "0", "0", ",", "0", "0", "0"]);
const flipNum = "0123456789";
let timer = null;
const numberItem = ref<HTMLSpanElement | null>(null);
// 处理传递过来的数字，转化为数组
function numToArr() {
  const str = props.num.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  numArr.value = str.split("");
}
function rollNum() {
  const numItems = numberItem.value;
  if (numItems == null) return;
  const numberArr = numArr.value.filter((item) => item !== ",");
  numberArr.forEach((item, index) => {
    const num = parseInt(item);
    const numItem = numItems[index];
    numItem.style.transform = `translate(-50%, -${num * 10}%)`;
  });
}
function loading() {
  numToArr();
  nextTick(() => {
    timer = setTimeout(() => {
      rollNum();
    }, props.duration * 1000);
  });
}
onMounted(() => {
  loading();
});
watch(
  () => props.num,
  () => {
    console.log("改变");
    loading();
  }
);
</script>
<style lang="scss" scoped>
.counter-container {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
}
.counter-container .num-item {
  position: relative;
  margin-right: 4px;
  user-select: none;
  padding: 8px;
  width: 40px;
  height: 57px;
  line-height: 72px;
  /* background-color: rgb(113, 206, 255); */
  border-radius: 10px;
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  color: rgb(113, 206, 255);
  box-sizing: border-box;
  overflow: hidden;
}
.counter-container .mark-item {
  position: relative;
  margin-right: 4px;
  width: 14px;
  height: 72px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  color: rgb(113, 206, 255);
  box-sizing: border-box;
  & > .num {
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.counter-container .num {
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translate(-50%, 0);
  transition: all 1s ease-in-out;
  writing-mode: vertical-lr;
  text-orientation: upright;
}
</style>
