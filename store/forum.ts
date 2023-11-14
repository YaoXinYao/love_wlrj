import { defineStore } from "pinia";
import {
  getLabel,
  postLabel,
  deleteLabel,
  getSubfield,
  postSubfield,
  deleteSubfield,
} from "~/service/forums/admin";
import { addpost, getPost, judgeLike, singlePost } from "~/service/forums/card";
export interface label {
  labelId: number;
  labelName: string;
}
export interface subfield {
  subId: number;
  subName: string;
}
export interface singleType {
  collect: boolean;
  head: string;
  likes: boolean;
  photos: string[];
  postCollect: number;
  postContent: string;
  postId: number;
  postLike: number;
  postSubId: number;
  postTime: string;
  postTitle: string;
  postUserId: number;
  postView: number;
  userName: string;
}
export interface cards {
  postSubId: number;
  postSource: string;
  uploadRender: boolean;
  pages: number;
  datas: any[];
  discuss: any[];
  singleData: any;
}
export interface forums {
  labelModel: boolean;
  subfieldModel: boolean;
  lookModel: boolean;
  deleteModel: boolean;
  labels: label[];
  subfields: subfield[];
}
export const forumStore = defineStore("forumInfo", {
  state: (): cards => {
    return {
      postSubId: 0,
      postSource: "",
      uploadRender: false,
      pages: 0,
      datas: [],
      discuss: [],
      singleData: {},
    };
  },
  actions: {
    // 发布帖子
    async addCard(params: FormData) {
      const { data } = await addpost(params);
      const code = data.value?.code;
      return code;
    },

    //查询帖子
    async selectPost(
      pageNo: number,
      pageSize: number,
      postTitle?: string,
      postSubId?: number,
      postContent?: string,
      postUserId?: number
    ) {
      const { data } = await getPost(
        pageNo,
        pageSize,
        postTitle,
        postSubId,
        postContent,
        postUserId
      );
      this.pages = data.value?.data.pages;
      this.datas = [];
      let dataArr = data.value?.data.records || [];
      for (let i = 0; i < dataArr.length; i++) {
        const { postImg, ...postData } = dataArr[i];
        let img: string = dataArr[i].postImg;
        //分割图片
        let photos: string[] = img ? img.split(",") : [];
        let likes = false;
        let collect = false;
        //判断用户是否点赞
        const result = await this.addlike(dataArr[i].postId, 1, "Like", 1);
        if (result == 20000) {
          await this.addlike(dataArr[i].postId, 0, "Like", 1);
        } else if (result == 53003) {
          likes = true;
        }
        //判断用户是否收藏
        const res = await this.addlike(dataArr[i].postId, 1, "Collect", 1);
        if (res == 20000) {
          await this.addlike(dataArr[i].postId, 0, "Collect", 1);
        } else if (res == 53003) {
          collect = true;
        }
        let userName = "迷雾";
        let head =
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201912%2F26%2F20191226135004_nW4Jc.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698651724&t=05cf56641aeb49efcb3ac3375dc04390";
        this.datas[i] = { ...postData, photos, userName, head, likes, collect };
      }
      return this.datas;
    },

    //收藏/点赞
    async addlike(
      postId: number,
      status: number,
      type: string,
      userId: number
    ) {
      const { data } = await judgeLike(postId, status, type, userId);
      const code = data.value?.code;
      return code;
    },

    //查询单个帖子
    async getSingle(postId: number) {
      const { data } = await singlePost(postId);
      let single = data.value?.data || {};
      const { postImg, ...postData } = single;
      let img: string = single.postImg;
      //分割图片
      let photos: string[] = img ? img.split(",") : [];
      let likes = false;
      let collect = false;
      //判断用户是否点赞
      const result = await this.addlike(single.postId, 1, "Like", 1);
      if (result == 20000) {
        await this.addlike(single.postId, 0, "Like", 1);
      } else if (result == 53003) {
        likes = true;
      }
      //判断用户是否收藏
      const res = await this.addlike(single.postId, 1, "Collect", 1);
      if (res == 20000) {
        await this.addlike(single.postId, 0, "Collect", 1);
      } else if (res == 53003) {
        collect = true;
      }
      let userName = "迷雾";
      let head =
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201912%2F26%2F20191226135004_nW4Jc.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698651724&t=05cf56641aeb49efcb3ac3375dc04390";

      Object.assign(this.singleData, {
        ...postData,
        photos,
        userName,
        head,
        likes,
        collect,
      });
    },
  },
});
export const forumManage = defineStore("manage", {
  state: (): forums => {
    return {
      labelModel: false,
      subfieldModel: false,
      lookModel: false,
      deleteModel: false,
      labels: [],
      subfields: [],
    };
  },
  actions: {
    //获取标签
    async labelInfo(pageNo: number, pageSize: number) {
      const { data } = await getLabel(pageNo, pageSize);
      this.labels = data.value?.data.records || [];
    },
    //添加标签
    async addLabel(name: string) {
      const { data } = await postLabel(name);
      const code = data.value?.code;
      console.log("标签", data);

      return code;
    },
    //删除标签
    async labelDelete(ids: number) {
      const { data } = await deleteLabel(ids);
      const code = data.value?.code;
      return code;
    },

    async subfieldInfo(pageNo: number, pageSize: number) {
      const { data } = await getSubfield(pageNo, pageSize);
      this.subfields = data.value?.data.records || [];
    },
    async addSubfield(subName: string) {
      const { data } = await postSubfield(subName);
      const code = data.value?.code;
      return code;
    },
    async subfieldDelete(ids: number) {
      const { data } = await deleteSubfield(ids);
      const code = data.value?.code;
      return code;
    },
  },
});
