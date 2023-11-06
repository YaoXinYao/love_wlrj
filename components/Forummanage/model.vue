<template>
  <div class="forumModel">
    <!-- 查看帖子 -->
    <el-dialog v-model="lookModel" title="帖子信息" width="440px">
      <el-form :model="postInfos">
        <el-form-item label="发帖人" :label-width="formLabelWidth">
          <el-input :value="postInfos.name" :disabled="true" />
        </el-form-item>
        <el-form-item label="发帖时间" :label-width="formLabelWidth">
          <el-input :value="postInfos.timer" :disabled="true" />
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input
            :value="postInfos.title"
            :disabled="true"
            autosize
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth">
          <el-input :value="postInfos.label" :disabled="true" />
        </el-form-item>
        <el-form-item label="分栏" :label-width="formLabelWidth">
          <el-input :value="postInfos.subfield" :disabled="true" />
        </el-form-item>
        <el-form-item label="正文内容" :label-width="formLabelWidth">
          <el-input
            :value="postInfos.content"
            :disabled="true"
            autosize
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <ul class="photos">
            <li v-for="(item, index) in postInfos.photo" :key="index">
              <img :src="item" />
            </li>
          </ul>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="lookModel = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 删除帖子 -->
    <el-dialog v-model="deleteModel" title="提示信息" width="440px">
      <span>确定要删除此帖子？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="deletePost">确定</el-button>
          <el-button @click="deleteModel = false"> 取消 </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 标签管理 -->
    <el-dialog v-model="labelModel" title="标签管理" width="440px">
      <el-tag
        v-for="item in labels"
        :key="item.name"
        class="mx-1"
        closable
        :type="item.type"
        @close="handleClose(item.name)"
      >
        {{ item.name }}
      </el-tag>
      <el-input
        v-if="inputVisible"
        v-model="inputLabel"
        class="ml-1 w-20"
        size="small"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <el-button
        v-else
        class="button-new-tag ml-1"
        size="small"
        @click="showInput"
      >
        + 添加标签
      </el-button>
    </el-dialog>
    <!-- 分栏管理 -->
    <el-dialog v-model="subfieldModel" title="分栏管理" width="440px">
      <el-tag
        v-for="item in subfields"
        :key="item.name"
        class="mx-1"
        closable
        :type="item.type"
        @close="subfieldClose(item.name)"
      >
        {{ item.name }}
      </el-tag>
      <el-input
        v-if="subfieldVisible"
        v-model="subfieldLabel"
        class="ml-1 w-20"
        size="small"
        @keyup.enter="subfieldInputConfirm"
        @blur="subfieldInputConfirm"
      />
      <el-button
        v-else
        class="button-new-tag ml-1"
        size="small"
        @click="subfieldInput"
      >
        + 添加分栏
      </el-button>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, Ref } from "vue";
import { storeToRefs } from "pinia";
import { forumManage } from "~/store/forum";
let manage = forumManage();
let { labelModel, subfieldModel, lookModel, deleteModel } = storeToRefs(manage);
const formLabelWidth = "80px";
let postInfos = reactive({
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
});
let inputLabel = ref("");
interface Label {
  name: string;
  type: "" | "success" | "warning" | "info" | "danger";
}
let labels: Ref<Label[]> = ref([
  { name: "Tag 1", type: "" },
  { name: "Tag 2", type: "success" },
  { name: "Tag 3", type: "info" },
  { name: "Tag 4", type: "warning" },
  { name: "Tag 5", type: "danger" },
]);
const inputVisible = ref(false);

let subfields: Ref<Label[]> = ref([
  { name: "Tag 1", type: "" },
  { name: "Tag 2", type: "success" },
  { name: "Tag 3", type: "info" },
  { name: "Tag 4", type: "warning" },
  { name: "Tag 5", type: "danger" },
]);
const subfieldVisible = ref(false);
let subfieldLabel = ref("");

// 删除帖子
function deletePost() {
  console.log("删除帖子");
  deleteModel.value = false;
}
// 标签管理
const handleClose = (tag: string) => {
  for (let i = 0; i < labels.value.length; i++) {
    if (labels.value[i].name == tag) {
      labels.value.splice(i, 1);
    }
  }
};
const showInput = () => {
  inputVisible.value = true;
};
const handleInputConfirm = () => {
  if (inputLabel.value) {
    let obj: Label = {
      type: "success",
      name: inputLabel.value,
    };
    labels.value.push(obj);
  }
  inputVisible.value = false;
  inputLabel.value = "";
};

// 分栏管理
const subfieldClose = (subfiseld: string) => {
  for (let i = 0; i < subfields.value.length; i++) {
    if (subfields.value[i].name == subfiseld) {
        subfields.value.splice(i, 1);
    }
  }
};
const subfieldInput = () => {
    subfieldVisible.value = true;
};
const subfieldInputConfirm = () => {
  if (inputLabel.value) {
    let obj: Label = {
      type: "success",
      name: inputLabel.value,
    };
    labels.value.push(obj);
  }
  inputVisible.value = false;
  inputLabel.value = "";
};
</script>

<style lang="scss" scoped>
.photos {
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  li {
    max-width: 320px;
    height: 200px;
    overflow: hidden;
    image {
      height: 200px;
    }
  }
}
.el-tag.is-closable {
  margin-right: 7px;
  margin-bottom: 10px;
}
</style>
