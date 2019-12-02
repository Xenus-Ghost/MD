<template>
  <div :class="classList" class="ad__item">
    <img :src="ad.img" alt="" class="ad__logo" />
    <span class="ad__title">{{ ad.title }}</span>
    <span class="ad__caption">{{ ad.caption }}</span>
    <Button :to="ad.url" shape="rounded" borders="outline">Открыть</Button>
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
      if (this.adData.title) obj.title = this.adData.title
      if (this.adData.caption) obj.caption = this.adData.caption
      if (this.adData.url) obj.url = this.adData.url
      return obj
    },
    classList() {
      const arr = []
      if (this.ad.ad_type === 'pro' || this.ad.ad_type === 'premium')
        arr.push('ad__item_' + this.ad.ad_type)
      return arr
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/scss/app/index.scss';
@import 'ad';
</style>
