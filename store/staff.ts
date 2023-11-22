import { defineStore } from "pinia";
import {
  selectAllGrade,
  selectGroup,
  selectAllUser,
  exportTemplate,
  deleteMoreUser,
  deleteUser,
  selectAllGroup,
  selectAllRole,
  defaultGroup,
  defaultRole,
  deleteGroup,
  insertGroup,
  updateUserGroup
} from "~/service/staff";
export interface Staffs {
  modelState: boolean;
  editModel: boolean;
  deleteModel: boolean;
  grades: any[];
  grade: string;
  group: string;
  input: string;
  users: any[];
  total: number;
  signleInfo: any;
  signleDelete:number;
  moreDelete:number[];
  isSignle:boolean;
  manageGroup:boolean;
  curTable:number;
}
export const useStaffStore = defineStore("staff", {
  state: (): Staffs => {
    return {
      modelState: false,
      editModel: false,
      deleteModel: false,
      grades: [],
      grade: "",
      group: "",
      input: "",
      users: [],
      total: 0,
      signleInfo: {},
      signleDelete:0,
      moreDelete:[],
      isSignle:false,
      manageGroup:false,
      curTable:1
    };
  },
  actions: {
    //获取所有年级
    async getGrades() {
      let { data } = await selectAllGrade();
      this.grades = data.value?.data || [];
    },
    //获取年级下的所有组别
    async getGroup(grade: string) {
      let { data } = await selectGroup(grade);
      return data.value;
    },
    //获取所有的组别
    async getAllGroup() {
      let { data } = await selectAllGroup();
      return data.value?.data || [];
    },
    //获取所有的角色
    async getAllRole(){
      let {data} = await selectAllRole();
      return data.value?.data || []
    },
    //为导入用户设置默认组别
    async defaultGroups(groupId:number){
      let {data} = await defaultGroup(groupId)
      return data.value?.code
    },
    //为导入用户设置默认角色
    async defaultRoles(roleId:number){
      let {data} = await defaultRole(roleId)
      return data.value?.code
    },
    //删除组别
    async deleteGroups(groupId:number){
      let {data} = await deleteGroup(groupId)
      return data.value?.code
    },
    //添加组别
    async addGroups(groupName:string){
      let {data} = await insertGroup(groupName)
      return data.value?.code
    },
    //为用户设置组别
    async setGroup(groupId:number,userId:number){
      let {data} = await updateUserGroup(groupId,userId)
      console.log("为用户设置组别",data.value);
      return data.value?.code
    },
    //分页查询所有用户
    async getAllUser(
      pageNo: number,
      pageSize: number,
      groupId?: number,
      search?: string,
      userGrade?: string
    ) {
      let { data } = await selectAllUser(
        pageNo,
        pageSize,
        groupId,
        search,
        userGrade
      );
      return data.value;
    },
    //下载导入模板
    async download() {
      let { data } = await exportTemplate();
      let fileBolb = new Blob([data.value], { type: data.value.type });
      const url = window.URL.createObjectURL(fileBolb);
      return url;
    },
    //删除单个用户
    async deleteSignle(userId: number) {
      let { data } = await deleteUser(userId);
      return data.value.code
    },
    //删除多个用户
    async deleteMore(ids: number[]) {
      let { data } = await deleteMoreUser(ids);
      console.log("删除多个用户", data.value)
      return data.value.code
    },
  },
});
