<template>
  <div class="container_wide layout_category grid-layout_ads">
    <CategoryHeader :logo-src="icon" :category-id="category.id">
      {{ meta.title }}
    </CategoryHeader>
    <Advertising :category="filterData.category_id"></Advertising>
    <AdList v-bind="props" />
  </div>
</template>

<script>
import CategoryHeader from '@/components/Category/Header/CategoryHeader'
import Advertising from '@/components/Advertising'
import AdList from '@/components/Ad/AdList'
import { getCategoryIcon } from '~/assets/js/util/ads'

export default {
  name: 'AdsPage',
  layout: 'Category',
  components: {
    CategoryHeader,
    Advertising,
    AdList,
  },
  props: {
    filterData: {
      type: Object,
      default: null,
    },
    ads: {
      type: Array || Object,
      default: null,
    },
    links: {
      type: Object,
      default: null,
    },
    meta: {
      type: Object,
      default: null,
    },
    category: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      authorTypeId: this.filterData.author_type_id
        ? this.filterData.author_type_id
        : null,
      typeID: null,
      body: {
        title: '',
      },
      icon: null,
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
      if (this.filterData.type_id) obj.push({ typeId: this.filterData.type_id })
      return obj
    },
  },
  created() {
    if (this.authorTypeId < 4) {
      this.icon = `/img/categories/${getCategoryIcon(this.category.id)}.svg`
    } else {
      switch (this.authorTypeId) {
        case 4: {
          this.icon = `/img/categories/eshop.svg`
          break
        }
        case 5: {
          this.icon = `/img/categories/shoppingCenter.svg`
          break
        }
        case 6: {
          this.icon = `/img/categories/plant.svg`
          break
        }
        case 7: {
          this.icon = `/img/categories/buildings.svg`
          break
        }
      }
    }
  },
  head() {
    return {
      title: this.meta.title,
    }
  },
}
</script>

<style lang="scss">
@import '~assets/scss/app/index.scss';
.category__icon {
  justify-self: center;
}
</style>
