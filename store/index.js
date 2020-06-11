// import axios from 'axios'

import { getUrl } from '@/assets/js/util'

export const state = () => ({
  isAuthFormShow: false,
  authFormType: 'login',
  isCategoriesWidgetShow: false,
  redirectTo: '',
  navigation: {
    links: {
      current: null,
      first: null,
      prev: null,
      next: null,
      last: null,
    },
  },
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
}

export const actions = {
  async nuxtServerInit({ commit, getters }, { req, isDev }) {
    /* await this.$axios
      .get(getUrl('advertisement-categories'))
      .then((response) => {
        commit('categories/getAdCategories', response.data.data)
      })
      .catch((error) => console.error(error + error.response)) */
    const cached = true
    const [adCategories, EvCategories] = await Promise.all([
      this.$axios
        .get('advertisement-categories', {
          params: { with: 'meta' },
          validateStatus: false,
        })
        .catch((error) => {
          console.error(error)
          console.error(error.data)
          console.error(error.status)
          console.error(error.headers)
        }),
      cached
        ? await JSON.parse(
            require('fs').readFileSync(
              'static/json_cache/evCategoriesList.json',
              'utf8'
            )
          )
        : this.$axios
            .get('/event-categories')
            .catch((error) => console.error(error + error.response)),
    ])
    if (adCategories)
      commit('categories/getAdCategories', adCategories.data.data)
    if (EvCategories) commit('categories/getEventsCategories', EvCategories)
  },
}
