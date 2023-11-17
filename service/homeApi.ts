import type {
  Emailparams,
  IResultData,
  loginparams,
  LoginRes,
  sendEmailparams,
} from "~/types/Userlogin";
import Hyrequire from "./index";
import type { blogitem, blogRoot, Homestoreuserinfo } from "~/types/Home";
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
  return Hyrequire.request("/disk/disk/type/selectAllTypes", "GET");
}
//收藏文件
export function Favoritefile(fileId: number) {
  return Hyrequire.request("/disk/disk/file/collectionFile", "put", {
    fileId,
    userId: Authuserid(),
  });
}
