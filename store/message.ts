import { defineStore } from "pinia";
import type {
  MessagePageInfoType,
  MessageType,
  MessageTypes,
  NotReadNumType,
} from "~/types/Message";
export const useMessageStore = defineStore("messageStore", {
  state(): MessageType {
    return {
      isLoading: false,
      pageInfo: {
        currentPage: 1,
        pageSize: 5,
        total: 0,
      },
      // curType: "PostCollect",
      curType: "PostLike",
      infoList: [],
      notReadNum: {
        commentLikeCnt: 0,
        commentReplyCnt: 0,
        postCollectCnt: 0,
        postCommentCnt: 0,
        postLikeCnt: 0,
      },
      isUpdate: {
        CommentLike: false,
        CommentReply: false,
        PostCollect: false,
        PostComment: false,
        PostLike: false,
      },
    };
  },
  actions: {
    ChangePageInfo(props: MessagePageInfoType) {
      this.pageInfo = props;
    },
    ChangeCurType(type: MessageTypes) {
      this.curType = type;
    },

    ChangeInfoList(info: any) {
      this.infoList = info;
    },

    ChangeNotReadNum(props: NotReadNumType) {
      this.notReadNum = props;
    },

    exitLogin() {
      (this.pageInfo = {
        currentPage: 1,
        pageSize: 5,
        total: 0,
      }),
        (this.curType = "PostLike"),
        (this.infoList = []),
        (this.notReadNum = {
          commentLikeCnt: 0,
          commentReplyCnt: 0,
          postCollectCnt: 0,
          postCommentCnt: 0,
          postLikeCnt: 0,
        }),
        (this.isUpdate = {
          CommentLike: false,
          CommentReply: false,
          PostCollect: false,
          PostComment: false,
          PostLike: false,
        });
    },
  },
  //持久化操作
  persist: true,
});
