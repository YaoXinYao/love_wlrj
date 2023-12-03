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
      selfWrittenPageInfo: {
        currentPage: 1,
        pageSize: 5,
        total: 0,
      },
      selfInterviewPageInfo: {
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
    async ChangeSelfWrittenPageInfo(props: AccessPageInfoType) {
      this.selfWrittenPageInfo = props;
    },
  },
  //持久化操作
  persist: true,
});
