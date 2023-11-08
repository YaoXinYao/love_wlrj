import hyRequest from "./forum";
import type { IResultData } from "./forum";
interface params {
  pageNo:number;
  pageSize:number;
}

export const getLabel = (params: params) => {
  return hyRequest.get<IResultData<any>>("/label/select", params);
};
export const postLabel = (name: string) => {
  return hyRequest.post<IResultData<any>>(
    "/label/insert",
    {
      name: name,
    },
    {}
  );
};
