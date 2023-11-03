import { defineStore } from "pinia";
export interface cards {
  source: string;
}
export const forumStore = defineStore("forumInfo", {
  state: (): cards => {
    return {
      source: "",
    };
  },
});
