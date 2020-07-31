export function splitUrl(url) {
  return url
    .replace(/ /g, '')
    .split('/')
    .filter((result) => !!result)
}

export function getAuthorTypeFieldName(id = null) {
  let authorTypeField = null
  switch (id) {
    case 1:
      authorTypeField = 'private-person'
      break
    case 2:
      authorTypeField = 'firm'
      break
    case 4:
      authorTypeField = 'online-shop'
      break
    case 5:
      authorTypeField = 'shopping-center'
      break
    case 6:
      authorTypeField = 'plant'
      break
    case 7:
      authorTypeField = 'property'
      break
    default:
      authorTypeField = null
      break
  }
  return authorTypeField
}

export function getCategoryTitle(category, params = {}) {
  let title
  const authorTypeIdField = params
    ? getAuthorTypeFieldName(params.author_type_id)
    : null
  console.log(category)
  console.log(params)
  if (params && params.author_type_id && params.type_id && category.meta) {
    if (params.type_id === 2) {
      title = category.meta.find((result) => result.type_id === 2).title
    } else if (params.type_id) {
      title = category.meta.find((result) => result.type_id === params.type_id)
        .title
    } else if (params.author_type_id) {
      title = category.meta.find((result) => result[authorTypeIdField] === true)
        .title
    }
  } else {
    console.log(category.title)
    title = category.title ? category.title : category.name
  }
  return title
}

export function getAuthorTypeByUrl(url) {
  let authorTypeId
  const slugs = splitUrl(url)
  if (slugs.includes('частники')) authorTypeId = 1
  if (slugs.includes('фирмы-и-магазины')) authorTypeId = 2
  if (slugs.includes('интернет-магазины')) authorTypeId = 4
  if (slugs.includes('торговые-центры')) authorTypeId = 5
  if (slugs.includes('заводы')) authorTypeId = 6
  if (
    slugs.includes('недвижимость') ||
    slugs.includes('новостройки') ||
    // slugs.includes('119') ||
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
    slugs.includes('409') ||
    slugs.includes('загородная-недвижимость')
  )
    authorTypeId = 7
  return authorTypeId || null
}
export function getAdTypeIdByUrl(url) {
  let typeId = 1
  const slugs = splitUrl(url)
  if (slugs.includes('продажа')) typeId = 2
  if (slugs.includes('жби0') || slugs.includes('снос-демонтаж')) typeId = 2
  if (slugs.includes('заказчики') || slugs.includes('поиск-исполнителя'))
    typeId = 3
  return typeId
}

export function getAdType(id, adTypeList) {
  return adTypeList.find((result) => id === result.id)
}

export function getCatSlugs(url) {
  const slugs = splitUrl(url)
  const excludedItems = [
    'частники',
    'фирмы-и-магазины',
    'интернет-магазины',
    'торговые-центры',
    'заводы',
    'продажа',
    'услуги',
    'заказчики',
  ]
  const returnData = slugs.filter((item) => !excludedItems.includes(item))
  // console.log(returnData)
  return returnData
}

export function getSubcategories(parent, categories) {
  console.log(parent, 'parent')
  console.log(Object.values(categories), 'Object.values(categories)')
  const categoriesLength = categories.length
  const result = []
  /* categories.forEach((item) => {
    if (item.parent === parent) result.push(item)
  }) */
  /* for (let i = 0; i < categoriesLength; i++) {
    if (categories[i].parent === parent) result.push(categories[i])
  }
  return result */
  return Object.values(categories).filter(
    (result) => parseInt(result.parent_id) === parseInt(parent)
  )
}

export function getParentCategory(id, categories) {
  return categories.find((result) => result.id === id)
}
