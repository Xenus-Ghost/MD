<template>
  <client-only>
    <div class="embed">
      <iframe
        id="ytplayer"
        type="text/html"
        :width="width"
        height="auto"
        class="embed__iframe"
        :src="
          `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&origin=${origin_url}`
        "
        frameborder="0"
      ></iframe>
    </div>
  </client-only>
</template>

<script>
// import { VueYouTubeEmbed, youtube } from 'vue-youtube-embed'
export default {
  name: 'EmbedVideo',
  // components: [VueYouTubeEmbed, youtube],
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
  min-height: 400px;
}
</style>
