

const state = {
    token: sessionStorage.getItem("token") || null,
    user_info: {},
    isLogin: false
}

const mutations = {
    SET_TOKEN(state, data) {
        // 存储
        sessionStorage.setItem("token", data);
        state.token = data
        state.isLogin = true
    },
    CLEAR_TOKEN(state) {
        sessionStorage.clear()
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
            resolve()
        })
    }
}

export default {
    state,
    mutations,
    actions
}