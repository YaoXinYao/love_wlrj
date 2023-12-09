import hyRequest from "./forum";
//通过id查询用户信息
export const getUserInfo = (id: number) => {
  return hyRequest.request("/api/user/user/getUserById", "GET", { id });
};
//获取所有的年级
export const selectAllGrade = () => {
  return hyRequest.request("/api/user/user/selectAllGrade", "GET");
};
//根据年级获取该年级的组别
export const selectGroup = (grade: string) => {
  return hyRequest.request("/api/user/user/selectGroupByGrade", "GET", {
    grade,
  });
};

//获取所有的组别
export const selectAllGroup = () => {
  return hyRequest.request("/api/user/group/selectAllGroup", "GET");
};
//为导入用户设置默认组别
export const defaultGroup = (groupId:number) => {
  return hyRequest.request("/api/user/group/updateDefaultGroup", "PUT",{groupId});
};
//为用户设置组别
export const updateUserGroup = (groupId:number,userId:number)=>{
  return hyRequest.request("/api/user/group/updateUserGroup","PUT",{groupId,userId})
}
//删除组别
export const deleteGroup = (groupId:number)=>{
  return hyRequest.request("/api/user/group/deleteGroup","DELETE",{groupId})
}
//添加组别
export const insertGroup = (groupName:string)=>{
  return hyRequest.request("/api/user/group/insertGroup","POST",{groupName})
}
//获取所有的角色
export const selectAllRole = () => {
  return hyRequest.request("/api/user/role/selectAllRole", "GET");
};
//为导入用户设置默认角色
export const defaultRole= (roleId:number) => {
  return hyRequest.request("/api/user/role/defaultRole", "PUT",{roleId});
};
//修改某个年级的角色
export const updateByGrade =(grade:string,roleId:number)=>{
return hyRequest.request("/api/user/role/updateByGrade",'PUT',{grade,roleId})
}

//分页查询所有用户
export const selectAllUser = (
  pageNo: number,
  pageSize: number,
  groupId?: number,
  search?: string,
  userGrade?: string
) => {
  return hyRequest.request("/api/user/user/selectAllUser", "GET", {
    pageNo,
    pageSize,
    groupId,
    search,
    userGrade,
  });
};
//下载导入模板
export const exportTemplate = ()=>{
  return hyRequest.request("/api/user/user/exportTemplate","GET",{responseType:'blob'})
}
//删除单个用户
export const deleteUser =(userId:number)=>{
  return hyRequest.request("/api/user/user/deleteUser","DELETE",{userId})
}
//删除多个用户
export const deleteMoreUser =(ids:number[])=>{
  return hyRequest.request("/api/user/user/deleteMoreUser","DELETE",{ids})
}
