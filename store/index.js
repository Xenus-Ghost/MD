export const state = () => ({
  isAuthFormShow: false,
  authFormType: 'login'
})

export const mutations = {
  authFormOpen(state, type = 'login') {
    state.isAuthFormShow = true
    state.authFormType = type
  },
  authFormClose(state, type) {
    state.isAuthFormShow = false
  }
}
