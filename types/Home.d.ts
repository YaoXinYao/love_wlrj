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
  userGrade?: string;
  userBlog?: string;
  groupName?: string;
  roleId?: number;
  roleName?: any;
}
