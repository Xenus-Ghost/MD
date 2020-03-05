<template>
  <form action="" class="grid banner-form" @submit.prevent="submit">
    <div class="grid__column_1">
      <label for="" class="input-label">
        <input
          id="title"
          v-model="bannerData.title"
          name="title"
          type="text"
          class="input"
          placeholder="Заголовок"
          required
        />
      </label>
      <label for="" class="input-label">
        <input
          id="path"
          v-model="bannerData.path"
          name="path"
          type="text"
          class="input"
          placeholder="Ссылка"
          required
        />
      </label>
      <CategorySelect v-model="bannerData.categories" />
      <label for="">
        <select
          id="type_id"
          v-model="bannerData.type_id"
          class="input_select"
          name="type_id"
          required
        >
          <option value="2" class="input_option" selected>Обычный</option>
          <option value="1" class="input_option">Широкий</option>
        </select>
      </label>
      <label for="">
        <select
          id="active"
          v-model="bannerData.active"
          class="input_select"
          name="active"
          required
        >
          <option value="1" class="input_option" selected>Активно</option>
          <option value="0" class="input_option">Не активно</option>
        </select>
      </label>
    </div>

    <div class="grid__column_1">
      <FileUploader v-model="bannerData.image" />
      <VideoUploader v-model="bannerData.video" max="1" />
    </div>
    <div class="grid__column_2">
      <Button type="submit">Готово</Button>
      <div class="message">
        <span v-if="message.success && !message.errors" class="message__text">
          Успешно!
        </span>
      </div>
    </div>
  </form>
</template>

<script>
import CategorySelect from '@/components/lk/CategorySelect'
import { VideoUploader } from '@/components/lk'
import FileUploader from '@/components/FileUploader'
import { getUrl } from '@/assets/js/util'
export default {
  name: 'BannerForm',
  components: { CategorySelect, VideoUploader, FileUploader },
  props: {
    banner: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      bannerData: {
        type_id: 2,
        active: 1,
        title: null,
        path: null,
        categories: null,
        image: null,
        video: null
      },
      message: {
        success: false,
        errors: null
      }
    }
  },
  computed: {
    isEdit() {
      return !!this.banner
    }
  },
  created() {
    if (this.banner) this.$set(this, 'bannerData', this.banner)
  },
  methods: {
    async submit() {
      const formData = {
        type_id: this.bannerData.type_id,
        active: this.bannerData.active,
        title: this.bannerData.title,
        path: this.bannerData.path,
        categories: this.bannerData.categories
      }
      const url = this.isEdit
        ? getUrl(`admin/banners/${this.bannerData.id}`)
        : getUrl(`admin/banners`)
      const axisoMethod = this.isEdit ? 'put' : 'post'
      await this.$axios({
        method: axisoMethod,
        url,
        data: formData
      })
        .then((response) => {
          // this.message.success = true
          this.$set(this.message, 'success', true)
          console.log(this.message)
        })
        .catch((error) => {
          // this.message.errors.push(error.response.data.errors)
          console.error(error)
        })
    }
  }
}
</script>

<style scoped></style>
