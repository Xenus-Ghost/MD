<template>
  <Modal @close="$emit('close')">
    <template v-slot:header>
      <span v-if="ad.account_type_id === 1" class="modal__title">
        Бесплатная публикация
      </span>
      <span v-if="ad.account_type_id === 2" class="modal__title">
        PRO публикация
      </span>
      <span v-if="ad.account_type_id === 3" class="modal__title">
        Премиум публикация
      </span>
    </template>
    <template>
      <div v-if="success" class="advert-form__message_success">
        <h2>Объявление добавлено!</h2>
      </div>
      <form v-if="!success" class="advert-form" @submit.prevent="adSubmit">
        <div
          v-if="ad.type_id === 2 && ad.author_type_id >= 2"
          class="grid_cols_4 grid__column_full"
        >
          <Button
            shape="semi_rounded"
            borders="neon"
            :class="ad.author_type_id === 2 ? 'button_active' : ''"
            @click.native="ad.author_type_id = 2"
          >
            Фирмы и магазины
          </Button>
          <Button
            shape="semi_rounded"
            borders="neon"
            :class="ad.author_type_id === 4 ? 'button_active' : ''"
            @click.native="ad.author_type_id = 4"
          >
            Интернет-магазины
          </Button>
          <Button
            shape="semi_rounded"
            borders="neon"
            :class="ad.author_type_id === 5 ? 'button_active' : ''"
            @click.native="ad.author_type_id = 5"
          >
            Торговый центр
          </Button>
          <Button
            shape="semi_rounded"
            borders="neon"
            :class="ad.author_type_id === 6 ? 'button_active' : ''"
            @click.native="ad.author_type_id = 6"
          >
            Завод
          </Button>
        </div>
        <label for="title" class="label grid__column_6">
          <input
            id="title"
            v-model="ad.title"
            class="input"
            type="text"
            placeholder="Название объявления"
            required
            maxlength="30"
          />
        </label>
        <label for="name" class="label grid__column_6">
          <input
            id="name"
            v-model="ad.name"
            class="input"
            type="text"
            :placeholder="
              ad.author_type_id === 4
                ? 'Название интернет-магазина'
                : ad.author_type_id === 2
                ? 'Название фирмы/компании'
                : 'Фамилия Имя Отчество'
            "
            maxlength="60"
            required
          />
        </label>
        <CategorySelect
          v-model="category_ids"
          class="grid__column_6"
          :categories="categories"
        />
        <label for="description" class="label grid__column_6">
          <textarea
            id="description"
            v-model="ad.description"
            name=""
            rows="10"
            class="input_textarea"
            required
            placeholder="Описание"
          >
          </textarea>
        </label>
        <PhoneInputGroup
          v-model="ad.phone"
          :count="phoneCount"
          class="grid__column_3"
        />
        <label
          v-if="ad.account_type_id !== 1"
          for="website"
          class="label grid__column_3"
        >
          <input
            id="website"
            v-model="ad.website"
            type="url"
            inputmode="url"
            class="input"
            placeholder="Ссылка на сайт"
            autocomplete="url"
          />
        </label>
        <label
          v-if="ad.account_type_id !== 1"
          for="vk"
          class="label grid__column_3"
        >
          <input
            id="vk"
            v-model="social.vk"
            type="text"
            class="input"
            placeholder="ссылка на сообщество VK"
          />
        </label>
        <label
          v-if="ad.account_type_id !== 1"
          for="ok"
          class="label grid__column_3"
        >
          <input
            id="ok"
            v-model="social.ok"
            type="text"
            class="input"
            placeholder="ссылка на сообщество OK"
          />
        </label>
        <label
          v-if="ad.account_type_id !== 1"
          for="ig"
          class="label grid__column_3"
        >
          <input
            id="ig"
            v-model="social.ig"
            type="text"
            class="input"
            placeholder="ссылка на Instagram"
          />
        </label>
        <label
          v-if="ad.account_type_id !== 1"
          for="fb"
          class="label grid__column_3"
        >
          <input
            id="fb"
            v-model="social.fb"
            type="text"
            class="input"
            placeholder="ссылка на сообщество FB"
          />
        </label>
        <label for="price" class="label grid__column_3">
          <input
            id="price"
            v-model="ad.price"
            type="number"
            step="any"
            min="0"
            class="input"
            placeholder="Стоимость"
            required
            inputmode="decimal"
          />
        </label>
        <div v-if="ad.type_id !== 3" class="grid__column_full grid_cols_2">
          <div class="">
            <FileUploader
              v-model="ad.photo"
              multiple
              auto-upload
              preview
              file-type="image"
            >
              Загрузить фотографии
            </FileUploader>
          </div>
          <div v-if="ad.account_type_id !== 1" class="">
            <VideoUploader v-model="ad.video"></VideoUploader>
          </div>
        </div>
        <div
          v-if="
            ad.account_type_id !== 1 &&
            ad.author_type_id >= 2 &&
            ad.type_id !== 3
          "
          class="grid__column_full"
        >
          <FileUploader v-model="ad.logo" auto-upload preview file-type="image">
            Загрузить логотип
          </FileUploader>
        </div>
        <div
          v-if="ad.type_id !== 3 && ad.account_type_id !== 1"
          class="grid__column_full grid_cols_2"
        >
          <div class="">
            <FileUploader
              v-model="ad.price_list"
              file-type="document"
              auto-upload
              :max="1"
            >
              Загрузить Прайс-лист
            </FileUploader>
            <span class="label">
              Формат документа: .doc , .xlsx , .pdf, .pptx
            </span>
          </div>
          <div class="">
            <FileUploader
              v-model="ad.presentation"
              file-type="document"
              auto-upload
              :max="1"
            >
              Загрузить Презентацию
            </FileUploader>
            <span class="label">
              Формат документа: .doc , .xlsx , .pdf, .pptx
            </span>
          </div>
        </div>
        <AddressInputGroup class="grid__column_6" :count="3" />
        <label for="start_time" class="label grid__column_3">
          <input
            id="start_time"
            v-model="ad.start_time"
            class="input_date"
            type="date"
            placeholder="Дата начала"
          />
        </label>
        <label v-show="false" for="end_time" class="label grid__column_3">
          <input
            id="end_time"
            v-model="ad.end_time"
            class="input_date"
            type="date"
            placeholder="Дата окончания"
          />
        </label>
        <label
          v-show="ad.account_type_id === 3"
          for="period"
          class="label grid__column_3"
        >
          <input
            id="period"
            v-model="ad.period"
            type="number"
            min="1"
            max="36"
            step="1"
            class="input"
            placeholder="Период подачи"
            inputmode="numeric"
            @change="changePeriod"
          />
        </label>
        <Button type="submit">
          Опубликовать
        </Button>
        <div v-if="errors" class="grid__column_3 advert-form__messages">
          <span class="advert-form__messages-title">
            Ошибка
          </span>
          <ul class="messages-list">
            <li
              v-for="(item, j) in errors"
              :key="j"
              class="messages-list__element_error"
            >
              {{ item[0] }}
            </li>
          </ul>
        </div>
      </form>
    </template>
    <template v-slot:footer></template>
  </Modal>
</template>

<script>
import VideoUploader from '@/components/lk/VideoUploader/VideoUploader'

import { getUrl } from '@/assets/js/util'
import FileUploader from '@/components/FileUploader'
import CategorySelect from '@/components/lk/CategorySelect'
import { PhoneInputGroup, AddressInputGroup } from '@/components/lk/Ads/Inputs'
export default {
  name: 'AddForm',
  components: {
    FileUploader,
    CategorySelect,
    PhoneInputGroup,
    AddressInputGroup,
    VideoUploader,
  },
  props: {
    props: {
      type: Object || Array,
      default: {},
    },
  },
  data() {
    return {
      errors: null,
      success: null,
      ad: {
        author_id: this.$auth.$state.user.id,
        author_type_id: 1,
        type_id: 1,
        rootCategory: 0,
        category: 0,
        city: '',
        description: null,
        phone: [],
        social: [],
        address: '',
        metro: '',
        start_time: new Date().toISOString().substr(0, 10),
        end_time: this.endTime,
        period: 1,
        website: null,
        ticker: null,
        status_id: 1,
        account_type_id: 1,
        photo: [],
        price: null,
      },
      adSubCategories: [],
      social: {
        vk: null,
        ig: null,
        ok: null,
        fb: null,
      },
      category_ids: null,
      phoneCount: 1,
      addressCount: 1,
      citiesList: this.$store.state.address.citiesList,
      metroList: this.$store.state.address.metroList,
    }
  },
  computed: {
    categories() {
      const list = this.$store.state.categories.adCategoriesList
      let returnData = []
      /* let filterField = 'service_title'
      if (this.ad.type_id === 1) {
        filterField = 'service_title'
      } else if (this.ad.type_id === 2) {
        filterField = 'sale_title'
      } */
      // returnData = list.filter((result) => result[filterField])
      let authorTypeField = null

      switch (this.ad.author_type_id) {
        case 1:
          authorTypeField = 'private-person'
          break
        case 2:
          authorTypeField = 'firm'
          break
        case 4:
          authorTypeField = 'online-shop'
          break
        case 5:
          authorTypeField = 'shopping-center'
          break
        case 6:
          authorTypeField = 'plant'
          break
        default:
          authorTypeField = null
          break
      }

      returnData = list.filter((result) =>
        result.meta.find(
          (res) =>
            res.type_id === this.ad.type_id &&
            authorTypeField !== null &&
            res[authorTypeField] === 1
        )
      )
      return returnData
    },
  },
  mounted() {
    this.ad.account_type_id = this.props.account_type_id
    this.ad.author_type_id = this.props.author_type_id
    this.ad.type_id = this.props.type_id

    if (this.ad.author_type_id >= 2) this.phoneCount = 3
    if (this.ad.author_type_id >= 2) this.addressCount = 3
  },
  methods: {
    async adSubmit() {
      const formData = this.ad
      if (formData.account_type_id === 1) {
        delete formData.website
      }
      formData.category_ids = this.category_ids

      if (this.social.fb) formData.social.push(this.social.fb)
      if (this.social.ok) formData.social.push(this.social.ok)
      if (this.social.ig) formData.social.push(this.social.ig)
      if (this.social.vk) formData.social.push(this.social.vk)
      Object.keys(formData).forEach(
        (key) => !formData[key] && delete formData[key]
      )

      if (this.ad.region !== 'Московская область' && !this.ad.city)
        this.ad.city = this.ad.region

      await this.$axios
        .$post(getUrl('me/advertisements'), formData)
        .then((response) => {
          this.success = true
        })
        .catch((error) => {
          this.errors = error.response.data.errors
        })
    },
    changePeriod() {
      const date = new Date()
      date.setMonth(date.getMonth() + this.ad.period)
      const endDate = date.toISOString().split('T')[0]
      this.ad.end_time = endDate
    },
  },
}
</script>

<style scoped></style>
