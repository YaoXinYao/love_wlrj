import { defineStore } from "pinia";
import type { AccessPageInfoType, AccessStoreType } from "~/types/Access";
export const useAccessPageInfoStore = defineStore("accessPageInfoStore", {
  state(): AccessStoreType {
    return {
      pageInfo: {
        currentPage: 1,
        pageSize: 5,
        total: 0,
      },
    };
  },
  actions: {
    async ChangeHPageInfo(props: AccessPageInfoType) {
      this.pageInfo = props;
    },
  },
  //持久化操作
  persist: true,
});
