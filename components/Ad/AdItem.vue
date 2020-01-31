<template>
  <div :class="classList" class="ad__item">
    <img v-if="ad.logo" :src="ad.logo" :alt="ad.title" class="ad__logo" />
    <img :src="ad.img" :alt="ad.title" class="ad__photo" />
    <span v-if="ad.name" class="ad__title ad__name">{{ ad.name }}</span>
    <span class="ad__sub-title">{{ ad.title }}</span>
    <span v-if="ad.caption" class="ad__caption">{{ ad.caption }}</span>
    <Button
      :to="ad.url"
      borders="outline"
      shape="rounded"
      class="ad__button"
      @click.native="adOpen"
    >
      Открыть
    </Button>
  </div>
</template>

<script>
import { getFileUrl } from '@/assets/js/util'
export default {
  name: 'AdItem',
  props: {
    adData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    privateAd: {
      type: Boolean
    },
    companyAd: {
      type: Boolean
    }
  },
  computed: {
    ad() {
      const obj = {}

      obj.ad_type = this.adData.ad_type ? this.adData.ad_type : ''
      obj.id = this.adData.id
      obj.author_id = this.adData.author_id ? this.adData.author_id : null
      obj.account_type_id = this.adData.account_type_id
        ? this.adData.account_type_id
        : null
      if (this.adData.title) obj.title = this.adData.title
      if (this.adData.name) obj.name = this.adData.name
      if (this.adData.caption) obj.caption = this.adData.caption
      if (this.adData.description) obj.description = this.adData.description
      if (this.adData.address) obj.address = this.adData.address
      if (this.adData.website) obj.website = this.adData.website
      if (this.adData.photo && this.adData.photo.length > 0)
        obj.photo = this.adData.photo
      obj.img = this.adData.img
        ? this.adData.img
        : obj.photo
        ? getFileUrl(obj.photo[0])
        : ''
      obj.logo = this.adData.logo ? getFileUrl(this.adData.logo) : null
      if (this.adData.video && this.adData.video.length > 0)
        obj.video = this.adData.video
      if (this.adData.phone && this.adData.phone.length > 0) {
        obj.phone = this.adData.phone
      }
      if (this.adData.url) obj.url = this.adData.url
      // console.log(obj)
      return obj
    },
    classList() {
      const arr = []
      if (this.ad.account_type_id === 2) {
        arr.push('ad__item_pro')
      }
      if (this.ad.account_type_id === 3) {
        arr.push('ad__item_premium')
      }
      if (this.privateAd) arr.push('ad__item_private')
      if (this.companyAd) arr.push('ad__item_company')
      return arr
    }
  },
  methods: {
    adOpen() {
      this.$store.dispatch('adModalOpen', this.ad)
      this.$route.query.id = this.ad.id
    }
  }
}
</script>

<style lang="scss">
@import '~assets/scss/app/index.scss';
@import 'scss/ad_item';
</style>
