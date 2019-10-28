export const state = () => ({
  isAuthFormShow: false
})

export const mutations = {
  authFormOpen(state, isAuthFormShow) {
    console.log('ddd')
    state.isAuthFormShow = true
  },
  authFormClose(state, isAuthFormShow) {
    state.isAuthFormShow = false
  }
}
