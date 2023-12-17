// https://nuxt.com/docs/api/configuration/nuxt-config
import ElementPlus from "unplugin-element-plus/vite";
// import { MonacoEditor } from './.nuxt/components';
export default defineNuxtConfig({
  css: ["@/assets/css/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@use '~/assets/css/variables.scss' as *;",
        },
      },
    },
    esbuild: {
      drop: process.env.NUXT_API_ENV !== "dev" ? ["debugger"] : [],
    },
    //自动导入样式
    plugins: [ElementPlus({})],
    //代码压缩
  },
  app: {
    head: {
      meta: [
        {
          name: "description",
          content: "未来软件工作室",
        },
        {
          name: "keywords",
          content:
            "未来, 未来软件工作室, 未来小组,河南科技学院最牛小组,高国红,李士勇",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "referrer", content: "no-referrer" },
        { name: "og:title", content: "未来软件工作室" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon2.ico" },
        {
          rel: "stylesheet",
          type: "text/css",
          href: "/staticcss/swiper-bundle.css",
        },
      ],
      script: [
        {
          type: "text/javascript",
          src: "/staticjs/swiper-bundle.js",
        },
        {
          type: "text/javascript",
          src: "/staticjs/font_4330669_ghs4q6fkhna.js",
        },
        {
          type: "text/javascript",
          src: "/staticjs/phaser.min.js",
        },
        {
          type: "text/javascript",
          src: "/staticjs/catch-the-cat.js",
        },
      ],
      noscript: [{ children: "Javascript is required" }],
    },
  },
  modules: [
    "@pinia/nuxt",
    "@element-plus/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-monaco-editor",
  ],
  piniaPersistedstate: {
    storage: "localStorage",
  },
  build: {
    transpile: ["element-plus/es"],
  },
  nitro: {
    devProxy: {
      "/api": {
        target: "http://152.136.161.44:19491/",
        changeOrigin: true,
        prependPath: true,
      },
      //牛庆凯接口
      "/check": {
        target: "http://124.222.153.56:19591/",
        changeOrigin: true,
        prependPath: true,
      },
      "/api2": {
        target: "http://112.125.120.78:19521/",
        changeOrigin: true,
        prependPath: true,
      },
    },
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
  },
  routeRules: {
    "/admin/**": {
      ssr: false,
    },
    "/personalInfoPage/**": {
      ssr: false,
    },
    "/networkdisk/**": {
      ssr: false,
    },
    "/forum/**": {
      ssr: false,
    },
    "/personalInfo/**": {
      ssr: false,
    },
    "/messageCenter/**": {
      ssr: false,
    },
    "/articlemd/**": {
      ssr: false,
    },
    "/proclamation": {
      ssr: false,
    },
  },
  MonacoEditor: {
    dest: "_monaco",
    locale: "en",
    componentName: {
      codeEditor: "MonacoEditor",
      diffEditor: "MonacoDiffEditor",
    },
  },
});
