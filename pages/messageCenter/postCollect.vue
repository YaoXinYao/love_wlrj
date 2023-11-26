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
      <li v-for="(info, index) in infoList" :key="index" class="noticeItem">
        <Info :data="info" :type="'PostCollect'" />
      </li>
      <li class="isLoading" v-show="!isDisabled">正在加载中...</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { getMessageInfo } from "~/service/message";
import { getPostInfoById } from "~/service/post";
import type { MessageInfoResType } from "~/types/Message";
import { getUserInfoById } from "~/service/user";
import { useHomestore } from "~/store/home";
import { storeToRefs } from "pinia";
import { useMessageStore } from "~/store/message";
const messageStore = useMessageStore();
const homeStore = useHomestore();
let { pageInfo, curType } = storeToRefs(messageStore);
let { userinfo } = storeToRefs(homeStore);
messageStore.ChangeCurType("PostCollect");
let messageInfoProps = reactive({
  pageNo: 1,
  pageSize: 10,
  type: "PostCollect",
  userId: userinfo.value.userId,
});

let isDisabled = ref(false);
console.log(messageInfoProps);

const messageInfoData = reactive<{ data: Array<MessageInfoResType> }>({
  data: [],
});
let infoList = reactive<Array<{ info: string; date: string }>>([]);
onMounted(() => {
  getInfo();
});
const getInfo = async () => {
  console.log("getInfo");

  let messageInfoRes = await getMessageInfo(messageInfoProps);
  let baseInfo = messageInfoRes.data.value.data;
  console.log(baseInfo);

  messageInfoData.data = baseInfo.records;
  for (let i = 0; i < messageInfoData.data.length; i++) {
    //查询信息发送者信息
    let userInfoRes = await getUserInfoById(messageInfoData.data[i].msgSend);
    if (userInfoRes.data.value.code === 20000) {
      messageInfoData.data[i].msgSendName =
        userInfoRes.data.value.data.userName;
    } else {
      messageInfoData.data[i].msgSendName = "未知人员";
    }
    //查询帖子名称
    let postInfoRes = await getPostInfoById(
      messageInfoData.data[i].msgContentId
    );
    if (postInfoRes.data.value.code === 20000) {
      messageInfoData.data[i].msgContentName =
        postInfoRes.data.value.data.postTitle;
    } else {
      messageInfoData.data[i].msgContentName = "未知文章";
    }
    let infoItem = {
      info: `${messageInfoData.data[i].msgSendName}收藏了你的帖子${messageInfoData.data[i].msgContentName}`,
      date: messageInfoData.data[i].msgTime,
    };
    infoList.push(infoItem);
  }

  if (baseInfo.pages <= baseInfo.current) {
    isDisabled.value = true;
  } else {
    messageInfoProps.pageNo = (messageInfoProps.pageNo as number) * 1 + 1;
    console.log("page:", messageInfoProps.pageNo);
  }
  console.log(isDisabled.value);
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
  background-color: #fff;
  padding: 5px 5px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 1px 2px 5px #c7c5c5;
  position: relative;
  padding-bottom: 30px;

  &:not(:first-child) {
    margin-top: 20px;
  }
}

.isLoading,
.isLoaded {
  display: inline-block;
  width: 100%;
  line-height: 30px;
  color: rgb(78, 111, 243);
  text-align: center;
}
</style>
