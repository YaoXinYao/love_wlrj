import hyRequest from "../forum";
import type { IResultData } from "../forum";

//发布帖子
export const addpost = (params: FormData) => {
  return hyRequest.post<IResultData<any>>("/api/post/insert", params);
};

//查询帖子
export const getPost = (
  pageNo: number,
  pageSize: number,
  postTitle?: string,
  postSubId?: number,
  postContent?: string,
  postUserId?: number,
) => {
  return hyRequest.get<IResultData<any>>("/api/post/select", {
    pageNo,
    pageSize,
    postTitle,
    postSubId,
    postContent,
    postUserId,
  });
};

//判断是否用户点赞/收藏过该帖子
export const judgeLike = (
  postId: number,
  status: number,
  type: string,
  userId: number
) => {
  return hyRequest.post<IResultData<any>>("/api/post/likeOrCollect", {
    postId,
    status,
    type,
    userId,
  });
};

//查询单个帖子
export const singlePost = (postId:number)=>{
  return hyRequest.get<IResultData<any>>("/api/post/getPostById",{postId})
}
