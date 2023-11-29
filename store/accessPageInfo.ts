import { defineStore } from "pinia";
import type { AccessPageInfoType, AccessStoreType } from "~/types/Access";
export const useAccessPageInfoStore = defineStore("accessPageInfoStore", {
  state(): AccessStoreType {
    return {
      managePageInfo: {
        currentPage: 1,
        pageSize: 5,
        total: 0,
      },
      manageSearchKey: "",
      selfPageInfo: {
        currentPage: 1,
        pageSize: 5,
        total: 0,
      },
      selfSearchKey: "",
    };
  },
  actions: {
    async ChangeHPageInfo(props: AccessPageInfoType) {
      this.managePageInfo = props;
    },
    async ChangeSelfPageInfo(props: AccessPageInfoType) {
      this.selfPageInfo = props;
    },
  },
  //持久化操作
  persist: true,
});
