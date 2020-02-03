<template>
  <client-only>
    <div class="video-uploader">
      <Button @click.native="modalVideoOpen">Добавить видео</Button>
      <Modal v-if="modalVideoShow" @close="modalVideoClose">
        <template #body>
          <h1>Введите ссылки или ID видео на Youtube</h1>
          <label for="video-1">#1</label>
          <input
            id="video-1"
            v-model="videoURL[0]"
            type="text"
            @input="update"
          />
          <label for="video-2">#2</label>
          <input
            id="video-2"
            v-model="videoURL[1]"
            type="text"
            @input="update"
          />
          <label for="video-3">#3</label>
          <input
            id="video-3"
            v-model="videoURL[2]"
            type="text"
            @input="update"
          />
          <label for="video-4">#4</label>
          <input
            id="video-4"
            v-model="videoURL[3]"
            type="text"
            @input="update"
          />
          <Button @click.native="modalVideoClose">Сохранить</Button>
        </template>
      </Modal>
    </div>
  </client-only>
</template>

<script>
import { convertYoutubeLink } from '@/assets/js/util'
export default {
  name: 'VideoUploader',
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  data() {
    return {
      videoURL: [],
      modalVideoShow: false
    }
  },
  methods: {
    modalVideoOpen() {
      this.modalVideoShow = true
    },
    modalVideoClose() {
      this.modalVideoShow = false
    },
    update(e) {
      for (let i = 0; i < this.videoURL.length; i++) {
        this.videoURL[i] = convertYoutubeLink(this.videoURL[i])
      }
      this.$emit('change', this.videoURL)
    }
  }
}
</script>
