import hyRequest from "../forum";
import type { IResultData } from "../forum";
import type {
  AddAccessType,
  MyObject,
  NoticeType,
  ScoreAddType,
} from "~/types/Access";
//获取所有类型
export const getAllTypesService = () => {
  return hyRequest.get<IResultData<any>>(`/api/assess/type/list`);
};

//根据id搜索类型
export const getTypesByIdService = (id: number) => {
  return hyRequest.get<IResultData<any>>(`/api/assess/type/get`, { id });
};

//添加类型
export const addAccessTypeService = (typeName: string) => {
  return hyRequest.post<IResultData<any>>(`/api/assess/type/add`, { typeName });
};

//删除类型
export const deleteTypeByIdService = (ids: Array<number | string>) => {
  return hyRequest.delete<IResultData<any>>(`/api/assess/type/delete`, "", {
    body: JSON.stringify(ids),
  });
};

//修改类型
export const updateTypeService = (props: {
  id: string | number;
  name: string;
}) => {
  return hyRequest.put<IResultData<any>>(`/api/assess/type/update`, {
    ...props,
  });
};

//添加考核
export const addAccessService = (props: AddAccessType) => {
  return hyRequest.post<IResultData<any>>(`/api/assess/studyPlan/add`, "", {
    body: JSON.stringify({ ...props }),
  });
};

//获取考核数据
export const getAllAccessService = (props: {
  name?: string;
  nodePage: number;
  pageSize: number;
  subscribers?: string;
  subscribersType?: string;
  type?: string;
}) => {
  console.log(props);

  return hyRequest.get<IResultData<any>>(`/api/assess/studyPlan/page`, {
    ...props,
  });
};

//删除考核
export const deleteAccessService = (ids: Array<number>) => {
  return hyRequest.delete<IResultData<any>>(`/api/assess/studyPlan/delete`, {
    ids,
  });
};

//添加某个考核的成绩
export const addAccessScore = (props: ScoreAddType) => {
  return hyRequest.post<IResultData<any>>(`/api/assess/grade/add`, "", {
    body: JSON.stringify(props),
  });
};

//获取某个考核的信息
export const getAccessInfo = (id: number) => {
  return hyRequest.get<IResultData<any>>(`/api/assess/studyPlan/select`, {
    id,
  });
};

//获取试卷模版
export const getTemplateService = (id: number) => {
  return hyRequest.get<IResultData<any>>(`/api/assess/templates/search`, {
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
    `/api/assess/grade/getGradeByStudentId`,
    props
  );
};

//删除成绩
export const deleteScoreService = (ids: Array<number>) => {
  return hyRequest.delete<IResultData<any>>(`/api/assess/grade/delete`, {
    ids,
  });
};

//添加面评
export const addInterviewService = (props: {
  content: string;
  PId: number;
  studentId: number | string;
}) => {
  return hyRequest.post<IResultData<any>>(`/api/assess/interview/add`, props);
};

//删除面评
export const deleteInterviewService = (ids: Array<number>) => {
  return hyRequest.delete<IResultData<any>>(`/api/assess/interview/delete`, {
    ids,
  });
};

//获得面评
export const getInterviewService = (props: { id: number; pId?: number }) => {
  return hyRequest.get<IResultData<any>>(`/api/assess/interview/list`, props);
};

//获得某个用户参与的所有面试
export const getUserInterviewService = (props: {
  nodePage: number;
  pageSize: number;
  id: number | string;
}) => {
  return hyRequest.get<IResultData<any>>(`/api/assess/interview/getPIds`, {
    ...props,
  });
};

//发送考核通知
export const sendAccessNoticeService = (props: NoticeType) => {
  return hyRequest.post<IResultData<any>>(`/api/assess/studyPlan/sendMessage`, {
    ...props,
  });
};
