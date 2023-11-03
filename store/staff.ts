import { defineStore } from "pinia";
export interface staffForm {
  name: string;
  code: string;
  class: string;
  coolege: string;
  blog:string;
  direction:string;
  grade:string;
  sex:string
}
export interface Staffs {
  modelState: boolean;
  addModel: boolean;
  editModel: boolean;
  deleteModel: boolean;
}
export const useStaffStore = defineStore("staff", {
  state: (): Staffs => {
    return {
      modelState: false,
      addModel: false,
      editModel: false,
      deleteModel: false,
    };
  },
});
