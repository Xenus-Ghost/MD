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
    const filterData = {
      with: ['categories', 'author']
    }
    const meta = {}
    let pageType = null
    // define author
    const authorType = authorTypeList.find((result) => lastSlug === result.slug)
    if (authorType) slugs.pop()
    if (slugs[slugs.length - 1] === 'продажа' && !authorType) {
      pageType = 'adsPage'
    }
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
    if (authorType || (adType && adType.id === 3) || needAdsPage || pageType === 'adsPage') {
      meta.title = authorType ? authorType.name : adType.name
      pageType = 'adsPage'
      if (currentCategory) meta.title += ` - ${currentCategory.service_title}`
      routeValid = !!currentCategory
      filterData.category_id = currentCategory ? currentCategory.id : null
      filterData.author_type_id = authorType ? authorType.id : null
      filterData.type_id = adType ? adType.id : null
    } else {
      // if (categoriesList && !!categoriesList.length)
      if (currentCategory)
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
    // let ads, links, queryParams
    /* if (!!filterData.length) {
      const { ads, links, queryParams } = await apiGetAds(filterData, axios)
    } */

    const { ads, links, queryParams } = await apiGetAds(filterData, axios)

    // const apiResponse = { ads, links, queryParams}

    try {
      currentCategory.id = currentCategory.id + 0
    } catch (e) {
      routeValid = false
    }
    if (!routeValid) {
      context.error({ statusCode: 404, message: 'Страница не найдена' })
    }
    const returnData = {
      filterData,
      pageType,
      meta,
      subCategoriesList
    }
    if (typeof ads !== 'undefined') returnData.ads = ads
    if (typeof links !== 'undefined') returnData.links = links
    if (typeof queryParams !== 'undefined') returnData.queryParams = queryParams
    return returnData
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
