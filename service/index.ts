import type { AsyncData, UseFetchOptions } from "nuxt/dist/app/composables";
import { useLoginout } from "~/hooks/useLoginout";
type Methods = "GET" | "POST" | "PUT" | "DELETE";
class Hyrequest {
  request<T = any>(
    url: string,
    method: Methods,
    data?: any,
    options?: UseFetchOptions<T>
  ): Promise<AsyncData<T, Error>> {
    return new Promise((resolve, reject) => {
      const newoptions: UseFetchOptions<T> = {
        method: method,
        headers: {
          ...options?.headers,
        },
        ...options,
        //响应
        onResponse({ request, response, options }) {
          if (response.status == 403) {
            //退出登录
            useLoginout();
            ElMessage({ message: "账号验证失败，重新登陆", type: "info" });
            navigateTo("/login");
          }
          //如果状态码为403  则直接重新登录。账号已经被顶掉
        },
        //请求拦截
        onRequest({ request, options }) {
          // 设置请求头
          options.headers = options.headers || {};
          //@ts-ignore
          options.headers.Authorization = Authtoken();
        },
      };
      if (method == "GET") {
        newoptions.query = data || {};
      }
      if (method == "POST" || method == "PUT") {
        newoptions.params = data || {};
      }
      useFetch<T>(url, newoptions as any)
        .then((res) => {
          resolve(res as AsyncData<T, Error>);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  get<T = any>(url: string, params?: any, options?: UseFetchOptions<T>) {
    return this.request<T>(url, "GET", params, options);
  }
  post<T = any>(url: string, data: any, options?: UseFetchOptions<T>) {
    return this.request<T>(url, "POST", data, options);
  }
  put<T = any>(url: string, data: any, options?: UseFetchOptions<T>) {
    return this.request<T>(url, "PUT", data, options);
  }
  delete<T = any>(url: string, params?: any, options?: UseFetchOptions<T>) {
    return this.request<T>(url, "DELETE", params, options);
  }
}
export default new Hyrequest();
