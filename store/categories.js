// import { getUrl } from '@/assets/js/util'

export const state = () => ({
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
  evCategoriesList: {}
})

export const mutations = {
  getAdCategories(state, data) {
    state.adCategoriesList = data
  },
  getEventsCategories(state, data) {
    state.evCategoriesList = data
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
  }
}
