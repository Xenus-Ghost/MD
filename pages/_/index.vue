<template>
  <div class="page">
    <component
      :is="currentComponent"
      v-if="currentComponent"
      v-bind="pageData"
    />
  </div>
</template>

<script>
// const { pathToRegexp, match } = require('path-to-regexp')
// import { adsPage, category } from '@/components/Pages'
import { apiGetAds } from '@/assets/js/mixins'

export default {
  name: '',
  async asyncData(context) {
    const slugs = context.route.path
      .replace(/ /g, '')
      .split('/')
      .filter((result) => !!result)
    const lastSlug = slugs[slugs.length - 1]
    const preLastSlug = slugs[slugs.length - 2]
    const categoriesList = context.store.state.categories.adCategoriesList
    const adTypeList = context.store.state.advert.adType
    const authorTypeList = context.store.state.advert.authorType
    let routeValid = true
    const filterData = {}
    const meta = {}
    let pageType = 'page'
    // define author
    const authorType = authorTypeList.find((result) => lastSlug === result.slug)
    if (authorType) slugs.pop()
    if (
      slugs[slugs.length - 1] === 'продажа' ||
      slugs[slugs.length - 1] === 'заказчики'
    ) {
      slugs.pop()
    }
    // define author//
    // define adtype
    let adType = adTypeList.find(
      (result) => lastSlug === result.slug || preLastSlug === result.slug
    )
    // define adtype
    console.log(slugs, 'slugs')
    const currentCategory = categoriesList.find(
      (result) => result.name === slugs[slugs.length - 1]
    )
    const subCategoriesList = categoriesList.filter(
      (result) => currentCategory && result.parent_id === currentCategory.id
    )
    if (!adType) adType = adTypeList[0]
    const needAdsPage =
      slugs.includes('дома-бани-дачи') && !subCategoriesList.length
    if (slugs.includes('дома-бани-дачи') && !subCategoriesList.length) {
      adType = adTypeList[1]
    }
    if (authorType || (adType && adType.id === 3) || needAdsPage) {
      meta.title = authorType ? authorType.name : adType.name
      pageType = 'adsPage'
      if (currentCategory) meta.title += ` - ${currentCategory.service_title}`
      routeValid = !!currentCategory
      filterData.category_id = currentCategory ? currentCategory.id : null
      filterData.author_type_id = authorType ? authorType.id : null
      filterData.type_id = adType ? adType.id : null
    } else {
      if (categoriesList && categoriesList.length)
        if (
          !categoriesList.find(
            (result) => result.parent_id === currentCategory.id
          )
        ) {
          pageType = 'category'
        } else {
          pageType = 'categories'
        }
      meta.title = currentCategory ? currentCategory.service_title : null
    }
    const axios = context.$axios
    const { ads, links, queryParams } = await apiGetAds(filterData, axios)
    try {
      currentCategory.id = currentCategory.id + 0
    } catch (e) {
      context.error({ statusCode: 404, message: 'Страница не найдена' })
    }
    return {
      filterData,
      pageType,
      ads,
      links,
      queryParams,
      meta,
      subCategoriesList
    }
  },
  data() {
    return {
      url: this.$route
    }
  },
  computed: {
    currentComponent() {
      return () => import(`@/components/Pages/ads/category/${this.pageType}`)
    },
    pageData() {
      const data = {
        ads: this.ads,
        links: this.links,
        queryParams: this.queryParams,
        filterData: this.filterData,
        meta: this.meta,
        categories: this.subCategoriesList
      }
      return data
    }
  },
  created() {
    // console.log(this.$route)
  },
  head() {
    return {
      title: this.meta.title
    }
  }
}
</script>

<style scoped></style>
