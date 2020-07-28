<template>
  <div :class="classList">
    <ad-item-views v-if="adType !== 2" :views="ad.views" />
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
import AdItemViews from './AdItemViews'
import {
  adProps,
  adMethods,
  adComputedData,
} from '~/assets/js/mixins/advertisements'
export default {
  name: 'AdItem',
  components: {
    AdItemViews,
  },
  mixins: [adProps, adMethods, adComputedData],
}
</script>

<style lang="scss">
/*@import '~assets/scss/app/index.scss';*/
/*@import 'scss/ad_item';*/
</style>
