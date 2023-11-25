import hyRequest from "../forum";
//获取所有的角色
export const selectAllRole = () => {
  return hyRequest.request("/zinfo/user/role/selectAllRole", "GET");
};
