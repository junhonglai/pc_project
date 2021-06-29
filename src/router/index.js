import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Search from "../views/Search";
import Login from "../views/Login";
import Register from "../views/Register";
import Detail from "../components/Detail";
import AddCartSuccess from "../views/AddCartSuccess";
import ShopCart from '../views/ShopCart'

Vue.use(VueRouter);

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Search",
    path: "/search/:keyword?",
    component: Search,
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
    meta: {
      isFootershow: false,
    },
  },
  {
    name: "Register",
    path: "/register",
    component: Register,
    meta: {
      isFootershow: false,
    },
  },
  {
    name: "Detail",
    path: "/detail/:id",
    component: Detail,
  },
  {
    name: "AddCartSuccess",
    path: "/addcartsuccess",
    component: AddCartSuccess,
  },
  {
    name: "ShopCart",
    path: "/shopcart",
    component: ShopCart,
  },
  {
    path: "*",
    redirect: "/",
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
