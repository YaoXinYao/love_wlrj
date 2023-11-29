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
  msgContentName?: string;
  msgId: number;
  msgSend: number;
  msgSendName?: string;
  msgStatus: number;
  msgTime: string;
  msgType: MessageTypes;
}
