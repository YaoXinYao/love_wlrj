import type {
  uploadfileType,
  unCollectType,
  MyfileType,
  ToProvate,
} from "~/types/disk";
import Hyrequire from "./index";
import type { IResultData } from "~/types/Userlogin";
export function getfilelist(index: number, pagesize: number) {
  return Hyrequire.request("/disk/disk/file/getAllUploadFileList", "GET", {
    index: index,
    pageSize: pagesize,
  });
}
interface IUploadProgress {
  loaded: number;
  total: number;
}

//上传文件，普通上传
export function uploadfile(
  params: uploadfileType,
  file: File,
  progress: (progress: IUploadProgress) => void
) {
  const { uploadName, uploaderId, fileTypeIdList, md5 } = params;
  const filetag = fileTypeIdList
    .map((item) => `fileTypeIdList=${item}`)
    .join("&");
  return uploadFileWithProgress(
    `/disk/disk/file/updateFile?${filetag}&uploadName=${uploadName}&uploaderId=${uploaderId}&md5=${md5}`,
    file,
    progress
  );
  /* return Hyrequire.post<IResultData<any>>(
    `/disk/disk/file/updateFile?${filetag}&uploadName=${uploadName}&uploaderId=${uploaderId}`,
    {},
    {
      body: file,
    }
  ); */
}
//取消收藏
export function unCollectionFile(params: unCollectType) {
  return Hyrequire.request<IResultData<any>>(
    "/disk/disk/file/unCollectionFile",
    "put",
    { ...params, userId: Authuserid() }
  );
}
//查看自己上传的文件
export function LookMyfile(params: MyfileType) {
  return Hyrequire.request<IResultData<any>>(
    "/disk/disk/file/getUploadFileList",
    "GET",
    {
      ...params,
    }
  );
}
//修改为私密
export function FileToPrivate(params: ToProvate) {
  return Hyrequire.request("/disk/disk/file/updateFileToPrivate", "put", {
    ...params,
  });
}
export function FileToPublic(params: ToProvate) {
  return Hyrequire.request("/disk/disk/file/updateFileToPublic", "put", {
    ...params,
  });
}
// 获取网盘总览信息
export function GetDisjinfo() {
  return Hyrequire.get("/disk/disk/file/getDiskOverview");
}
