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
import { apiGetAds } from '@/assets/js/mixins'
import {
  getAdType,
  getAdTypeIdByUrl,
  getAuthorTypeByUrl,
  getCategoryTitle,
  getCatSlugs,
} from '@/assets/js/util/ads'

export default {
  async asyncData(context) {
    const slugs = decodeURIComponent(context.route.path)
      .replace(/ /g, '')
      .split('/')
      .filter((result) => !!result)
    // const lastSlug = slugs[slugs.length - 1]
    // const preLastSlug = slugs[slugs.length - 2]
    console.log({ slugs })
    const categoriesSlugs = getCatSlugs(context.route.path)
    const lastCategorySlug = categoriesSlugs[categoriesSlugs.length - 1]
    const categoriesList = context.store.state.categories.adCategoriesList
    const adTypeList = context.store.state.advert.adType
    let adType = getAdType(
      getAdTypeIdByUrl(context.route.path) || 1,
      adTypeList
    )
    console.log({ adType })
    console.log('getAuthorTypeByUrl:', getAuthorTypeByUrl(context.route.path))
    const authorTypeList = context.store.state.advert.authorType
    const authorType = authorTypeList.find(
      (result) => getAuthorTypeByUrl(context.route.path) === result.id
    )
    console.log({ authorType })
    console.log({ lastCategorySlug })
    console.log(parseFloat(lastCategorySlug + ''))
    console.log(typeof (parseFloat(lastCategorySlug) + ''))
    const currentCategory = categoriesList.find(
      (result) =>
        (!isNaN(lastCategorySlug)
          ? parseFloat(lastCategorySlug)
          : lastCategorySlug) ===
        (!isNaN(lastCategorySlug) ? result.id : result.name)
    )
    const subCategoriesList = currentCategory
      ? categoriesList.filter(
          (result) => currentCategory && result.parent_id === currentCategory.id
        )
      : null
    let routeValid = true
    const filterData = {
      with: ['categories', 'author'],
    }
    const meta = {}

    let pageType = null
    // console.log(subCategoriesList.length, 'subCategoriesList.length')
    if (adType.id === 2 && !authorType && subCategoriesList.length < 1) {
      pageType = 'adsPage'
    }

    const needAdsPage =
      (slugs.includes('127') ||
        slugs.includes('128') ||
        slugs.includes('129') ||
        slugs.includes('130') ||
        slugs.includes('401') ||
        slugs.includes('402') ||
        slugs.includes('403') ||
        slugs.includes('404') ||
        slugs.includes('405') ||
        slugs.includes('406') ||
        slugs.includes('407') ||
        slugs.includes('408') ||
        slugs.includes('409') ||
        slugs.includes('жби') ||
        slugs.includes('снос-демонтаж')) &&
      subCategoriesList.length < 1
    if (
      slugs.includes('127') ||
      slugs.includes('128') ||
      slugs.includes('129') ||
      slugs.includes('130') ||
      slugs.includes('401') ||
      slugs.includes('402') ||
      slugs.includes('403') ||
      slugs.includes('404') ||
      slugs.includes('405') ||
      slugs.includes('406') ||
      slugs.includes('407') ||
      slugs.includes('408') ||
      (slugs.includes('409') && subCategoriesList.length < 1)
    ) {
      adType = adTypeList[1]
    } else if (slugs.includes('снос-демонтаж')) adType = adTypeList[0]
    if (
      authorType ||
      (adType && adType.id === 3) ||
      needAdsPage ||
      pageType === 'adsPage'
    ) {
      meta.title = authorType ? authorType.name : adType.name
      pageType = 'adsPage'
      console.log(pageType, 'pageType')
      if (currentCategory)
        meta.title += currentCategory.title
          ? ` - ${currentCategory.title}`
          : ` - ${getCategoryTitle(currentCategory, {
              author_type_id: filterData.author_type_id,
              type_id: filterData.type_id,
            })}`
      routeValid = !!currentCategory
      filterData.category_id = currentCategory ? currentCategory.id : null
      filterData.author_type_id = authorType ? authorType.id : null
      filterData.type_id = adType ? adType.id : null
    } else {
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
      meta.title = getCategoryTitle(currentCategory, {
        author_type_id: filterData.author_type_id,
        type_id: filterData.type_id,
      })
    }
    const axios = context.$axios
    const { ads, links, queryParams } = filterData.category_id
      ? await apiGetAds(filterData, axios)
      : { ads: null, links: null, queryParams: null }

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
      subCategoriesList,
      category: currentCategory,
    }
    if (typeof ads !== 'undefined') returnData.ads = ads
    if (typeof links !== 'undefined') returnData.links = links
    if (typeof queryParams !== 'undefined') returnData.queryParams = queryParams
    return returnData
  },
  data() {
    return {
      url: this.$route,
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
        categories: this.subCategoriesList,
        category: this.category,
      }
      return data
    },
  },
  created() {
    // console.log(this.$route)
  },
  head() {
    return {
      title: this.meta.title,
    }
  },
}
</script>

<style scoped></style>
