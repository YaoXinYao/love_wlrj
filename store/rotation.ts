import { defineStore } from "pinia";
import {
  selectCarousel,
  deleteCarousel
} from "~/service/rotation";
export interface Rotation {
  carouselItem:any[]
}
export const useRotationStore = defineStore("rotation", {
  state: (): Rotation => {
    return {
      carouselItem:[]
    };
  },
  actions:{
    async getCarousel(){
      let {data} = await selectCarousel()
      this.carouselItem = data.value.data
    },
    async deleteCarousel(id:number){
      let {data} = await deleteCarousel(id)
      return data.value?.code
    }
  }
});
