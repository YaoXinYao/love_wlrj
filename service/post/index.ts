import hyRequest, { type IResultData } from "../forum";
export const getPostInfoById = (postId: number) => {
  return hyRequest.get<IResultData<any>>("/forum/post/getPostById", { postId });
};
