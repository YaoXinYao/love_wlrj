import { defineStore } from "pinia";
import {
  selectCarousel,
  deleteCarousel,
  addCarousel,
} from "~/service/rotation";
export interface Rotation {
  carouselItem: any[];
}
export const useRotationStore = defineStore("rotation", {
  state: (): Rotation => {
    return {
      carouselItem: [],
    };
  },
  actions: {
    async getCarousel() {
      let { data } = await selectCarousel();
      this.carouselItem = data.value.data;
    },
    async deleteCarousel(id: number) {
      let { data } = await deleteCarousel(id);
      return data.value?.code;
    },
    async postCarousel(query: any, formdata: FormData) {
      const { data } = await addCarousel(query, formdata);
      const code = data.value?.code;
      return code;
    },
  },
});
