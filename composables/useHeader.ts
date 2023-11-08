import { useHomestore } from "~/store/home";
//固定头部内容的HOOKS
export const useHeader = () => {
  const usehomestore = useHomestore();
  onMounted(() => {
    usehomestore.ChangeHeader({
      height: "0.8rem",
      backgroundColor: "white",
      color: "black",
      isSpread: false,
    });
    usehomestore.ChangeisRequireanim(false);
  });
  onUnmounted(() => {
    usehomestore.ChangeisRequireanim(true);
  });
};
