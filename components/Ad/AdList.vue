<template>
  <section class="ad">
    <div class="ad__filter ad-filter">
      <span><b>Сортировать по:</b></span>
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
      ></AdItem>
    </div>
    <Modal v-if="isAdOpen" :class="'ad-modal'" @close="adClose">
      <template v-slot:body>
        <span class="ad-modal__id_muted">ID: {{ adModalData.id }}</span>
        <h2 class="ad-modal__title">{{ adModalData.title }}</h2>
        <div v-show="adModalData.photo" class="ad-modal__photos">
          <a
            v-for="(item, p) in adModalData.photo"
            :key="p"
            :href="getFileUrl(item)"
            class="ad-modal__photo-link"
            target="_blank"
            :title="item + '' + p"
          >
            <img :src="getFileUrl(item)" alt="photo" class="ad-modal__photo" />
          </a>
        </div>
        <!--<div class="ad-modal__photos">
          <a
            v-for="p in 12"
            :key="p"
            href="https://via.placeholder.com/95/09f/fff.jpg"
            class="ad-modal__photo-link"
            target="_blank"
            :title="'https://via.placeholder.com/95/09f/fff.jpg ' + p"
          >
            <img
              src="https://via.placeholder.com/95/09f/fff.jpg"
              alt="photo"
              class="ad-modal__photo"
            />
          </a>
        </div>-->
        <div>
          <h3>Категории работ:</h3>
        </div>
        <div class="line_horizontal"></div>
        <div class="grid_cols_2">
          <div class="grid__column_1">
            <h2 class="ad-modal__name">{{ adModalData.name }}</h2>
            <div class="ad-modal__id">ID: {{ adModalData.author_id }}</div>
            <div v-for="(item, j) in adModalData.phone" :key="j">
              {{ item }}
            </div>
            <div class="ad-modal__address">{{ adModalData.address }}</div>
            <div class="ad-modal__address">{{ adModalData.metro }}</div>
            <div class="ad-modal__socials"></div>
          </div>
          <div class="grid__column_1 grid_rows_2">
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
            <Modal v-if="videoShow" @close="closeEmbedVideos">
              <template #body>
                <EmbedVideo
                  v-for="(video, v) in adModalData.video"
                  :key="v"
                  :video-id="video"
                ></EmbedVideo>
              </template>
            </Modal>
          </div>
        </div>
        <div class="ad-modal__description-header">
          Описание специалиста:
        </div>
        <div class="ad-modal__description">
          {{ adModalData.description }}
        </div>
      </template>
    </Modal>
  </section>
</template>

<script>
// import axios from 'axios'
import { getUrl, getFileUrl } from '@/assets/js/util/helpers'
import AdItem from '@/components/Ad/AdItem'
import { EmbedVideo } from '@/components/Media'
// let axios = this.$axios
export default {
  name: 'AdList',
  components: {
    AdItem,
    EmbedVideo
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
    }
  },
  data() {
    return {
      ads: {},
      meta: {
        current_page: 1,
        last_page: 1,
        per_page: 12,
        total: 0
      },
      links: {
        first: null,
        last: null,
        next: null,
        prev: null
      },
      videoShow: false
    }
  },
  computed: {
    isAdOpen() {
      return this.$store.state.isAdModalOpen
    },
    adModalData() {
      return this.$store.state.adModalData
    },
    classList() {
      const arr = []
      if (this.privateAd) arr.push('ad__list_private')
      return arr
    }
  },
  created() {
    this.getAds()
  },
  methods: {
    async getAds() {
      if (this.adsProp.length > 0) this.ads = this.adsProp
      const url = getUrl('advertisements?category_id=1&per_page=99')
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
      this.$store.dispatch('adModalClose')
    },
    getFileUrl(path) {
      return getFileUrl(path)
    },
    showEmbedVideos() {
      this.videoShow = true
    },
    closeEmbedVideos() {
      this.videoShow = false
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/scss/app/index.scss';
@import 'ad';
</style>
