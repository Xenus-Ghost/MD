<template>
  <section class="ad">
    <div class="ad__filter"></div>
    <div class="ad__list">
      <AdItem v-for="(ad, i) in ads" :key="i" :adData="ad"></AdItem>
    </div>
  </section>
</template>

<script>
import AdItem from '@/components/Ad/AdItem'
export default {
  name: 'AdList',
  components: {
    AdItem
  },
  data() {
    return {
      ads: {
        0: {
          title: 'ООО “Прогресс”',
          caption: 'Бурение',
          img: '/img/ads/11.png',
          url: '/',
          ad_type: 'premium'
        },
        1: {
          title: 'ООО “Энергосбыт”',
          caption: 'Тротуарная плитка',
          img: '/img/ads/l3.png',
          url: '/',
          ad_type: 'pro'
        },
        2: {
          title: 'ООО “Сапсан”',
          caption: 'Вентиляция и кондиционеры',
          img: '/img/ads/riverbed-logo-og-image.png',
          url: '/'
        },
        3: {
          title: 'ООО “Альфа”',
          caption: 'Бурение',
          img: '/img/advertising/3800412.png',
          url: '/'
        }
      }
    }
  },
  created() {},
  methods: {}
}
</script>

<style scoped lang="scss">
@import 'ad';
</style>
