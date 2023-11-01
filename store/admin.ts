import { defineStore } from "pinia";
export interface admins {
  title: any[];
  currentModel:string;
}
export const adminStore = defineStore("admin", {
  state: (): admins => {
    return {
      title: [],
      currentModel:"2"
    };
  },
});
