import hyRequest from "./forum";
//查看轮播图
export const selectCarousel = ()=>{
    return hyRequest.request("/api/user/carousel/selectAllCarousel","GET")
}
//删除轮播图
export const deleteCarousel = (carouselId:number)=>{
    return hyRequest.request("/api/user/carousel/deleteCarousel","DELETE",{carouselId})
}
//添加轮播
export const addCarousel = (query: any, params: FormData) => {
    return hyRequest.request("/api/user/carousel/insertCarousel","POST", query, {
      body: params
    });
  };