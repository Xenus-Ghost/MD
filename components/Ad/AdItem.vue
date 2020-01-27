<template>
  <div :class="classList" class="ad__item">
    <img :src="ad.img" alt="" class="ad__logo" />
    <span v-if="ad.name" class="ad__name">{{ ad.name }}</span>
    <span class="ad__title">{{ ad.title }}</span>
    <span v-if="ad.caption" class="ad__caption">{{ ad.caption }}</span>
    <Button
      :to="ad.url"
      shape="rounded"
      borders="outline"
      @click.native="adOpen"
      >Открыть</Button
    >
  </div>
</template>

<script>
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
    }
  },
  computed: {
    ad() {
      const obj = {}
      if (this.adData.img) {
        obj.img = this.adData.img
      } else {
        obj.img = ''
      }
      obj.ad_type = this.adData.ad_type ? this.adData.ad_type : ''
      if (this.adData.id) obj.id = this.adData.id
      if (this.adData.author_id) obj.author_id = this.adData.author_id
      // console.log(this.adData.author_id)
      if (this.adData.title) obj.title = this.adData.title
      if (this.adData.name) obj.name = this.adData.name
      if (this.adData.caption) obj.caption = this.adData.caption
      if (this.adData.description) obj.description = this.adData.description
      if (this.adData.address) obj.address = this.adData.address
      if (this.adData.website) obj.website = this.adData.website
      if (this.adData.photos && this.adData.photos.length > 0)
        obj.photos = this.adData.photos
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
      if (this.ad.ad_type === 'pro' || this.ad.ad_type === 'premium')
        arr.push('ad__item_' + this.ad.ad_type)
      if (this.privateAd) arr.push('ad__item_private')
      return arr
    }
  },
  methods: {
    adOpen() {
      this.$store.dispatch('adModalOpen', this.ad)
      this.$route.query.id = this.ad.id
      console.log(this.$route.params)
      console.log(this.$route.query)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/scss/app/index.scss';
@import 'ad';
</style>
