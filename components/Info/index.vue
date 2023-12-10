<!-- 消息中心信息组件，可进行删除 -->
<template>
  <div class="item" ref="target">
    <div class="infoSender">
      <el-avatar
        style="margin-top: 5px"
        :size="30"
        :src="props.data.msgSendAvatar"
      />
      <span class="infoSenderName">{{ props.data.msgSendName }}</span>
    </div>
    <NuxtLink
      @click="
        navigateTo({
          path: '/forum/details',
          query: { data: props.data.msgContentId },
        })
      "
      class="noticeContent"
    >
      &emsp;&emsp;{{ props.data.infoContent }}
    </NuxtLink>
    <span class="noticeDate">{{ props.data.date }}</span>
    <div class="deleteBox" @click="deleteMessage">
      <el-icon class="deleteIcon"><Delete /></el-icon>
    </div>
    <span class="dot" v-show="!props.data.msgStatus"></span>
  </div>
</template>

<script setup lang="ts">
import { Delete } from "@element-plus/icons-vue";
import { deleteMessageInfoService, updateMsgStatus } from "~/service/message";
import { useObserver } from "~/hooks/useObserver";
import { useGetMessageInfo } from "~/hooks/useGetMessageInfo";
import { useMessageStore } from "~/store/message";
import { storeToRefs } from "pinia";
const messageStore = useMessageStore();
const { infoList, pageInfo, curType } = storeToRefs(messageStore);
import { useHomestore } from "~/store/home";
const homeStore = useHomestore();
let { userinfo } = storeToRefs(homeStore);
const props = defineProps(["data", "type"]);
const target = ref();
const emit = defineEmits(["addAlert", "info_event"]);
console.log(props.data);

const deleteMessage = () => {
  ElMessageBox.confirm("你确定要删除该消息吗？")
    .then(async () => {
      messageStore.ChangeInfoList([]);
      let res = await deleteMessageInfoService([props.data.id]);

      if (res.data.value.code == 20000) {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
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
        if (messageRes) {
          messageStore.ChangeInfoList(messageRes.infoResList);
        } else {
          messageStore.ChangeInfoList([]);
        }
      } else {
        ElMessage({
          type: "error",
          message: "删除失败",
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除操作",
      });
    });
};

useObserver(target, updateMsgStatus, props.data.id);
</script>

<style lang="scss" scoped>
.item {
  display: inline-block;
  width: 100%;
  height: max-content;
  overflow: hidden;
  background-color: #fff;
  padding: 0 0 5px 5px;
  border-radius: 2px;
  box-shadow: 1px 2px 5px #d9d9d9;
  position: relative;

  &:hover {
    .deleteBox {
      right: -50px;
    }

    .noticeContent {
      color: rgb(160, 203, 235);
      word-break: break-all;
    }
  }
}

.infoSender {
  display: flex;

  .infoSenderName {
    display: inline-block;
    line-height: 30px;
    margin-left: 10px;
  }
}

.dot {
  position: absolute;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: red;
  right: 15px;
  top: 10px;
  z-index: 0;
}
.noticeContent {
  display: block;
  width: calc(100% - 50px);
  margin-right: 50px;
  height: max-content;
  line-height: 25px;
  font-size: 14px;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
  color: #666;
  letter-spacing: 0.1em;
  cursor: pointer;
}

.noticeDate {
  display: block;
  width: 90%;
  margin-left: 5%;
  text-align: right;
  font-size: 12px;
  color: #959595;
}

.deleteBox {
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: rgb(201, 37, 37);
  color: #fff;
  transform: rotate(40deg);
  position: absolute;
  right: -120px;
  top: -60px;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 1;
}

.deleteIcon {
  transform: rotate(-45deg);
  font-size: 16px;
  margin-left: 40px;
  margin-top: 75px;
}

.notReadInfo {
  // background-color: rgb(231, 235, 250);
}
</style>
