<template>
  <div class="wrapper detail" v-loading.fullscreen="loading">
    <div class="content" v-html="result"></div>
  </div>
</template>

<script setup lang="ts">
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
//代码高亮主题
import "highlight.js/styles/atom-one-dark.css";
const { markText } = defineProps({
  markText: {
    required: true,
    default: "",
  },
});
const post = ref({
  content: markText,
});
const loading = ref(false);
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
let result = md.render(post.value.content);
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: auto;
  .content {
    width: 100%;
    height: auto;
    line-height: 0.45rem;
  }
}
</style>
