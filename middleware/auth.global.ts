export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated()是一个验证用户是否已经认证的示例方法
  if (false) {
    return navigateTo("/login");
  }
});
