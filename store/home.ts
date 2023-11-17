import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import type { HomeStore, HomeStoreuser } from "~/types/Home";
import { getUserinfo2 } from "~/service/homeApi";
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
    };
  },
  actions: {
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
  },
  //持久化操作
  persist: true,
});
