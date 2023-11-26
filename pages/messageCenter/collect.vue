<template>
  <div class="collectContainer">
    <ul class="noticeList">
      <li
        v-for="(info, index) in infoList"
        :key="index"
        :class="
          index == infoList.length - 1 ? 'lastInfo noticeItem' : 'noticeItem'
        "
      >
        <Info :data="info" :type="'PostCollect'" />
      </li>
      <li ref="loadMoreRef" class="loadMore">
        <el-icon><Loading /></el-icon>
      </li>
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
import { useLazyDatas } from "../../hooks/useLazyData";
import { Loading } from "@element-plus/icons-vue";
const messageStore = useMessageStore();
const homeStore = useHomestore();
let { pageInfo, curType } = storeToRefs(messageStore);
let { userinfo } = storeToRefs(homeStore);
messageStore.ChangeCurType("PostCollect");
messageStore.ChangePageInfo({ currentPage: 1, pageSize: 15, total: 0 });
let messageInfoProps = reactive({
  pageNo: pageInfo.value.currentPage,
  pageSize: pageInfo.value.pageSize,
  type: "PostCollect",
  userId: userinfo.value.userId,
});

console.log(messageInfoProps);
let loadMoreRef = ref(null);

const messageInfoData = reactive<{ data: Array<MessageInfoResType> }>({
  data: [],
});
let infoList = reactive<Array<{ info: string; date: string }>>([]);
let messageInfoRes = await getMessageInfo(messageInfoProps);
let baseInfo = messageInfoRes.data.value.data;
console.log(baseInfo);

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
  let infoItem = {
    info: `${messageInfoData.data[i].msgSendName}收藏了你的帖子${messageInfoData.data[i].msgContentName}`,
    date: messageInfoData.data[i].msgTime,
  };
  console.log(infoItem);
  infoList.push(infoItem);
  console.log(infoList);
}

const getInfo = async () => {
  let messageInfoRes = await getMessageInfo(messageInfoProps);
  let baseInfo = messageInfoRes.data.value.data;
  console.log(baseInfo);

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
    console.log(infoItem);
    infoList.push(infoItem);
    console.log(infoList);
  }
};

useLazyDatas(loadMoreRef, getInfo);
</script>

<style lang="scss" scoped>
.collectContainer {
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  box-sizing: border-box;
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
}
</style>
