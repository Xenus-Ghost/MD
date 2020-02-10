<template>
  <section class="ad">
    <div class="ad__filter ad-filter">
      <span class="ad-filter__title"><b>Фильтр:</b></span>
      <label for="">
        <select name="" class="ad-filter__select">
          <option value="none" class="ad-filter__option" selected disabled>
            Адрес
          </option>
          <option value="none" class="ad-filter__option">
            Адрес
          </option>
          <option value="none" class="ad-filter__option">
            Адрес
          </option>
        </select>
      </label>
      <label for="">
        <select name="" class="ad-filter__select">
          <option value="none" class="ad-filter__option" selected disabled>
            Метро
          </option>
          <option value="none" class="ad-filter__option">
            Метро
          </option>
          <option value="none" class="ad-filter__option">
            Метро
          </option>
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
        <span class="ad-modal__id_muted">ID: {{ adModalData.id }}</span>
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
            :title="item + '' + p"
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
            :class="{
              grid__column_2: !customerAd,
              grid__column_10: customerAd
            }"
          >
            <h2 class="ad-modal__name">{{ adModalData.name }}</h2>
            <div class="ad-modal__id">ID: {{ adModalData.author_id }}</div>
            <div v-for="(item, j) in adModalData.phone" :key="j">
              {{ item }}
            </div>
            <div class="ad-modal__address">{{ adModalData.address }}</div>
            <div class="ad-modal__address">{{ adModalData.metro }}</div>
            <div class="ad-modal__socials">
              <a v-for="(i, j) in adModalData.social" :key="j" :href="i.value">
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
      </template>
    </Modal>
  </section>
</template>

<script>
import { getFileUrl, getUrl, jsonToParams } from '@/assets/js/util'
import AdItem from '@/components/Ad/AdItem'
import { EmbedVideo } from '@/components/Media'

export default {
  name: 'AdList',
  components: {
    AdItem,
    EmbedVideo,
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
      ads: {},
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
      index: null
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
    }
  },
  created() {
    this.getAds()
  },
  methods: {
    async getAds() {
      if (this.adsProp.length > 0) this.ads = this.adsProp
      const params = jsonToParams({
        category_id: this.category,
        per_page: 12,
        author_type_id: this.authorTypeId,
        type_id: this.typeId
      })
      const url = getUrl('advertisements' + params)
      await this.$axios
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
    adOpen() {
      return false
    },
    adClose() {
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
