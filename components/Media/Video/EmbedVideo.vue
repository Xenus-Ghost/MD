<template>
  <client-only>
    <div class="embed">
      <iframe
        id="ytplayer"
        type="text/html"
        :width="width"
        :height="height"
        class="embed__iframe"
        loading="lazy"
        :src="
          `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&origin=${origin_url}`
        "
        frameborder="0"
        :style="styles"
      ></iframe>
    </div>
  </client-only>
</template>

<script>
// import { VueYouTubeEmbed, youtube } from 'vue-youtube-embed'
import { Measurable } from '@/assets/js/mixins/measurables/index.js'
export default {
  name: 'EmbedVideo',
  // components: [VueYouTubeEmbed, youtube],
  mixins: [Measurable],
  props: {
    videoId: {
      type: String,
      required: true
    },
    width: {
      type: String || Number,
      default: '100%'
    }
  },
  data() {
    return {
      origin_url: null
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
      return styles
    }
  },
  created() {
    if (process.client) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      this.origin_url = window.location.href
    }
  }
}
</script>

<style scoped>
.embed__iframe {
  /*min-height: 400px;*/
}
</style>
