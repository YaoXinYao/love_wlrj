import hyRequest from "./forum";
//通过id查询用户信息
export const getUserInfo = (id: number) => {
  return hyRequest.request("/zinfo/user/user/getUserById", "GET", { id });
};
//获取所有的年级
export const selectAllGrade = () => {
  return hyRequest.request("/zinfo/user/user/selectAllGrade", "GET");
};
//根据年级获取该年级的组别
export const selectGroup = (grade: string) => {
  return hyRequest.request("/zinfo/user/user/selectGroupByGrade", "GET", {
    grade,
  });
};
//分页查询所有用户
export const selectAllUser = (
  pageNo: number,
  pageSize: number,
  groupId?: number,
  search?: string,
  userGrade?: string
) => {
  return hyRequest.request("/zinfo/user/user/selectAllUser", "GET", {
    pageNo,
    pageSize,
    groupId,
    search,
    userGrade,
  });
};
