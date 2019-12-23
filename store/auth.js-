import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    state: {
      isAuthFormShow: false
    },
    mutations: {
      authFormOpen(state) {
        state.isAuthFormShow = true
      },
      authFormClose(state) {
        state.isAuthFormShow = false
      }
    }
  })

export default store
