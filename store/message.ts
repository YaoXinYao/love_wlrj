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
        pageSize: 5,
        total: 0,
      },
      // curType: "PostCollect",
      curType: "PostLike",
      infoList: [],
    };
  },
  actions: {
    ChangePageInfo(props: MessagePageInfoType) {
      console.log(props);
      this.pageInfo = props;
    },
    ChangeCurType(type: MessageTypes) {
      this.curType = type;
    },

    ChangeInfoList(info: any) {
      this.infoList = info;
    },
  },
  //持久化操作
  persist: true,
});
