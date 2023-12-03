import { number } from "echarts";
export interface AccessTypesType {
  id: number;
  typeName: string;
  createTime: string;
}

//添加考核
export interface AddAccessType {
  additional: string;
  deadline: string;
  plan: string;
  subscribers: string;
  type: string;
  typeId: number | undefined;
  types?: Array<AccessItem>;
}

export interface MyObject {
  [key: string]: any;
}

export interface AccessItem {
  name: string;
  rate: number;
  score?: number;
}

export interface AccessResInfoType {
  additional: string;
  createTime: string;
  deadline: string;
  id: number;
  plan: string;
  publisher: number;
  publisherName?: string;
  subscribers: string;
  type: string;
  typeId: number | null;
  typeName?: string;
  updateTime: string | null;
  sonTable?: Array<any>;
  managePageInfo: ?any;
  scoreList?: any;
  templates?: any;
}

export interface AccessPageInfoType {
  currentPage: number;
  pageSize: number;
  total: number;
}
export interface AccessStoreType {
  managePageInfo: { currentPage: number; pageSize: number; total: number };
  manageSearchKey: string;
  selfWrittenPageInfo: { currentPage: number; pageSize: number; total: number };
  selfInterviewPageInfo: { currentPage: number; pageSize: number; total: number };
  selfSearchKey: string;
}

export interface ScoreType {
  name: string;
  score: number | undefined;
}

export interface ScoreAddType {
  pid: number;
  scores: Array<ScoreType>;
  studentId: string;
}

export interface ScorePageInfoListType {
  pageSize: number;
  current: number;
  total: number;
}

// export interface ScoreListType {
//   id: number;
//   studentId: number;
//   scores: Array<ScoreType>;
//   pid: number;
// }

//考核类型的接口返回类型
export interface TypesType {
  id: number;
  typeName: string;
  createTime: string;
}
