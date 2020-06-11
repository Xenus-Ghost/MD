<template>
  <div :class="classList">
    <image-slider
      :slides="ad.photo"
      :alt="ad.title"
      class="ad__slider"
      @click="adOpen"
    />
    <span v-if="ad.title" class="ad__title ad__name">{{ ad.title }}</span>
    <span class="ad__sub-title" style="text-align: center;">{{
      ad.short_desc
    }}</span>
    <div class="ad__contacts grid_cols_2">
      <div class="grid__column">
        <div v-if="ad.address && ad.address[0].street" class="ad__address">
          {{ ad.address[0].street }}
        </div>
        <div v-if="ad.address && ad.address[0].metro" class="ad__metro">
          {{ ad.address[0].metro }}
        </div>
      </div>
      <div class="grid__column">
        <a
          v-if="ad.phone && ad.phone.length > 0"
          :href="`tel:${ad.phone[0]}`"
          class="ad__phone"
        >
          {{ ad.phone[0] }}
        </a>
      </div>
    </div>
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
import { ImageSlider } from '@/components/Slider'
export default {
  name: 'AdItemBuilding',
  components: { ImageSlider },
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
      if (this.adData.author) obj.author = this.adData.author
      obj.short_desc = this.adData.short_desc
      obj.description = this.adData.description

      if (this.adData.website) obj.website = this.adData.website
      if (this.adData.website) obj.email = this.adData.email
      if (this.adData.presentation)
        obj.presentation = getFileUrl(this.adData.presentation)
      if (this.adData.price_list)
        obj.price_list = getFileUrl(this.adData.price_list)
      if (this.adData.price) obj.price = this.adData.price
      if (this.adData.photo && this.adData.photo.length > 0) {
        obj.photo = this.adData.photo
        const photoLength = obj.photo.length
        for (let i = 0; i < photoLength; i++) {
          obj.photo[i] = getFileUrl(obj.photo[i])
        }
      }
      obj.img = this.adData.img
        ? this.adData.img
        : obj.photo
        ? obj.photo[0]
        : ''
      if (this.customerAd) obj.img = '/img/icons/employee.png'
      obj.logo = this.adData.logo ? getFileUrl(this.adData.logo) : null
      if (this.adData.video && this.adData.video.length > 0)
        obj.video = this.adData.video
      if (this.adData.phone && this.adData.phone.length > 0) {
        obj.phone = this.adData.phone
      }
      obj.social = this.adData.social
      obj.views = this.adData.views
      obj.categories = this.adData.categories ? this.adData.categories : null

      if (this.adData.city) obj.city = this.adData.city
      if (this.adData.address) obj.address = this.adData.address
      /* if (this.adData.metro)
        obj.metro =
          typeof this.adData.metro === 'string'
            ? this.adData.metro.split('------')
            : this.adData.metro */
      if (this.adData.ogrn) obj.ogrn = this.adData.ogrn
      return obj
    },
    classList() {
      const arr = ['ad__item', 'ad__item_building']
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
      return arr
    },
  },
  methods: {
    adOpen() {
      this.$store.dispatch('advert/adModalOpen', this.ad)
      this.$router.push({ query: { id: this.ad.id } })
      this.adData.views++
    },
  },
}
</script>

<style lang="scss">
@import 'scss/ad_item';
</style>
