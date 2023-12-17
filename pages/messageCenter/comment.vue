<!-- 消息中心模块，本目录下代码基本一致，方便日后对某个模块进行调整 -->
<template>
  <div class="app" v-loading="isLoading">
    <div v-show="!pageInfo.total && !isLoading">
      <el-empty description="暂无数据" />
    </div>
    <!-- <div v-show="isLoading" class="isLoading">
      <span>加载中...</span>
    </div> -->
    <ul class="infinite-list" v-show="pageInfo.total">
      <li
        v-for="(info, index) in infoList"
        :key="info.id"
        class="noticeItem animate__animated animate__fadeIn"
      >
        <!-- 消息组件 -->
        <Info :data="info" :type="'PostComment'" />
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMessageStore } from "~/store/message";
import { watch, onMounted } from "vue";
import { useGetMessageInfo } from "~/hooks/useGetMessageInfo";
import { useHomestore } from "~/store/home";
import { useGetNotReadMessage } from "~/hooks/useGetNotReadMessage";
const messageStore = useMessageStore();
messageStore.ChangeCurType("PostComment");
const homeStore = useHomestore();
let { userinfo } = storeToRefs(homeStore);
const { curType, pageInfo, infoList, isUpdate } = storeToRefs(messageStore);
const isLoading = ref(false);

messageStore.ChangePageInfo({
  pageSize: 5,
  currentPage: 1,
  total: 0,
});

onMounted(() => {
  getInfo();
  isUpdate.value.PostComment = false;
  useGetNotReadMessage();
});

watch(
  () => isUpdate.value.PostComment,
  (newValue) => {
    if (newValue) {
      getInfo();
      isUpdate.value.PostComment = false;
    }
  }
);

const getInfo = async () => {
  isLoading.value = true;

  //通过自定义的hook获取消息
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
