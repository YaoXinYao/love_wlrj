import hyRequest, { type IResultData } from "../forum";
import type { GetMessagePropsType } from "~/types/Message";

export const getMessageInfo = (props: GetMessagePropsType) => {
  return hyRequest.get<IResultData<any>>("/api/forum/message/select", {
    ...props,
  });
};

export const deleteMessageInfoService = (ids: Array<number>) => {
  return hyRequest.delete<IResultData<any>>("/api/forum/message/delete", {
    ids,
  });
};

//未读消息
export const getNotReadInfo = (userId: number) => {
  return hyRequest.get<IResultData<any>>(`/api/forum/message/selectTypeCnt`, {
    userId,
  });
};

//修改消息状态为已读
export const updateMsgStatus = (msgId: string) => {
  return hyRequest.put<IResultData<any>>(`/api/forum/message/update`, {
    msgId,
    msgStatus: 1,
  });
};

//一键已读
export const fastReadService = (props: {
  msgAccept: string | number;
  msgType: string;
}) => {
  console.log(props);

  return hyRequest.put<IResultData<any>>(`/api/forum/message/read`, {
    ...props,
  });
};

//最新一条公告
export const getNewNotice = () => {
  return hyRequest.get<IResultData<any>>(`/api/notice/affiche/select`, {
    pageNo: 1,
    pageSize: 1,
  });
};
