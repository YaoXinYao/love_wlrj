import Hyrequire from "./index";
export function Userlogin(logininfo: any) {
  return Hyrequire.request("/coustom/user/loginByPassword", "POST", {
    ...logininfo,
  });
}
