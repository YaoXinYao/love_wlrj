<template>
  <div class="infoContainer">
    <ul class="noticeList">
      <li class="noticeItem" v-for="(info, index) in props.data" :key="index">
        <div class="noticeContent">
          {{ info.title }}
        </div>
        <span class="noticeDate">{{ info.date }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["data"]);
</script>

<style lang="scss" scoped>
.infoContainer {
  width: 100%;
}
.noticeList {
  display: inline-block;
  width: 100%;
}

.noticeItem {
  display: block;
  width: 100%;
  background-color: #fff;
  padding: 10px 5px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 1px 2px 5px #c7c5c5;
  position: relative;
  padding-bottom: 30px;

  &:not(:first-child) {
    margin-top: 20px;
  }

  .noticeContent {
    width: 80%;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #666;
  }

  .noticeDate {
    font-size: 12px;
    color: #959595;
    position: absolute;
    right: 20px;
  }
}
</style>
