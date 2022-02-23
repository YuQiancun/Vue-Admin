import Vue from 'vue'
import VueRouter from 'vue-router'

/* Layout */
// import Layout from '../layout/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
  },
  {
    path: '*',
    name: 'Redirect',
    redirect: "/login"
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
