import { storeToRefs } from "pinia";
import { useHomestore } from "~/store/home";
export const Authtoken = () => {
  const homestore = useHomestore();
  const { user } = storeToRefs(homestore);
  return user.value.token;
};
