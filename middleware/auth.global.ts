import { jwtDecode } from "jwt-decode";
import { storeToRefs } from "pinia";
import { useHomestore } from "~/store/home";
export default defineNuxtRouteMiddleware((to, from) => {
  const homestore = useHomestore();
  const { userinfo, user } = storeToRefs(homestore);
  //用户权限信息从token解析获取，
  if (to.meta.roles) {
    if (user.value.token == "") {
      //如果有权限要求的页面，先检查是否登录过，如果没有登录，则去登陆
      ElMessage({ message: "请先登录", type: "warning" });
      return navigateTo({ path: "/login" });
    }
    //检验是否登陆过期
    const { exp } = jwtDecode(user.value.token);
    if (!isTokenExpired({ expiration: exp as number })) {
      const res = jwtDecode<any>(user.value.token);
      if (res.roleId >= to.meta.roles) {
        //满足权限
        return true;
      } else {
        ElMessage({ message: "权限不够", type: "warning" });
        return navigateTo({ path: from.path });
      }
    }
    ElMessage({
      message: "登录已经过期，请重新登录",
      type: "warning",
      duration: 2,
    });
    homestore.exitlogin();
    return navigateTo("/login");
  } else {
    //未设置权限的页面，则默认公开，
    return true;
  }
});
