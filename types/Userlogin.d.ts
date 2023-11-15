export interface loginparams {
  userAccount: string;
  userPassword: string;
}
export interface Emailparams {
  code: string;
  email: string;
}
export interface IResultData<T> {
  code: number;
  data: T;
}
export interface LoginRes {
  expiresIn: number;
  refreshToken: string;
  token: string;
  tokenHead: string;
}
export interface sendEmailparams {
  email: string;
  type: number;
}
