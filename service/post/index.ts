import hyRequest, { type IResultData } from "../forum";
export const getPostInfoById = (postId: number) => {
  return hyRequest.get<IResultData<any>>("/api/forum/post/getPostById", {
    postId,
  });
};
