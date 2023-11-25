import { number } from "echarts";
import { defineStore } from "pinia";
import { getAlltag, getFileTaglist, getFilelist } from "~/service/homeApi";
import type { Diskstore } from "~/types/disk";
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
        uploadFileTotalByte: 0,
        alreadyByte: 0,
        curuploadFile: {
          Filespend: 0,
          FileSize: 0,
          alreadysize: 0,
          isComptedMd5: false,
        },
      },
    };
  },
  actions: {
    //上传文件的总字节
    async updateTotalByte(val: number) {
      //更新总字节
      this.uploadProps.uploadFileTotalByte = val;
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
        ElMessage({
          message: `${file.name}已添加`,
          type: "success",
          offset: 64,
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
      console.log("触发");
      console.log(id);
      const index = this.Filelist.dataList.findIndex((item) => item.id == id);
      console.log(index);
      this.Filelist.dataList[index].is_collection == 0
        ? (this.Filelist.dataList[index].is_collection = 1)
        : (this.Filelist.dataList[index].is_collection = 0);
    },
  },
});
