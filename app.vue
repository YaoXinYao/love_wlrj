<template>
  <el-config-provider :locale="zhCn">
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </el-config-provider>
</template>
<script setup lang="ts">
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import { useHomestore } from "~/store/home";
import { storeToRefs } from "pinia";
import { useWebSocket } from "@vueuse/core";
import { useMessageStore } from "~/store/message";
import { useGetNotReadMessage } from "~/hooks/useGetNotReadMessage";
import type { MessageTypes } from "~/types/Message";
const messageStore = useMessageStore();
const { pageInfo, infoList, isUpdate } = storeToRefs(messageStore);
const homeStore = useHomestore();
let { userinfo, user } = storeToRefs(homeStore);
useHead({
  title: "未来软件工作室", //网站标题
});

var logText = [
  `欢迎来到`,
  `未来软件工作室!`,
  `行而不弃，未来可期✨`,
  "©2023 By 未来",
  `

  ______               __                                   
 /      \             /  |                                  
/$$$$$$  | __    __  _$$ |_    __    __   ______    ______  
$$ |_ $$/ /  |  /  |/ $$   |  /  |  /  | /      \  /      \ 
$$   |    $$ |  $$ |$$$$$$/   $$ |  $$ |/$$$$$$  |/$$$$$$  |
$$$$/     $$ |  $$ |  $$ | __ $$ |  $$ |$$ |  $$/ $$    $$ |
$$ |      $$ \__$$ |  $$ |/  |$$ \__$$ |$$ |      $$$$$$$$/ 
$$ |      $$    $$/   $$  $$/ $$    $$/ $$ |      $$       |
$$/        $$$$$$/     $$$$/   $$$$$$/  $$/        $$$$$$$/ 
                                                            
                                                            
                                                            
`,
];

console.log(
  `\n%c${logText[0]}  %c${logText[1]}\n\n    %c${logText[2]}\n\n          %c${logText[3]}\n         %c${logText[4]}`,
  "",
  "color:#39c5bb;font-weight:700",
  "",
  "color:#39c5bb;",
  "color:#39c5bb;font-style: italic;"
);

if (user.value.token) {
  useWebSocket(
    `ws://152.136.161.44:19491/forum/swagger/forum/websocket/${userinfo.value.userId}`,
    {
      autoReconnect: {
        retries: 8,
        delay: 1000,
        onFailed() {
          ElNotification({
            title: "错误",
            message: "无法进行实时通信，请检查网络！",
            type: "error",
          });
        },
      },
      onConnected() {
        console.log("连接成功");
      },
      onDisconnected() {
        console.log("断开");
      },
      async onMessage(ws, event) {
        let info = JSON.parse(event.data);
        let tipText = "";
        switch (info.msgType) {
          case "PostCollect":
            tipText = "有人收藏了你的帖子，快去看看吧！";
            break;
          case "PostLike":
            tipText = "有人点赞了你的帖子，快去看看吧！";
            break;
          case "CommentLike":
            tipText = "有人点赞了你的评论，快去看看吧！";
            break;
          case "CommentReply":
            tipText = "有人回复了你的评论，快去看看吧！";
            break;
          case "PostComment":
            tipText = "有人评论了你的帖子，快去看看吧！";
            break;
        }
        ElNotification({
          title: "叮叮",
          message: h("p", { style: "color: teal" }, tipText),
        });

        if (pageInfo.value.currentPage == 1) {
          isUpdate.value[info.msgType as MessageTypes] = true;
        }
        useGetNotReadMessage();
      },
    }
  );
}
</script>
<style></style>
