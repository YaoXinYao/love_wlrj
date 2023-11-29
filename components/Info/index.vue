<template>
  <div class="item" ref="target">
    {{ props.data.id }}
    <div class="noticeContent">
      {{ props.data.info }}
    </div>
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

const deleteMessage = async () => {
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
    }
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
};

//stop调用之后就会停止观察
// const { stop } = useIntersectionObserver(
//   target,
//   ([{ isIntersecting }], observerElement) => {
//     if (isIntersecting) {
//       console.log("出现了");
//       stop();
//       updateMsgStatus(props.data.id);
//     }
//   },
//   { threshold: 0 }
// );

useObserver(target, updateMsgStatus, props.data.id);
</script>

<style lang="scss" scoped>
.item {
  display: inline-block;
  width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: #fff;
  padding: 0 0 5px 5px;
  border-radius: 5px;
  box-shadow: 1px 2px 5px #d9d9d9;
  position: relative;
  margin-bottom: 10px;

  &:hover {
    .deleteBox {
      right: -50px;
    }
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
  right: 30px;
  bottom: 5px;
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
