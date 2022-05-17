import customRoutes from "./plugins/routes.js";
export default {
  target: 'server',

  server: {
    port: 3000,
    host: 'localhost', // default: localhost,
    timing: false
  },
  ssr: false,
  router: {
    extendRoutes(routes, resolve) {
      for (const r of customRoutes) {
        routes.unshift({
          name: r.name,
          path: r.path,
          component: resolve(__dirname, `pages${r.component}`),
        });
      }
    },
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "PiAiMart",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/logo.png" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap",
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      {
        href: "https://fonts.googleapis.com/css2?family=Monoton&display=swap",
        rel: "stylesheet",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/main-style.css", "swiper/css/swiper.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/api" },
    { src: "~/plugins/swiper.js", ssr: false },
    "@/plugins/mixins/util",
    "@/plugins/lodash"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/toast",
    "nuxt-vue-multiselect",
  ],
  bootstrapVue: {
    icons: true,
  },
  toast: {
    theme: "bubble",
    position: "top-center",
    duration: 2000,
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "http://localhost:8080",
    browserBaseUrl: "http://localhost:8080",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
