export interface Scollactive {
  height: string;
  backgroundColor: string;
  color?: string;
  isSpread: boolean;
}
export interface Newstype {
  imgsrc?: string;
  title: string;
  descid: any;
  time: string;
}
export interface blogRoot {
  data: {
    [key: string]: blogitem[];
  };
}
interface blogitem {
  [key: string]: item[];
}
interface item {
  userId?: number;
  userAccount?: string;
  userName?: string;
  userQq?: string;
  userSexVal?: string;
  userEmail?: string;
  userPicture?: string;
  userClass?: string;
  groupId?: number;
  userGrade?: string;
  userBlog?: string;
  groupName?: string;
  roleId?: number;
  roleName?: any;
}
export type FileTyperoot =
  | "gif"
  | "mkv"
  | "rar"
  | "pdf"
  | "docx"
  | "ppt"
  | "zip"
  | "exe"
  | "doc"
  | "jpg"
  | "png"
  | "html"
  | "xlsx"
  | "mp4"
  | "7z"
  | "other"
  | "txt"
  | "yml"
  | "js"
  | "css";

export interface Headertype {
  height: string;
  backgroundColor: string;
  color: string;
  isSpread: boolean;
}
export interface HomeStore {
  header: Headertype;
  isRequireanim: boolean;
  user: HomeStoreuser;
  userinfo: Homestoreuserinfo;
  sendTime: {
    countdown: number;
    CodeStatus: boolean;
    time: number;
  };
  Allblog: {
    [key: string]: blogitem[];
  };
}
export interface HomeStoreuser {
  expiresIn: number;
  refreshToken: string;
  token: string;
  tokenHead: string;
}
export interface Homestoreuserinfo {
  userId: number;
  userAccount: string;
  userPassword: string;
  userName: any;
  userSexVal: any;
  userQq: string;
  userEmail: string;
  userPicture: string;
  userClass: string;
  userGrade: string;
  userBlog: string;
  roleId: any;
  enabled: any;
  roleName: any;
  roles: any;
  authorities: any;
}
//文件列表item
export interface Fileprops {
  id: number;
  name: string;
  format: string;
  types: string[];
  uploaderId: number;
  url: string;
  collections: number;
  isPublic: any;
  uploadDate: string;
}
