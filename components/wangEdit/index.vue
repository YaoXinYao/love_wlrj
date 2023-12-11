<template>
  <div class="editUtil">
    <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <div class="editTitle">
      <el-input
        placeholder="请输入文章标题(最多20个字)"
        maxlength="20"
        show-word-limit
        v-model="newPostTitle"
      ></el-input>
    </div>
    <Editor
      v-model="newPostContent"
      style="height: 400px"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>
<script lang="ts" setup>
import "~/assets/css/edit.scss";
import { storeToRefs } from "pinia";
import { forumStore } from "~/store/forum";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
let forums = forumStore();
let { newPostContent, newPostTitle } = storeToRefs(forums);

let mode = ref("default");
// 编辑器实例，必须用 shallowRef
//shallowRef()来创建响应式对象，以避免深度响应带来的性能开销,它是浅响应
const editorRef = shallowRef();
const toolbarConfig = {
  excludeKeys: ["uploadImage", "uploadVideo","insertVideo"],
}; //菜单栏配置
const editorConfig = {
  type: "md",
  placeholder: "请输入内容...",
}; //编辑器配置

//组件销毁时，也及时销毁编辑器 onBeforeUnmount(函数:在组件卸载之前调用的函数。在这里，它检查Editor实例是否存在，如果存在，则销毁它。这是一种良好的实践，以避免内存泄漏。
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
//handleCreated 函数:这是一个事件处理函数，它将在Editor组件创建后被调用。在这个函数中，它将Edito实例保存到editorRef引用中。
const handleCreated = (editor: any) => {
  editorRef.value = editor;
};
</script>

<style lang="scss" scoped>
.editUtil {
  width: 100%;
  padding: 0 0 20px;
  .editTitle {
    max-width: 980px;
    margin: 30px auto 0px;
  }
  .el-input {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-indent: 1em;
    border: none;
    resize: none;
    outline: none;
    overflow: hidden;
    border-bottom: 1px solid rgb(190, 190, 190);
  }
}
</style>
