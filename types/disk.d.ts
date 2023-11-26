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
  down: {
    isOpen: boolean;
    downProgress: number;
    downSize: string;
    downSpend: string;
    downfile: string;
  };
}
export interface Fileprops {
  id: number;
  name: string;
  format: string;
  types: string[];
  uploaderId: number;
  url: string;
  collections: number;
  isPublic: any;
  uploadDate: string;
  uploadName: string;
  is_collection: number;
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
export interface uploadfileType {
  fileTypeIdList: number[];
  uploaderId: number;
  uploadName: string;
  md5: string;
}
//取消收藏文件
export interface unCollectType {
  fileId: number;
}
