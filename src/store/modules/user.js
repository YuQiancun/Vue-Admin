/**
 *
 * @type {{userInfo: {}, isLogin: boolean, token: (string|null)}}
 */
import Cookies from 'js-cookie'

const state = {
    // token: localStorage.getItem("token") || null,
    token: Cookies.get("token") || null,
    userInfo: {},
    isLogin: false
}

const mutations = {
    SET_TOKEN(state, data) {
        // 存储
        // localStorage.setItem("token", data);
        Cookies.set("token", data, {expires: new Date(new Date().getTime() + 8 * 60 * 60 * 1000)})
        state.token = data
        state.isLogin = true
    },
    SET_USER_INFO(state, data) {
      state.userInfo = data
    },
    CLEAR_TOKEN(state) {
        // 清除
        Cookies.remove("token")
        state.token = null
        state.isLogin = false
    }
}

const actions = {
    LoginByUsername({ commit }, res) {
        return new Promise(resolve => {
            if(res) {
                commit("SET_TOKEN", res.token)
                commit("SET_USER_INFO", res.data)
                resolve()
            }
        })
    },
    LoginOut({ commit }) {
        return new Promise(resolve => {
            commit("CLEAR_TOKEN")
            setTimeout(() => {
                resolve()
            }, 3000)
        })
    }
}

export default {
    state,
    mutations,
    actions
}
