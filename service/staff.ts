import hyRequest from "./forum";
//通过id查询用户信息
export const getUserInfo = (id: number) => {
  return hyRequest.request("/zinfo/user/user/getUserById","GET", { id });
};
