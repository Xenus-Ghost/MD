// import axios from 'axios'

export const state = () => ({
  isAuthFormShow: false,
  authFormType: 'login',
  isCategoriesWidgetShow: false,
  redirectTo: '',
  adCategoriesList: [
    {
      parent_id: null,
      service_title: 'Строительство',
      id: 1
    },
    {
      id: 2,
      service_title: 'Кладочные работы',
      parent_id: 1
    },
    {
      id: 3,
      service_title: 'Земляные работы',
      parent_id: 1
    }
  ],
  evCategoriesList: {},
  isAdModalOpen: false,
  adModalData: {},
  navigation: {
    links: {
      current: null,
      first: null,
      prev: null,
      next: null,
      last: null
    }
  }
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
  },
  adModalOpen(state, data) {
    state.isAdModalOpen = true
  },
  adModalClose(state) {
    state.isAdModalOpen = false
  },
  adDataAdd(state, data) {
    state.adModalData = data
  }
}

export const actions = {
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
  },
  adModalOpen({ commit }, data) {
    commit('adModalOpen')
    commit('adDataAdd', data)
    if (typeof document !== 'undefined') {
      document.querySelector('body').classList.add('body-scroll_lock')
    }
  },
  adModalClose({ commit }) {
    commit('adModalClose')
    if (typeof document !== 'undefined') {
      document.querySelector('body').classList.remove('body-scroll_lock')
    }
  }
}
