import { getFileUrl } from '~/assets/js/util'

export const adProps = {
  props: {
    adData: {
      type: Object,
      default: () => {
        return {}
      },
    },
    privateAd: {
      type: Boolean,
    },
    companyAd: {
      type: Boolean,
    },
    customerAd: {
      type: Boolean,
    },
    adType: {
      type: Number || String,
      default: null,
    },
    authorType: {
      type: Number || String,
      default: null,
    },
  },
}

export const adMethods = {
  methods: {
    adOpen() {
      this.$store.dispatch('advert/adModalOpen', this.ad)
      this.$router.push({ query: { id: this.ad.id } })
      // this.adData.views++
    },
  },
}

export const adComputedData = {
  computed: {
    ad() {
      const obj = this.adData
      if (obj.presentation) obj.presentation = getFileUrl(obj.presentation)
      if (obj.price_list) obj.price_list = getFileUrl(obj.price_list)
      if (obj.photos && obj.photos.length > 0) {
        obj.photos.forEach(
          (item, i) =>
            (obj.photos[i] = item.value ? item.value : getFileUrl(item))
        )
      }
      obj.img = this.adData.img
        ? this.adData.img
        : obj.photos && obj.photos.length > 0
        ? getFileUrl(obj.photos[0])
        : ''
      if (this.customerAd) obj.img = '/img/icons/employee.png'
      obj.logo = obj.logo ? getFileUrl(obj.logo) : null
      return obj
    },
    classList() {
      const arr = ['ad__item']
      if (this.ad.account_type_id === 2) {
        arr.push('ad__item_pro')
      } else if (this.ad.account_type_id === 3) {
        arr.push('ad__item_premium')
      }
      if (this.privateAd) {
        arr.push('ad__item_private')
      } else if (this.companyAd) {
        arr.push('ad__item_company')
      } else if (this.customerAd) {
        arr.push('ad__item_customer')
      }
      if (this.authorType === 4) arr.push('ad__item_eshop')
      if (this.authorType === 5) arr.push('ad__item_center')
      return arr
    },
  },
}
