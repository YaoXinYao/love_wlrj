import { defineStore } from "pinia";
export interface Rotation {
  rotatinState: boolean;
  rotatinDelete: boolean;
}
export const useRotationStore = defineStore("rotation", {
  state: (): Rotation => {
    return {
      rotatinState: false,
      rotatinDelete: false,
    };
  },
});
