import { defineStore } from "pinia";
export interface Staffs {
  modelState: boolean;
}
export const useStaffStore = defineStore("staff", {
  state: (): Staffs => {
    return {
      modelState: false,
    };
  },
});
