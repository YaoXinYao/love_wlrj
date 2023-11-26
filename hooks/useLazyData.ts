// 公共方法函数（钩子）
import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";

/***
 * 数据懒加载函数
 * @param target 监听dom元素 - ref
 * @param callback 回调函数
 */
export const useLazyDatas = (target: any, callback: any) => {
  const result = ref([]); // 设置一个返回值，执行完callback()后赋值，此处无用
  // 回调函数，调用停止监听元素

  /****
   * @param target 监听dom元素 - ref
   * @param function 回调函数
   * @param isIntersecting 是否进入可视区
   * @router stop 停止监听函数
   */
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      // 是否进入监听区域
      if (isIntersecting) {
        stop();
        callback();
        // typeof callback == 'function' ? callback() : ''
      }
    },
    {
      threshold: 0.01,
    }
    /**
            规定了一个监听目标与边界盒交叉区域的比例值，可以是一个具体的数值或是一组 0.0 到 1.0 之间的数组。
            若指定值为 0.0，则意味着监听元素即使与根有 1 像素交叉，此元素也会被视为可见。若指定值为 1.0，则
            意味着整个元素都在可见范围内时才算可见。可以参考Intersection Observer API 中的 Thresholds 
            来深入了解阈值是如何使用的。阈值的默认值为 0.0。
         
         */
  );
  return result;
};
