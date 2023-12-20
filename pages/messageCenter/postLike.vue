<template>
  <div class="app">
    <div
      v-loading="isLoading"
      element-loading-text="加载中..."
      style="min-height: 400px"
    >
      <div v-show="!pageInfo.total && !isLoading">
        <el-empty description="暂无数据" />
      </div>
      <ul class="infinite-list" v-show="pageInfo.total">
        <li
          v-for="(info, index) in infoList"
          :key="info.id"
          class="noticeItem animate__animated animate__fadeIn"
        >
          <Info :data="info" :type="'PostLike'" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMessageStore } from "~/store/message";
import { watch, onMounted } from "vue";
import { useGetMessageInfo } from "~/hooks/useGetMessageInfo";
const messageStore = useMessageStore();
messageStore.ChangeCurType("PostLike");
import { useHomestore } from "~/store/home";
import { useGetNotReadMessage } from "~/hooks/useGetNotReadMessage";
const homeStore = useHomestore();
let { userinfo } = storeToRefs(homeStore);
const { curType, pageInfo, infoList, isUpdate, isLoading } =
  storeToRefs(messageStore);

messageStore.ChangePageInfo({
  pageSize: 5,
  currentPage: 1,
  total: 0,
});
const isNull = ref(false);
onMounted(() => {
  isLoading.value = false;
  getInfo();
  isUpdate.value.PostLike = false;
  useGetNotReadMessage();
});

watch(
  () => isUpdate.value.PostLike,
  (newValue) => {
    if (newValue) {
      getInfo();
      isUpdate.value.PostLike = false;
    }
  }
);

const getInfo = async () => {
  isLoading.value = true;
  let messageRes = await useGetMessageInfo({
    pageNo: pageInfo.value.currentPage,
    pageSize: pageInfo.value.pageSize,
    type: curType.value,
    userId: userinfo.value.userId,
  });
  messageStore.ChangePageInfo({
    pageSize: messageRes?.resPageInfo.pageSize,
    currentPage: messageRes?.resPageInfo.current,
    total: messageRes?.resPageInfo.total,
  });

  if (messageRes.infoResList.length != 0) {
    messageStore.ChangeInfoList(messageRes.infoResList);
  } else {
    messageStore.ChangeInfoList([]);
    isNull.value = true;
  }
  isLoading.value = false;
};
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

.isLoading {
  display: inline-block;
  width: 100%;
  line-height: 30px;
  color: rgb(78, 111, 243);
  text-align: center;
  opacity: 0.5;

  span {
    display: inline-block;
    font-size: 17px;
    margin-top: 20px;
  }
}
</style>
