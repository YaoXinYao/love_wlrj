export default defineNuxtPlugin((nuxtApp) => {
  //全局自定义指令,自动聚焦
  nuxtApp.vueApp.directive("focus", {
    mounted(el) {
      el.focus();
    },
  });
  //图片懒加载,使用监视属性
  nuxtApp.vueApp.directive("lazy", {
    mounted(el, binding) {
      //定义一个观察器，entries为状态改变元素的数组
      let observer = new IntersectionObserver((entries) => {
        // 遍历
        for (let i of entries) {
          // 如果改元素处于可视区
          if (i.isIntersecting) {
            // 获取该元素
            let img: HTMLImageElement = i.target as HTMLImageElement;
            // 重新设置src值
            img.src = binding.value;
            //取消对该元素的观察
            observer.unobserve(img);
          }
        }
      });
      // 为 img 标签添加一个观察
      observer.observe(el);
    },
  });
});
