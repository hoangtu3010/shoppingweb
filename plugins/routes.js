import enumConst from "../constants/enum";

export default [
  {
    name: "404",
    path: "*",
    component: "/index.vue",
  },
  {
    name: "Home",
    path: enumConst.URLROUTE.Home,
    component: "/index.vue",
  },
  {
    name: "ProductDetail",
    path: enumConst.URLROUTE.ProductDetail,
    component: "/products/_id.vue",
  },
  {
    name: "Login",
    path: enumConst.URLROUTE.Login,
    component: "/auth/login.vue",
  },
  {
    name: "Register",
    path: enumConst.URLROUTE.Register,
    component: "/auth/register.vue",
  },
];
