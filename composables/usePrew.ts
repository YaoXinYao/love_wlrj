import { createApp } from "vue";
import Prevview from "~/components/Prevview/index.vue";
//打开文件预览
export const usePrew = () => {
  const openPrew = (id: number) => {
    const box = document.createElement("div");
    document.body.appendChild(box);
    const app = createApp(Prevview, {
      fileid: id,
      downOpen: () => {
        app.unmount();
        box.remove();
      },
    });
    app.mount(box);
  };

  return {
    openPrew,
  };
};
