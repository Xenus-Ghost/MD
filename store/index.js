// import axios from 'axios'

export const state = () => ({
  isAuthFormShow: false,
  authFormType: 'login',
  isCategoriesWidgetShow: false,
  redirectTo: '',
  adCategoriesList: {},
  evCategoriesList: {}
  // user: {}
})

export const mutations = {
  authFormOpen(state, type = 'login') {
    state.isAuthFormShow = true
    state.authFormType = type
    if (typeof document !== 'undefined') {
      document.querySelector('body').classList.add('body-scroll_lock')
    }
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
  },
  authSaveToken(state, user) {
    state.user = user
  },
  redirectAdd(state, link) {
    state.redirectTo = link
  },
  getAdCategories(state, data) {
    state.adCategoriesList = data
  },
  getEventsCategories(state, data) {
    state.evCategoriesList = data
  }
}

export const actions = {
  /* nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },
  async login({ commit }, { username, password }) {
    try {
      const { data } = await axios.post('/api/login', { username, password })
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  } */
  getAdCategories({ commit }) {
    this.$axios
      .get('https://admin.монтаждемонтаж.рф/api/advertisement-categories')
      .then((response) => {
        // console.log(response.data, this)
        commit('getAdCategories', response.data.data)
      })
  },
  getEventsCategories({ commit }) {
    this.$axios
      .get('https://admin.монтаждемонтаж.рф/api/event-categories')
      .then((response) => {
        // console.log(response.data, this)
        commit('getEventsCategories', response.data.data)
      })
  }
}
