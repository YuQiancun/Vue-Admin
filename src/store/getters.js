const getters = {
    token: state => state.user.token,
    isLogin: state => state.user.isLogin,
    user_info: state => state.user.user_info,
    roles: state => state.permission.roles,
    routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
}
export default getters