import type {
  Emailparams,
  IResultData,
  loginparams,
  LoginRes,
} from "~/types/Userlogin";
import Hyrequire from "./index";
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

export function Userloginemail(params: Emailparams) {
  return Hyrequire.request<IResultData<any>>(
    "/coustom/user/user/loginByEmail",
    "POST",
    {
      ...params,
    }
  );
}
