// 用来获取消息中心的消息

import { getMessageInfo } from "~/service/message";
import type {
  GetMessagePropsType,
  MessageInfoItemType,
  MessageInfoResType,
} from "~/types/Message";

export const useGetMessageInfo = async (
  messageInfoProps: GetMessagePropsType
) => {
  const messageInfoData = reactive<{ data: Array<MessageInfoResType> }>({
    data: [],
  });
  let infoResList = reactive<Array<MessageInfoItemType>>([]);
  let messageInfoRes = await getMessageInfo(messageInfoProps);
  let baseInfo = messageInfoRes.data.value.data;
  let resPageInfo = {
    current: baseInfo.current,
    pages: baseInfo.pages,
    total: baseInfo.total,
    pageSize: baseInfo.size,
  };

  messageInfoData.data = baseInfo.records;
  if (messageInfoData.data.length == 0) {
    infoResList = [];
    return { infoResList, resPageInfo };
  }

  if (messageInfoProps.type == "PostLike") {
    for (let i = 0; i < messageInfoData.data.length; i++) {
      let infoItem = {
        id: messageInfoData.data[i].msgId,
        infoContent: `点赞了你的帖子《${messageInfoData.data[i].post.postTitle}》`,
        date: messageInfoData.data[i].msgTime,
        msgStatus: messageInfoData.data[i].msgStatus,
        msgContentId: messageInfoData.data[i].msgContentId,
        msgSendName: messageInfoData.data[i].userDto.userName,
        msgSendAvatar: messageInfoData.data[i].userDto.userPicture,
      };
      infoResList.push(infoItem);
    }
  }
  if (messageInfoProps.type == "PostCollect") {
    for (let i = 0; i < messageInfoData.data.length; i++) {
      let infoItem = {
        id: messageInfoData.data[i].msgId,
        infoContent: `收藏了你的帖子《${messageInfoData.data[i].post.postTitle}》`,
        date: messageInfoData.data[i].msgTime,
        msgStatus: messageInfoData.data[i].msgStatus,
        msgContentId: messageInfoData.data[i].msgContentId,
        msgSendName: messageInfoData.data[i].userDto.userName,
        msgSendAvatar: messageInfoData.data[i].userDto.userPicture,
      };
      infoResList.push(infoItem);
    }
  }

  if (messageInfoProps.type == "PostComment") {
    for (let i = 0; i < messageInfoData.data.length; i++) {
      let infoItem = {
        id: messageInfoData.data[i].msgId,
        infoContent: `评论了你:"${messageInfoData.data[i].msgContent}"`,
        date: messageInfoData.data[i].msgTime,
        msgStatus: messageInfoData.data[i].msgStatus,
        msgContentId: messageInfoData.data[i].msgContentId,
        msgSendName: messageInfoData.data[i].userDto.userName,
        msgSendAvatar: messageInfoData.data[i].userDto.userPicture,
      };
      infoResList.push(infoItem);
    }
  }
  if (messageInfoProps.type == "CommentLike") {
    for (let i = 0; i < messageInfoData.data.length; i++) {
      let infoItem = {
        id: messageInfoData.data[i].msgId,
        infoContent: `点赞了你的评论:"${messageInfoData.data[i].msgContent}"`,
        date: messageInfoData.data[i].msgTime,
        msgStatus: messageInfoData.data[i].msgStatus,
        msgContentId: messageInfoData.data[i].msgContentId,
        msgSendName: messageInfoData.data[i].userDto.userName,
        msgSendAvatar: messageInfoData.data[i].userDto.userPicture,
      };
      infoResList.push(infoItem);
    }
  }
  if (messageInfoProps.type == "CommentReply") {
    for (let i = 0; i < messageInfoData.data.length; i++) {
      let infoItem = {
        id: messageInfoData.data[i].msgId,
        infoContent: `回复了你:"${messageInfoData.data[i].msgContent}"`,
        date: messageInfoData.data[i].msgTime,
        msgStatus: messageInfoData.data[i].msgStatus,
        msgContentId: messageInfoData.data[i].msgContentId,
        msgSendName: messageInfoData.data[i].userDto.userName,
        msgSendAvatar: messageInfoData.data[i].userDto.userPicture,
      };
      infoResList.push(infoItem);
    }
  }
  return { infoResList, resPageInfo };
};
