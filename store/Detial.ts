import { defineStore } from "pinia";
import { Detialtype, fetchDetail } from "~/service/home";
import { Daum, ProductDetailss } from "./store";
export const useDetial = defineStore("Detial", {
  state(): {
    Detials: Daum[];
  } {
    return {
      Detials: [],
    };
  },
  actions: {
    async GetDetial(type: Detialtype = "oppo") {
      const { data } = await fetchDetail(type);
      this.Detials = data.value.data;
    },
  },
});
