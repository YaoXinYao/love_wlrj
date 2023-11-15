// https://nuxt.com/docs/api/configuration/nuxt-config
import ElementPlus from "unplugin-element-plus/vite";
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
    //自动导入样式
    plugins: [ElementPlus({})],
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
          content: "未来, 未来软件工作室, 未来小组，河南科技学院最牛小组",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "referrer", content: "no-referrer" },
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
          src: "/staticjs/font_4330669_qlx1o97szjn.js",
        },
      ],
      noscript: [{ children: "Javascript is required" }],
    },
  },
  modules: [
    "@pinia/nuxt",
    "@element-plus/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  piniaPersistedstate: {
    storage: "sessionStorage",
  },
  build: {
    transpile: ["element-plus/es"],
  },
  nitro: {
    devProxy: {
      //后台管理
      "/api": {
        target: "http://152.136.54.204:19999/forum",
        changeOrigin: true,
        prependPath: true,
      },
      //网盘接口
      "/disk": {
        target: "http://10.102.242.89:19520/",
        changeOrigin: true,
        prependPath: true,
      },
      //用户接口
      "/coustom": {
        target: "http://112.125.120.78:8666/",
        changeOrigin: true,
        prependPath: true,
      },
    },
  },
  routeRules: {
    "/admin/**": {
      ssr: false,
    },
    "/networkdisk/**": {
      ssr: false,
    },
  },
});
