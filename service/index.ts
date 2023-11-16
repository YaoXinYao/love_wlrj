import type { AsyncData, UseFetchOptions } from "nuxt/dist/app/composables";
type Methods = "GET" | "POST" | "put";
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
          "Authorization": Authtoken(),
          ...options?.headers,
        },
        ...options,
      };
      if (method == "GET") {
        newoptions.query = data || {};
      }
      if (method == "POST") {
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
  post<T = any>(url: string, data: any, options: UseFetchOptions<T>) {
    return this.request<T>(url, "POST", data, options);
  }
}
export default new Hyrequest();
