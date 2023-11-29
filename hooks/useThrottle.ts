import { customRef } from "vue";

export default function useThrottle<T>(value: T, delay = 200) {
  let timeout: number | undefined;

  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        if (timeout) return;

        timeout = setTimeout(() => {
          value = newValue;
          trigger();
          timeout = undefined;
        }, delay) as any;
      },
    };
  });
}
