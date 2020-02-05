// import axios from 'axios'
import { getFileUrl } from '@/assets/js/util'

export const state = () => ({
  isAuthFormShow: false,
  authFormType: 'login',
  isCategoriesWidgetShow: false,
  redirectTo: '',

  isAdModalOpen: false,
  adModalData: {
    photo: []
  },
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
  adModalOpen({ commit }, data) {
    commit('adModalOpen')
    if (data.photo && data.photo.length > 0) {
      data.photo = data.photo.map((name) => {
        return getFileUrl(name)
      })
    }
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
