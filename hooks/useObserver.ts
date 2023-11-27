import { useIntersectionObserver } from "@vueuse/core";

export const useObserver = (target: Ref, fn: Function, props: any) => {
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        stop();
        fn(props);
      }
    },
    { threshold: 0 }
  );
};

