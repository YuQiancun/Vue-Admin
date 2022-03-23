import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 裁剪组件
import VueCropper from 'vue-cropper'
// 剪切板插件 直接注册到原型上
import Clipboard from 'clipboard';

Vue.use(ElementUI)
Vue.use(VueCropper)

// 全局组件
import Loading from "@/components/Loading"
Vue.component('Loading', Loading)

import api from '@/api'
//注册到vue原型上
Vue.prototype.clipboard = Clipboard;
Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
