export const state = () => ({
  isAuthFormShow: false,
  authFormType: 'login',
  isCategoriesWidgetShow: false
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
  },
  categoriesWidgetClose(state) {
    state.isCategoriesWidgetShow = false
    document.querySelector('body').classList.remove('body-scroll_lock_mobile')
  },
  categoriesWidgetOpen(state) {
    state.isCategoriesWidgetShow = true
    document.querySelector('body').classList.add('body-scroll_lock_mobile')
  }
}
