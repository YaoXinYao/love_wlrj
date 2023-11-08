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
          href: "https://unpkg.com/swiper@8/swiper-bundle.css",
        },
        // { rel: "stylesheet", href: "https://liujun.css" }
      ],
      script: [
        {
          type: "text/javascript",
          src: "https://unpkg.com/swiper@8/swiper-bundle.js",
        },
      ],
      // add head
      // script: [{ src: "https://liujun.js" }],
      noscript: [{ children: "Javascript is required" }],
    },
  },
  modules: ["@pinia/nuxt", "@element-plus/nuxt"],
  build: {
    transpile: ["element-plus/es"],
  },
  nitro: {
    devProxy: {
      "/api": {
        target: "http://152.136.54.204:19999/forum",
        changeOrigin: true,
        prependPath: true,
      },
    },
  },
  routeRules: {
    "/admin/**": {
      ssr: false,
    },
  },
});
