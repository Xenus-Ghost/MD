import { getUrl } from '@/assets/js/util'

export async function apiGetEvents(params, axios) {
  const urlParams = {
    category_id: params.category_id,
    per_page: 99
  }
  // if (params.type_id) urlParams.type_id = params.type_id
  // if (params.author_type_id) urlParams.author_type_id = params.author_type_id
  if (params.with) urlParams.with = params.with
  const url = getUrl('events')
  const { data } = await axios
    .get(url, { params: urlParams })
    .catch((error) => {
      console.error(error)
      return { data: { ads: null, links: null, queryParams: null } }
    })
  return {
    ads: data.data,
    links: data.links,
    queryParams: params
  }
}
