import hyRequest from "../forum";
import type { IResultData } from "../forum";

//发布帖子
export const addpost = (query:any,params: FormData) => {
  return hyRequest.post<IResultData<any>>("/api/post/insert",query,{body:params});
};
//查询帖子
export const getPost = (
  pageNo: number,
  pageSize: number,
  postTitle?: string,
  postSubId?: number,
  postContent?: string,
  postUserId?: number
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
  return hyRequest.post<IResultData<any>>("/api/post/likeOrCollect", "", {
    body: {
      postId,
      status,
      type,
      userId,
    },
  });
};
//查询单个帖子
export const singlePost = (postId: number) => {
  return hyRequest.get<IResultData<any>>("/api/post/getPostById", { postId });
};
//查询指定文章下评论
export const getComment = (postId: number) => {
  return hyRequest.get<IResultData<any>>("/api/comment/select", { postId });
};
//发布评论
export const postComment = (query:any,params: FormData) => {
  return hyRequest.post<IResultData<any>>("/api/comment/insert",query,{body:params});
};
//删除评论
export const deleteComment = (ids:number[])=>{
  return hyRequest.delete<IResultData<any>>("/api/comment/delete",{ids})
}
//评论点赞
export const likeComment =(comId:number,status:number,userId:number)=>{
  return hyRequest.post<IResultData<any>>("/api/comment/likeOrCancel",{comId,status,userId})
}
