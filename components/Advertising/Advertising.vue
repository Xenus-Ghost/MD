<template>
  <section class="advertising">
    <div class="advertising__slider">
      <div v-for="(ad, i) in ads" :key="i" class="advertising__slide">
        <NuxtLink :to="ad.url">
          <img class="advertising__image" :src="ad.img" alt="" />
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

<style lang="scss">
@import '~assets/scss/app/index.scss';
.advertising {
  /*overflow-x: hidden;*/
  @include on_mobile() {
    max-width: 340px;
    margin: 0 auto;
  }
}
.advertising__slider {
  /*display: flex;*/
  overflow-x: auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
}
.advertising__slide {
  padding: 5px;
  /*  @include on_mobile() {
    flex: 100%;
    max-width: 100%;
  }*/
}
.advertising__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
