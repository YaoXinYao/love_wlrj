<template>
  <div class="noticeContent">
    {{ props.data.info }}
  </div>
  <span class="noticeDate">{{ props.data.date }}</span>
</template>

<script setup lang="ts">
const props = defineProps(["data", "type"]);

// const data = ref<Array<MessageInfoResType>>([]);
// let infoList = ref<Array<{ info: string; date: string }>>([]);
// watch(toRef(props, "data"), (newValue, oldValue) => {
//   data.value = newValue;
//   console.log("new:", data.value);
//   if (props.type == "PostCollect") {
//     for (let i = 0; i < data.value.length; i++) {
//       console.log(data.value[i]);

//       let infoItem = {
//         info: `${data.value[i].msgSendName}收藏了你的帖子${data.value[i].msgContentName}`,
//         date: data.value[i].msgTime,
//       };
//       console.log(infoItem);

//       infoList.value.push(infoItem);
//     }
//   }
// });
</script>

<style lang="scss" scoped>
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
</style>
