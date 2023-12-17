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
  msgContentId: number | string;
  msgId: number;
  msgSend: number;
  msgStatus: number;
  msgTime: string;
  msgType: string;
  post: MessagePostType;
  userDto: MessageUserType;
}

export interface MessagePostType {
  postCollect: number;
  postContent: string;
  postId: number;
  postImg: null | string;
  postLike: number;
  postSubId: number;
  postTime: string;
  postTitle: string;
  postUserId: number;
  postView: number | string;
  userDto: MessageUserType;
}

export interface MessageUserType {
  groupId: number | string;
  groupName: null | string;
  roleId: number;
  roleName: null | string;
  userAccount: string;
  userBlog: string;
  userClass: string;
  userEmail: string;
  userGrade: string | number;
  userId: number | string;
  userName: string;
  userPicture: string;
  userQq: string | null;
  userSexVal: null | string | number;
}

export interface MessageInfoItemType {
  id: number;
  infoContent: string;
  date: string;
  msgStatus: number;
  msgContentId: string | number;
  msgSendName: string;
  msgSendAvatar: string;
}
