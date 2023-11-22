import type { UpdatePassType, UserBaseInfoType } from "~/types/User";
import hyRequest from "../forum";
import type { IResultData } from "../forum";
import type { CourseType } from "~/types/Course";
import type { AddAccessType, MyObject } from "~/types/Access";
const BASEURL = "http://124.222.153.56:19591";
//添加课表
export const addTimetable = (props: CourseType) => {
  console.log("我是数据", props);
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

//获取所有类别
export const getAllTypes = () => {
  return hyRequest.get<IResultData<any>>(`/access/type/list`);
};

//添加考核
export const addAccessService = (props: AddAccessType) => {
  // let obj: MyObject = props;
  // for (let i = 0; i < props.types.length; i++) {
  //   obj[`types[${i}].name`] = props.types[i].name;
  //   obj[`types[${i}].rate`] = props.types[i].rate;
  // }
  // delete obj["types"];
  let types = JSON.parse(JSON.stringify(props.types));
  let obj = { ...props, types };
  console.log(JSON.stringify(obj));
  console.log(JSON.stringify(props));

  return hyRequest.post<IResultData<any>>(`/access/studyPlan/add`, "", {
    body: {
      studyPlanDto: JSON.stringify(props),
    },
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
