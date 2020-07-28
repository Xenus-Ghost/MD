<template>
  <div :class="classList">
    <ad-item-views v-if="adType !== 2" :views="ad.views" />
    <img
      v-if="authorType > 1 && (ad.logo || ad.img)"
      :src="ad.logo ? ad.logo : ad.img"
      :alt="ad.title"
      :class="['ad__logo', 'ad__logo_center']"
      @click="adOpen"
    />
    <span class="ad__sub-title">{{ ad.title }}</span>
    <div class="ad__photos ad__photos_center">
      <img
        v-for="(img, i) in ad.photos.slice(0, 4)"
        :key="i"
        :src="img"
        alt=""
        class="ad__photo_center"
      />
    </div>
    <span class="ad__sub-title">
      {{ ad.short_desc }}
    </span>
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
  name: 'AdItemCenter',
  components: {
    AdItemViews,
  },
  mixins: [adProps, adMethods, adComputedData],
}
</script>
