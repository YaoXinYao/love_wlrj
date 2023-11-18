import type {
  Emailparams,
  IResultData,
  loginparams,
  LoginRes,
  sendEmailparams,
} from "~/types/Userlogin";
import Hyrequire from "./index";
import type {
  blogitem,
  Filelistprops,
  Filetag,
  Homestoreuserinfo,
  Tagparams,
} from "~/types/Home";
import type { Filelist } from "~/types/disk";
//账号密码登录
export function Userloginany(logininfo: loginparams) {
  return Hyrequire.request<IResultData<LoginRes>>(
    "/coustom/user/user/loginByPassword",
    "POST",
    {
      ...logininfo,
    }
  );
}
//发送验证码
export function sendEmeil(params: sendEmailparams) {
  return Hyrequire.request<IResultData<any>>(
    "/coustom/user/user/sendEmail",
    "POST",
    {
      ...params,
    }
  );
}
//邮箱登录
export function Userloginemail(params: Emailparams) {
  return Hyrequire.request<IResultData<any>>(
    "/coustom/user/user/loginByEmail",
    "POST",
    {
      ...params,
    }
  );
}
//获取用户信息
export function getUserinfo2(account: any) {
  return Hyrequire.request<IResultData<Homestoreuserinfo>>(
    "/coustom/user/user/getLoginUserByPassword",
    "GET",
    {
      account,
    }
  );
}
//获取全部博客
export function getAllblog() {
  return Hyrequire.request<
    IResultData<{
      [key: string]: blogitem[];
    }>
  >("/coustom/user/user/selectBlog", "GET");
}
//查询所有标签
export function getAlltag() {
  return Hyrequire.request<IResultData<Filetag[]>>(
    "/disk/disk/type/selectAllTypes",
    "GET"
  );
}
//收藏文件
export function Favoritefile(fileId: number) {
  return Hyrequire.request("/disk/disk/file/collectionFile", "put", {
    fileId,
    userId: Authuserid(),
  });
}
//获取文件列表
export function getFilelist(params: Filelistprops) {
  return Hyrequire.request<IResultData<Filelist>>(
    "/disk/disk/file/getAllUploadFileList",
    "GET",
    {
      ...params,
    }
  );
}
//标签筛选
export function getFileTaglist(params: Tagparams) {
  console.log(params.types);
  return Hyrequire.request<IResultData<Filelist>>(
    `/disk//disk/file/getFileListByTypes?${params.types}&pageSize=${params.pageSize}&index=${params.index}`,
    "GET"
  );
}
