<template>
  <section class="ad">
    <client-only>
      <adFilter v-model="filter" @change="adsRefresh" />
    </client-only>
    <div :class="classList">
      <component
        :is="adItemComponent"
        v-for="(ad, i) in ads"
        :key="i"
        :ad-data="ad"
        :private-ad="privateAd === true"
        :company-ad="companyAd === true"
        :customer-ad="customerAd === true"
        :class="[category === 119 ? 'ad__item_country' : '']"
        :ad-type="typeId"
        :author-type="authorTypeId"
      ></component>
    </div>
    <client-only>
      <ad-modal
        v-if="isAdOpen"
        :ad-modal-data="adModalData"
        :author-type-id="authorTypeId"
        :customer-ad="customerAd"
        :is-ad-open="isAdOpen"
        :private-ad="privateAd"
        @adClose="adClose"
      />
    </client-only>
  </section>
</template>

<script>
import { getFileUrl } from '@/assets/js/util'
import { adFilter } from '@/components/Ad'
import AdModal from '@/components/Ad/AdModal/AdModal'

const qs = require('qs')

export default {
  name: 'AdList',
  components: {
    AdModal,
    adFilter,
  },
  props: {
    category: {
      type: Number,
      default: 0,
    },
    privateAd: {
      type: Boolean,
    },
    adsProp: {
      type: Array || Object,
      default: null,
    },
    companyAd: {
      type: Boolean,
    },
    customerAd: {
      type: Boolean,
    },
    authorTypeId: {
      type: Number,
      default: 1,
    },
    accountTypeId: {
      type: Number,
      default: null,
    },
    typeId: {
      type: Number,
      default: 1,
    },
    filterData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      ads: this.adsProp,
      meta: {
        current_page: 1,
        last_page: 1,
        per_page: 99,
        total: 0,
      },
      links: {
        first: null,
        last: null,
        next: null,
        prev: null,
      },
      videoShow: false,
      index: null,
      filter: {
        city: '',
        metro: '',
        address: '',
        region: '',
      },
      claimFormShow: false,
    }
  },
  computed: {
    isAdOpen() {
      return this.$store.state.advert.isAdModalOpen
    },
    adModalData() {
      return this.$store.state.advert.adModalData
    },
    classList() {
      const arr = ['ad__list']
      const categoryId = this.category
      const newBuildingId = [127, 128, 129, 130]
      if (this.privateAd) {
        arr.push('ad__list_private')
      } else if (this.companyAd) {
        arr.push('ad__list_company')
      } else if (this.customerAd) {
        arr.push('ad__list_customer')
      }
      if (categoryId === 119) arr.push('ad__list_building', 'ad__list_country')
      if (newBuildingId.includes(categoryId)) arr.push('ad__list_building')
      if (this.authorTypeId === 4) arr.push('ad__list_eshop')
      if (this.authorTypeId === 5) arr.push('ad__list_center')
      if (this.authorTypeId === 6) arr.push('ad__list_plant')
      return arr
    },
    citiesList() {
      return this.$store.state.address.citiesList
    },
    metroList() {
      return this.$store.state.address.metroList
    },
    adItemComponent() {
      let component
      /* [118, 119, 127, 128, 129, 130].includes(this.category) ||
        this.authorTypeId === 6
          ? 'AdItemBuilding'
          : 'AdItem' */
      // if (this.authorTypeId === 4) component = 'AdItemOnline'
      switch (this.authorTypeId) {
        case 2: {
          component = 'AdItem'
          break
        }
        case 3: {
          component = 'AdItemShop'
          break
        }
        case 4: {
          component = 'AdItemOnline'
          break
        }
        case 5: {
          component = 'AdItemCenter'
          break
        }
        case 6: {
          component = 'AdItemPlant'
          break
        }
        case 7: {
          component = 'AdItemBuilding'
          break
        }
        default: {
          component = 'AdItem'
        }
      }
      console.log(component)
      console.log(this.authorTypeId)
      return () => import(`@/components/Ad/AdItem/${component}`)
    },
  },
  created() {
    if (this.$route.query)
      if (this.$route.query.id) {
        this.getAd(this.$route.query.id)
      }
  },
  methods: {
    async getAds() {
      if (this.adsProp.length > 0) this.ads = this.adsProp
      const params = {
        category_id: this.category,
        per_page: 12,
        author_type_id: this.authorTypeId,
        type_id: this.typeId,
        // metro: this.filter.metro ? this.filter.metro : null,
        // city: this.filter.city ? this.filter.city : null
      }
      if (this.filter.metro) params.metro = this.filter.metro
      if (this.filter.city) params.city = this.filter.city
      const url = `advertisements?${qs.stringify(params)}`
      await this.$axios
        .get(url)
        .then((e) => {
          this.ads = e.data.data
          this.meta = e.data.meta
          this.links = e.data.links
        })
        .catch((e) => {
          console.log(e)
        })
    },
    async getAd(id = 0) {
      const url = `advertisements/${id}`
      await this.$axios
        .get(url, {
          params: {
            with: ['categories', 'author'],
          },
        })
        .then((e) => {
          // this.ad = e.data.data
          console.log(e.data.data, 'modal')
          e.data.data.categories = e.data.data.categories
            ? e.data.data.categories
            : null
          if (e.data.data.logo) e.data.data.logo = getFileUrl(e.data.data.logo)
          // e.data.data.addresses = e.data.data.addresses
          e.data.data.city = e.data.data.city.split('------')
          e.data.data.metro = e.data.data.metro.split('------')
          this.$store.dispatch('advert/adModalOpen', e.data.data)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    adOpen() {
      return false
    },
    adClose() {
      this.$router.replace({ query: {} })
      this.$store.dispatch('advert/adModalClose')
    },
    getFileUrl(path) {
      return getFileUrl(path)
    },
    adsRefresh() {
      this.getAds()
    },
  },
}
</script>
<style lang="scss">
@import 'scss/ad';
</style>
