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
  // components: {
  //   adsPage,
  //   category
  // },
  async asyncData(context) {
    const slugs = context.route.path.replace(/ /g, '').split('/')
    const lastSlug = slugs[slugs.length - 1]
    const categoriesList = context.store.state.categories.adCategoriesList
    let routeValid = true
    let currentCategory = null
    const filterData = {}
    const meta = {}
    let pageType = 'page'
    // let adType = null
    console.log(slugs)
    console.log(lastSlug)
    // lastSlug = lastSlug === 'фирмы' ? 'фирмы-и-магазины' : lastSlug
    const authorType = context.store.state.advert.authorType.find(
      (result) => lastSlug === result.slug
    )
    let adType = context.store.state.advert.adType.find(
      (result) =>
        lastSlug === result.slug || slugs[slugs.length - 2] === result.slug
    )
    if (!adType) adType = context.store.state.advert.adType[0]
    console.log(adType, 'adType')
    if (authorType || (adType && adType.id === 3)) {
      meta.title = authorType ? authorType.name : adType.name
      pageType = 'adsPage'
      console.log(slugs, 'before pop')
      slugs.pop()
      console.log(slugs, 'after')
      if (slugs[slugs.length - 1] === 'продажа') {
        slugs.pop()
      }
      currentCategory = categoriesList.find(
        (result) => result.name === slugs[slugs.length - 1]
      )
      if (currentCategory) meta.title += ` - ${currentCategory.service_title}`
      console.log(slugs)
      routeValid = !!currentCategory
      filterData.category_id = currentCategory.id
      filterData.author_type_id = authorType ? authorType.id : null
      filterData.type_id = adType ? adType.id : null
    } else {
      currentCategory = categoriesList.find(
        (result) => result.name === slugs[slugs.length - 1]
      )
      pageType = 'category'
      meta.title = currentCategory ? currentCategory.service_title : null
    }
    const axios = context.$axios
    console.log(filterData)
    const { ads, links, queryParams } = await apiGetAds(filterData, axios)
    // if (!routeValid) error({ statusCode: 404, message: 'Post not found' })
    try {
      console.log(currentCategory.id)
      currentCategory.id = currentCategory.id + 0
    } catch (e) {
      context.error({ statusCode: 404, message: 'Страница не найдена' })
    }
    return { filterData, pageType, ads, links, queryParams, meta }
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
        meta: this.meta
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
