/**
 * 工程自动化 动态路由
 * @type {{}}
 */
const modules = {}
const req = require.context('./modules', false, /\.js$/)
req.keys().forEach(key => {
    const name = key.substring(2, key.length - 3)
    modules[name] = req(key).default
})

export const asyncRoutes = modules