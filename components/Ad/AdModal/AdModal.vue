<template>
  <Modal
    :class="[
      'ad-modal',
      adModalData.account_type_id === 3 ? 'ad-modal_premium' : '',
    ]"
    @close="$emit('adClose')"
  >
    <LightBox
      v-if="!!adModalData.photos"
      :items="adModalData.photos"
      :index="index"
      loop
      @close="index = null"
    ></LightBox>
    <template>
      <div class="grid grid_cols_2">
        <span class="ad-modal__id_muted">ID: {{ adModalData.id }}</span>
        <div
          class="views ad-modal__views"
          :title="`Просмотров: ${adModalData.views}`"
          style="justify-self: end;"
        >
          <svg-icon
            class="views__icon"
            name="eye"
            :title="`Просмотров: ${adModalData.views}`"
          />
          <span class="views__value">{{ adModalData.views }}</span>
        </div>
      </div>
      <div v-if="adModalData.logo" class="ad-modal__logo-wrapper">
        <img
          :src="adModalData.logo"
          :alt="adModalData.title"
          class="ad-modal__logo"
        />
      </div>
      <h2 v-if="!customerAd" class="ad-modal__title">
        {{ adModalData.title }}
      </h2>
      <AdCategoriesList
        v-if="!customerAd"
        :categories="adModalData.categories"
      ></AdCategoriesList>
      <div
        v-if="adModalData.photos && adModalData.photos.length > 0"
        class="ad-modal__photos"
      >
        <a
          v-for="(item, p) in adModalData.photos"
          :key="p"
          :href="item"
          class="ad-modal__photo-link"
          target="_blank"
          @click.prevent="setIndex(p)"
        >
          <img :src="item" :alt="`Изображение ${p}`" class="ad-modal__photo" />
        </a>
      </div>
      <div v-if="!customerAd" class="line_horizontal"></div>
      <div class="grid__column_full">
        <div>
          <div
            v-if="
              (privateAd && adModalData.author.first_name) ||
              (customerAd && adModalData.author.last_name)
            "
          >
            {{
              `${adModalData.author.first_name} ${adModalData.author.last_name}`
            }}
          </div>
          <span v-if="privateAd">
            {{ `ID: ${adModalData.author_id}` }}
          </span>
        </div>
        <div
          v-if="
            (adModalData.addresses && adModalData.addresses.length > 0) ||
            (adModalData.metro && adModalData.metro.length > 0)
          "
          class="grid__column_full"
          style="position: relative;"
        >
          <ad-address-list
            :address-list="adModalData.addresses"
            :metro-list="adModalData.metro"
          />
        </div>
      </div>
      <div
        :class="[
          { grid_cols_3: !customerAd, grid_cols_12: customerAd },
          'grid-gap_4',
        ]"
      >
        <div v-if="customerAd" class="grid__column_1">
          <img
            v-if="customerAd"
            style="width: 100%; height: 100%; object-fit: contain;"
            src="/img/icons/employee.png"
            alt="Заказчик"
          />
        </div>
        <div
          :class="[
            {
              grid__column_1: !customerAd,
              grid__column_10: customerAd,
            },
            'grid',
            'grid-row-gap_1',
          ]"
        >
          <div class="ad-modal__phone-list">
            <a
              v-for="(item, j) in adModalData.phones"
              :key="j"
              :href="`tel:${item.value}`"
              class="ad-modal__phone"
              :title="item.value"
            >
              {{ item.value }}
            </a>
          </div>
          <a
            v-if="adModalData.email"
            :href="`mailto:${adModalData.email}`"
            class="ad-modal__website"
            target="_blank"
            :title="adModalData.email"
          >
            {{ adModalData.email }}
          </a>
        </div>
        <div class="grid__column_1 grid grid-gap_1">
          <div v-if="adModalData.ogrn" class="ad-modal__ogrn">
            {{ adModalData.ogrn }}
          </div>
          <a
            v-if="adModalData.website"
            :href="`/away?url=${adModalData.website}`"
            class="ad-modal__website"
            target="_blank"
            :title="adModalData.website"
          >
            {{ adModalData.website }}
          </a>
          <div v-if="adModalData.social" class="ad-modal__socials">
            <a
              v-for="(i, j) in adModalData.social"
              :key="j"
              :href="`/away?url=${i.value}`"
              target="_blank"
              :title="`${i.name}: ${i.value}`"
            >
              <img :src="`/img/icons/social/${i.name}.png`" :alt="i.value" />
            </a>
          </div>
          <Share />
        </div>
        <div :class="['grid__column_1']" style="grid-gap: 10px; display: grid;">
          <Button
            shape="rounded"
            borders="outline"
            block
            style="--border-color: #ffb800;"
          >
            <template #icon_left>
              <svg
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#star0)">
                  <path
                    d="M2.62634 13.6861C2.57818 13.6861 2.53001 13.6709 2.48952 13.6407C2.41785 13.5873 2.38201 13.4971 2.39714 13.4078L3.1164 9.11837L0.0701838 6.08089C0.00689061 6.01757 -0.0159135 5.92306 0.0113118 5.83711C0.0387699 5.75094 0.111604 5.68809 0.19933 5.67499L4.40879 5.04912L6.29153 1.14651C6.33062 1.06509 6.4116 1.01367 6.50003 1.01367C6.58868 1.01367 6.66966 1.06509 6.70852 1.14651L8.59103 5.04912L12.8007 5.67499C12.8884 5.68809 12.961 5.7507 12.9887 5.83711C13.016 5.92306 12.9934 6.01781 12.9299 6.08089L9.88365 9.11885L10.6027 13.4081C10.6176 13.4973 10.5817 13.5876 10.5103 13.6409C10.4386 13.6947 10.3435 13.7016 10.265 13.659L6.50003 11.634L2.73455 13.659C2.70057 13.6771 2.66334 13.6861 2.62634 13.6861ZM0.732668 6.07661L3.52874 8.86507C3.58342 8.91959 3.60855 8.99862 3.59552 9.07576L2.93536 13.0129L6.39182 11.1541C6.45954 11.1174 6.54028 11.1174 6.60846 11.1541L10.0645 13.0129L9.40453 9.07576C9.3915 8.99862 9.41663 8.91982 9.47131 8.86507L12.2674 6.07661L8.40347 5.50216C8.32762 5.49097 8.26223 5.44216 8.22826 5.37194L6.50003 1.79L4.7718 5.37217C4.73782 5.4424 4.67244 5.49121 4.59658 5.5024L0.732668 6.07661Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="star0">
                    <rect width="13" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </template>
            Добавить в избранное
          </Button>
          <Button
            v-if="(!!adModalData.videos && adModalData.videos.length> 0)"
            shape="rounded"
            borders="outline"
            block
            class="mb-2"
            @click="showEmbedVideos"
          >
            <template #icon_left>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.8532 7.79631L6.40558 4.08202C6.32956 4.03052 6.23151 4.02482 6.15029 4.06766C6.06932 4.1105 6.01855 4.19469 6.01855 4.28655V11.7151C6.01855 11.807 6.06932 11.8912 6.15054 11.934C6.18669 11.9533 6.22655 11.9627 6.26617 11.9627C6.31495 11.9627 6.36374 11.9481 6.40558 11.9197L11.8532 8.20537C11.9208 8.15932 11.9614 8.0828 11.9614 8.00084C11.9614 7.91888 11.9208 7.84236 11.8532 7.79631ZM6.51379 11.2464V4.7553L11.2743 8.00084L6.51379 11.2464Z"
                  fill="white"
                  stroke="white"
                  stroke-width="0.5"
                />
                <path
                  d="M7.99986 0.572266C3.90375 0.572266 0.571289 3.90472 0.571289 8.00084C0.571289 12.097 3.90375 15.4294 7.99986 15.4294C12.096 15.4294 15.4284 12.097 15.4284 8.00084C15.4284 3.90472 12.096 0.572266 7.99986 0.572266ZM7.99986 14.9342C4.17687 14.9342 1.06653 11.8238 1.06653 8.00084C1.06653 4.17785 4.17687 1.0675 7.99986 1.0675C11.8229 1.0675 14.9332 4.17785 14.9332 8.00084C14.9332 11.8238 11.8229 14.9342 7.99986 14.9342Z"
                  fill="white"
                  stroke="white"
                  stroke-width="0.5"
                />
              </svg>
            </template>
            Показать видео
          </Button>
          <Button
            v-if="adModalData.price_list"
            tag="a"
            :to="adModalData.price_list"
            shape="rounded"
            borders="outline"
            target="_blank"
            block
          >
            <template #icon_left>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.99986 0.572266C3.90375 0.572266 0.571289 3.90472 0.571289 8.00084C0.571289 12.097 3.90375 15.4294 7.99986 15.4294C12.096 15.4294 15.4284 12.097 15.4284 8.00084C15.4284 3.90472 12.096 0.572266 7.99986 0.572266ZM7.99986 14.9342C4.17687 14.9342 1.06653 11.8238 1.06653 8.00084C1.06653 4.17785 4.17687 1.0675 7.99986 1.0675C11.8229 1.0675 14.9332 4.17785 14.9332 8.00084C14.9332 11.8238 11.8229 14.9342 7.99986 14.9342Z"
                  fill="white"
                  stroke="white"
                  stroke-width="0.5"
                />
                <path
                  d="M7.63065 11.054C7.26765 11.021 6.93615 10.9325 6.63615 10.7885C6.33915 10.6415 6.08265 10.4555 5.86665 10.2305L6.10515 9.8615C6.12615 9.8285 6.15615 9.8015 6.19515 9.7805C6.23415 9.7595 6.27465 9.749 6.31665 9.749C6.37365 9.749 6.43815 9.7775 6.51015 9.8345C6.58215 9.8915 6.67065 9.9575 6.77565 10.0325C6.88065 10.1045 7.00515 10.175 7.14915 10.244C7.29615 10.313 7.47165 10.3595 7.67565 10.3835L7.84215 7.994C7.63215 7.931 7.42515 7.8605 7.22115 7.7825C7.02015 7.7015 6.83865 7.598 6.67665 7.472C6.51765 7.343 6.38865 7.1825 6.28965 6.9905C6.19365 6.7955 6.14565 6.5525 6.14565 6.2615C6.14565 6.0425 6.18765 5.8295 6.27165 5.6225C6.35865 5.4125 6.48315 5.2265 6.64515 5.0645C6.81015 4.9025 7.01265 4.7705 7.25265 4.6685C7.49265 4.5635 7.76865 4.505 8.08065 4.493L8.12565 3.845C8.13165 3.788 8.15415 3.737 8.19315 3.692C8.23215 3.647 8.28465 3.6245 8.35065 3.6245H8.64765L8.58465 4.5155C8.89965 4.5545 9.17115 4.6355 9.39915 4.7585C9.62715 4.8815 9.83115 5.03 10.0111 5.204L9.81765 5.501C9.75765 5.591 9.68865 5.636 9.61065 5.636C9.56865 5.636 9.51615 5.618 9.45315 5.582C9.39315 5.543 9.31965 5.4995 9.23265 5.4515C9.14565 5.4005 9.04515 5.351 8.93115 5.303C8.81715 5.252 8.68665 5.216 8.53965 5.195L8.39115 7.373C8.60715 7.439 8.82015 7.511 9.03015 7.589C9.24015 7.667 9.42915 7.7675 9.59715 7.8905C9.76515 8.0135 9.90015 8.168 10.0021 8.354C10.1071 8.537 10.1596 8.7665 10.1596 9.0425C10.1596 9.3125 10.1146 9.566 10.0246 9.803C9.93465 10.04 9.80265 10.2485 9.62865 10.4285C9.45765 10.6085 9.24615 10.7555 8.99415 10.8695C8.74515 10.9805 8.46015 11.045 8.13915 11.063L8.08515 11.855C8.07915 11.912 8.05515 11.9615 8.01315 12.0035C7.97415 12.0485 7.92315 12.071 7.86015 12.071H7.56315L7.63065 11.054ZM9.39915 9.1685C9.39915 9.0185 9.37065 8.8895 9.31365 8.7815C9.25965 8.6735 9.18465 8.5805 9.08865 8.5025C8.99265 8.4245 8.88015 8.357 8.75115 8.3C8.62215 8.243 8.48415 8.1905 8.33715 8.1425L8.18415 10.3835C8.37915 10.3655 8.55165 10.3235 8.70165 10.2575C8.85465 10.1885 8.98215 10.1015 9.08415 9.9965C9.18915 9.8915 9.26715 9.77 9.31815 9.632C9.37215 9.491 9.39915 9.3365 9.39915 9.1685ZM6.90165 6.1805C6.90165 6.3245 6.92715 6.4505 6.97815 6.5585C7.02915 6.6635 7.09965 6.7565 7.18965 6.8375C7.27965 6.9185 7.38465 6.989 7.50465 7.049C7.62465 7.109 7.75515 7.163 7.89615 7.211L8.03115 5.1815C7.83615 5.1995 7.66665 5.2385 7.52265 5.2985C7.38165 5.3585 7.26465 5.4335 7.17165 5.5235C7.08165 5.6135 7.01415 5.7155 6.96915 5.8295C6.92415 5.9405 6.90165 6.0575 6.90165 6.1805Z"
                  fill="white"
                />
              </svg>
            </template>
            Открыть прайс-лист
          </Button>
          <Button
            v-if="adModalData.presentation"
            tag="a"
            :to="adModalData.presentation"
            shape="rounded"
            borders="outline"
            target="_blank"
            block
          >
            <template #icon_left>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.99986 0.572266C3.90375 0.572266 0.571289 3.90472 0.571289 8.00084C0.571289 12.097 3.90375 15.4294 7.99986 15.4294C12.096 15.4294 15.4284 12.097 15.4284 8.00084C15.4284 3.90472 12.096 0.572266 7.99986 0.572266ZM7.99986 14.9342C4.17687 14.9342 1.06653 11.8238 1.06653 8.00084C1.06653 4.17785 4.17687 1.0675 7.99986 1.0675C11.8229 1.0675 14.9332 4.17785 14.9332 8.00084C14.9332 11.8238 11.8229 14.9342 7.99986 14.9342Z"
                  fill="white"
                  stroke="white"
                  stroke-width="0.5"
                />
                <path
                  d="M7.63065 11.054C7.26765 11.021 6.93615 10.9325 6.63615 10.7885C6.33915 10.6415 6.08265 10.4555 5.86665 10.2305L6.10515 9.8615C6.12615 9.8285 6.15615 9.8015 6.19515 9.7805C6.23415 9.7595 6.27465 9.749 6.31665 9.749C6.37365 9.749 6.43815 9.7775 6.51015 9.8345C6.58215 9.8915 6.67065 9.9575 6.77565 10.0325C6.88065 10.1045 7.00515 10.175 7.14915 10.244C7.29615 10.313 7.47165 10.3595 7.67565 10.3835L7.84215 7.994C7.63215 7.931 7.42515 7.8605 7.22115 7.7825C7.02015 7.7015 6.83865 7.598 6.67665 7.472C6.51765 7.343 6.38865 7.1825 6.28965 6.9905C6.19365 6.7955 6.14565 6.5525 6.14565 6.2615C6.14565 6.0425 6.18765 5.8295 6.27165 5.6225C6.35865 5.4125 6.48315 5.2265 6.64515 5.0645C6.81015 4.9025 7.01265 4.7705 7.25265 4.6685C7.49265 4.5635 7.76865 4.505 8.08065 4.493L8.12565 3.845C8.13165 3.788 8.15415 3.737 8.19315 3.692C8.23215 3.647 8.28465 3.6245 8.35065 3.6245H8.64765L8.58465 4.5155C8.89965 4.5545 9.17115 4.6355 9.39915 4.7585C9.62715 4.8815 9.83115 5.03 10.0111 5.204L9.81765 5.501C9.75765 5.591 9.68865 5.636 9.61065 5.636C9.56865 5.636 9.51615 5.618 9.45315 5.582C9.39315 5.543 9.31965 5.4995 9.23265 5.4515C9.14565 5.4005 9.04515 5.351 8.93115 5.303C8.81715 5.252 8.68665 5.216 8.53965 5.195L8.39115 7.373C8.60715 7.439 8.82015 7.511 9.03015 7.589C9.24015 7.667 9.42915 7.7675 9.59715 7.8905C9.76515 8.0135 9.90015 8.168 10.0021 8.354C10.1071 8.537 10.1596 8.7665 10.1596 9.0425C10.1596 9.3125 10.1146 9.566 10.0246 9.803C9.93465 10.04 9.80265 10.2485 9.62865 10.4285C9.45765 10.6085 9.24615 10.7555 8.99415 10.8695C8.74515 10.9805 8.46015 11.045 8.13915 11.063L8.08515 11.855C8.07915 11.912 8.05515 11.9615 8.01315 12.0035C7.97415 12.0485 7.92315 12.071 7.86015 12.071H7.56315L7.63065 11.054ZM9.39915 9.1685C9.39915 9.0185 9.37065 8.8895 9.31365 8.7815C9.25965 8.6735 9.18465 8.5805 9.08865 8.5025C8.99265 8.4245 8.88015 8.357 8.75115 8.3C8.62215 8.243 8.48415 8.1905 8.33715 8.1425L8.18415 10.3835C8.37915 10.3655 8.55165 10.3235 8.70165 10.2575C8.85465 10.1885 8.98215 10.1015 9.08415 9.9965C9.18915 9.8915 9.26715 9.77 9.31815 9.632C9.37215 9.491 9.39915 9.3365 9.39915 9.1685ZM6.90165 6.1805C6.90165 6.3245 6.92715 6.4505 6.97815 6.5585C7.02915 6.6635 7.09965 6.7565 7.18965 6.8375C7.27965 6.9185 7.38465 6.989 7.50465 7.049C7.62465 7.109 7.75515 7.163 7.89615 7.211L8.03115 5.1815C7.83615 5.1995 7.66665 5.2385 7.52265 5.2985C7.38165 5.3585 7.26465 5.4335 7.17165 5.5235C7.08165 5.6135 7.01415 5.7155 6.96915 5.8295C6.92415 5.9405 6.90165 6.0575 6.90165 6.1805Z"
                  fill="white"
                />
              </svg>
            </template>
            Открыть презентацию
          </Button>
          <Modal v-if="videoShow" @close="closeEmbedVideos">
            <template>
              <EmbedVideo
                v-for="(video, v) in adModalData.videos"
                :key="v"
                :video-id="video"
              ></EmbedVideo>
            </template>
          </Modal>
        </div>
      </div>
      <div v-if="customerAd" class="line_horizontal"></div>
      <div v-if="authorTypeId > 1" class="ad-modal__description-header">
        Описание:
      </div>
      <div
        v-if="!customerAd && authorTypeId === 1"
        class="ad-modal__description-header"
      >
        Описание специалиста:
      </div>
      <div v-if="customerAd" class="ad-modal__description-header">
        Описание Задачи:
      </div>
      <div class="ad-modal__description">
        {{ adModalData.description }}
      </div>
      <div class="flex" style="width: 100%;">
        <Button
          borders="outline"
          shape="rounded"
          style="margin: 0 auto;"
          @click="claimFormShow = true"
          >Пожаловаться
        </Button>
      </div>
      <AdClaim
        v-if="claimFormShow"
        :id="adModalData.id"
        @close="claimFormShow = false"
      ></AdClaim>
    </template>
  </Modal>
</template>
<script>
import { AdAddressList, AdCategoriesList, AdClaim } from '@/components/Ad/'
import EmbedVideo from '@/components/Media/Video/EmbedVideo'
import Share from '@/components/Widgets/Share/Share'

export default {
  name: 'AdModal',
  components: {
    AdAddressList,
    EmbedVideo,
    Share,
    AdCategoriesList,
    AdClaim,
    LightBox: () =>
      import(/* webpackPrefetch: true */ '@/components/Modal/LightBox'),
  },
  props: {
    adModalData: {
      type: Object,
      default: null,
    },
    authorTypeId: {
      type: Number,
      default: null,
    },
    customerAd: { type: Boolean, default: null },
    isAdOpen: { type: Boolean, default: null },
    privateAd: { type: Boolean, default: null },
  },
  data() {
    return {
      index: null,
      videoShow: false,
      claimFormShow: false,
    }
  },
  methods: {
    showEmbedVideos() {
      this.videoShow = true
    },
    closeEmbedVideos() {
      this.videoShow = false
    },
    setIndex(index) {
      this.index = index
    },
  },
}
</script>

<style lang="scss">
@import 'ad_modal';
</style>
