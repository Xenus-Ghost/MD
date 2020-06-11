import { getAuthorType } from './index'

export const getCategoryIDByUrl = {
  created() {
    const slug = getCategorySlug

    const result = getCategory(slug, this.$store.state.categories)

    this.$set(this, 'category', result.category)

    this.$set(this, 'subCategories', result.subCategories)
  },
  data() {
    return {
      category: {
        id: null,
        name: null,
        title: null,
        parent: null,
      },
      subCategories: [],
    }
  },
}

export const validateCategory = () => {}

export function getCategory(slug = null, categories = null) {
  const result = {}

  result.category = categories.adCategoriesList.filter(
    (item) => item.name === slug
  )[0]

  result.subCategories = categories.adCategoriesList.filter(
    (item) => item.parent_id === result.id
  )

  return result
}

export function getCategorySlug(
  route = this.$route ? this.$route : null,
  context
) {
  const slugs = route.path.split('/')
  if (getAuthorType(context)) slugs.pop()
  if (slugs[slugs.length - 1] === 'продажа') slugs.pop()
  return slugs[slugs.length - 1]
  // route.params.subCategory ||
  // route.params.category ||
  // route.fullPath.replace('/', '')
}

export const getCategoryMeta = {
  created(context) {
    // console.log()
    const categories = this.$store.state.categories
    const categoryName = categories.adCategoriesList.find(
      (result) => result.name === getCategorySlug(this.$route, context)
    ).title
    const category = getCategory(getCategorySlug())
    console.log(this.$route)
    // const params = this.$route.params
    const storeAdvert = this.$store.state.advert
    let headTitle = categoryName
    let authorType = getAuthorType()
    // const category = null
    let parentCategory = null
    if (authorType) {
      authorType = storeAdvert.authorType.find(
        (result) => result.id === getAuthorType(this.$route)
      )
        ? storeAdvert.authorType.find(
            (result) => result.id === getAuthorType(this.$route)
          ).name
        : authorType === 'заказчики'
        ? storeAdvert.adType.find((result) => result.id === 3).name
        : null
      headTitle += ' - ' + authorType
    }

    if (category) {
      parentCategory = getCategory(category, categories).category.title
      headTitle += ' - ' + parentCategory
    }
    this.$set(this.head, 'title', headTitle)
    this.$set(this.body, 'title', authorType || categoryName || headTitle)
  },
  data() {
    return {
      head: { title: '' },
      body: {
        title: '',
      },
    }
  },
  head() {
    return { title: this.head.title }
  },
}

export const getCustomCategoryMeta = {
  // this.$route.path
  created() {
    const categories = this.$store.state.categories

    const categoryName = categories.adCategoriesList.find(
      (result) => result.name === this.$route.name
    ).title
    const headTitle = categoryName
    this.$set(this.head, 'title', headTitle)
    this.$set(this.body, 'title', categoryName || headTitle)
  },
  data() {
    return {
      head: { title: '' },
      body: {
        title: '',
      },
    }
  },
  head() {
    return { title: this.head.title }
  },
}
