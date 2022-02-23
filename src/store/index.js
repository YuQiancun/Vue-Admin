import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'

Vue.use(Vuex)

const module = {}
const req = require.context('./modules', false, /\.js$/)
req.keys().forEach(key => {
  const name = key.substring(2, key.length - 3)
  module[name] = req(key).default
})

export default new Vuex.Store({
  modules: {
    ...module
  },
  getters
})
