import type { UpdatePassType, UserBaseInfoType } from "~/types/User";
import hyRequest from "../forum";
import type { IResultData } from "../forum";
import type { CourseType } from "~/types/Course";
//添加课表
export const addTimetable = (props: CourseType) => {
  return hyRequest.post<IResultData<any>>(
    `/api/attendance/course-manage/createCourse`,
    {
      ...props,
    }
  );
};

//修改课表
export const updateTimetable = (props: CourseType) => {
  return hyRequest.put<IResultData<any>>(
    `/api/attendance/course-manage/updateCourse`,
    {
      ...props,
    }
  );
};

//获取某人的课表
export const getTimetable = (userId: number) => {
  return hyRequest.get<IResultData<any>>(
    `/api/attendance/course-manage/getPersonAllCourse`,
    {
      userId,
    }
  );
};

//删除课程
export const deleteTimetable = (id: string) => {
  return hyRequest.delete<IResultData<any>>(
    `/api/attendance/course-manage/deleteCourse`,
    {
      id,
    }
  );
};

//修改用户基本信息
export const updateUserSelfInformation = (props: UserBaseInfoType) => {
  return hyRequest.put<IResultData<any>>(
    `/api/user/user/updateSelfInformation`,
    {
      ...props,
    }
  );
};

//获取当前登录用户
export const getLoginUser = () => {
  return hyRequest.get<IResultData<any>>(`/api/user/user/getLoginUser`);
};

//发送验证码（type为0是登陆，1是修改密码）
export const sendEmail = (props: { email: string; type: number }) => {
  return hyRequest.post<IResultData<any>>(`/api/user/user/sendEmail`, {
    ...props,
  });
};

//通过id获取某个用户信息
export const getUserInfoById = (id: number) => {
  return hyRequest.get<IResultData<any>>("/api/user/user/getUserById", {
    id,
  });
};

//通过账号查询用户
export const getUserInfoByAccount = (account: string) => {
  return hyRequest.get<IResultData<any>>(
    "/api/user/user/getLoginUserByPassword",
    {
      account,
    }
  );
};

//通过年级查询用户(不分页)
export const searchUserByGradeService = (
  userGrade: string | number,
  userName?: string
) => {
  return hyRequest.get<IResultData<any>>("/api/user/user/selectUser", {
    userGrade,
    userName,
  });
};

//条件查询用户（分页）
export const searchUserervice = (props: {
  pageNo: number;
  pageSize: number;
  userGrade: number | string;
}) => {
  return hyRequest.get<IResultData<any>>("/api/user/user/selectAllUser", {
    ...props,
  });
};

//获得用户所有组别
export const getAllGroupsService = () => {
  return hyRequest.get<IResultData<any>>("/api/user/group/selectAllGroup");
};

//根据年级与组别获取用户
export const getUserByGradeAndGroupService = (props: {
  userGrade?: number;
  groupId?: number | string;
  pageNo?: number;
  pageSize?: number;
  search?: string;
}) => {
  console.log(props);

  return hyRequest.get<IResultData<any>>("/api/user/user/selectAllUser", {
    ...props,
  });
};

//修改密码
export const updateUserPassword = (props: UpdatePassType) => {
  return hyRequest.put<IResultData<any>>(`/api/user/user/updatePassword`, {
    ...props,
  });
};

//修改头像
export const updateUserAvatar = (file: any) => {
  return hyRequest.put<IResultData<any>>(`/api/user/user/updatePictureSelf`, {
    file: file,
  });
};

//获取所有年级
export const getAllGrade = () => {
  return hyRequest.get<IResultData<any>>(`/api/user/user/selectAllGrade`);
};

//是否可以修改课表
export const getIsEditCourseService = () => {
  return hyRequest.get<IResultData<any>>(
    `/api/attendance/course-manage/getModifyCourse`
  );
};
