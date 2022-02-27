import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"

/* Layout */
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

//所有权限通用路由表
//如首页和登录页和一些不用权限的公用页面
export const asyncRootMap = [
  {
    path: '/',
    name: 'Root',
    redirect: '/notPermissions',
    meta: { title: '重定向'},
  },
]

export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录', hidden: true},
    component: () => import('@/views/login'),
  },
  {
    path: '/notPermissions',
    name: 'NotPermissions',
    component: Layout,
    meta: { title: '无权限', hidden: true},
    redirect: '/notPermissions/np',
    children: [
      {
        path: 'np',
        name: 'Np',
        meta: { title: '无权限', hidden: false},
        component: () => import("@/views/error-page/permissions"),
      }
    ]
  },
]

//所有权限通用路由表
//固定Error Page
export const constantRouterErrorMap = [
  {
    path: '*',
    name: 'ErrorPage',
    redirect: "/404"
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404'),
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/error-page/401'),
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})

// export const createRouter = routes => new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// });

// Router 跳转异常问题处理
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

let whiteList = []
router.beforeEach((to,from,next) => {
  if(store.getters.token){
    // 判断是否有token
    if(to.path === '/login'){
      next("/")
    } else {
      // 判断是否已经获取权限列表
      // console.log(store.getters.isLogin)
      if(!store.getters.isRoles) {
        // 拉去用户信息 USER_INFO
        // store.dispatch("", {}) || axios
        // 请求 res =>
          // roles = res请求返回的权限列表
        Vue.prototype.$api.post({url: '/api/menutree'}).then(res => {
          // console.log(res)
          // const roles = ["admin"]
          store.dispatch("GenerateRoutes", res).then(() => {
            const route = [].concat(
                store.getters.replaceRouters,
                store.getters.addRouters,
                store.getters.defaultRouters
            )
            // router.addRoutes(store.getters.replaceRouters) // 添加重定向路径
            //
            // router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            //
            // router.addRoutes(store.getters.defaultRouters) // 动态添加可访问路由表 - ErrorPages
            //
            // addRoutes() 在 Vue Router 4中被删除, 改用 addRoute()
            // router.addRoutes(route) // 动态添加可访问路由表
            route.forEach(item => {
              router.addRoute(item)
            })
            next({...to, replace: true})
          })

        })
        // 请求 error =>
        // console.log(error)
      } else {
        next()
      }
    }
  } else {
    // console.log("没有Token\n")
    if(to.path === '/login') {
      // console.log("进Login\n")
      next()
    } else if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      // console.log("重定向Login")
      next('/login'); // 否则全部重定向到登录页
    }
  }
})

export default router
