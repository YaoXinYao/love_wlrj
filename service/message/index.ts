import hyRequest, { type IResultData } from "../forum";
import type { GetMessagePropsType } from "~/types/Message";

export const getMessageInfo = (props: GetMessagePropsType) => {
  return hyRequest.get<IResultData<any>>("/messageInterface/message/select", {
    ...props,
  });
};

export const deleteMessageInfoService = (ids: Array<number>) => {
  return hyRequest.delete<IResultData<any>>(
    "/messageInterface/message/delete",
    {
      ids,
    }
  );
};

//未读消息
export const getNotReadInfo = (userId: number) => {
  return hyRequest.get<IResultData<any>>(
    `/messageInterface/message/selectTypeCnt`,
    {
      userId,
    }
  );
};

//修改消息状态为已读
export const updateMsgStatus = (msgId: string) => {
  return hyRequest.put<IResultData<any>>(`/messageInterface/message/update`, {
    msgId,
    msgStatus: 1,
  });
};

//最新一条公告
export const getNewNotice = () => {
  return hyRequest.get<IResultData<any>>(`/notice/affiche/select`, {
    pageNo: 1,
    pageSize: 1,
  });
};
