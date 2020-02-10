import { getUrl } from '@/assets/js/util'

export const state = () => ({
  addressList: []
})

export const mutations = {
  saveAddressList(state, data) {
    state.addressList = data
  }
}

export const actions = {
  nuxtServerInit({ commit }) {
    // this.store.dispatch('')
    this.$axios
      .get(getUrl('addresses'))
      .then((e) => this.commit('saveAddressList', e))
  },
  getAdresses({ commit }) {}
}
