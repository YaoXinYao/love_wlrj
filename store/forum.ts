import { defineStore } from "pinia";
import {
  getLabel,
  postLabel,
  deleteLabel,
  getSubfield,
  postSubfield,
  deleteSubfield,
} from "~/service/forums/admin";
import {addpost} from "~/service/forums/card"
export interface dataType {
  id: number;
  title: string;
  name: string;
  timer: string;
  label: string;
  subfield: string;
  content: string;
  head: string;
  photo: string[];
  likes: boolean;
}
export interface discussType {
  id: number;
  postid: number;
  mainid: number;
  name: string;
  timer: string;
  content: string;
  head: string;
  photo: string[];
  likes: boolean;
  child: string[];
}
export interface label {
  labelId: number;
  labelName: string;
}
export interface subfield {
  subId: number;
  subName: string;
}
export interface cards {
  source: string;
  datas: dataType[];
  discuss: discussType[];
}
export interface forums {
  labelModel: boolean;
  subfieldModel: boolean;
  lookModel: boolean;
  deleteModel: boolean;
  labels: label[];
  subfields: subfield[];
}
export const forumStore = defineStore("forumInfo", {
  state: (): cards => {
    return {
      source: "",
      datas: [
        {
          id: 1,
          name: "迷雾",
          title: "走进心理世界",
          timer: "2021-10-09",
          label: "是",
          subfield: "总结",
          content:
            '"剧本杀"，一词起源于西方宴会实况角色扮演“谋杀之谜”，是玩家到实景场馆，体验推理性质的项目。剧本杀的规则是，玩家先选择人物，阅读人物对应剧本，搜集线索后找出活动里隐藏的真凶。',
          head: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201912%2F26%2F20191226135004_nW4Jc.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698651724&t=05cf56641aeb49efcb3ac3375dc04390",
          photo: [
            "https://img1.baidu.com/it/u=2559867097,3726275945&fm=253&fmt=auto&app=138&f=JPEG?w=1333&h=500",
          ],
          likes: true,
        },
        {
          id: 2,
          name: "迷雾",
          title: "走进心理世界",
          timer: "2021-10-09",
          label: "是",
          subfield: "总结",
          content:
            '"剧本杀"，一词起源于西方宴会实况角色扮演“谋杀之谜”，是玩家到实景场馆，体验推理性质的项目。剧本杀的规则是，玩家先选择人物，阅读人物对应剧本，搜集线索后找出活动里隐藏的真凶。',
          head: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202001%2F04%2F20200104211903_vFdtk.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698651756&t=9c7f8590a7185503d81c12d1ad4e49af",
          photo: [
            "https://img1.baidu.com/it/u=1876627393,303388089&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
            "https://img1.baidu.com/it/u=3915533775,2333080297&fm=253&fmt=auto&app=138&f=JPEG?w=705&h=500",
            "https://img1.baidu.com/it/u=1876627393,303388089&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
            "https://img1.baidu.com/it/u=3915533775,2333080297&fm=253&fmt=auto&app=138&f=JPEG?w=705&h=500",
            "https://img1.baidu.com/it/u=1876627393,303388089&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
            "https://img1.baidu.com/it/u=3915533775,2333080297&fm=253&fmt=auto&app=138&f=JPEG?w=705&h=500",
          ],
          likes: true,
        },
        {
          id: 3,
          name: "迷雾",
          title: "走进心理世界",
          timer: "2021-10-09",
          label: "是",
          subfield: "总结",
          content: "",
          head: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F10%2F20210610232327_c1b93.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698651756&t=31882182eabc65f519aa13e462154e2b",
          photo: [
            "https://img1.baidu.com/it/u=3915533775,2333080297&fm=253&fmt=auto&app=138&f=JPEG?w=705&h=500",
          ],
          likes: false,
        },
        {
          id: 4,
          name: "迷雾",
          title: "走进心理世界",
          timer: "2021-10-09",
          label: "是",
          subfield: "总结",
          content:
            '"剧本杀"，一词起源于西方宴会实况角色扮演“谋杀之谜”，是玩家到实景场馆，体验推理性质的项目。剧本杀的规则是，玩家先选择人物，阅读人物对应剧本，搜集线索后找出活动里隐藏的真凶。',
          head: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202001%2F04%2F20200104211903_vFdtk.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698651756&t=9c7f8590a7185503d81c12d1ad4e49af",
          photo: [],
          likes: true,
        },
      ],
      discuss: [
        {
          id: 1,
          postid: 0,
          mainid: 2,
          name: "迷雾",
          timer: "2021-10-09",
          content:
            '"剧本杀"，一词起源于西方宴会实况角色扮演“谋杀之谜”，是玩家到实景场馆，体验推理性质的项目。',
          head: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202001%2F04%2F20200104211903_vFdtk.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698651756&t=9c7f8590a7185503d81c12d1ad4e49af",
          photo: [],
          likes: true,
          child: [],
        },
      ],
    };
  },
  actions:{
    // 发布帖子
    async addCard(params:FormData){
      const {data} = await addpost(params)
      const code = data.value?.code;
      console.log(data);
      
      return code;
    }
  }
});
export const forumManage = defineStore("manage", {
  state: (): forums => {
    return {
      labelModel: false,
      subfieldModel: false,
      lookModel: false,
      deleteModel: false,
      labels: [],
      subfields: [],
    };
  },
  actions: {
    //获取标签
    async labelInfo(pageNo: number, pageSize: number) {
      const { data } = await getLabel(pageNo, pageSize);
      this.labels = data.value?.data.records || []; 
    },
    //添加标签
    async addLabel(name: string) {
      const { data } = await postLabel(name);
      const code = data.value?.code;
      return code;
    },
    //删除标签
    async labelDelete(ids: number) {
      const { data } = await deleteLabel(ids);
      const code = data.value?.code;
      return code;
    },

    async subfieldInfo(pageNo: number, pageSize: number) {
      const { data } = await getSubfield(pageNo, pageSize);
      this.subfields = data.value?.data.records || [];
    },
    async addSubfield(subName: string) {
      const { data } = await postSubfield(subName);
      const code = data.value?.code;
      return code;
    },
    async subfieldDelete(ids: number) {
      const { data } = await deleteSubfield(ids);
      const code = data.value?.code;
      return code;
    },
  },
});
