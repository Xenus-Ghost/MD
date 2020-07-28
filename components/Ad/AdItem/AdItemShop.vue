<template>
  <div :class="classList">
    <ad-item-views v-if="adType !== 2" :views="ad.views" />
    <img
      v-if="(ad.logo || ad.img)"
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
    <span v-if="ad.price" class="ad__price">{{
      ad.price ? ad.price + 'руб' : ''
    }}</span>
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
  adComputedData,
  adMethods,
  adProps,
} from '~/assets/js/mixins/advertisements'
export default {
  name: 'AdItemShop',
  components: {
    AdItemViews,
  },
  mixins: [adProps, adMethods, adComputedData],
}
</script>
