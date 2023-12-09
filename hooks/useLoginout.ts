import { useHomestore } from "~/store/home";
import { useMessageStore } from "~/store/message";
import { useAccessPageInfoStore } from "~/store/accessPageInfo";
export const useLoginout = () => {
  const homeStore = useHomestore();
  const messageStore = useMessageStore();
  const accessPageInfoStore = useAccessPageInfoStore();
  homeStore.exitlogin();
  messageStore.exitLogin();
  accessPageInfoStore.exitLogin();
  navigateTo("/");
};
