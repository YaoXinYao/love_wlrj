<template>
  <div class="collectContainer">
    <Info :data="messageInfoData.data" :type="'CommentReply'" />
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
messageStore.ChangeCurType("CommentReply");
let messageInfoProps = {
  pageNo: pageInfo.value.currentPage,
  pageSize: pageInfo.value.pageSize,
  type: "CommentReply",
  userId: userinfo.value.userId,
};

const messageInfoData = reactive<{ data: Array<MessageInfoResType> }>({
  data: [],
});
let messageInfoRes = await getMessageInfo(messageInfoProps);
let baseInfo = messageInfoRes.data.value.data;
messageStore.ChangePageInfo({
  currentPage: baseInfo.current,
  pageSize: baseInfo.size,
  total: baseInfo.total,
});
messageInfoData.data = baseInfo.records;
for (let i = 0; i < messageInfoData.data.length; i++) {
  //查询信息发送者信息
  let userInfoRes = await getUserInfoById(messageInfoData.data[i].msgSend);
  if (userInfoRes.data.value.code === 20000) {
    messageInfoData.data[i].msgSendName = userInfoRes.data.value.data.userName;
  } else {
    messageInfoData.data[i].msgSendName = "未知人员";
  }
  //查询帖子名称
  let postInfoRes = await getPostInfoById(messageInfoData.data[i].msgContentId);
  if (postInfoRes.data.value.code === 20000) {
    messageInfoData.data[i].msgContentName =
      postInfoRes.data.value.data.postTitle;
  } else {
    messageInfoData.data[i].msgContentName = "未知文章";
  }
}
</script>

<style lang="scss" scoped>
.collectContainer {
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  box-sizing: border-box;
}
</style>
