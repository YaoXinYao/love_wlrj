import { defineStore } from "pinia";
import {
  selectAllGrade,
  selectGroup,
  selectAllUser,
  exportTemplate,
  deleteMoreUser,
  deleteUser,
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
  isSignle:boolean
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
      isSignle:false
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
