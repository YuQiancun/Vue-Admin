

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
    }
}

export default {
    state,
    mutations,
    actions
}