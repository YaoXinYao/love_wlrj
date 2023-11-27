<template>
  <div class="articlemd detail" v-loading.fullscreen="loading">
    <div class="markdown-body" v-html="result"></div>
  </div>
</template>

<script setup lang="ts">
//引入markdown的样式
import "~/assets/css/mark.scss";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
//代码高亮主题
import "highlight.js/styles/atom-one-dark.css";
const loading = ref(false);
const result = ref()
const props = defineProps({
  markText: {
    required: true,
    default: "",
  },
});
let md: any = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true, // Convert '\n' in paragraphs into <br>
  highlight: function (str: any, lang: any) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          `<pre><code class="language-${lang} hljs">` +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          "</code></pre>"
        );
      } catch (__) {}
    }
    return (
      '<pre><code class="language-none hljs">' +
      md.utils.escapeHtml(str) +
      "</code></pre>"
    );
  },
});
watch(
  ()=>props.markText,
  (newValue)=>{
    result.value = md.render(props.markText);
  },{
    immediate:true
  }
);
</script>
<style lang="scss" scoped>
.detail {
  position: relative;
  width: 100%;
  height: auto;
  .markdown-body {
    width: 100%;
    height: auto;
    line-height: 0.4rem;
  }
}
</style>
