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
    const categoriesList = context.store.state.categories.adCategoriesList
    let routeValid = true
    const filterData = {}
    const meta = {}
    let pageType = 'page'
    // console.log(slugs)
    // console.log(lastSlug)
    const authorType = context.store.state.advert.authorType.find(
      (result) => lastSlug === result.slug
    )
    if (authorType) slugs.pop()
    if (
      slugs[slugs.length - 1] === 'продажа' ||
      slugs[slugs.length - 1] === 'заказчики'
    ) {
      slugs.pop()
    }
    let adType = context.store.state.advert.adType.find(
      (result) =>
        lastSlug === result.slug || slugs[slugs.length - 2] === result.slug
    )
    // if (slugs[slugs.length - 1] === 'заказчики') {
    //   adType = context.store.state.advert.adType.find(
    //     (result) => result.id === 3
    //   )
    // }
    console.log(adType)
    const currentCategory = categoriesList.find(
      (result) => result.name === slugs[slugs.length - 1]
    )
    const subCategoriesList = categoriesList.filter(
      (result) => currentCategory && result.parent_id === currentCategory.id
    )
    if (!adType) adType = context.store.state.advert.adType[0]
    const needAdsPage =
      slugs.includes('дома-бани-дачи') && !subCategoriesList.length
    if (slugs.includes('дома-бани-дачи') && !subCategoriesList.length) {
      adType = context.store.state.advert.adType[1]
    }
    console.log(authorType, adType.id, needAdsPage)
    if (authorType || (adType && adType.id === 3) || needAdsPage) {
      meta.title = authorType ? authorType.name : adType.name
      pageType = 'adsPage'
      console.log(pageType)
      if (currentCategory) meta.title += ` - ${currentCategory.service_title}`
      routeValid = !!currentCategory
      filterData.category_id = currentCategory ? currentCategory.id : null
      filterData.author_type_id = authorType ? authorType.id : null
      filterData.type_id = adType ? adType.id : null
    } else {
      console.log(categoriesList)
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
    console.log(currentCategory)
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
