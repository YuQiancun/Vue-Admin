const getters = {
    token: state => state.user.token,
    isLogin: state => state.user.isLogin,
    userInfo: state => state.user.userInfo,
    roles: state => state.permission.roles,
    isRoles: state => state.permission.isRoles,
    routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
    defaultRouters: state => state.permission.defaultRouters,
    replaceRouters: state => state.permission.replaceRouters,
    language: state => state.options.language,
}
export default getters
