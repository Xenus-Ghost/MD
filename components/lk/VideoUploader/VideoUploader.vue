<template>
  <client-only>
    <div class="video-uploader">
      <Button @click.native="modalVideoOpen">Добавить видео</Button>
      <Modal v-if="modalVideoShow" @close="modalVideoClose">
        <template>
          <h1>Введите ссылки или ID видео на Youtube</h1>
          <label v-for="i in max" :key="i" :for="`video-${i}`"
            >#{{ i }}
            <input
              id="video-1"
              v-model="videoURL[0]"
              type="text"
              @input="update"
            />
          </label>
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
  props: {
    max: {
      type: Number,
      default: 1
    }
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
