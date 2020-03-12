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
import { apiGetEvents } from '@/assets/js/mixins'
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
    let routeValid = true
    const filterData = {
      with: ['categories', 'author']
    }
    const meta = {}
    let pageType = null
    pageType = 'adsPage'
    const currentCategory = categoriesList.find(
      (result) => result.name === slugs[slugs.length - 1]
    )
    const { ads, links, queryParams } = await apiGetEvents(
      filterData,
      context.axios
    )
    routeValid = await false
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
  head() {
    return {
      title: this.meta.title
    }
  }
}
</script>

<style scoped></style>
