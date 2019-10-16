<template>
  <section class="advertising">
    <div class="advertising__slider">
      <div v-for="(ad, i) in ads" :key="i" class="advertising__slide">
        <NuxtLink :to="ad.url">
          <img :src="ad.img" alt="" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Advertising',
  props: {
    category: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      ads: {
        0: {
          title: '',
          img: '/img/advertising/maxresdefault.jpg',
          url: '/'
        },
        1: {
          title: '',
          img: '/img/advertising/dsk_banner_aksay_september_insta.jpg',
          url: '/'
        },
        2: {
          title: '',
          img: '/img/advertising/739_original.jpg',
          url: '/'
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.advertising__slider {
  display: flex;
}
.advertising__slide {
  padding: 5px;
}
</style>
