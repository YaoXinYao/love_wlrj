export interface Diskstore {
  AllType: Filetag2[];
  Filelist: Filelist;
  curIndex: number;
  Pagesize: number;
  Loading: boolean;
  curTag: Array<number>;
  Searchtext: string;
  Filelist2: Filelist;
  Pagesize2: number;
  Loading2: boolean;
  curIndex2: number;
  filequeue: File[];
}
//文件列表item
export interface Filelist {
  allPage: number;
  count: number;
  dataList: Fileprops[];
  index: number;
  pageSize: number;
}
export interface Filetag2 {
  value: number;
  label: string;
}
