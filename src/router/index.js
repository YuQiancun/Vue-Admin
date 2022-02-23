import Vue from 'vue'
import VueRouter from 'vue-router'

/* Layout */
import Layout from '../layout/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home'),
      meta: {title: '首页', icon: 'guide'}
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/about'),
      meta: {title: '首页', icon: 'guide'}
    }]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
