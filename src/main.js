import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 裁剪组件
import VueCropper from 'vue-cropper'

Vue.use(ElementUI);
Vue.use(VueCropper)

// 全局组件
import Loading from "@/components/Loading"
Vue.component('Loading', Loading)

import api from '@/api'

Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
