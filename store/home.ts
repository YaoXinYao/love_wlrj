import { defineStore } from "pinia";
import { Headertype } from "./store";
export const useHomestore = defineStore("home", {
  state(): { header: Headertype; isRequireanim: boolean } {
    return {
      header: {
        height: "1.8rem",
        backgroundColor: "transparent",
        color: "white",
        isSpread: true,
      },
      isRequireanim: true,
    };
  },
  actions: {
    async ChangeHeader(headerType: any) {
      this.header = headerType;
    },
    async ChangeisRequireanim(flag: boolean) {
      this.isRequireanim = flag;
    },
  },
});
