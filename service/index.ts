import type { AsyncData, UseFetchOptions } from "nuxt/dist/app/composables";
const baseURL = "http://codercba.com:9060/oppo-nuxt/api";
type Methods = "GET" | "POST";
class Hyrequest {
  request<T = any>(
    url: string,
    method: Methods,
    data?: any,
    options?: UseFetchOptions<T>
  ): Promise<AsyncData<T, Error>> {
    return new Promise((resolve, reject) => {
      const newoptions: UseFetchOptions<T> = {
        baseURL: baseURL,
        method: method,
        ...options,
      };
      if (method == "GET") {
        newoptions.query = data || {};
      }
      if (method == "POST") {
        newoptions.params = data || {};
      }
      useFetch<T>(url)
        .then((res) => {
          resolve(res as AsyncData<T, Error>);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  get<T = any>(url: string, params?: any, options?: UseFetchOptions<T>) {
    return this.request<T>(baseURL + url, "GET", params, options);
  }
  post<T = any>(url: string, data: any, options: UseFetchOptions<T>) {
    return this.request<T>(baseURL + url, "POST", data, options);
  }
}
export default new Hyrequest();
