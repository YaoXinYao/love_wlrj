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
    };
  },
  actions: {
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
  },
});
