import hyRequest from "../forum";
import type { IResultData } from "../forum";
export const getLabel = (pageNo: number, pageSize: number) => {
  return hyRequest.get<IResultData<any>>("/api/label/select", {
    pageNo,
    pageSize,
  });
};
export const postLabel = (labelName: string) => {
  return hyRequest.post<IResultData<any>>("/api/label/insert", { labelName });
};
export const deleteLabel = (ids: any) => {
  return hyRequest.delete<IResultData<any>>("/api/label/delete", { ids });
};

export const getSubfield = (pageNo: number, pageSize: number,subfieldId?:number) => {
  return hyRequest.get<IResultData<any>>("/api/subfield/select", {
    pageNo,
    pageSize,
    subfieldId
  });
};
export const postSubfield = (subfieldName: string) => {
  return hyRequest.post<IResultData<any>>("/api/subfield/insert", { subfieldName });
};
export const deleteSubfield = (ids: any) => {
  return hyRequest.delete<IResultData<any>>("/api/subfield/delete", { ids });
};

export const deletePost = (ids:number[])=>{
  return hyRequest.delete<IResultData<any>>("/api/post/delete",{ids})
}
