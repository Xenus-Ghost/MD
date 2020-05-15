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
    default:
      authorTypeField = null
      break
  }
  return authorTypeField
}
