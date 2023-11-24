import type { GetMessagePropsType } from "~/types/Message";
import hyRequest, { type IResultData } from "../forum";
export const getMessageInfo = (props: GetMessagePropsType) => {
  return hyRequest.get<IResultData<any>>("/forum/message/select", { ...props });
};

