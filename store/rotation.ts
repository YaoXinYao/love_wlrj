import { defineStore } from "pinia";
import {
  selectCarousel,
  deleteCarousel,
  addCarousel,
} from "~/service/rotation";
export interface Rotation {
  carouselItem: any[];
  loading:boolean
}
export const useRotationStore = defineStore("rotation", {
  state: (): Rotation => {
    return {
      carouselItem: [],
      loading:false
    };
  },
  actions: {
    async getCarousel() {
      let { data } = await selectCarousel();
      console.log("轮播",data.value);
      
      this.carouselItem = data.value.data;
    },
    async deleteCarousel(id: number) {
      let { data } = await deleteCarousel(id);
      return data.value?.code;
    },
    async postCarousel(query: any, formdata: FormData) {
      this.loading = true
      const { data } = await addCarousel(query, formdata);
      const code = data.value?.code;
      this.loading = false
      return code;
    },
  },
});
