<template>
  <client-only>
    <div class="video-uploader">
      <Button @click.native="modalVideoOpen">Добавить видео</Button>
      <Modal v-if="modalVideoShow" @close="modalVideoClose">
        <template>
          <h1>Введите ссылки или ID видео на Youtube</h1>
          <label v-for="i in max" :key="i" :for="`video-${i - 1}`"
            >#{{ i }}
            <input
              :id="`video-${i - 1}`"
              v-model="videoURL[i - 1]"
              type="text"
              :disabled="i - 1 > 0 && !videoURL[i - 2]"
              @input="update"
            />
          </label>
          <Button @click.native="modalVideoClose">Сохранить</Button>
        </template>
      </Modal>
      <ul class="videos__list">
        <li v-for="(video, v) in videoURL" :key="v" class="videos__list-item">
          {{ video }}
        </li>
      </ul>
    </div>
  </client-only>
</template>

<script>
import { convertYoutubeLink } from '@/assets/js/util'
export default {
  name: 'VideoUploader',
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    max: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      videoURL: [],
      modalVideoShow: false,
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
        if (this.videoURL[i]) {
          this.videoURL[i] = convertYoutubeLink(this.videoURL[i])
        } else {
          console.log(this.videoURL[i])
          delete this.videoURL[i]
        }
      }
      this.$emit('change', this.videoURL)
    },
  },
}
</script>
