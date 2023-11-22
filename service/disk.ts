import type { uploadfileType } from "~/types/disk";
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

//上传文件
export function uploadfile(
  params: uploadfileType,
  file: File,
  progress: (progress: IUploadProgress) => void
) {
  const { uploadName, uploaderId, fileTypeIdList } = params;
  const filetag = fileTypeIdList
    .map((item) => `fileTypeIdList=${item}`)
    .join("&");
  return uploadFileWithProgress(
    `/disk/disk/file/updateFile?${filetag}&uploadName=${uploadName}&uploaderId=${uploaderId}`,
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
