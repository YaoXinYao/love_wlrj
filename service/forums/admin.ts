import hyRequest from "../forum";
import type { IResultData } from "../forum";
export const getLabel = (pageNo: number, pageSize: number) => {
  return hyRequest.get<IResultData<any>>("/api/forum/label/select", {
    pageNo,
    pageSize,
  });
};
export const postLabel = (labelName: string) => {
  return hyRequest.post<IResultData<any>>("/api/forum/label/insert", { labelName });
};
export const deleteLabel = (ids: any) => {
  return hyRequest.delete<IResultData<any>>("/api/forum/label/delete", { ids });
};

export const getSubfield = (pageNo: number, pageSize: number,subfieldId?:number) => {
  return hyRequest.get<IResultData<any>>("/api/forum/subfield/select", {
    pageNo,
    pageSize,
    subfieldId
  });
};
export const postSubfield = (subfieldName: string) => {
  return hyRequest.post<IResultData<any>>("/api/forum/subfield/insert", { subfieldName });
};
export const deleteSubfield = (ids: any) => {
  return hyRequest.delete<IResultData<any>>("/api/forum/subfield/delete", { ids });
};

export const deletePost = (ids:number[])=>{
  return hyRequest.delete<IResultData<any>>("/api/forum/post/delete",{ids})
}
