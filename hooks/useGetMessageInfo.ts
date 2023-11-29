import { getMessageInfo } from "~/service/message";
import { getPostInfoById } from "~/service/post";
import { getUserInfoById } from "~/service/user";
import type { GetMessagePropsType, MessageInfoResType } from "~/types/Message";

export const useGetMessageInfo = async (
  messageInfoProps: GetMessagePropsType
) => {
  console.log(messageInfoProps);

  const messageInfoData = reactive<{ data: Array<MessageInfoResType> }>({
    data: [],
  });
  let infoResList = reactive<Array<{ id: number; info: string; date: string }>>(
    []
  );

  let messageInfoRes = await getMessageInfo(messageInfoProps);
  console.log(messageInfoRes);

  let baseInfo = messageInfoRes.data.value.data;
  messageInfoData.data = baseInfo.records;
  if (messageInfoData.data.length == 0) {
    return null;
  }
  let resPageInfo = {
    current: baseInfo.current,
    pages: baseInfo.pages,
    total: baseInfo.total,
    pageSize: baseInfo.size,
  };

  for (let i = 0; i < messageInfoData.data.length; i++) {
    //查询信息发送者信息
    let userInfoRes = await getUserInfoById(messageInfoData.data[i].msgSend);

    if (userInfoRes.data.value.code === 20000) {
      messageInfoData.data[i].msgSendName =
        userInfoRes.data.value.data.userName;
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
          info: `${messageInfoData.data[i].msgSendName}点赞了你的帖子《${messageInfoData.data[i].msgContentName}》`,
          date: messageInfoData.data[i].msgTime,
          msgStatus: messageInfoData.data[i].msgStatus,
        };
        infoResList.push(infoItem);
      }
      if (messageInfoProps.type == "PostCollect") {
        let infoItem = {
          id: messageInfoData.data[i].msgId,
          info: `${messageInfoData.data[i].msgSendName}收藏了你的帖子《${messageInfoData.data[i].msgContentName}》`,
          date: messageInfoData.data[i].msgTime,
          msgStatus: messageInfoData.data[i].msgStatus,
        };
        infoResList.push(infoItem);
      }
    }

    if (messageInfoProps.type == "PostComment") {
      let infoItem = {
        id: messageInfoData.data[i].msgId,
        info: `${messageInfoData.data[i].msgSendName}评论了你:"${messageInfoData.data[i].msgContent}"`,
        date: messageInfoData.data[i].msgTime,
        msgStatus: messageInfoData.data[i].msgStatus,
      };
      infoResList.push(infoItem);
    }
    if (messageInfoProps.type == "CommentLike") {
      let infoItem = {
        id: messageInfoData.data[i].msgId,
        info: `${messageInfoData.data[i].msgSendName}点赞了你的评论:"${messageInfoData.data[i].msgContent}"`,
        date: messageInfoData.data[i].msgTime,
        msgStatus: messageInfoData.data[i].msgStatus,
      };
      infoResList.push(infoItem);
    }
    if (messageInfoProps.type == "CommentReply") {
      let infoItem = {
        id: messageInfoData.data[i].msgId,
        info: `${messageInfoData.data[i].msgSendName}回复了你:"${messageInfoData.data[i].msgContent}"`,
        date: messageInfoData.data[i].msgTime,
        msgStatus: messageInfoData.data[i].msgStatus,
      };
      infoResList.push(infoItem);
    }
  }
  return { infoResList, resPageInfo };
};
