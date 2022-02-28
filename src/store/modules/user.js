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
                console.log(res.token)
                commit("SET_TOKEN", res.token)
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
