import { storeToRefs } from "pinia";
import { useDiskstore } from "~/store/disk";
export function downFile(url: string, name: string) {
  const diskstore = useDiskstore();
  const { down } = storeToRefs(diskstore);
  down.value.isOpen = true;
  exportFile(
    url,
    name,
    (progress, spend) => {
      down.value.downSpend = Math.floor(spend / 1024) + " kb/s";
      diskstore.changeProgress(progress);
      down.value.downProgress = Math.floor(progress);
      if (progress >= 100) {
        down.value.isOpen = false;
      }
    },
    //文件大小
    (size) => {
      down.value.downSize = size;
    }
  );
}
