import type {
  uploadfileType,
  unCollectType,
  MyfileType,
  ToProvate,
  SearchMyfileType,
  Fileprops,
  SearchParams,
  ProjectDesType,
} from "~/types/disk";
import Hyrequire from "./index";
import type { IResultData } from "~/types/Userlogin";
import type { ProjectParams } from "~/types/Home";
export function getfilelist(index: number, pagesize: number) {
  return Hyrequire.request("/api/disk/file/getAllUploadFileList", "GET", {
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
    `/api/disk/file/updateFile?${filetag}&uploadName=${uploadName}&uploaderId=${uploaderId}&md5=${md5}`,
    file,
    progress
  );
}
//取消收藏
export function unCollectionFile(params: unCollectType) {
  return Hyrequire.request<IResultData<any>>(
    "/api/disk/file/unCollectionFile",
    "PUT",
    { ...params, userId: Authuserid() }
  );
}
//查看自己上传的文件
export function LookMyfile(params: MyfileType) {
  return Hyrequire.request<IResultData<any>>(
    "/api/disk/file/getUploadFileList",
    "GET",
    {
      ...params,
    }
  );
}
//修改为私密
export function FileToPrivate(params: ToProvate) {
  return Hyrequire.request("/api/disk/file/updateFileToPrivate", "PUT", {
    ...params,
  });
}
export function FileToPublic(params: ToProvate) {
  return Hyrequire.request("/api/disk/file/updateFileToPublic", "PUT", {
    ...params,
  });
}
// 获取网盘总览信息
export function GetDisjinfo() {
  return Hyrequire.get("/api/disk/file/getDiskOverview");
}
/**
 *
 * @param params 搜索文件参数
 * @returns 返回搜索结果的promise对象
 */
export function SearchFile(params: SearchMyfileType) {
  return Hyrequire.get<IResultData<Fileprops[]>>(
    "/api/disk/file/searchCollectionFile",
    {
      ...params,
    }
  );
}
//搜索自己文件
export function SearchMyfile(parmas: SearchMyfileType) {
  return Hyrequire.get("/api/disk/file/searchUploadFile", {
    ...parmas,
  });
}
//删除文件
export function uploaddeleteFile(params: ToProvate) {
  return Hyrequire.request("/api/disk/file/updateFileDelete", "PUT", {
    ...params,
  });
}
//网盘搜索
export function DiskSearch(params: SearchParams) {
  return Hyrequire.request("/api/disk/es/searchES", "GET", {
    ...params,
  });
}
//项目添加
export function ProjectAdd(params: ProjectParams) {
  const formdata = new FormData();
  formdata.append("projectName", params.projectName);
  formdata.append("file", params.file as any);
  formdata.append("projectCompletionTime", params.projectCompletionTime);
  formdata.append("projectIntroduce", params.projectIntroduce);
  formdata.append("projectStartTime", params.projectStartTime);
  formdata.append("projectUrl", params.projectUrl);
  formdata.append("projectTeams", params.projectTeams);
  return Hyrequire.post<IResultData<any>>(
    "/api2/project/api/addProject",
    {},
    {
      body: formdata,
    }
  );
}
//获取所有项目信息
export function getAllProject() {
  return Hyrequire.get<IResultData<ProjectDesType[]>>(
    "/api2/project/api/getProjectList"
  );
}
//删除项目
export function deleteProject(id: number | string) {
  return Hyrequire.delete<IResultData<any>>(
    `/api2/project/api/deleteProject?projectId=${id}`
  );
}
//更换封面
export function updataCover(file: File, projectId: number) {
  const fordata = new FormData();
  fordata.append("file", file);
  fordata.append("projectId", projectId.toString());
  return Hyrequire.put(
    "/api2/project/api/updateProjectImage",
    {},
    { body: fordata }
  );
}
//修改项目
export function updateProject(obj: any) {
  return Hyrequire.put("/api2/project/api/updateProject", { ...obj });
}
