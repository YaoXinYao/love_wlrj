<template>
  <div class="networkdisk">
    <div class="Mydisk">
      <div class="diskleft">
        <NuxtLink
          to="/networkdisk/documentcommunity"
          active-class="activelfetitem"
          class="leftitem"
        >
          <i class="iconfont icon-shequ"></i> 文件社区</NuxtLink
        >
        <NuxtLink
          active-class="activelfetitem"
          to="/networkdisk/uploadfile"
          class="leftitem"
        >
          <i class="iconfont icon-shangchuanwenjian"></i> 上传文件
        </NuxtLink>
        <NuxtLink
          active-class="activelfetitem"
          to="/networkdisk/mylove"
          class="leftitem"
        >
          <i class="iconfont icon-wodeshoucang"></i>
          我的收藏
        </NuxtLink>
        <NuxtLink
          active-class="activelfetitem"
          to="/networkdisk/myfile"
          class="leftitem"
        >
          <i class="iconfont icon-a-23Ecipan"></i> 我的文件
        </NuxtLink>
      </div>
      <div class="diskright">
        <NuxtPage></NuxtPage>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
useHeader();
definePageMeta({
  roles: 1,
});
import { useDiskstore } from "~/store/disk";
const homestore = useDiskstore();
homestore.getDiskinfo();
import { useWebSocket } from "@vueuse/core";
import type { MessageType } from "~/types/disk";
useHead({
  title: "小组网盘",
});
const { status, data, send, open, close } = useWebSocket(
  `ws://112.125.120.78:19520/disk/websocket/${Authuserid()}`,
  {
    autoReconnect: {
      retries: 3,
      onFailed: () => {
        ElMessage({
          message: "websoscket连接失败, 请关闭你的加速器",
          type: "error",
        });
      },
    },
    onMessage(ws, event) {
      const Message: MessageType = JSON.parse(event.data);
      if (Authuserid() !== Message.uploaderId) {
        ElNotification({
          title: "发现新的文件",
          dangerouslyUseHTMLString: true,
          message: ` <strong style="color: rgb(40,77,213);" >${Message.uploadName}</strong>上传了<br/>${Message.name}`,
          duration: 4000,
        });
      }
    },
  }
);
</script>
<style scoped lang="scss">
@media screen and (max-width: 998px) {
  .diskleft {
    display: none !important;
  }
  .diskright {
    width: 100% !important;
  }
}
.networkdisk {
  padding-block: 0.8rem;
  padding-bottom: 0.1rem;
  padding-top: 1rem;
  height: auto;
  width: 100%;
  background-color: white;
  .Mydisk {
    display: flex;
    width: 100%;
    min-height: 85vh;
    .diskleft {
      width: 2.5rem;
      padding-inline: 0.1rem;
      display: flex;
      position: relative;
      padding-block: 0.2rem;
      flex-direction: column;
      z-index: 99;
      box-shadow: rgba(0, 0, 0, 0.06) -7px 3px 10px 0px;
      .leftitem {
        cursor: pointer;
        transition-duration: 0.3s;
        border-radius: 0.2rem;
        padding-left: 0.6rem;
        width: 100%;
        line-height: 0.6rem;
        font-size: 0.14rem;
        height: 0.6rem;
        font-weight: bold;
        margin-bottom: 0.1rem;
        &:hover {
          background-color: rgb(250, 250, 252);
        }
      }
      .activelfetitem {
        background-color: rgb(238, 249, 254);
        color: rgb(27, 167, 255);
      }
    }
    .diskright {
      height: auto;
      width: 85%;
    }
  }
}
</style>
