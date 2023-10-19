import { defineStore } from "pinia";
import { fetchhomeinfo, homeinfotype } from "~/service/home";
import { HomeData } from "./store";
export const useHomestore = defineStore("home", {
  state(): HomeData {
    return {
      navbars: [],
      banners: [],
      categorys: [],
    };
  },
  actions: {
    async GetHomeinfo(type: homeinfotype) {
      const { data } = await fetchhomeinfo(type);
      this.navbars = data.value.data.navbars || [];
      this.banners = data.value.data.banners || [];
      this.categorys = data.value.data.categorys || [];
    },
  },
});
