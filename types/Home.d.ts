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
  Wrapper: WrapperType[];
  HotNews: NewsRoot;
}
//轮播图信息
export interface WrapperType {
  carouselId: number;
  carouselTitle: string;
  carouselContent: string;
  carouselUrl: string;
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
export interface Filelist {
  allPage: number;
  count: number;
  dataList: Fileprops[];
  index: number;
  pageSize: number;
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
  uploadName: string;
  is_collection: number;
}
//标签类型
export interface Filetag {
  typeId: number;
  typeName: string;
}
export interface Filetag2 {
  value: number;
  label: string;
}
//获取文件列表参数
export interface Filelistprops {
  index: number;
  pageSize: number;
}
//标签筛选参数
export interface Tagparams {
  index: number;
  pageSize: number;
  types: string;
}
//查询新闻
export interface Hotnews {
  pageNo: number;
  pageSize: number;
}
export interface NewsRoot {
  records: Record[];
  total: number;
  size: number;
  current: number;
  orders: any[];
  hitCount: boolean;
  countId: any;
  maxLimit: any;
  searchCount: boolean;
  pages: number;
}

export interface Record {
  newsId: number;
  newsTitle: string;
  newsContent: string;
  newsImg: string;
  newsTime: string;
}
