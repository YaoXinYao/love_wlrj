import type { AsyncData, UseFetchOptions } from "nuxt/dist/app/composables";
type Methods = "GET" | "POST" | "DELETE" | "PUT";
export interface IResultData<T> {
  code: number;
  data: T;
}
class HYRequest {
  request<T = any>(
    url: string,
    method: Methods,
    data?: any,
    options?: UseFetchOptions<T>
  ): Promise<AsyncData<T, Error>> {
    return new Promise((resolve, reject) => {
      const newoptions: UseFetchOptions<T> = {
       //baseURL: baseURL,
        method: method,
        ...options,
      };
      if (method == "GET" || method == "DELETE") {
        newoptions.query = data;
      }
      if (method == "POST" || method == "PUT") {
        newoptions.body = data;
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
    return this.request(url, "PUT", data, options);
  }

  delete<T = any>(url: string, params?: any, options?: UseFetchOptions<T>) {
    return this.request(url, "DELETE", params, options);
  }
}
export default new HYRequest();