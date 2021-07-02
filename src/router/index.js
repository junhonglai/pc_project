import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home";
// import Search from "../views/Search";
// import Login from "../views/Login";
// import Register from "../views/Register";
// import Detail from "../components/Detail";
// import AddCartSuccess from "../views/AddCartSuccess";
// import ShopCart from '../views/ShopCart'
// import Trade from '../views/Trade'
// import Pay from '../views/Pay'
// import PaySuccess from '../views/PaySuccess'
// import Center from '../views/Center'

const Home = () => import(/* webpackChunkName: 'Home'*/ "../views/Home");

const Search = () => import(/* webpackChunkName: 'Search'*/ "../views/Search");

const Login = () => import(/* webpackChunkName: 'Login'*/ "../views/Login");

const Register = () =>
  import(/* webpackChunkName: 'Register'*/ "../views/Register");

const Detail = () =>
  import(/* webpackChunkName: 'Detail'*/ "../components/Detail");

const AddCartSuccess = () =>
  import(/* webpackChunkName: 'AddCartSuccess'*/ "../views/AddCartSuccess");

const ShopCart = () =>
  import(/* webpackChunkName: 'ShopCart'*/ "../views/ShopCart");

const Trade = () => import(/* webpackChunkName: 'Trade'*/ "../views/Trade");

const Pay = () => import(/* webpackChunkName: 'Pay'*/ "../views/Pay");

const PaySuccess = () =>
  import(/* webpackChunkName: 'PaySuccess'*/ "../views/PaySuccess");

const Center = () => import(/* webpackChunkName: 'Center'*/ "../views/Center");

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
    name: "Trade",
    path: "/trade",
    component: Trade,
    beforeEnter(to, from, next) {
      // 判断是否是从ShopCart进入的Trade
      if (from.name === "ShopCart") {
        next();
        return;
      }
      // 不是的话返回来的页面
      next(from);
    },
  },
  {
    name: "Pay",
    path: "/pay",
    component: Pay,
    beforeEnter(to, from, next) {
      // 判断是否是从Trade进入的Pay
      if (from.name === "Trade") {
        next();
        return;
      }
      // 不是的话返回来的页面
      next(from);
    },
  },
  {
    name: "PaySuccess",
    path: "/paysuccess",
    component: PaySuccess,
    beforeEnter(to, from, next) {
      // 判断是否是从Pay进入的PaySuccess
      if (from.name === "Pay") {
        next();
        return;
      }
      // 不是的话返回来的页面
      next(from);
    },
  },
  {
    name: "Center",
    path: "/center",
    component: Center,
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
