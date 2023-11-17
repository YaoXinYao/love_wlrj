import hyRequest from "../forum";
import type { IResultData } from "../forum";
const BASEURL = "http://124.222.153.56:19591";
//添加课表
export const addTimetable = (props: {
  courseBeginDate: string;
  courseEndDate: string;
  courseIsDouble: boolean;
  courseIsDelete: boolean;
  courseName: string;
  courseOrder: number;
  courseUserId: string;
  courseWeek: number;
}) => {
  console.log("我是数据", props);
  return hyRequest.post<IResultData<any>>(`/check/course-manage/createCourse`, {
    ...props,
  });
};

//修改课表
export const updateTimetable = (props: {
  courseBeginDate: string;
  courseEndDate: string;
  courseIsDouble: boolean;
  courseIsDelete: boolean;
  courseName: string;
  courseOrder: number;
  courseUserId: string;
  courseWeek: number;
}) => {
  return hyRequest.put<IResultData<any>>(`/check/course-manage/updateCourse`, {
    ...props,
  });
};

//获取某人的课表
export const getTimetable = (userId: string) => {
  return hyRequest.get<IResultData<any>>(
    `/check/course-manage/getPersonAllCourse`,
    {
      userId,
    }
  );
};

//删除课程
export const deleteTimetable = (id: string) => {
  return hyRequest.delete<IResultData<any>>(
    `/check/course-manage/deleteCourse`,
    {
      id,
    }
  );
};

//修改用户基本信息
export const updateUserSelfInformation = (props: {
  blog: string;
  email: string;
  qq: string;
}) => {
  return hyRequest.put<IResultData<any>>(
    `/coustom/user/user/updateSelfInformation`,
    {
      ...props,
    }
  );
};

//获取当前登录用户
export const getLoginUser = () => {
  return hyRequest.get<IResultData<any>>(`/coustom/user/user/getLoginUser`);
};

//发送验证码（type为0是登陆，1是修改密码）
export const sendEmail = (props: { email: string; type: number }) => {
  return hyRequest.post<IResultData<any>>(`/coustom/user/user/sendEmail`, {
    ...props,
  });
};

//修改密码
export const updateUserPassword = (props: {
  againPassword: string;
  code: string;
  email: string;
  newPassword: string;
}) => {
  return hyRequest.put<IResultData<any>>(`/coustom/user/user/updatePassword`, {
    ...props,
  });
};
