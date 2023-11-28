import hyRequest from "../forum";
//获取所有的角色
export const selectAllRole = () => {
  return hyRequest.request("/zinfo/user/role/selectAllRole", "GET");
};
//获取角色的人数
export const getUserNum = (roleId: number) => {
  return hyRequest.request("/zinfo/user/role/getUserNum", "GET", { roleId });
};
//添加权限
export const insertAuthority = (authorityName: string) => {
  return hyRequest.request("/zinfo/user/authority/insertAuthority", "POST", {
    authorityName,
  });
};
//查看所有权限
export const getAllAuthority = () => {
  return hyRequest.request("/zinfo/user/authority/getAllAuthority", "GET");
};
//删除权限
export const deleteAuthority = (authorityId: number) => {
  return hyRequest.request("/zinfo/user/authority/deleteAuthority", "DELETE", {
    authorityId,
  });
};
//添加接口
export const insertInterface = (authorityId: number, interfacePath: string) => {
  return hyRequest.request("/zinfo/user/interface/insertInterface", "POST", {
    authorityId,
    interfacePath,
  });
};
//查询权限下的接口
export const selectInterface = (authorityId: number) => {
  return hyRequest.request("/zinfo/user/interface/selectByAuthority", "GET", {
    authorityId,
  });
};
//删除接口
export const deleteInterface = (interfaceId: number) => {
  return hyRequest.request("/zinfo/user/interface/deleteInterface", "DELETE", {
    interfaceId,
  });
};
//重新加载角色权限
export const updateRoleAuthority = () => {
  return hyRequest.request("/zinfo/user/interface/updateRoleAuthority", "PUT");
};

//给角色添加权限
export const insertRoleAuthority = (authorityId: number, roleId: number) => {
  return hyRequest.request("/zinfo/user/role/insertRoleAuthority", "POST", {
    authorityId,
    roleId,
  });
};
//给角色删除权限
export const deleteRoleAuthority = (authorityId: number, roleId: number) => {
  return hyRequest.request("/zinfo/user/role/deleteRoleAuthority", "DELETE", {
    authorityId,
    roleId,
  });
};
