<template>
  <div :class="classList">
    <ad-item-views v-if="adType !== 2" :views="ad.views" />
    <img
      v-if="authorType > 1 && (ad.logo || ad.img)"
      :src="ad.logo ? ad.logo : ad.img"
      :alt="ad.title"
      class="ad__logo ad__logo_eshop"
      @click="adOpen"
    />
    <span class="ad__sub-title">{{ ad.title }}</span>
    <a :href="ad.website" class="ad__website" target="_blank">{{
      ad.website
    }}</a>
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
  name: 'AdItemOnline',
  components: {
    AdItemViews,
  },
  mixins: [adProps, adMethods, adComputedData],
}
</script>
