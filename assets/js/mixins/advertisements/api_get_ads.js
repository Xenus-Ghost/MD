// import { getAuthorType } from './author_type.js'
// import { getCategory } from './categories'
import { getUrl } from '@/assets/js/util'

export async function apiGetAds(params, axios) {
  // const qs = require('qs')
  const urlParams = {
    category_id: params.category_id,
    per_page: 99
  }
  if (params.type_id) urlParams.type_id = params.type_id
  if (params.author_type_id) urlParams.author_type_id = params.author_type_id
  if (params.with) urlParams.with = params.with
  // console.log(urlParams)
  const url = getUrl('advertisements')
  // console.log(qs.stringify(params), 'params')
  const { data } = await axios.get(url, { params: urlParams })
  // console.log(data, 'data')
  return {
    ads: data.data,
    links: data.links,
    queryParams: params
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
