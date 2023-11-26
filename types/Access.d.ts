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
  types: Array<AccessItem>;
}

export interface MyObject {
  [key: string]: any;
}

export interface AccessItem {
  name: string;
  rate: number;
}

export interface AccessResInfoType {
  additional: string;
  createTime: string;
  deadline: string;
  id: number;
  plan: string;
  publisher: number;
  publisherName?: string;
  subscribers: number;
  type: string;
  typeId: number | null;
  updateTime: string | null;
  sonTable: Array<any>;
}

export interface AccessPageInfoType {
  currentPage: number;
  pageSize: number;
  total: number;
}
export interface AccessStoreType {
  pageInfo: { currentPage: number; pageSize: number; total: number };
  searchKey: string;
}

export interface ScoreType {
  name: string;
  score: number;
}

export interface ScoreAddType {
  pid: number;
  scores: Array<ScoreType>;
  studentId: number;
}
