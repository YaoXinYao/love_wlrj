<template>
  <div class="app">
    <ul
      class="infinite-list"
      v-infinite-scroll="getInfo"
      :infinite-scroll-disabled="isDisabled"
      :infinite-scroll-distance="50"
      style="overflow: auto"
      :infinite-scroll-delay="1000"
      :infinite-scroll-immediate="false"
    >
      <li
        v-for="(info, index) in infoList.data"
        :key="index"
        class="noticeItem animate__animated animate__fadeIn"
      >
        <Info :data="info" :type="'PostCollect'" />
      </li>
      <li style="width: 100%; height: 2px" ref="loading"></li>
      <li class="isLoading" v-show="isLoading">正在加载中...</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useHomestore } from "~/store/home";
import { storeToRefs } from "pinia";
import { useMessageStore } from "~/store/message";
import { useGetMessageInfo } from "~/hooks/useGetMessageInfo";
import { useIntersectionObserver } from "@vueuse/core";
const messageStore = useMessageStore();
const homeStore = useHomestore();

let { userinfo } = storeToRefs(homeStore);
messageStore.ChangeCurType("PostLike");
let messageInfoProps = reactive({
  pageNo: 1,
  pageSize: 10,
  type: "PostCollect",
  userId: userinfo.value.userId,
});

let isDisabled = ref(false);
let isStop = ref(false);
let isLoading = ref(false);
let loading = ref();

let infoList = reactive<{
  data: Array<{ id: number; info: string; date: string }>;
}>({ data: [] });
onMounted(() => {
  getInfo();

  useIntersectionObserver(
    loading,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        console.log("空元素出现了");
        loadingMore();
      }
    },
    { threshold: 0 }
  );
});

const loadingMore = () => {

  if (!isDisabled.value && infoList.data.length != 0) {
    console.log("调用加载");
    getInfo();
  }
};
const getInfo = async () => {
  isLoading.value = true;
  if (!isStop.value) {
    isDisabled.value = true;
  }

  let messageInfo = await useGetMessageInfo(messageInfoProps);
  infoList.data = [...infoList.data, ...messageInfo.infoResList];
  isLoading.value = false;
  if (messageInfo.resPageInfo.pages <= messageInfo.resPageInfo.current) {
    isDisabled.value = true;
    isStop.value = true;
  } else {
    isDisabled.value = false;
    messageInfoProps.pageNo = (messageInfoProps.pageNo as number) * 1 + 1;
  }
};
</script>
<style scoped>
.infinite-list {
  height: calc(100vh - 200px);
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
