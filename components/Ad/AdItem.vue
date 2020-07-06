<template>
  <div :class="classList">
    <div
      v-if="adType !== 2"
      class="views ad__views"
      :title="`Просмотров: ${ad.views}`"
    >
      <img
        src="~assets/img/icons/eye.svg"
        :alt="`Просмотров: ${ad.views}`"
        class="views__icon"
      />
      <span class="views__value">{{ ad.views }}</span>
    </div>
    <img
      v-if="authorType > 1 && (ad.logo || ad.img)"
      :src="ad.logo ? ad.logo : ad.img"
      :alt="ad.title"
      :class="[
        'ad__logo',
        authorType === 4 ? 'ad__logo_eshop' : '',
        authorType === 5 ? 'ad__logo_center' : '',
      ]"
      @click="adOpen"
    />
    <img
      v-if="adType === 1 || (adType === 2 && authorType === 1)"
      :src="ad.img"
      :alt="ad.title"
      class="ad__photo"
      @click="adOpen"
    />
    <span
      v-if="ad.author && ad.author['first_name'] && ad.type_id === 3"
      class="ad__title ad__name"
      >{{
        `${ad.author['first_name']} ${
          ad.author['last_name'] ? ad.author['last_name'] : ''
        }`
      }}</span
    >
    <span v-if="!customerAd" class="ad__sub-title">{{ ad.title }}</span>
    <div v-if="authorType === 5" class="ad__photos ad__photos_center">
      <img
        v-for="(img, i) in ad.photos.slice(0, 4)"
        :key="i"
        :src="img"
        alt=""
        class="ad__photo_center"
      />
    </div>
    <span
      v-if="ad.price && authorType !== 4 && authorType !== 5"
      class="ad__price"
      >{{ ad.price ? ad.price + 'руб' : '' }}</span
    >
    <span v-if="authorType === 5" class="ad__sub-title">
      {{ ad.short_desc }}
    </span>
    <a
      v-if="authorType === 4"
      :href="ad.website"
      class="ad__website"
      target="_blank"
      >{{ ad.website }}</a
    >
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
      // if (this.adData.caption) obj.caption = this.adData.caption
      obj.short_desc = this.adData.short_desc
      obj.description = this.adData.description

      if (this.adData.website) obj.website = this.adData.website
      if (this.adData.website) obj.email = this.adData.email
      if (this.adData.presentation)
        obj.presentation = getFileUrl(this.adData.presentation)
      if (this.adData.price_list)
        obj.price_list = getFileUrl(this.adData.price_list)
      if (this.adData.price) obj.price = this.adData.price
      if (
        !this.customerAd &&
        this.adData.photos &&
        this.adData.photos.length > 0
      )
        obj.photos = this.adData.photos
      if (obj.photos && obj.photos.length > 0) {
        obj.photos.forEach(
          (item, i) =>
            (obj.photos[i] = item.value ? item.value : getFileUrl(item))
        )
      }
      // console.log(getFileUrl(obj.photos[0]))
      obj.img = this.adData.img
        ? this.adData.img
        : obj.photos && obj.photos.length > 0
        ? getFileUrl(obj.photos[0])
        : ''
      if (this.customerAd) obj.img = '/img/icons/employee.png'
      obj.logo = this.adData.logo ? getFileUrl(this.adData.logo) : null
      if (this.adData.videos && this.adData.videos.length > 0)
        obj.videos = this.adData.videos
      if (this.adData.phones && this.adData.phones.length > 0) {
        obj.phones = this.adData.phones
      }
      obj.social = []
      if (this.adData.ig) obj.social.push(this.adData.ig)
      if (this.adData.vk) obj.social.push(this.adData.vk)
      if (this.adData.ok) obj.social.push(this.adData.ok)
      if (this.adData.fb) obj.social.push(this.adData.fb)
      // obj.metro = this.adData.metro
      obj.views = this.adData.views
      obj.categories = this.adData.categories ? this.adData.categories : null

      // obj.metro = typeof this.adData.metro === "string" ? [this.adData.metro] : this.adData.metro
      // obj.address = typeof this.adData.address === "string" ? [this.adData.address] : this.adData.address
      // obj.city = typeof this.adData.city === "string" ? [this.adData.city] : this.adData.city
      // if (this.adData.city) obj.city = this.adData.city
      if (this.adData.addresses) obj.addresses = this.adData.addresses
      if (this.adData.metro) obj.metro = this.adData.metro
      // if (this.adData.url) obj.url = this.adData.url
      // console.log(obj)
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
  methods: {
    adOpen() {
      this.$store.dispatch('advert/adModalOpen', this.ad)
      // this.$route.query.id = this.ad.id
      // this.$route.push({ path: '', query: { id: this.ad.id } })

      // this.$set(this.$route.query, 'id', this.ad.id)

      this.$router.push({ query: { id: this.ad.id } })

      this.adData.views++
    },
  },
}
</script>

<style lang="scss">
/*@import '~assets/scss/app/index.scss';*/
/*@import 'scss/ad_item';*/
</style>
