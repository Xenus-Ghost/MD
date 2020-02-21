export function getAuthorType(context) {
  // async asyncData(context) {
  let authorTypeId = null
  const slugs = context.route.path.split('/')
  authorTypeId = context.store.state.advert.authorType.find(
    (result) => result.slug === slugs[slugs.length - 1]
  )
  authorTypeId = authorTypeId || null
  return authorTypeId
}

export function getAdTypeId(context) {
  // async asyncData(context) {
  let adTypeId = null
  if (context.params.adTypeId === 'частники') adTypeId = 1
  if (context.params.adTypeId === 'фирмы') adTypeId = 2
  if (context.params.adTypeId === 'все-фирмы-и-магазины') adTypeId = 3
  return adTypeId
  // }
}
