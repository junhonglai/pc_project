import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入mock
import './mock'

// 引入重置样式表
import './styles/reset.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
