import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import type { HomeStore, HomeStoreuser } from "~/types/Home";
import {
  GetHotnews,
  GetWrapper,
  Loginout,
  getAllblog,
  getUserinfo2,
} from "~/service/homeApi";
import { getLoginUser } from "~/service/user";
export const useHomestore = defineStore("home", {
  state(): HomeStore {
    return {
      header: {
        height: "1.8rem",
        backgroundColor: "transparent",
        color: "white",
        isSpread: true,
      },
      isRequireanim: true,
      user: {
        expiresIn: 0,
        refreshToken: "",
        token: "",
        tokenHead: "",
      },
      userinfo: {
        userId: 0,
        userAccount: "",
        userPassword: "",
        userName: "",
        userSexVal: null,
        userQq: "",
        userEmail: "",
        userPicture: "",
        userClass: "",
        userGrade: "",
        userBlog: "",
        roleId: 1, // 用户权限参数，1 大一，2大二，3大三，老师
        roleName: null,
        enabled: null,
        roles: null,
        authorities: [],
      },
      sendTime: {
        countdown: 0,
        CodeStatus: false,
        time: 0,
      },
      Allblog: {},
      Wrapper: [],
      HotNews: {
        records: [],
        total: 0,
        size: 0,
        current: 0,
        orders: [],
        hitCount: false,
        countId: "",
        maxLimit: "",
        searchCount: false,
        pages: 0,
      },
    };
  },
  actions: {
    //获取热点新闻
    async getHotnews(curIndex: number) {
      const res = await GetHotnews({ pageNo: curIndex, pageSize: 4 });
      console.log(res.data);
      this.HotNews = res.data.value.data || [];
    },
    async getWapper() {
      const res = await GetWrapper();
      this.Wrapper = res.data.value.data || [];
    },
    async ChangeHeader(headerType: any) {
      this.header = headerType;
    },
    async ChangeisRequireanim(flag: boolean) {
      this.isRequireanim = flag;
    },
    async Changeuserinfo(data: HomeStoreuser) {
      const tokeninfo = jwtDecode(data.token) as { user_name: string };
      const res = await getUserinfo2(tokeninfo.user_name);
      this.userinfo = res.data.value.data;
      this.user = data;
    },
    //更新userinfo
    async updateUserInfo() {
      const res = await getLoginUser();
      if (res.data.value.code === 20000) {
        this.userinfo = res.data.value.data;
      }
    },
    async exitlogin() {
      const res = await Loginout();
      console.log(res.data.value);
      this.user.token = "";
    },
    async updateblog() {
      const res = await getAllblog();
      this.Allblog = res.data.value.data;
    },
  },
  //持久化操作
  persist: true,
});
