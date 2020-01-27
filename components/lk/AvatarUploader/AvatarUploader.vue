<template>
  <div class="my-stencil" :style="style">
    <FileUploader
      v-model="img"
      base64
      :load-button="true"
      @onFilesUpload="onFilesUpload"
    ></FileUploader>
    <cropper
      ref="cropper"
      stencil-component="circle-stencil"
      classname="cropper"
      :src="img"
      :stencil-props="{
        minAspectRatio: 1,
        maxAspectRatio: 1
      }"
      :style="{}"
      @change="change"
    >
      <CircleStencil></CircleStencil>
    </cropper>
    <CircleStencil v-if="1 === 0"></CircleStencil>
  </div>
</template>

<script>
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import FileUploader from '@/components/FileUploader'
export default {
  name: 'AvatarUploader',
  components: {
    Cropper,
    CircleStencil,
    FileUploader
  },
  data() {
    return {
      img: null,
      coordinates: {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      },
      image: null,
      canvas: null,
      images: []
    }
  },
  methods: {
    change({ coordinates, canvas }) {
      console.log(coordinates, canvas)
      this.canvas = canvas
    },
    onFilesUpload(e) {
      this.images = e
      this.setAvatar()
    },
    async setAvatar() {
      const data = {}
      data.avatar = this.images[0].url
      const userId = this.$store.state.auth.user.id
      await this.$axios
        .put(
          `https://admin.xn--80aaledd0beefeg0ch.xn--p1ai/api/admin/users/${userId}`,
          data
        )
        .then((e) => {
          console.log(e.response)
        })
        .catch((e) => {
          console.log(e)
          console.log(e.response)
        })
    }
  }
}
</script>

<style scoped>
.cropper {
  max-width: 400px;
  height: 50vh;
  max-height: 500px;
  background: rgba(13, 34, 79, 0.5);
}
</style>
