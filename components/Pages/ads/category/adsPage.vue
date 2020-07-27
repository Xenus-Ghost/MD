<template>
  <div class="container_wide layout_category grid-layout_ads">
    <CategoryHeader>
      {{ meta.title }}
      <template v-slot:right_column>
        <img
          v-if="filterData.category_id === 110"
          src="@/assets/img/icons/categories/demontage.svg"
          alt=""
          class="category__icon"
        />
        <img
          v-if="authorTypeId === 7"
          src="@/assets/img/icons/categories/buildings.svg"
          alt=""
          class="category__icon"
        />
        <img
          v-if="authorTypeId === 4"
          src="@/assets/img/icons/categories/eshop.svg"
          alt=""
          class="category__icon"
        />
        <img
          v-if="authorTypeId === 6"
          src="@/assets/img/icons/categories/plant.svg"
          alt=""
          class="category__icon"
        />
        <img
          v-if="authorTypeId === 5"
          src="@/assets/img/icons/categories/shoppingCenter.svg"
          alt=""
          class="category__icon"
        />
      </template>
    </CategoryHeader>
    <Advertising :category="filterData.category_id"></Advertising>
    <AdList v-bind="props" />
  </div>
</template>

<script>
import CategoryHeader from '@/components/Category/Header/CategoryHeader'
import Advertising from '@/components/Advertising'
import AdList from '@/components/Ad/AdList'

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
    console.log(this.filterData)
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
