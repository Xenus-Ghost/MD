<template>
  <client-only>
    <div class="embed" :style="{ 'padding-bottom': `${aspectRatio * 100}%` }">
      <iframe
        id="ytplayer"
        type="text/html"
        :width="width"
        :height="height"
        class="embed__iframe"
        loading="lazy"
        :src="videoSrc"
        frameborder="0"
        :style="styles"
      ></iframe>
    </div>
  </client-only>
</template>

<script>
// import { VueYouTubeEmbed, youtube } from 'vue-youtube-embed'
import { convertYoutubeLink } from '~/assets/js/util'
import { Measurable } from '@/assets/js/mixins/measurables/index.js'
export default {
  name: 'EmbedVideo',
  // components: [VueYouTubeEmbed, youtube],
  mixins: [Measurable],
  props: {
    videoId: {
      type: String,
      required: true,
    },
    width: {
      type: String || Number,
      default: '100%',
    },
    aspectRatio: {
      type: String || Number,
      default: 9 / 16,
    },
  },
  data() {
    return {
      origin_url: null,
    }
  },
  computed: {
    styles() {
      const styles = {}
      if (this.Width) styles.width = this.Width
      if (this.Height) styles.height = this.Height
      if (this.minWidth) styles['min-width'] = this.minWidth
      if (this.maxWidth) styles['max-width'] = this.maxWidth
      if (this.minHeight) styles['min-height'] = this.minHeight
      if (this.maxHeight) styles['max-height'] = this.maxHeight
      // if (this.aspectRatio)
      //   styles['padding-bottom'] = `${this.aspectRatio * 100}%`
      return styles
    },
    videoSrc() {
      const videoLink = `https://www.youtube-nocookie.com/embed/${convertYoutubeLink(
        this.videoId.value ? this.videoId.value : this.videoId
      )}?autoplay=0&origin=${this.origin_url}`
      return videoLink
    },
  },
  created() {
    if (process.client) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      this.origin_url = window.location.href
    }
  },
}
</script>

<style lang="scss">
.embed {
  position: relative;
  width: 100%;
  & + .embed {
    margin-top: 1rem;
  }
  &__iframe {
    position: absolute;
    top: 0;
    left: 0;
    /*min-height: 400px;*/
    height: 100%;
  }
}
</style>
