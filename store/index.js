export const state = () => ({
  isAuthFormShow: false,
  authFormType: 'login'
})

export const mutations = {
  authFormOpen(state, type = 'login') {
    state.isAuthFormShow = true
    state.authFormType = type
    document.querySelector('body').classList.add('body-scroll_lock')
  },
  authFormClose(state, type) {
    state.isAuthFormShow = false
    document.querySelector('body').classList.remove('body-scroll_lock')
  }
}
