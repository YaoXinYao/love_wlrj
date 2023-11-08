import hyRequest from "../forum";
import type { IResultData } from "../forum";
export const getLabel = (pageNo: number, pageSize: number) => {
  return hyRequest.get<IResultData<any>>("/api/label/select", {
    pageNo,
    pageSize,
  });
};
export const postLabel = (labelName: string) => {
  return hyRequest.post<IResultData<any>>("/api/label/insert", { labelName});
};
