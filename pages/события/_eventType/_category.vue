<template
  ><div class="page">
    <div class="container_wide layout_category grid-layout_ads">
      <CategoryHeader>
        {{ meta.title }}
        <template v-slot:right_column> </template>
      </CategoryHeader>
      <!--      <Advertising :category="filterData.category_id"></Advertising>-->
      <h2 class="text_center text_neon">{{ body.title }}</h2>
      <AdList v-bind="props" />
    </div></div
></template>

<script>
import CategoryHeader from '@/components/Category/Header/CategoryHeader'
// import Advertising from '@/components/Advertising'
import AdList from '@/components/Ad/AdList'
import { apiGetEvents } from '@/assets/js/mixins'

export default {
  name: 'Category',
  layout: 'Category',
  components: {
    CategoryHeader,
    // Advertising,
    AdList,
  },
  async asyncData(context) {
    const data = {}
    const meta = {}
    const body = {}
    data.params = context.route.params
    const parentId = data.params.eventType === 'формуы' ? 20 : 21
    const category = context.store.state.categories.evCategoriesList.find(
      (result) =>
        result.parent_id === parentId && result.name === data.params.category
    )
    data.category = category
    meta.title = category.title
    body.title = category.title
    const filterData = {
      category_id: data.category.id,
      with: ['categories', 'author'],
    }
    const axios = context.$axios
    // console.log(context)
    const { ads, links, queryParams } = await apiGetEvents(filterData, axios)
    // .catch((error) => console.log(error))
    const returnData = { data, meta, body }
    if (ads) returnData.ads = ads
    if (links) returnData.links = links
    if (queryParams) returnData.queryParams = queryParams
    return returnData
  },
  data() {},
  computed: {
    props() {
      const obj = []
      obj.push({ privateAd: true })
      obj.push({ companyAd: true })
      obj.push({ customerAd: true })

      obj.push({ category: this.data.category.id })
      if (this.ads) obj.push({ adsProp: this.ads })
      // if (this.typeID === 3) obj.push({ customerAd: true })
      // if (this.filterData.type_id) obj.push({ typeId: this.filterData.type_id })
      return obj
    },
  },
  head() {
    return {
      title: this.meta.title,
    }
  },
}
</script>

<style scoped></style>
