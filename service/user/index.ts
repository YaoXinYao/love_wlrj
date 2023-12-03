import type { UpdatePassType, UserBaseInfoType } from "~/types/User";
import hyRequest from "../forum";
import type { IResultData } from "../forum";
import type { CourseType } from "~/types/Course";
import type { AddAccessType, MyObject, ScoreAddType } from "~/types/Access";
const BASEURL = "http://124.222.153.56:19591";
//添加课表
export const addTimetable = (props: CourseType) => {
  return hyRequest.post<IResultData<any>>(`/check/course-manage/createCourse`, {
    ...props,
  });
};

//修改课表
export const updateTimetable = (props: CourseType) => {
  return hyRequest.put<IResultData<any>>(`/check/course-manage/updateCourse`, {
    ...props,
  });
};

//获取某人的课表
export const getTimetable = (userId: number) => {
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
export const updateUserSelfInformation = (props: UserBaseInfoType) => {
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

//通过id获取某个用户信息
export const getUserInfoById = (id: number) => {
  return hyRequest.get<IResultData<any>>("/coustom/user/user/getUserById", {
    id,
  });
};

//通过账号查询用户
export const getUserInfoByAccount = (account: string) => {
  return hyRequest.get<IResultData<any>>(
    "/coustom/user/user/getLoginUserByPassword",
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
  return hyRequest.get<IResultData<any>>("/coustom/user/user/selectUser", {
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
  return hyRequest.get<IResultData<any>>("/coustom/user/user/selectAllUser", {
    ...props,
  });
};

//修改密码
export const updateUserPassword = (props: UpdatePassType) => {
  return hyRequest.put<IResultData<any>>(`/coustom/user/user/updatePassword`, {
    ...props,
  });
};

//修改头像
export const updateUserAvatar = (file: any) => {
  return hyRequest.put<IResultData<any>>(
    `/coustom/user/user/updatePictureSelf`,
    { file: file }
  );
};

//获取所有年级
export const getAllGrade = () => {
  return hyRequest.get<IResultData<any>>(`/coustom/user/user/selectAllGrade`);
};

//获取所有类型
export const getAllTypesService = () => {
  return hyRequest.get<IResultData<any>>(`/access/type/list`);
};

//根据id搜索类型
export const getTypesByIdService = (id: number) => {
  return hyRequest.get<IResultData<any>>(`/access/type/get`, { id });
};

//添加类型
export const addAccessTypeService = (typeName: string) => {
  return hyRequest.post<IResultData<any>>(`/access/type/add`, { typeName });
};

//删除类型
export const deleteTypeByIdService = (ids: Array<number | string>) => {
  return hyRequest.delete<IResultData<any>>(`/access/type/delete`, "", {
    body: JSON.stringify(ids),
  });
};

//修改类型
export const updateTypeService=(props:{id:string|number,name:string})=>{
  return hyRequest.put<IResultData<any>>(`/access/type/update`, { ...props });
}

//添加考核
export const addAccessService = (props: AddAccessType) => {
  console.log({ ...props });
  return hyRequest.post<IResultData<any>>(`/access/studyPlan/add`, "", {
    body: JSON.stringify({ ...props }),
  });
};

//获取考核数据
export const getAllAccessService = (props: {
  name?: string;
  nodePage: number;
  pageSize: number;
}) => {
  return hyRequest.get<IResultData<any>>(`/access/studyPlan/page`, {
    ...props,
  });
};

//删除考核
export const deleteAccessService = (ids: Array<number>) => {
  return hyRequest.delete<IResultData<any>>(`/access/studyPlan/delete`, {
    ids,
  });
};

//添加某个考核的成绩
export const addAccessScore = (props: ScoreAddType) => {
  return hyRequest.post<IResultData<any>>(`/access/grade/add`, "", {
    body: JSON.stringify(props),
  });
};

//获取某个考核的信息
export const getAccessInfo = (id: number) => {
  return hyRequest.get<IResultData<any>>(`/access/studyPlan/select`, { id });
};

//获取试卷模版
export const getTemplateService = (id: number) => {
  return hyRequest.get<IResultData<any>>(`/access/templates/search`, {
    id,
  });
};

//获取某次考核用户的成绩
export const getScoreByAccessService = (props: {
  nodePage: number;
  pageSize: number;
  pId?: number;
  studentId?: number;
}) => {
  return hyRequest.get<IResultData<any>>(
    `/access/grade/getGradeByStudentId`,
    props
  );
};

//删除成绩
export const deleteScoreService = (ids: Array<number>) => {
  return hyRequest.delete<IResultData<any>>(`/access/grade/delete`, {
    ids,
  });
};

//添加面评
export const addInterviewService = (props: {
  content: string;
  PId: number;
  studentId: number | string;
}) => {
  return hyRequest.post<IResultData<any>>(`/access/interview/add`, props);
};

//删除面评
export const deleteInterviewService = (ids: Array<number>) => {
  console.log(ids);

  return hyRequest.delete<IResultData<any>>(`/access/interview/delete`, {
    ids,
  });
};

//获得面评
export const getInterviewService = (props: { id: number; pId?: number }) => {
  return hyRequest.get<IResultData<any>>(`/access/interview/list`, props);
};
