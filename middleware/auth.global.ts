export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated()是一个验证用户是否已经认证的示例方法
  // 定义白名单列表
  const whitelist = ["/", "/login", "/blog", "/grouphistory"];
  if (whitelist.includes(to.path)) {
    return true;
  } else {
    if (Authtoken() == "") {
      return navigateTo("/login");
    }
  }
});
