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
  uploadProps: {
    uploadFileTotalByte: number;
    alreadyByte: number;
    HavePassed: string[];
    curUpFile: {
      File: File | null; //当前正在传输的文件信息，
      ParseMd5: boolean; //是否正在检索文件
      FileUpSpend: number; // 当前下上传速度
      upedChunk: number; //正在上传的分片
    };
  };
  Mylove: {
    Search?: string;
    curIndex: number;
    PageSize: number;
    Loading: boolean;
    FileList: Filelist;
  };
  Myfile: {
    Search?: string;
    SearchItem: Fileprops[];
    curIndex: number;
    PageSize: number;
    Loading: boolean;
    FileList: Filelist;
  };
  Diskinfo: {
    diskFileNumber: number;
    diskFileSize: string;
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
  isPublic: string;
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
//MessageType
export interface MessageType {
  collections: number;
  fileSize: string;
  format: string;
  id: number;
  isPublic: string;
  is_collection: number;
  name: string;
  types: string[];
  uploadDate: string;
  uploadName: string;
  uploaderId: number;
  url: string;
}
export interface MyfileType {
  index: number;
  pageSize: number;
  userId: number;
}
export interface ToProvate {
  fileId: number;
  userId: number;
}
