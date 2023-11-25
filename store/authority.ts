import { defineStore } from "pinia";
import { selectAllRole } from "~/service/authority/authority";
export interface manage {}
export const authority = defineStore("authority", {
  state: (): manage => ({}),
  actions: {
    //获取所有的角色
    async getAllRole() {
      let { data } = await selectAllRole();
      return data.value?.data || [];
    },
  },
});
