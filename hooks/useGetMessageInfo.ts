// 用来获取消息中心的消息

import { getMessageInfo } from "~/service/message";
import { getPostInfoById } from "~/service/post";
import { getUserInfoById } from "~/service/user";
import type { GetMessagePropsType, MessageInfoResType } from "~/types/Message";

export const useGetMessageInfo = async (
  messageInfoProps: GetMessagePropsType
) => {
  const messageInfoData = reactive<{ data: Array<MessageInfoResType> }>({
    data: [],
  });
  let infoResList = reactive<Array<{ id: number; info: string; date: string }>>(
    []
  );

  let messageInfoRes = await getMessageInfo(messageInfoProps);
  let baseInfo = messageInfoRes.data.value.data;
  let resPageInfo = {
    current: baseInfo.current,
    pages: baseInfo.pages,
    total: baseInfo.total,
    pageSize: baseInfo.size,
  };
  messageInfoData.data = baseInfo.records;
  console.log(messageInfoData.data);

  if (messageInfoData.data.length == 0) {
    infoResList = [];
    return { infoResList, resPageInfo };
  }

  for (let i = 0; i < messageInfoData.data.length; i++) {
    //查询信息发送者信息
    let userInfoRes = await getUserInfoById(messageInfoData.data[i].msgSend);

    if (userInfoRes.data.value.code === 20000) {
      messageInfoData.data[i].msgSendName =
        userInfoRes.data.value.data.userName;
      messageInfoData.data[i].msgSendAvatar =
        userInfoRes.data.value.data.userPicture;
    } else {
      messageInfoData.data[i].msgSendName = "未知人员";
    }

    if (
      messageInfoProps.type == "PostLike" ||
      messageInfoProps.type == "PostCollect"
    ) {
      //查询帖子名称
      let postInfoRes = await getPostInfoById(
        messageInfoData.data[i].msgContentId
      );
      if (postInfoRes.data.value.code === 20000) {
        messageInfoData.data[i].msgContentName =
          postInfoRes.data.value.data.postTitle;
      } else {
        messageInfoData.data[i].msgContentName = "未知文章";
      }
      if (messageInfoProps.type == "PostLike") {
        let infoItem = {
          id: messageInfoData.data[i].msgId,
          infoContent: `点赞了你的帖子《${messageInfoData.data[i].msgContentName}》`,
          date: messageInfoData.data[i].msgTime,
          msgStatus: messageInfoData.data[i].msgStatus,
          msgContentId: messageInfoData.data[i].msgContentId,
          msgSendName:messageInfoData.data[i].msgSendName,
          msgSendAvatar: messageInfoData.data[i].msgSendAvatar,
        };
        infoResList.push(infoItem);
      }
      if (messageInfoProps.type == "PostCollect") {
        let infoItem = {
          id: messageInfoData.data[i].msgId,
          infoContent: `收藏了你的帖子《${messageInfoData.data[i].msgContentName}》`,
          date: messageInfoData.data[i].msgTime,
          msgStatus: messageInfoData.data[i].msgStatus,
          msgContentId: messageInfoData.data[i].msgContentId,
          msgSendName:messageInfoData.data[i].msgSendName,
          msgSendAvatar: messageInfoData.data[i].msgSendAvatar,
        };
        infoResList.push(infoItem);
      }
    }

    if (messageInfoProps.type == "PostComment") {
      let infoItem = {
        id: messageInfoData.data[i].msgId,
        infoContent: `评论了你:"${messageInfoData.data[i].msgContent}"`,
        date: messageInfoData.data[i].msgTime,
        msgStatus: messageInfoData.data[i].msgStatus,
        msgContentId: messageInfoData.data[i].msgContentId,
        msgSendName:messageInfoData.data[i].msgSendName,
        msgSendAvatar: messageInfoData.data[i].msgSendAvatar,
      };
      infoResList.push(infoItem);
    }
    if (messageInfoProps.type == "CommentLike") {
      let infoItem = {
        id: messageInfoData.data[i].msgId,
        infoContent: `点赞了你的评论:"${messageInfoData.data[i].msgContent}"`,
        date: messageInfoData.data[i].msgTime,
        msgStatus: messageInfoData.data[i].msgStatus,
        msgContentId: messageInfoData.data[i].msgContentId,
        msgSendName:messageInfoData.data[i].msgSendName,
        msgSendAvatar: messageInfoData.data[i].msgSendAvatar,
      };
      infoResList.push(infoItem);
    }
    if (messageInfoProps.type == "CommentReply") {
      let infoItem = {
        id: messageInfoData.data[i].msgId,
        infoContent: `回复了你:"${messageInfoData.data[i].msgContent}"`,
        date: messageInfoData.data[i].msgTime,
        msgStatus: messageInfoData.data[i].msgStatus,
        msgContentId: messageInfoData.data[i].msgContentId,
        msgSendName:messageInfoData.data[i].msgSendName,
        msgSendAvatar: messageInfoData.data[i].msgSendAvatar,
      };
      infoResList.push(infoItem);
    }
  }
  return { infoResList, resPageInfo };
};
