import type {
  Emailparams,
  IResultData,
  loginparams,
  LoginRes,
  sendEmailparams,
} from "~/types/Userlogin";
import Hyrequire from "./index";
import type { Homestoreuserinfo } from "~/types/Home";
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
    "/coustom​/user​/user​/sendEmail",
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
