import { constantRouterMap, constantRouterErrorMap, asyncRootMap } from "@/router"
import { asyncRoutes } from "@/router/routes.js"
import { toEnumeration } from "@/libs/utils"

function FilterMenuMeta(role, menu) {
    if(role.meta){
        if(menu.meta) {
            Object.assign(menu.meta, role.meta)
        } else {
            menu.meta = role.meta
        }
    }
}

function FilterMenuRoles(roles = [], menu = {}, redirect = []) {
    let arr = []
    roles.forEach(item => {
        if(menu[item.name.toLowerCase()]) {
            if(item.children && menu[item.name.toLowerCase()].children) {
                let subMenu = menu[item.name.toLowerCase()]
                let redirectPath = JSON.parse(JSON.stringify(redirect))
                redirectPath.push(subMenu.path.replace(/\//, ''))
                subMenu.children = FilterMenuRoles(item.children, toEnumeration(subMenu.children, "name", str => String(str).toLowerCase()), redirectPath)
                subMenu.children.length > 0 && (subMenu.redirect = "/".concat(redirectPath.join("/"), "/", subMenu.children[0].path))
                subMenu.children.length === 0 && delete subMenu.redirect
                FilterMenuMeta(item, subMenu)
                arr.push(subMenu)
            } else {
                let subMenu = menu[item.name.toLowerCase()]
                delete subMenu.children
                FilterMenuMeta(item, subMenu)
                arr.push({...subMenu})
            }
        }
    })
    return arr
}

// 过滤隐藏，和只显示子类的页面路径
function FilterMenuTree(Menu) {
    let MenuTree = []
    Menu.forEach(item => {
        /**
         * 1. 没有meta 不寻找根路径
         * 2. 有子类寻找子类，没有子类直接返回一级根路径
         * 2.1 有children 且 showSub为false 往下寻找第一位
         */
        if(item.meta && !item.meta.hidden) {
            if(item.children && !item.meta.showSub) {
                item.children = FilterMenuTree(item.children || [])
                MenuTree.push(item)
            } else if(item.meta.showSub) {
                // 先查找到指定Name的子元素，如果没有取顺位第一
                const SubMenuName = item.meta.showSubName
                let SubMenu = item.children.filter((sub, index) => {
                    return SubMenuName ? (sub.name === SubMenuName) : (index === 0)
                })
                item.children = FilterMenuTree(SubMenu)
                MenuTree.push(item)
            } else {
                MenuTree.push(item)
            }
        }
    })
    return MenuTree
}

// 获取顺位第一的RootPath路径
function FilterMenuRootPath(Menu, BasePath = "") {
    let arr = []
    for (let i = 0; i < Menu.length; i++) {
        if(Menu[i].children) {
            arr = arr.concat(FilterMenuRootPath(Menu[i].children, BasePath.concat("/", Menu[i].path).replace(/\/+/g, "/")))
        } else {
            arr.push(BasePath.concat("/", Menu[i].path).replace(/\/+/g, "/"))
        }
    }
    return arr
}

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
            // setTimeout(() => {
                // 假比对权限
                // console.log(FilterMenuRoles(roles, asyncRoutes))
                // accessedRouters = asyncRoutesArr.filter(route => {
                //     return !/^A$/.test(route.name)
                // })
                accessedRouters = FilterMenuRoles(roles, asyncRoutes)
                // console.log("accessedRouters", accessedRouters)
                commit('SET_ROLES', roles)
                // 如果没有Home首页访问权限，则获取顺序第一个的首页 meta.hidden:false 的第一个
                // rootPath未做hidden判断，以后再处理
                const MenuTree = FilterMenuTree(accessedRouters)
                let RootPath = FilterMenuRootPath(MenuTree)

                const replacePath = asyncRootMap.map(item => {
                    (RootPath.length && item.name === "Root") && (item.redirect = RootPath[0])
                    return item
                })

                console.log("accessedRouters", accessedRouters)
                // console.log("得到replacePath", replacePath)
                commit('SET_REPLACE_PATH', replacePath)
                commit('SET_DEFAULT_ROUTES')
                commit('SET_ROUTES', accessedRouters)

                resolve()
            // }, 1000)
        })
    }
}

export default {
    state,
    mutations,
    actions
}
