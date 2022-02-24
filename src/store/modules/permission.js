import { constantRouterMap, constantRouterErrorMap } from "@/router"
import { asyncRoutesArr } from "@/router/routes.js"

const state = {
    roles: [],
    routers: [].concat(constantRouterMap || []),
    addRouters: [],
    defaultRouters: [].concat(constantRouterErrorMap)
}

const mutations = {
    SET_ROUTES(state, routes) {
        state.addRouters = routes
        state.routers = constantRouterMap.concat(routes)
        console.log("路由添加完成:", routes)
        console.log("路由添加完成:", state.routers)
    },
    SET_ROLES(state, roles) {
        state.roles = roles
    }
}

const actions = {
    GenerateRoutes({ commit }, roles) {
        return new Promise(resolve => {

            // axios请求完全菜单 || 对比本地菜单过滤
            let accessedRouters = []
            setTimeout(() => {
                accessedRouters = asyncRoutesArr.filter(route => {
                    return route
                })
                console.log("已过滤完成动态路由", accessedRouters)
                commit('SET_ROLES', roles)
                commit('SET_ROUTES', accessedRouters)
                resolve()
            }, 1000)
        })
    }
}

export default {
    state,
    mutations,
    actions
}