import { storeToRefs } from "pinia";
import { useHomestore } from "~/store/home";
export const Authuserid = () => {
  const homestore = useHomestore();
  const { userinfo } = storeToRefs(homestore);
  return userinfo.value.userId;
};
