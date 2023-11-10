import hyRequest from "../forum";
import type { IResultData } from "../forum";
//发布帖子
export const addpost = (params: FormData) => {
  return hyRequest.post<IResultData<any>>("/api/post/insert", params);
};
