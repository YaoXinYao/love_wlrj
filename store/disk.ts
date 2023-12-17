import { defineStore } from "pinia";
import {
  GetDisjinfo,
  LookMyfile,
  SearchFile,
  SearchMyfile,
  getAllProject,
  uploaddeleteFile,
} from "~/service/disk";
import { GetMylovefile, getAlltag, getFileTaglist } from "~/service/homeApi";
import type { Diskstore, ProjectDesType } from "~/types/disk";
export const useDiskstore = defineStore("disk", {
  state(): Diskstore {
    return {
      AllType: [],
      curIndex: 1,
      Pagesize: 10,
      Loading: false,
      Filelist: {
        allPage: 0,
        count: 0,
        dataList: [],
        index: 0,
        pageSize: 0,
      },
      curTag: [],
      //文字搜索store
      Searchtext: "",
      Filelist2: {
        allPage: 0,
        count: 0,
        dataList: [],
        index: 0,
        pageSize: 0,
      },
      Pagesize2: 10,
      Loading2: false,
      curIndex2: 1,
      //上传文件
      filequeue: [],
      //进度
      down: {
        isOpen: false,
        downProgress: 1,
        //文件大小
        downSize: "",
        //下载速度
        downSpend: "",
        //正在下载的文件信息
        downfile: "",
      },
      //上传窗口所需参数
      uploadProps: {
        uploadFileTotalByte: 1, //总片数
        alreadyByte: 1,
        HavePassed: [],
        curUpFile: {
          File: null, //当前正在传输的文件信息，
          ParseMd5: false, //是否正在检索文件
          FileUpSpend: 0, // 当前下上传速度
          upedChunk: 0, // 正在上传第几片
        },
      },
      //我的收藏列表
      Mylove: {
        Search: "",
        SearchItem: [],
        curIndex: 1,
        PageSize: 10,
        Loading: false,
        FileList: {
          allPage: 0,
          count: 0,
          dataList: [],
          index: 0,
          pageSize: 0,
        },
      },
      Myfile: {
        Search: "",
        curIndex: 1,
        PageSize: 10,
        Loading: false,
        SearchItem: [],
        FileList: {
          allPage: 0,
          count: 0,
          dataList: [],
          index: 0,
          pageSize: 0,
        },
      },
      //网盘信息总览
      Diskinfo: {
        diskFileNumber: 0,
        diskFileSize: "",
      },
      MyProjectDis: [],
    };
  },
  actions: {
    //更新项目信息
    async updataProjectinfo(obj: ProjectDesType & { projectId: number }) {
      const index = this.MyProjectDis.findIndex(
        (item) => item.projectId == obj.projectId
      );
      this.MyProjectDis[index] = {
        ...obj,
        projectImage: this.MyProjectDis[index].projectImage,
      };
    },
    //更新指定ID 的项目封面
    async updataCoverstore(id: number | string, imgurl: string) {
      const index = this.MyProjectDis.findIndex((item) => item.projectId == id);
      this.MyProjectDis[index].projectImage = imgurl;
    },
    //删除指定ID 的项目
    async deleteProjectID(id: number | string) {
      const copy = [...this.MyProjectDis];
      const newcopy = copy.filter((item) => {
        return item.projectId != id;
      });
      this.MyProjectDis = newcopy;
    },
    //请求获得当前展示的项目
    async GetDisProject() {
      const res = await getAllProject();
      try {
        if (res.data) {
          this.MyProjectDis = res.data.value.data;
        }
      } catch (error) {
        this.MyProjectDis = [];
      }
    },
    //添加一个项目
    async AddProjectDesc(Obj: ProjectDesType) {
      this.MyProjectDis.push(Obj);
    },
    //删除回调，前台删除
    async SearchFileReplce(filedid: number) {
      const res = await uploaddeleteFile({
        fileId: filedid,
        userId: Authuserid(),
      });
      if (res.data.value.code !== 20000)
        return ElMessage({ message: "删除失败", type: "error" });
      const copy = [...this.Myfile.SearchItem];
      const newarr = copy.filter((item) => {
        return item.id != filedid;
      });
      this.Myfile.SearchItem = newarr;
      ElMessage({ message: "删除成功", type: "success" });
    },
    //Search我的收藏
    async SearchMylovefile(searchinner: string) {
      const res = await SearchFile({
        keyword: searchinner,
        userId: Authuserid(),
      });
      this.Mylove.SearchItem = res.data.value.data;
    },
    //Search获取我的文件信息
    async getMySearchFile(searchinner: string) {
      const res = await SearchMyfile({
        keyword: searchinner,
        userId: Authuserid(),
      });
      this.Myfile.SearchItem = res.data.value.data;
    },
    //获取网盘信息
    async getDiskinfo() {
      const res = await GetDisjinfo();
      this.Diskinfo = res.data.value.data;
    },
    //改变我的收藏中的页数
    changeMylovePageSize(val: number) {
      this.Mylove.PageSize = val;
    },
    //清除filequeue
    async updatefilequeue() {
      this.filequeue = [];
    },
    //添加已经传过的文件的名字
    async updateFilename(val: string) {
      this.uploadProps.HavePassed.push(val);
    },
    //更新已经上传的总分片
    async updatereadyByte(val: number) {
      this.uploadProps.alreadyByte += val;
    },
    async updatereader(val: number) {
      this.uploadProps.alreadyByte = val;
    },
    //更新正在上传的分片
    async updateChunk(val: number) {
      this.uploadProps.curUpFile.upedChunk = val;
    },
    //上传文件的总片数
    async updateTotalByte(val: number) {
      //更新总字节
      this.uploadProps.uploadFileTotalByte = val;
    },
    //更新当前文件的下载进度
    //正在上传的文件
    async updateFile(file: File) {
      this.uploadProps.curUpFile.File = file;
    },
    //MD5 解析
    async updateMd5(val: boolean) {
      this.uploadProps.curUpFile.ParseMd5 = val;
    },
    //获取标签
    async getAllfiletag() {
      const res = await getAlltag();
      this.AllType = res.data.value.data.map((item, index) => {
        return {
          label: item.typeName,
          value: item.typeId,
        };
      });
    },
    //获取文件列表
    async getFilelistitem() {
      //标签分类查询
      this.Loading = true;
      const res = await getFileTaglist({
        index: this.curIndex,
        pageSize: this.Pagesize,
        types: this.curTag.map((item) => `types=${item}`).join("&") || "types=",
      });

      this.Filelist = res.data.value.data;
      this.Loading = false;
    },
    //获取我的收藏
    async getMylove() {
      //标签分类查询
      this.Mylove.Loading = true;
      const res = await GetMylovefile({
        index: this.Mylove.curIndex,
        pageSize: this.Mylove.PageSize,
        types: "",
      });
      this.Mylove.FileList = res.data.value.data;
      this.Mylove.Loading = false;
    },
    //获取我的文件
    async getMyfile() {
      this.Myfile.Loading = true;
      const res = await LookMyfile({
        index: this.Myfile.curIndex,
        pageSize: this.Myfile.PageSize,
        userId: Authuserid(),
      });

      this.Myfile.FileList = res.data.value.data;
      this.Myfile.Loading = false;
    },
    async getNameFile() {
      this.Loading2 = true;
      setTimeout(() => {
        this.Loading2 = false;
      }, 1000);
    },
    async changeSearch(val: string) {
      this.Searchtext = val;
    },
    //添加文件队列
    async changequeue(file: File) {
      if (this.filequeue.length >= 5) {
        ElMessage({ message: "不能超过五个", type: "info" });
      } else {
        this.filequeue.push(file);
        ElNotification({
          title: "新增文件",
          message: h("i", { style: "color: teal" }, `${file.name}已添加`),
          duration: 1000,
        });
      }
    },
    //删除队列中具体文件
    async deletequeue(filename: string) {
      const copyQueue = [...this.filequeue]; // 使用扩展运算符复制数组以避免直接修改原始数组
      const newArr = copyQueue.filter((item) => {
        return item.name !== filename;
      });
      this.filequeue = newArr;
    },
    async changeProgress(val: number) {
      if (val >= 100) {
        this.down.isOpen = false;
        this.down.downProgress = 0;
        ElMessage({ message: "下载完成", type: "success" });
      }
    },
    //改变某一个的收藏状态
    async changeUncomment(id: number) {
      const index = this.Filelist.dataList.findIndex((item) => item.id == id);

      this.Filelist.dataList[index].is_collection == 0
        ? (this.Filelist.dataList[index].is_collection = 1)
        : (this.Filelist.dataList[index].is_collection = 0);
    },
    //Mylove收藏
    async changeUncomment2(id: number) {
      const index = this.Mylove.FileList.dataList.findIndex(
        (item) => item.id == id
      );

      this.Mylove.FileList.dataList[index].is_collection == 0
        ? (this.Mylove.FileList.dataList[index].is_collection = 1)
        : (this.Mylove.FileList.dataList[index].is_collection = 0);
    },
    async changeUncomment3(id: number) {
      const index = this.Mylove.SearchItem.findIndex((item) => item.id == id);

      this.Mylove.SearchItem[index].is_collection == 0
        ? (this.Mylove.SearchItem[index].is_collection = 1)
        : (this.Mylove.SearchItem[index].is_collection = 0);
    },
  },
});
