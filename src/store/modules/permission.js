import { constantRouterMap, constantRouterErrorMap, asyncRootMap } from "@/router"
import { asyncRoutesArr } from "@/router/routes.js"

const state = {
    isRoles: false,
    roles: [],
    routers: [],
    addRouters: [],
    replaceRouters: [],
    defaultRouters: [],
}

const mutations = {
    SET_ROUTES(state, routes) {
        state.addRouters = routes
        state.routers = constantRouterMap.concat(routes)
    },
    SET_ROLES(state, roles) {
        state.isRoles = true
        state.roles = roles
    },
    SET_DEFAULT_ROUTES(state) {
        state.defaultRouters = constantRouterErrorMap
    },
    SET_REPLACE_PATH(state, replaceRoute) {
        state.replaceRouters = replaceRoute
    }
}

const actions = {
    GenerateRoutes({ commit }, roles) {
        return new Promise(resolve => {

            // axios请求完全菜单 || 对比本地菜单过滤
            let accessedRouters = []
            setTimeout(() => {
                accessedRouters = asyncRoutesArr.filter(route => {
                    return !/^A$/.test(route.name)
                })
                commit('SET_ROLES', roles)
                // 如果没有Home首页访问权限，则获取顺序第一个的首页
                const rootPath = () => {
                    if(accessedRouters.length > 0){
                        return accessedRouters[0].path || null
                    }
                }
                const replacePath = asyncRootMap.map(item => {
                    (rootPath && item.name === "Root") && (item.redirect = rootPath)
                    return item
                })
                commit('SET_REPLACE_PATH', replacePath)
                commit('SET_DEFAULT_ROUTES')
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