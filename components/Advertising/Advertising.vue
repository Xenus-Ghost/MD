<template>
  <section class="advertising">
    <div v-if="adList" class="advertising__slider">
      <div
        v-for="(ad, i) in adList"
        :key="i"
        :class="[
          'advertising__slide',
          ad.type_id === 1 ? 'advertising__slide_wide' : '',
        ]"
      >
        <a :href="ad.url ? ad.url : '#'" class="advertising__link">
          <!--          <img class="advertising__image" :src="ad.path" :alt="ad.title" />-->
          <component
            :is="ad.video_code ? mediaComponent : 'img'"
            class="advertising__image"
            :video-id="ad.video_code"
            :src="ad.path ? getFileUrl(ad.path) : null"
            :alt="ad.title"
            height="100%"
          ></component>
          <div class="advertising__title">
            {{ ad.title }}
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import { getFileUrl } from '@/assets/js/util'

export default {
  name: 'Advertising',
  components: {},
  props: {
    category: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      ads: {},
      adList: null,
    }
  },
  computed: {
    mediaComponent() {
      return () => import(`@/components/Media/Video/EmbedVideo`)
    },
  },
  created() {
    this.$axios
      .get(`banners/${this.category}`)
      .then((result) => {
        if (result.data.data.small.length || result.data.data.large.length) {
          this.$set(this, 'ads', result.data.data)
          this.makeList()
        }
      })
      .catch((error) => console.error(error))
  },
  methods: {
    makeList() {
      const list = []
      if (this.ads.large && this.ads.large.length) list.push(this.ads.large[0])
      const freeCells = 4 - list.length * 2
      for (let i = 0; i < freeCells; i++) {
        if (this.ads.small[i]) {
          list.push(this.ads.small[i])
        } else break
      }
      this.$set(this, 'adList', list)
    },
    getFileUrl(path) {
      return getFileUrl(path)
    },
  },
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
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 160px 120px;
  grid-gap: 10px;
  @include on_desktop() {
    grid-gap: 30px;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 240px;
    /*grid-auto-rows: 250px;*/
  }
}
.advertising__slide {
  padding: 5px;
  /*  @include on_mobile() {
    flex: 100%;
    max-width: 100%;
  }*/
  &_wide {
    grid-column: span 2;
  }
}
.advertising__link {
  position: relative;
}
.advertising__title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  min-height: 50px;
  text-align: center;
}
.advertising__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
