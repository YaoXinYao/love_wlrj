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
      console.log(this.Filelist);
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
        ElMessage({ message: "不能超过五个", type: "warning" });
      } else {
        this.filequeue.push(file);
      }
    },
    async deletequeue(filename: string) {
      const copyqueue = this.filequeue;
      const newarr = copyqueue.filter((item) => {
        if (item.name !== filename) return true;
      });
      console.log(newarr);
      this.filequeue = newarr;
    },
  },
});
