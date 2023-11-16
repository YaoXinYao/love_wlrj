import { defineStore } from "pinia";
import {
  selectAllGrade,
  selectGroup,
  selectAllUser,
  exportTemplate,
  importUser,
} from "~/service/staff";
export interface staffForm {
  name: string;
  code: string;
  class: string;
  coolege: string;
  blog: string;
  direction: string;
  grade: string;
  sex: string;
}
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
    //导入用户
    async addUser(params: FormData) {
      let { data } = await importUser(params);
      console.log("导入用户", data.value);
    },
  },
});
