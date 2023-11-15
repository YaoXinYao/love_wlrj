import { defineStore } from "pinia";
import type { HomeStore, HomeStoreuser } from "~/types/Home";
export const useHomestore = defineStore("home", {
  state(): HomeStore {
    return {
      header: {
        height: "1.8rem",
        backgroundColor: "transparent",
        color: "white",
        isSpread: true,
      },
      isRequireanim: true,
      user: {
        expiresIn: 0,
        refreshToken: "",
        token: "",
        tokenHead: "",
      },
    };
  },
  actions: {
    async ChangeHeader(headerType: any) {
      this.header = headerType;
    },
    async ChangeisRequireanim(flag: boolean) {
      this.isRequireanim = flag;
    },
    async Changeuserinfo(data: HomeStoreuser) {
      this.user = data;
    },
  },
  //持久化操作
  persist: true,
});
