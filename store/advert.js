import { getFileUrl, getUrl } from '@/assets/js/util'

export const state = () => ({
  isAdModalOpen: false,
  adModalData: {
    photo: []
  },
  authorType: [
    {
      id: 1,
      name: 'Частники',
      slug: 'частники'
    },
    {
      id: 2,
      name: 'Фирмы и магазины',
      slug: 'фирмы-и-магазины'
    },
    {
      id: 3,
      name: 'Частники',
      slug: 'частники'
    },
    {
      id: 4,
      name: 'Интернет-магазины',
      slug: 'интернет-магазины'
    },
    {
      id: 5,
      name: 'Торговые центры',
      slug: 'торговые-центры'
    }
  ],
  adType: [
    { id: 1, name: 'Услуги', slug: 'услуги' },
    { id: 2, name: 'Продажа', slug: 'продажа' },
    { id: 3, name: 'Заказчики', slug: 'заказчики' }
  ]
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
  },
  adModalDataAddView(state, data) {
    state.adModalData.views++
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
    this.$axios
      .post(getUrl(`advertisements/${data.id}/views/increment`))
      .then((e) => commit('adModalDataAddView', data))
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
