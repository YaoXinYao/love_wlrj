import { defineStore } from "pinia";
import type {
  MessagePageInfoType,
  MessageType,
  MessageTypes,
} from "~/types/Message";
export const useMessageStore = defineStore("messageStore", {
  state(): MessageType {
    return {
      pageInfo: {
        currentPage: 1,
        pageSize: 20,
        total: 0,
      },
      curType: "PostCollect",
    };
  },
  actions: {
    async ChangePageInfo(props: MessagePageInfoType) {
      this.pageInfo = props;
    },
    async ChangeCurType(type: MessageTypes) {
      this.curType = type;
    },
  },
  //持久化操作
  persist: true,
});
