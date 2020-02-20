<template>
  <section class="ad">
    <div class="ad__filter ad-filter">
      <span class="ad-filter__title"><b>Фильтр:</b></span>
      <label for="region" class="label">
        <select
          id="region"
          v-model="filter.region"
          class="input_select ad-filter__select"
          required
        >
          <option
            value=""
            selected
            disabled
            class="input_option ad-filter__option"
          >
            Выберите...
          </option>
          <option value="Москва" class="input_option ad-filter__option">
            Москва
          </option>
          <option
            value="Московская область"
            class="input_option ad-filter__option"
          >
            Московская область
          </option>
        </select>
      </label>
      <label v-if="filter.region === 'Москва'" for="metro" class="label">
        <select
          id="metro"
          v-model="filter.metro"
          class="input_select ad-filter__select"
        >
          <option
            value=""
            selected
            disabled
            class="input_option ad-filter__option"
          >
            Метро
          </option>
          <option
            v-for="(metro, i) in metroList"
            :id="`metro_${i}`"
            :key="i"
            :value="metro"
            class="input_option ad-filter__option"
            >{{ metro }}</option
          >
        </select>
      </label>
      <label
        v-if="filter.region === 'Московская область'"
        for="city"
        class="label"
      >
        <select
          id="city"
          v-model="filter.region"
          class="input_select ad-filter__select"
          required
        >
          <option
            value=""
            selected
            disabled
            class="input_option ad-filter__option"
          >
            Выберите...
          </option>
          <option
            v-for="(city, i) in citiesList"
            :id="`city_${i}`"
            :key="i"
            :value="city"
            class="input_option ad-filter__option"
            >{{ city }}</option
          >
        </select>
      </label>
    </div>
    <div class="ad__list" :class="classList">
      <AdItem
        v-for="(ad, i) in ads"
        :key="i"
        :ad-data="ad"
        :private-ad="privateAd === true"
        :company-ad="companyAd === true"
        :customer-ad="customerAd === true"
      ></AdItem>
    </div>
    <client-only>
      <LightBox
        :items="adModalData.photo"
        :index="index"
        loop
        @close="index = null"
      ></LightBox>
    </client-only>
    <Modal v-if="isAdOpen" :class="'ad-modal'" @close="adClose">
      <template>
        <div class="grid grid_cols_2">
          <span class="ad-modal__id_muted">ID: {{ adModalData.id }}</span>
          <div
            class="views ad-modal__views"
            :title="`Просмотров: ${adModalData.views}`"
            style="justify-self: end"
          >
            <img
              src="~assets/img/icons/eye.svg"
              :alt="`Просмотров: ${adModalData.views}`"
              class="views__icon"
            />
            <span class="views__value">{{ adModalData.views }}</span>
          </div>
        </div>
        <h2 v-if="!customerAd" class="ad-modal__title">
          {{ adModalData.title }}
        </h2>
        <div v-show="adModalData.photo" class="ad-modal__photos">
          <a
            v-for="(item, p) in adModalData.photo"
            :key="p"
            :href="item"
            class="ad-modal__photo-link"
            target="_blank"
            @click.prevent="setIndex(p)"
          >
            <img :src="item" alt="photo" class="ad-modal__photo" />
          </a>
        </div>
        <div v-if="!customerAd">
          <h3>Категории работ:</h3>
        </div>
        <div v-if="!customerAd" class="line_horizontal"></div>
        <div :class="{ grid_cols_3: !customerAd, grid_cols_12: customerAd }">
          <div v-if="customerAd" class="grid__column_2">
            <img
              v-if="customerAd"
              style="    width: 100%;
    height: 100%;
    object-fit: contain;"
              src="/img/icons/employee.png"
              alt="Заказчик"
            />
          </div>
          <div
            :class="[
              {
                grid__column_2: !customerAd,
                grid__column_10: customerAd
              },
              'grid',
              'grid-row-gap_4'
            ]"
          >
            <h2 class="ad-modal__name">{{ adModalData.name }}</h2>
            <div class="ad-modal__id">ID: {{ adModalData.author_id }}</div>
            <div
              v-for="(item, j) in adModalData.phone"
              :key="j"
              class="ad-modal__phone"
            >
              {{ item }}
            </div>
            <div class="ad-modal__address">{{ adModalData.address }}</div>
            <div v-if="adModalData.metro" class="ad-modal__address_metro">
              <svg
                class="icon-svg_metro"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#icon-svg_metro)">
                  <path
                    d="M16.0715 0H1.92859C0.865115 0 0 0.865115 0 1.92859V16.0715C0 17.1349 0.865115 18 1.92859 18H16.0715C17.1349 18 18 17.1349 18 16.0715V1.92859C18 0.865115 17.1349 0 16.0715 0V0ZM16.7143 16.0715C16.7143 16.4261 16.4261 16.7143 16.0715 16.7143H1.92859C1.5739 16.7143 1.28574 16.4261 1.28574 16.0715V1.92859C1.28574 1.5739 1.5739 1.28574 1.92859 1.28574H16.0715C16.4261 1.28574 16.7143 1.5739 16.7143 1.92859V16.0715Z"
                    fill="white"
                  />
                  <path
                    d="M13.7464 3.90695C13.506 3.80651 13.2297 3.86173 13.0458 4.0463L9.00029 8.0918L4.9548 4.0463C4.7715 3.863 4.49461 3.80775 4.25418 3.90695C4.01375 4.00615 3.85742 4.24092 3.85742 4.50083V14.1419H5.14312V6.05278L8.54572 9.45538C8.79682 9.70649 9.20362 9.70649 9.45478 9.45538L12.8574 6.05278V14.1419H14.1431V4.50088C14.1432 4.24097 13.9868 4.00615 13.7464 3.90695Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="icon-svg_metro">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              {{ adModalData.metro }}
            </div>
            <div v-if="adModalData.social" class="ad-modal__socials">
              <a
                v-for="(i, j) in adModalData.social"
                :key="j"
                :href="i.value"
                target="_blank"
              >
                <img :src="`/img/icons/social/${i.name}.png`" :alt="i.value" />
              </a>
            </div>
          </div>
          <div v-if="!customerAd" :class="['grid__column_1', 'grid_rows_4']">
            <Button shape="rounded" borders="outline">
              Добавить в избранное
            </Button>
            <Button
              v-if="adModalData.video"
              shape="rounded"
              borders="outline"
              @click.native="showEmbedVideos"
            >
              Показать видео
            </Button>
            <Button
              v-if="adModalData.price_list"
              tag="a"
              :to="
                'https://docs.google.com/viewer?url=' + adModalData.price_list
              "
              shape="rounded"
              borders="outline"
              target="_blank"
            >
              Открыть прайс-лист
            </Button>
            <Button
              v-if="adModalData.presentation"
              tag="a"
              :to="
                'https://docs.google.com/viewer?url=' + adModalData.presentation
              "
              shape="rounded"
              borders="outline"
              target="_blank"
            >
              Открыть презентацию
            </Button>
            <Modal v-if="videoShow" @close="closeEmbedVideos">
              <template>
                <EmbedVideo
                  v-for="(video, v) in adModalData.video"
                  :key="v"
                  :video-id="video"
                ></EmbedVideo>
              </template>
            </Modal>
          </div>
        </div>
        <div v-if="customerAd" class="line_horizontal"></div>
        <div v-if="!customerAd" class="ad-modal__description-header">
          Описание специалиста:
        </div>
        <div v-if="customerAd" class="ad-modal__description-header">
          Описание Задачи:
        </div>
        <div class="ad-modal__description">
          {{ adModalData.description }}
        </div>
        <client-only>
          <b
            style="float: left; width: 100%; font-size: 1.1rem; margin-top: 5px"
            >Поделиться объявлением:</b
          >
          <Share open />
        </client-only>
      </template>
    </Modal>
  </section>
</template>

<script>
import { getFileUrl, getUrl } from '@/assets/js/util'
import AdItem from '@/components/Ad/AdItem'
import { EmbedVideo } from '@/components/Media'
import { Share } from '@/components/Widgets'
const qs = require('qs')

export default {
  name: 'AdList',
  components: {
    AdItem,
    EmbedVideo,
    Share,
    LightBox: process.client
      ? () => import(/* webpackPrefetch: true */ '@/components/Modal/LightBox')
      : null
  },
  props: {
    category: {
      type: Number,
      default: 0
    },
    privateAd: {
      type: Boolean
    },
    adsProp: {
      type: Array,
      default: null
    },
    companyAd: {
      type: Boolean
    },
    customerAd: {
      type: Boolean
    },
    authorTypeId: {
      type: Number,
      default: 1
    },
    accountTypeId: {
      type: Number,
      default: null
    },
    typeId: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      ads: this.adsProp,
      meta: {
        current_page: 1,
        last_page: 1,
        per_page: 99,
        total: 0
      },
      links: {
        first: null,
        last: null,
        next: null,
        prev: null
      },
      videoShow: false,
      index: null,
      filter: {
        city: '',
        metro: '',
        address: '',
        region: ''
      }
    }
  },
  computed: {
    isAdOpen() {
      return this.$store.state.advert.isAdModalOpen
    },
    adModalData() {
      return this.$store.state.advert.adModalData
    },
    classList() {
      const arr = []
      if (this.privateAd) {
        arr.push('ad__list_private')
      } else if (this.companyAd) {
        arr.push('ad__list_company')
      } else if (this.customerAd) {
        arr.push('ad__list_customer')
      }
      return arr
    },
    citiesList() {
      return this.$store.state.address.citiesList
    },
    metroList() {
      return this.$store.state.address.metroList
    }
  },
  created() {
    // this.getAds()
    if (this.$route.query && this.$route.query.id) {
      this.getAd(this.$route.query.id)
    }
  },
  methods: {
    async getAds() {
      if (this.adsProp.length > 0) this.ads = this.adsProp
      const params = {
        category_id: this.category,
        per_page: 12,
        author_type_id: this.authorTypeId,
        type_id: this.typeId,
        metro: this.filter.metro ? this.filter.metro : null,
        city: this.filter.city ? this.filter.city : null
        // order_by: [{ column: '' }]
      }
      // if (this.filter.city === 'Москва') params.order_by[0].column = 'metro'
      // params.order_by = qs.stringify(params.order_by)
      // if (this.filter.city === 'Москва') params.order_by[1] = 'Авиазаводская'
      // if (this.filter.city === 'Москва') params.order_by[1] = 'ASC'
      // const url = getUrl(`advertisements${jsonToParams(params)}`)
      // params.order_by = JSON.parse(params.order_by)
      // params = qs.stringify(params)
      const url = getUrl(`advertisements?${qs.stringify(params)}`)
      // const urlParams = new URLSearchParams()
      // urlParams.append(params)
      await this.$axios
        // .get(url, { params })
        .get(url)
        .then((e) => {
          this.ads = e.data.data
          this.meta = e.data.meta
          this.links = e.data.links
        })
        .catch((e) => {
          console.log(e)
        })
    },
    async getAd(id = 0) {
      const url = getUrl(`advertisements/${id}`)
      await this.$axios
        .get(url)
        .then((e) => {
          // this.ad = e.data.data
          this.$store.dispatch('advert/adModalOpen', e.data.data)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    adOpen() {
      return false
    },
    adClose() {
      this.$router.replace({ query: {} })
      this.$store.dispatch('advert/adModalClose')
    },
    getFileUrl(path) {
      return getFileUrl(path)
    },
    showEmbedVideos() {
      this.videoShow = true
    },
    closeEmbedVideos() {
      this.videoShow = false
    },
    setIndex(index) {
      this.index = index
    }
  }
}
</script>

<style lang="scss">
@import '~assets/scss/app/index.scss';
@import 'scss/ad';
</style>
