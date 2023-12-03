import { defineStore } from "pinia";
import { GetHotnews } from "~/service/homeApi";
import type { NewsRoot } from "~/types/Home";
export const useHotnews = defineStore("hotnews", {
  state(): { HotNews: NewsRoot } {
    return {
      HotNews: {
        records: [],
        total: 0,
        size: 0,
        current: 0,
        orders: [],
        hitCount: false,
        countId: "",
        maxLimit: "",
        searchCount: false,
        pages: 0,
      },
    };
  },
  actions: {
    async getHotnews(curIndex: number) {
      const res = await GetHotnews({ pageNo: curIndex, pageSize: 4 });
      console.log(res.data);
      this.HotNews = res.data.value.data;
    },
  },
});
