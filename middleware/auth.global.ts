import { storeToRefs } from "pinia";
import { useHomestore } from "~/store/home";
export default defineNuxtRouteMiddleware((to, from) => {
  const homestore = useHomestore();
  const { userinfo, user } = storeToRefs(homestore);
  // isAuthenticated()是一个验证用户是否已经认证的示例方法
  // 定义白名单列表
  /*   const whitelist = ["/", "/login", "/blog", "/grouphistory"];
  if (!whitelist.includes(to.path)) {
    if (user.value.token == "") {
      ElMessage({ message: "请重新登录!", type: "warning" });
      return navigateTo({ path: "/login", replace: true });
    } else {
      return true;
    }
  } else {
    return true;
  } */
});
