<template>
  <client-only>
    <div class="uploader">
      <input
        :id="'files_' + selectorId"
        ref="fileInput"
        type="file"
        class="uploader__input"
        :multiple="multiple"
        @change="fileSelected($event)"
      />
      <Button :disabled="currentCount > max" @click.native="onPickFile">
        <slot>выбрать файлы</slot>
      </Button>
      <Button v-if="loadButton" @click.native="upload()">Загрузить</Button>
      <div class="uploader__message-list">
        <span class="uploader__message">Максимум: {{ max }}</span>
      </div>
      <div v-if="preview || autoUpload" class="uploader__list">
        <div v-for="(file, j) in uploaded" :key="j" class="uploader__file">
          <img
            v-if="fileType === 'image'"
            :src="getFileUrl(file.path)"
            class="uploader__image_loaded"
            :alt="j"
            title="Загружено"
          />
          <img
            v-if="fileType === 'document'"
            src="@/assets/img/icons/doc.svg"
            class="uploader__document_loaded"
            :alt="j"
            :title="getFileUrl(file.path)"
          />
          <div
            class="uploader__button_remove"
            title="Удалить"
            @click="removeFile(j)"
          >
            X
          </div>
        </div>
      </div>
      <div class="uploader__error-list">
        <div v-for="(error, q) in errors" :key="q" class="uploader__error">
          {{ error.fileName }}
          Ошибка {{ error.status }}
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import { BACKEND_API_URL } from '@/constants'
import { getFileUrl, generateString } from '@/assets/js/util'

export default {
  name: 'FileUploader',
  components: {
    // UploadImage
  },
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    multiple: {
      type: Boolean,
      default: null,
    },
    vModel: {
      type: Array || Object || String,
      default: null,
    },
    autoUpload: {
      type: Boolean,
      default: false,
    },
    preview: {
      type: Boolean,
      default: false,
    },
    fileType: {
      type: String,
      default: 'image',
    },
    base64: {
      type: Boolean,
      default: false,
    },
    loadButton: {
      type: Boolean || String,
      default: null,
    },
    dataURL: {
      type: String,
      default: null,
    },
    max: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      files: {},
      image: null,
      url: BACKEND_API_URL + 'files',
      response: {},
      uploaded: [],
      errors: [],
    }
  },
  computed: {
    uploadedFiles() {
      return this.uploadedFiles
    },
    selectorId() {
      return generateString()
    },
    currentCount() {
      return this.uploaded.length
    },
  },
  methods: {
    fileSelected(event) {
      const files = document.getElementById('files_' + this.selectorId).files
      this.files = files
      if (this.autoUpload) {
        this.upload()
      }
      if (this.base64 && this.fileType === 'image') {
        const reader = new FileReader()
        reader.onloadend = (e) => {
          this.image = e.target.result
          this.update()
        }
        reader.readAsDataURL(files[0])
      }
      this.update()
      this.$emit('onFilesSelected')
    },
    async upload() {
      let formData = new FormData()
      for (let i = 0; i < this.files.length; i++) {
        if (this.uploaded.length > this.max) {
          this.$toast.error('Превышено максимальное количество фотографий!')
          return
        }
        const file = this.files[i]
        // console.log(file)
        formData.append('files[' + i + ']', file)
        await this.$axios
          .post(this.url, formData)
          .then((response) => {
            this.uploaded.push(response.data.data[0])
            formData = new FormData()
            // this.currentCount++
          })
          .catch((error) => {
            console.log(error.response)
            this.errors.push({
              fileName: file.name,
              size: file.size,
              status: error.response.status,
            })
          })
      }
      this.update()
      this.$emit('onFilesUpload', this.uploaded)
      // console.debug('uploaded')
    },
    onPickFile() {
      this.$refs.fileInput.click()
    },
    removeFile(id) {
      this.uploaded.splice(id, 1)
      this.update()
      this.$emit('onFileRemove')
    },
    update() {
      // console.debug('update', this.image)
      if (this.base64) {
        this.$emit('change', this.image)
      } else {
        let data = []
        this.uploaded.forEach((image) => {
          if (image && image.path) {
            if (this.multiple) {
              data.push(image.path)
            } else {
              data = image.path
            }
          }
        })
        this.$emit('change', data)
        // console.log('update', data)
      }
    },
    getFileUrl(path) {
      return getFileUrl(path)
    },
    makeError(fileName, message = '') {
      this.errors.push({
        fileName,
        status: message,
      })
    },
  },
}
</script>

<style lang="scss">
@import './uploader.scss';
</style>
