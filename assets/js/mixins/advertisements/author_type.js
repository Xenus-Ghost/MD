export function getAuthorType(context) {
  // async asyncData(context) {
  let authorTypeId = null
  if (context.params.author_type === 'частники') authorTypeId = 1
  if (context.params.author_type === 'фирмы') authorTypeId = 2
  if (context.params.author_type === 'все-фирмы-и-магазины') authorTypeId = 2
  if (context.params.author_type === 'торговые-центры') authorTypeId = 5
  if (context.params.author_type === 'интернет-магазины') authorTypeId = 4
  // if (context.params.type_id === 'Заказчики')
  return authorTypeId
  // }
}

export function getAdTypeId(context) {
  // async asyncData(context) {
  let adTypeId = null
  if (context.params.adTypeId === 'частники') adTypeId = 1
  if (context.params.adTypeId === 'фирмы') adTypeId = 2
  if (context.params.adTypeId === 'все-фирмы-и-магазины') adTypeId = 3
  // if (context.params.type_id === 'Заказчики')
  return adTypeId
  // }
}
