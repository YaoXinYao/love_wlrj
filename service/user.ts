import hyRequest from "./forum";
export const getUserInfo = (id: number) => {
  return hyRequest.request("/zinfo/user/user/getUserById","GET", { id });
};
