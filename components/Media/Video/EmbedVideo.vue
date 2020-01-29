<template>
  <client-only>
    <div class="embed">
      <iframe
        id="ytplayer"
        type="text/html"
        width="640"
        height="360"
        :src="
          'https://www.youtube.com/embed/' +
            videoId +
            '?autoplay=0&origin=http://example.com'
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
    }
  },
  data() {
    return {
      origin_url: null
    }
  },
  created() {
    console.log(this.$router.path)
  }
}
</script>

<style scoped></style>
