<template>
  <Modal @close="close">
    <template v-slot:header>
      <span class="modal__title">
        {{
          `${
            ad.account_type_id === 1
              ? 'Бесплатная'
              : ad.account_type_id === 2
              ? 'PRO'
              : 'Премиум'
          } публикация`
        }}
      </span>
    </template>
    <template>
      <div v-if="success" class="advert-form__message_success">
        <h2>Объявление добавлено!</h2>
      </div>
      <form v-if="canPost" class="advert-form" @submit.prevent="adSubmit">
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
            v-if="ad.account_type_id !== 1"
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
          <Button
            v-if="ad.account_type_id !== 1"
            shape="semi_rounded"
            borders="neon"
            :class="ad.author_type_id === 7 ? 'button_active' : ''"
            @click.native="ad.author_type_id = 7"
          >
            Недвижимость
          </Button>
        </div>
        <x-input
          id="title"
          v-model="ad.title"
          class="grid__column_6"
          input-type="text"
          :placeholder="
            ad.author_type_id === 1
              ? 'Название объявления'
              : ad.author_type_id === 4
              ? 'Название интернет-магазина'
              : 'Название объявления'
          "
          :max-length="30"
        />
        <x-input
          v-if="
            (ad.author_type_id === 2 ||
              ad.author_type_id === 5 ||
              ad.author_type_id === 6)
          "
          id="inn"
          v-model="ad.inn"
          name="inn"
          class="grid__column_6"
          input-type="text"
          placeholder="Реквизиты ИНН ОГРН"
          :max-length="100"
        />
        <CategorySelect
          v-model="category_ids"
          class="grid__column_6"
          :categories="categories"
          :max="maxCategories"
        />
        <label for="description" class="label grid__column_6">
          <textarea
            id="description"
            v-model="ad.description"
            name="description"
            rows="10"
            class="input_textarea"
            required
            placeholder="Описание"
          >
          </textarea>
        </label>
        <PhoneInputGroup
          v-model="ad.phones"
          name="phone[]"
          :count="phoneCount"
          class="grid__column_3"
        />
        <!--<x-input
          v-if="ad.account_type_id !== 1"
          id="website"
          v-model="ad.website"
          name="website"
          class="grid__column_3"
          input-type="url"
          inputmode="url"
          placeholder="Ссылка на сайт"
          autocomplete="url"
        />-->
        <x-input
          v-if="ad.account_type_id !== 1"
          id="vk"
          v-model="ad.vk"
          name="social[vk]"
          class="grid__column_3"
          placeholder="ссылка на сообщество VK"
        />
        <x-input
          v-if="ad.account_type_id !== 1"
          id="ok"
          v-model="ad.ok"
          name="social[ok]"
          class="grid__column_3"
          placeholder="ссылка на сообщество OK"
        />
        <x-input
          v-if="ad.account_type_id !== 1"
          id="ig"
          v-model="ad.ig"
          name="social[ig]"
          class="grid__column_3"
          placeholder="ссылка на Instagram"
        />
        <x-input
          v-if="ad.account_type_id !== 1"
          id="fb"
          v-model="ad.fb"
          name="social[ig]"
          class="grid__column_3"
          placeholder="ссылка на сообщество FB"
        />
        <x-input
          id="price"
          v-model="ad.price"
          name="price"
          class="label grid__column_3"
          input-type="number"
          step="any"
          min="0"
          placeholder="Стоимость"
          required
          inputmode="decimal"
        />
        <div v-if="ad.type_id !== 3" class="grid__column_full grid_cols_2">
          <div class="">
            <FileUploader
              v-model="ad.photos"
              multiple
              auto-upload
              preview
              file-type="image"
              :max="maxPhotos"
            >
              Загрузить фотографии
            </FileUploader>
          </div>
          <div v-if="maxVideo > 0" class="">
            <VideoUploader v-model="ad.videos" :max="maxVideo" />
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
          <FileUploader
            v-model="ad.logo"
            auto-upload
            preview
            file-type="image"
            :max="1"
          >
            Загрузить логотип
          </FileUploader>
        </div>
        <div
          v-if="
            ad.type_id !== 3 &&
            ad.account_type_id === 3 &&
            ad.author_type_id !== 1
          "
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
        <AddressInputGroup
          v-model="addresses"
          class="grid__column_6"
          :count="maxAddress"
          :address-count="maxAddress"
        />
        <label for="start_time" class="label grid__column_3">
          <input
            id="start_time"
            v-model="ad.start_time"
            name="start_time"
            class="input_date"
            type="date"
            placeholder="Дата начала"
          />
        </label>
        <label v-show="false" for="end_time" class="label grid__column_3">
          <input
            id="end_time"
            v-model="ad.end_time"
            name="end_time"
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
            name="period"
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
        <div
          v-if="errors && errors.length >= 1"
          class="grid__column_3 advert-form__messages"
        >
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
      <div
        v-if="!success && (errors && errors.length > 0 && errors.includes('limit'))"
        class="advert-form__message_error"
      >
        <h2>Ошибка!</h2>
        <span>Вы достигли лимита объявлений на своем тарифе</span>
      </div>
    </template>
    <template v-slot:footer></template>
  </Modal>
</template>

<script>
import VideoUploader from '@/components/lk/VideoUploader/VideoUploader'

import {
  getAuthorTypeFieldName,
  getMaxCategories,
  getMaxPhotos,
  getMaxVideos,
  getMaxAddresses,
} from '@/assets/js/util/ads'
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
      errors: [],
      success: null,
      ad: {
        author_id: this.$auth.$state.user.id,
        author_type_id: 1,
        type_id: 1,
        rootCategory: 0,
        category: 0,
        city: '',
        description: null,
        phones: [],
        social: [],
        addresses: '',
        metro: '',
        start_time: new Date().toISOString().substr(0, 10),
        end_time: this.endTime,
        period: 1,
        website: null,
        ticker: null,
        title: null,
        status_id: 1,
        account_type_id: 1,
        photos: [],
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
      // maxPhoto: 1,
      addresses: {
        address: [],
        city: [],
        region: [],
        metro: [],
      },
      canPost: false,
    }
  },
  computed: {
    categories() {
      const list = this.$store.state.categories.adCategoriesList
      let returnData = []
      const authorTypeField = getAuthorTypeFieldName(this.ad.author_type_id)

      returnData = list.filter((result) =>
        result.meta.find(
          (res) =>
            res.type_id === this.ad.type_id &&
            authorTypeField !== null &&
            res[authorTypeField] === 1
        )
      )
      returnData.forEach((item) => {
        item.label = item.meta.find(
          (metaItem) => metaItem[authorTypeField] === 1
        ).title
      })
      return returnData
    },
    maxVideo() {
      return getMaxVideos({
        adType: this.ad.type_id,
        authorType: this.ad.author_type_id,
        accountType: this.ad.account_type_id,
      })
    },
    maxCategories() {
      return getMaxCategories({
        adType: this.ad.type_id,
        authorType: this.ad.author_type_id,
        accountType: this.ad.account_type_id,
      })
    },
    maxPhotos() {
      return getMaxPhotos({
        adType: this.ad.type_id,
        authorType: this.ad.author_type_id,
        accountType: this.ad.account_type_id,
      })
    },
    maxAddress() {
      return getMaxAddresses({
        adType: this.ad.type_id,
        authorType: this.ad.author_type_id,
        accountType: this.ad.account_type_id,
      })
    },
    maxCurrentAddresses() {
      return 1
    },
  },
  async mounted() {
    this.ad.account_type_id = this.props.account_type_id
    this.ad.author_type_id = this.props.author_type_id
    this.ad.type_id = this.props.type_id
    // eslint-disable-next-line camelcase
    let creatingAvailable = false
    await this.$axios
      .get('/me/advertisements/check', {
        params: {
          account_type_id: this.ad.account_type_id,
          author_type_id: this.ad.author_type_id,
          type_id: this.ad.type_id,
        },
      })
      .then((data) => {
        creatingAvailable = data.data.data.creating_available
        console.log(creatingAvailable)
        // console.log(data.data.data)
        // console.log(data.data.data.creating_available)
        // console.log(data.creating_available)
      })
      .catch((error) => {
        this.$toast.error(error.response.data.message)
      })
    console.log(creatingAvailable)
    // eslint-disable-next-line camelcase
    if (!creatingAvailable) {
      this.success = false
      this.errors.push('limit')
    } else this.canPost = true
    // if (this.ad.author_type_id >= 2) this.phoneCount = 3
    if (this.ad.author_type_id >= 2) this.addressCount = 3

    this.phoneCount =
      this.ad.account_type_id === 2 ? 2 : this.ad.account_type_id === 3 ? 5 : 1
  },
  methods: {
    async adSubmit() {
      const formData = { ...this.ad, ...this.addresses }
      if (formData.account_type_id === 1) {
        delete formData.website
      }
      formData.category_ids = this.category_ids

      if (this.social.fb) formData.social.push(this.social.fb)
      if (this.social.ok) formData.social.push(this.social.ok)
      if (this.social.ig) formData.social.push(this.social.ig)
      if (this.social.vk) formData.social.push(this.social.vk)

      // JUST FOR DEV TEST [[
      formData.addresses = formData.address.filter((el) => !!el)
      // formData.metro = formData.metro[0]
      formData.city = formData.city[0]
      formData.metro = formData.metro.filter((el) => !!el)
      // ]] JUST FOR DEV TEST
      Object.keys(formData).forEach(
        (key) => !formData[key] && delete formData[key]
      )

      delete formData.region

      // if (this.ad.region !== 'Московская область' && !this.ad.city)
      //   this.ad.city = this.ad.region

      // if (this.ad.name === null) this.ad.name = this.ad.title

      await this.$axios
        .$post('me/advertisements', formData)
        .then((response) => {
          this.success = true
          this.canPost = false
          this.$toast.success(`Объявление добавлено`)
          const advertisementId = response.data.id
          if (this.ad.account_type_id > 1) {
            this.$axios
              .$get(`/me/advertisements/${advertisementId}/create-payment`)
              .then((response) => {
                console.log(response)
                window.open(response.url, '_blank')
              })
          }
        })
        .catch((error) => {
          // this.errors = error.response.data.errors
          // this.$set(this, 'errors', error.response.data.errors)
          const errors = error.response.data.errors
          // const errorsLength = errors.length
          for (const [key, value] of Object.entries(errors)) {
            console.log([key, value])
            this.errors.push(value)
          }
          /* for (let i = 0; i < errorsLength; i++) {
            console.log(errors[i])
            this.errors.push(errors[i][0])
          } */
          console.log(errors)
          console.log(errors.length)
          if (error.response.data.message)
            this.$toast.error(
              `Произошла ошибка: ${error.response.data.message}`
            )
        })
    },
    changePeriod() {
      const date = new Date()
      date.setMonth(date.getMonth() + this.ad.period)
      const endDate = date.toISOString().split('T')[0]
      this.ad.end_time = endDate
    },
    close() {
      this.$set(this, 'errors', [])
      this.$set(this, 'success', false)
      this.$emit('close')
    },
  },
}
</script>

<style scoped></style>
