export interface UserBaseInfoType {
  blog: string;
  email: string;
  qq: string;
}

export interface UpdatePassType {
  againPassword: string;
  code: string;
  email: string;
  newPassword: string;
}
export interface UserAllInfoType {
  userId: number;
  userAccount: string;
  userName: string;
  userSexVal: string;
  userQq: string;
  userEmail: string;
  userPicture: string;
  userClass: string;
  userGrade: string;
  userBlog: string;
  groupId: number;
  groupName: string;
  roleId: number;
  roleName: string;
  interviewList?: Array<InterviewType> | null;
}

export interface InterviewType {
  id: number;
  studentId: number;
  interviewterId: number;
  comment: string;
  createTime: string;
  updateTime: string | null;
  pid: number;
}
