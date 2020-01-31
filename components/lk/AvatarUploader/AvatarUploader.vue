<template>
  <div class="my-stencil" :style="style">
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
    <FileUploader
      v-model="img"
      base64
      :load-button="true"
      @onFilesUpload="onFilesUpload"
    ></FileUploader>
    <ul v-if="errors" class="errors">
      <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
    </ul>
    <div v-if="result === 'success'" class="success">
      Изображение успешно заменено
    </div>
  </div>
</template>

<script>
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import { getUrl } from '@/assets/js/util'
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
      images: [],
      errors: null,
      result: null
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
      data.avatar = this.images[0].path
      const userId = this.$store.state.auth.user.id
      const url = getUrl(`admin/users/${userId}`)
      await this.$axios
        .put(url, data)
        .then((e) => {
          console.log(e.response)
          this.result = 'success'
        })
        .catch((e) => {
          console.log(e)
          console.log(e.response)
          this.errors = e.response
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
