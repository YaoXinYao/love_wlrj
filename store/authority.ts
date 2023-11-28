import { defineStore } from "pinia";
import {
  selectAllRole,
  getUserNum,
  insertAuthority,
  getAllAuthority,
  insertInterface,
  selectInterface,
  deleteInterface,
  deleteAuthority,
  updateRoleAuthority,
  insertRoleAuthority,
  deleteRoleAuthority,
} from "~/service/authority/authority";
export interface manage {
  authoritydata:any[]
}
export const authority = defineStore("authority", {
  state: (): manage => ({
    authoritydata:[]
  }),
  actions: {
    //获取所有的角色
    async getAllRole() {
      let { data } = await selectAllRole();
      return data.value?.data || [];
    },
    //获取对应角色的总人数
    async getUseNum(roleId: number) {
      let { data } = await getUserNum(roleId);
      return data.value?.data;
    },
    //添加权限
    async postAuthority(name: string) {
      let { data } = await insertAuthority(name);
      return data.value?.code;
    },
    //删除权限
    async deleteAuthor(id: number) {
      let { data } = await deleteAuthority(id);
      return data.value?.code;
    },
    //查看所有权限
    async getAuthority() {
      let { data } = await getAllAuthority();
      this.authoritydata = data.value?.data || []
    },
    //添加接口
    async postInterface(id: number, path: string) {
      let { data } = await insertInterface(id, path);
      return data.value?.code;
    },
    //查询权限下面的接口
    async getInterfaces(id: number) {
      let { data } = await selectInterface(id);
      return data.value?.data;
    },
    //删除接口
    async deleteInter(id: number) {
      let { data } = await deleteInterface(id);
      return data.value?.code;
    },
    //重新加载角色权限
    async updateRoleAuthor() {
      let { data } = await updateRoleAuthority();
      return data.value?.code;
    },
    //给用户删除权限
    async deleteRoleAuthor(authorityId: number, roleId: number) {
      let { data } = await deleteRoleAuthority(authorityId, roleId);
      console.log("给用户删除权限", data.value);
      return data.value?.code;
    },
    //给用户添加权限
    async addRoleAuthor(authorityId: number, roleId: number) {
      let { data } = await insertRoleAuthority(authorityId, roleId);
      console.log("给用户添加权限", data.value);
      return data.value?.code;
    },
  },
});
