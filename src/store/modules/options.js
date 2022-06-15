const state = {
    language: localStorage.getItem("language") || "zh-CN"
}

const mutations = {
    SET_LANGUAGE(state, language) {
        state.language = language
        localStorage.setItem("language", language)
    }
}

const actions = {
}

export default {
    state,
    mutations,
    actions
}