<template>
  <div class="container_wide layout_category grid-layout_ads">
    <CategoryHeader>
      {{ meta.title }}
      <template v-slot:right_column>
      </template>
    </CategoryHeader>
    <Advertising></Advertising>
    <h2 class="text_center text_neon">{{ body.title }}</h2>
    <AdList v-bind="props" />
  </div>
</template>

<script>
import CategoryHeader from '@/components/Category/Header/CategoryHeader'
import Advertising from '@/components/Advertising'
import AdList from '@/components/Ad/AdList'
// import { getUrl, jsonToParams } from '@/assets/js/util'

export default {
  layout: 'Category',
  components: {
    CategoryHeader,
    Advertising,
    AdList
  },
  props: {
    filterData: {
      type: Object,
      default: null
    },
    ads: {
      type: Array || Object,
      default: null
    },
    links: {
      type: Object,
      default: null
    },
    meta: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      authorTypeId: null,
      typeID: null,
      body: {
        title: ''
      }
    }
  },
  computed: {
    props() {
      const obj = []
      if (this.filterData.author_type_id) {
        obj.push({ authorTypeId: this.filterData.author_type_id })
        if (this.filterData.author_type_id === 1) obj.push({ privateAd: true })
        if (this.filterData.author_type_id === 2) obj.push({ companyAd: true })
        if (this.filterData.author_type_id === 3) obj.push({ customerAd: true })
      }
      /* if (2 === 2) */ obj.push({ category: this.filterData.category_id })
      if (this.ads) obj.push({ adsProp: this.ads })
      if (this.typeID === 3) obj.push({ customerAd: true })
      return obj
    }
  },
  head() {
    return {
      title: this.meta.title
    }
  }
}
</script>

<style lang="scss">
@import '~assets/scss/app/index.scss';
</style>
