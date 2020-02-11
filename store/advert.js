import { getFileUrl } from '@/assets/js/util'

export const state = () => ({
  isAdModalOpen: false,
  adModalData: {
    photo: []
  }
})

export const mutations = {
  adModalOpen(state) {
    state.isAdModalOpen = true
  },
  adModalClose(state) {
    state.isAdModalOpen = false
    state.adModalData = { photo: [] }
  },
  adDataAdd(state, data) {
    state.adModalData = data
  }
}

export const actions = {
  adModalOpen({ commit }, data) {
    if (data.photo && data.photo.length > 0) {
      data.photo = data.photo.map((name) => {
        return getFileUrl(name)
      })
    }
    data.socials = []
    // console.log(data.social)
    // console.log(Object.keys(data.social))
    try {
      if (data.social && data.social.length > 0) {
        data.social.forEach((item) => {
          if (typeof item === 'string') {
            if (item.includes('vk.com')) {
              data.socials.push({ name: 'vk', value: item })
            } else if (item.includes('ok.ru')) {
              data.socials.push({ name: 'ok', value: item })
            } else if (item.includes('facebook.com')) {
              data.socials.push({ name: 'fb', value: item })
            } else if (item.includes('instagram.com')) {
              data.socials.push({ name: 'ig', value: item })
            }
          }
        })
      }
    } catch {
      console.debug(data.social)
      console.debug(data.socials)
    }
    if (data.socials && data.socials.length > 0) data.social = data.socials
    commit('adDataAdd', data)
    commit('adModalOpen')
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
