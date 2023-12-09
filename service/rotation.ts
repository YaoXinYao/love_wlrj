import hyRequest from "./forum";
//查看轮播图
export const selectCarousel = () => {
  return hyRequest.request(
    "/zinfo/user/swagger/carousel/selectAllCarousel",
    "GET"
  );
};
//删除轮播图
export const deleteCarousel = (carouselId: number) => {
  return hyRequest.request(
    "/zinfo/user/swagger/carousel/deleteCarousel",
    "DELETE",
    { carouselId }
  );
};
//添加轮播
export const addCarousel = (query: any, params: FormData) => {
  return hyRequest.request(
    "/zinfo/user/swagger/carousel/insertCarousel",
    "POST",
    query,
    {
      body: params,
    }
  );
};
