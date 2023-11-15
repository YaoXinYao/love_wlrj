import Hyrequire from "./index";
export function getfilelist(index: number, pagesize: number) {
  return Hyrequire.request("/disk/disk/file/getAllUploadFileList", "GET", {
    index: index,
    pageSize: pagesize,
  });
}
