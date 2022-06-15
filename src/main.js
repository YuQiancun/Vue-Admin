import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 裁剪组件
import VueCropper from 'vue-cropper'
// 剪切板插件 直接注册到原型上  不好用已删除
// import Clipboard from 'clipboard';
// ECharts 图标插件
import * as echarts from 'echarts'

Vue.use(VueI18n)
Vue.use(ElementUI)
Vue.use(VueCropper)
const i18n = new VueI18n({
  locale:  localStorage.getItem('language') || 'zh-CN',    // 语言标识
  messages: require("@/language/index.js").default
})

// 全局组件
import Loading from "@/components/Loading"
Vue.component('Loading', Loading)

import api from '@/api'
// //注册到vue原型上
// Vue.prototype.clipboard = Clipboard;
Vue.prototype.$echarts = echarts;
Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
