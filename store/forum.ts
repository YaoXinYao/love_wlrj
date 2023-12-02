import { defineStore } from "pinia";
import {
  getLabel,
  postLabel,
  deleteLabel,
  getSubfield,
  postSubfield,
  deleteSubfield,
} from "~/service/forums/admin";
import {
  addpost,
  getPost,
  judgeLike,
  singlePost,
  getComment,
  postComment,
  deleteComment,
  likeComment,
  getKeep,
  deletePost,
} from "~/service/forums/card";
import { getUserInfo } from "~/service/staff";
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
  pages: number;
  datas: any[];
  discuss: any[];
  singleData: any;
  total: number;
  loadings: boolean;
}
export interface forums {
  labelModel: boolean;
  subfieldModel: boolean;
  lookModel: boolean;
  deleteModel: boolean;
  labels: label[];
  subfields: subfield[];
  mdatas: any;
  mtotal: number;
  postInfos: any;
  deleteId: number[];
  loading: boolean;
  currentPage: number;
}
export const forumStore = defineStore("forumInfo", {
  state: (): cards => {
    return {
      postSubId: 0,
      postSource: "",
      pages: 0,
      datas: [],
      discuss: [],
      singleData: {},
      total: 0,
      loadings: false,
    };
  },
  actions: {
    //用于发帖查询用户信息
    async selectUser(id: number) {
      const { data } = await getUserInfo(id);
      return data.value?.data;
    },
    //收藏/点赞帖子
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
    // 发布帖子
    async addCard(query: any, params: FormData) {
      const { data } = await addpost(query, params);
      const code = data.value?.code;
      return code;
    },
    //主页查询帖子
    async selectPost(
      userId: any,
      pageNo: number,
      pageSize: number,
      postTitle?: string,
      postSubId?: number,
      postContent?: string,
      postUserId?: number
    ) {
      this.loadings = true;
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
      let h = 0;
      for (let i = 0; i < dataArr.length; i++) {
        //查询用户
        const use = await this.selectUser(dataArr[i].postUserId);
        if (use == null) {
          continue;
        } else {
          let userName = use.userName;
          let head =
            use.userPicture == "未设置"
              ? "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201912%2F26%2F20191226135004_nW4Jc.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698651724&t=05cf56641aeb49efcb3ac3375dc04390"
              : use.userPicture;
          const { postImg, ...postData } = dataArr[i];
          let img: string = dataArr[i].postImg;
          //分割图片
          let photos: string[] = img ? img.split(",") : [];
          let likes = false;
          let collect = false;
          //判断用户是否点赞
          const result = await this.addlike(
            dataArr[i].postId,
            0,
            "Like",
            userId
          );
          if (result == 20000) {
            likes = true;
            await this.addlike(dataArr[i].postId, 1, "Like", userId);
          }
          //判断用户是否收藏
          const res = await this.addlike(
            dataArr[i].postId,
            0,
            "Collect",
            userId
          );
          if (res == 20000) {
            collect = true;
            await this.addlike(dataArr[i].postId, 1, "Collect", userId);
          }
          this.datas[h] = {
            ...postData,
            photos,
            userName,
            head,
            likes,
            collect,
          };
          h++;
        }
      }
      this.loadings = false;
      return this.datas;
    },
    //用户查询自己发布过的帖子
    async userPosts(
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
      this.total = data.value?.data.total || 0;
      let dataArr = data.value?.data.records || [];
      let userDatas = [];
      if (dataArr.length != 0) {
        for (let i = 0; i < dataArr.length; i++) {
          const { postImg, ...postDataWithoutImg } = dataArr[i];
          let img: string = dataArr[i].postImg;
          let photos: string[] = img ? img.split(",") : [];
          userDatas[i] = { ...postDataWithoutImg, photos };
        }
      }
      return userDatas;
    },
    //查询自己收藏或点赞的帖子
    async getKeeps(
      idType: string,
      pageNo: number,
      pageSize: number,
      type: string,
      userId?: number,
      postId?: number
    ) {
      let { data } = await getKeep(
        idType,
        pageNo,
        pageSize,
        type,
        userId,
        postId
      );
      if (data.value?.code == 53004) {
        return [];
      } else {
        let dataAll = data.value?.data.records || [];
        let selectKeeps = [];
        if (dataAll.length != 0) {
          for (let i = 0; i < dataAll.length; i++) {
            let { postId, ...postData } = dataAll[i];
            let res = await singlePost(postId);
            let datass = res.data.value?.data;
            const { postImg, ...postDataWithoutImg } = datass;
            let img: string = postImg;
            let photos: string[] = img ? img.split(",") : [];
            selectKeeps[i] = { ...postDataWithoutImg, photos, ...postData };
          }
        }
        return selectKeeps;
      }
    },
    //查询单个帖子
    async getSingle(postId: number, userId: any) {
      const { data } = await singlePost(postId);
      let single = data.value?.data || {};
      const { postImg, ...postData } = single;
      let img: string = single.postImg;
      //分割图片
      let photos: string[] = img ? img.split(",") : [];
      let likes = false;
      let collect = false;
      //判断用户是否点赞
      const result = await this.addlike(single.postId, 0, "Like", userId);
      if (result == 20000) {
        likes = true;
        await this.addlike(single.postId, 1, "Like", userId);
      }
      //判断用户是否收藏
      const res = await this.addlike(single.postId, 0, "Collect", userId);
      if (res == 20000) {
        collect = true;
        await this.addlike(single.postId, 1, "Collect", userId);
      }
      //查询发帖者
      const use = await this.selectUser(single.postUserId);
      let userName = use.userName;
      let head =
        use.userPicture == "未设置"
          ? "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201912%2F26%2F20191226135004_nW4Jc.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698651724&t=05cf56641aeb49efcb3ac3375dc04390"
          : use.userPicture;
      Object.assign(this.singleData, {
        ...postData,
        photos,
        userName,
        head,
        likes,
        collect,
      });
    },
    //删除帖子
    async deletePosts(ids: number[]) {
      let { data } = await deletePost(ids);
      const code = data.value?.code;
      return code;
    },
    //查询指定帖子下面的评论
    async selectComment(postId: number, userId: any) {
      let { data } = await getComment(postId);
      this.discuss = [];
      let comData = data.value?.data;
      let k = 0;
      if (comData != null) {
        for (let i = 0; i < comData.length; i++) {
          let user = await this.selectUser(comData[i].comUserId);
          if (user == null) {
            continue;
          } else {
            let comUserName = user.userName;
            let head =
              user.userPicture == "未设置"
                ? "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201912%2F26%2F20191226135004_nW4Jc.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698651724&t=05cf56641aeb49efcb3ac3375dc04390"
                : user.userPicture;
            const { comImg, ...comInfo } = comData[i];
            let img = comData[i].comImg;
            let photos = img ? img.split(",") : [];
            let likes = false;
            const result = await this.LikesComment(comData[i].comId, 0, userId);
            if (result == 20000) {
              likes = true;
              await this.LikesComment(comData[i].comId, 1, userId);
            }
            this.discuss[k] = { ...comInfo, comUserName, head, photos, likes };
            if (comData[i].children.length != 0) {
              this.discuss[k].children = [];
              let m = 0;
              for (let j = 0; j < comData[i].children.length; j++) {
                let cuser = await this.selectUser(
                  comData[i].children[j].comUserId
                );
                if (cuser == null) {
                  continue;
                } else {
                  let comUserName = cuser.userName;
                  const { comImg, ...comInfos } = comData[i].children[j];
                  let img = comData[i].children[j].comImg;
                  let photos = img ? img.split(",") : [];
                  let likes = false;
                  const result = await this.LikesComment(
                    comData[i].children[j].comId,
                    0,
                    userId
                  );
                  if (result == 20000) {
                    likes = true;
                    await this.LikesComment(
                      comData[i].children[j].comId,
                      1,
                      userId
                    );
                  }
                  let head =
                    cuser.userPicture == "未设置"
                      ? "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201912%2F26%2F20191226135004_nW4Jc.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698651724&t=05cf56641aeb49efcb3ac3375dc04390"
                      : cuser.userPicture;
                  this.discuss[k].children[m] = {
                    ...comInfos,
                    comUserName,
                    head,
                    photos,
                    likes,
                  };
                  m++;
                }
              }
            }
            k++;
          }
        }
      }
    },
    //发布评论
    async addComment(query: any, params: FormData) {
      let { data } = await postComment(query, params);
      const code = data.value?.code;
      return code;
    },
    //删除评论
    async deleteComments(ids: number[]) {
      let { data } = await deleteComment(ids);
      const code = data.value?.code;
      return code;
    },
    //点赞评论
    async LikesComment(comId: number, status: number, userId: number) {
      let { data } = await likeComment(comId, status, userId);
      const code = data.value?.code;
      return code;
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
      mdatas: [],
      mtotal: 0,
      postInfos: {},
      deleteId: [],
      loading: false,
      currentPage: 1,
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
      return code;
    },
    //删除标签
    async labelDelete(ids: any) {
      const { data } = await deleteLabel(ids);
      const code = data.value?.code;
      return code;
    },
    async subfieldInfo(pageNo: number, pageSize: number, subfieldId?: number) {
      const { data } = await getSubfield(pageNo, pageSize, subfieldId);
      this.subfields = data.value?.data.records || [];
    },
    async addSubfield(subName: string) {
      const { data } = await postSubfield(subName);
      const code = data.value?.code;
      return code;
    },
    async subfieldDelete(ids: any) {
      const { data } = await deleteSubfield(ids);
      const code = data.value?.code;
      return code;
    },
    //用于查询发帖用户信息
    async getUser(id: number) {
      const { data } = await getUserInfo(id);
      return data.value?.data;
    },
    //查询帖子
    async getPosts(
      pageNo: number,
      pageSize: number,
      postTitle?: string,
      postSubId?: number,
      postContent?: string,
      postUserId?: number
    ) {
      this.loading = true;
      const { data } = await getPost(
        pageNo,
        pageSize,
        postTitle,
        postSubId,
        postContent,
        postUserId
      );
      this.mtotal = data.value?.data.total;
      this.mdatas = [];
      let dataArr = data.value?.data.records || [];
      for (let i = 0; i < dataArr.length; i++) {
        const { postImg, ...postData } = dataArr[i];
        let img: string = dataArr[i].postImg;
        //分割图片
        let photos: string[] = img ? img.split(",") : [];
        //查询用户
        const use = await this.getUser(dataArr[i].postUserId);
        let userName = use.userName;
        //查询分栏
        const { data } = await getSubfield(1, 1, dataArr[i].postSubId);
        if (data.value?.data.records.length == 0) {
          const subName = "暂无";
          this.mdatas[i] = { ...postData, userName, subName, photos };
        } else {
          const subName = data.value?.data.records[0].subName;
          this.mdatas[i] = { ...postData, userName, subName, photos };
        }
      }
      this.loading = false;
    },
    //删除帖子
    async deletePosts(ids: number[]) {
      let { data } = await deletePost(ids);
      return data.value?.code;
    },
  },
});
