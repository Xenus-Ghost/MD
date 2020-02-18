// import { getAuthorType } from './author_type.js'
import { getCategory } from './categories'
import { getUrl } from '@/assets/js/util'

export const apiGetAds = {
  async asyncData(context) {
    // console.log(context, 'context')
    // console.log(context.route, 'context')
    // const qs = require('qs')
    const route = context
    const slug =
      route.params.subCategory ||
      route.params.category ||
      route.fullPath.replace('/', '')
    const authorTypeId = getAuthorTypeId(context)
    const typeID = getAdTypeId(context)
    const category = getCategory(slug, context.store.state.categories)
    const params = {
      type_id: typeID,
      category_id: category.category.id,
      per_page: 99,
      author_type_id: authorTypeId
    }
    console.log(params)
    const url = getUrl('advertisements')
    // console.log(qs.stringify(params), 'params')
    const { data } = await context.$axios.get(url, { params })
    return {
      ads: data.data,
      links: data.links,
      authorTypeId,
      typeID,
      queryParams: params
    }
  },
  data() {
    return {}
  }
}

export function getAuthorTypeId(context) {
  let authorTypeId = null
  if (context.params.author_type === 'частники') {
    authorTypeId = 1
  } else if (context.params.author_type === 'фирмы') {
    authorTypeId = 2
  } else if (context.params.author_type === 'все-фирмы-и-магазины') {
    authorTypeId = 2
  } else if (context.params.author_type === 'торговые-центры') {
    authorTypeId = 5
  } else if (context.params.author_type === 'интернет-магазины') {
    authorTypeId = 4
  }
  return authorTypeId
}

export function getAdTypeId(context) {
  let typeId = null
  if (context.route.path.includes('/продажа/')) {
    typeId = 2
  } else if (context.params.author_type === 'заказчики') {
    typeId = 3
  } else typeId = 1
  // console.log(typeId)
  return typeId
}
