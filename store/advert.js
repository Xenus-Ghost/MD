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
    if (data.social && data.social.length > 0) {
      data.social.forEach((item) => {
        if (item.includes('vk.com')) {
          data.socials.push({ name: 'vk', value: item })
        } else if (item.includes('ok.ru')) {
          data.socials.push({ name: 'ok', value: item })
        } else if (item.includes('facebook.com')) {
          data.socials.push({ name: 'fb', value: item })
        } else if (item.includes('instagram.com')) {
          data.socials.push({ name: 'ig', value: item })
        }
      })
      // data.socials.vk = data.social.filter((e) => {
      //   return e.includes('vk.com')
      // })
      // data.socials.ok = data.social.filter((e) => {
      //   return e.includes('ok.ru')
      // })
      // data.socials.fb = data.social.filter((e) => {
      //   return e.includes('facebook.com')
      // })
      // data.socials.ig = data.social.filter((e) => {
      //   return e.includes('instagram.com')
      // })
    }
    data.social = data.socials
    // console.log(data.social)
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
