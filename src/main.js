import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLazyload from "vue-lazyload";

// 引入mock
import "./mock";

// 引入重置样式表
import "./styles/reset.css";
// 引入字体图标样式
import "./styles/iconfont.css";
import error from './assets/images/error.jpg' 
import loading from './assets/images/loading.gif' 

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: error, // 加载失败时显示的图片
  loading: loading, //加载中显示的图片
  attempt: 1,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
