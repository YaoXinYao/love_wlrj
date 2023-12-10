export interface GetMessagePropsType {
  pageNo: number;
  pageSize: number;
  type: string;
  userId: number;
}

export type MessageTypes =
  | "PostCollect"
  | "PostLike"
  | "CommentLike"
  | "CommentReply"
  | "PostComment";

export interface MessageType {
  pageInfo: MessagePageInfoType;
  curType: MessageTypes;
  infoList: any;
  notReadNum: NotReadNumType;
  isUpdate: IsUpdateType;
}

export interface IsUpdateType {
  CommentLike: boolean;
  CommentReply: boolean;
  PostCollect: boolean;
  PostComment: boolean;
  PostLike: boolean;
}

export interface NotReadNumType {
  commentLikeCnt: number;
  commentReplyCnt: number;
  postCollectCnt: number;
  postCommentCnt: number;
  postLikeCnt: number;
}

export interface MessagePageInfoType {
  currentPage: number;
  pageSize: number;
  total: number;
}

export interface MessageInfoResType {
  msgAccept: number;
  msgContent: string;
  msgContentId: number;
  msgContentName: string;
  msgId: number;
  msgSend: number;
  msgSendName: string;
  msgStatus: number;
  msgTime: string;
  msgType: MessageTypes;
  msgSendAvatar: string;
}

export interface MessageInfoItemType {
  id: number;
  infoContent: string;
  date: string;
  msgStatus: string | number;
  msgContentId: string | number;
  msgSendName: string;
  msgSendAvatar: string;
}
