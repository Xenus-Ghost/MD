<template>
  <div :class="classList">
    <image-slider
      :slides="ad.photos"
      :alt="ad.title"
      class="ad__slider"
      @click="adOpen"
    />
    <span v-if="ad.title" class="ad__title ad__name">{{ ad.title }}</span>
    <span class="ad__sub-title" style="text-align: center">{{
      ad.short_desc
    }}</span>
    <div class="ad__contacts grid_cols_2">
      <div class="grid__column">
        <div v-if="ad.addresses && ad.addresses[0]" class="ad__address">
          {{ ad.addresses[0] }}
        </div>
        <div v-if="ad.metro && ad.metro[0]" class="ad__metro">
          {{ ad.metro[0] }}
        </div>
      </div>
      <div class="grid__column">
        <a
          v-if="ad.phones && ad.phones.length > 0"
          :href="`tel:${ad.phones[0]}`"
          class="ad__phone"
        >
          {{ ad.phones[0] }}
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
import { ImageSlider } from '@/components/Slider'
import {
  adComputedData,
  adMethods,
  adProps,
} from '~/assets/js/mixins/advertisements'
export default {
  name: 'AdItemPlant',
  components: { ImageSlider },
  mixins: [adProps, adMethods, adComputedData],
}
</script>
