<template>
  <div class="app">
    <div v-show="isNull"><el-empty description="暂无数据" /></div>
    <ul class="infinite-list" v-show="!isNull">
      <li
        v-for="(info, index) in infoList"
        :key="index"
        class="noticeItem animate__animated animate__fadeIn"
      >
        <Info :data="info" :type="'PostComment'" />
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMessageStore } from "~/store/message";
import { watch } from "vue";
import { useGetMessageInfo } from "~/hooks/useGetMessageInfo";
const messageStore = useMessageStore();
messageStore.ChangeCurType("PostComment");
import { useHomestore } from "~/store/home";
const homeStore = useHomestore();
let { userinfo } = storeToRefs(homeStore);
const { curType, pageInfo, infoList } = storeToRefs(messageStore);

messageStore.ChangePageInfo({
  pageSize: 5,
  currentPage: 1,
  total: 0,
});
onMounted(() => {
  getInfo();
});

const isNull = ref(false);
const getInfo = async () => {
  messageStore.ChangeInfoList([]);
  let messageRes = await useGetMessageInfo({
    pageNo: pageInfo.value.currentPage,
    pageSize: pageInfo.value.pageSize,
    type: curType.value,
    userId: userinfo.value.userId,
  });

  console.log(messageRes);
  if (messageRes) {
    let { current, pages, total, pageSize } = messageRes?.resPageInfo;
    messageStore.ChangePageInfo({
      pageSize: pageSize,
      currentPage: current,
      total: total,
    });

    infoList.value = messageRes.infoResList;
    console.log(pageInfo.value);
  }else {
    isNull.value = true;
    
  }
};


watch(pageInfo.value, (newValue) => {
  if (newValue.total == 0) {
    isNull.value = true;
  }
});
</script>
<style scoped>
.infinite-list {
  height: max-content;
  padding: 10px;
  box-sizing: border-box;
}
.noticeItem {
  display: block;
  width: 100%;
}

.isLoading,
.isLoaded {
  display: inline-block;
  width: 100%;
  line-height: 30px;
  color: rgb(78, 111, 243);
  text-align: center;
  opacity: 0.5;
}
</style>
