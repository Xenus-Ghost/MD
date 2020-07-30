import { getAuthorType } from './index'
import { getCategoryIcon, getSubcategories } from '~/assets/js/util/ads'

export const getCategoryIDByUrl = {
  created() {
    const categories = this.$store.state.categories.adCategoriesList
    const slug = getCategorySlug(this.$route)
    console.log(this.$route)

    const result = getCategory(slug, categories)
    console.log(result)
    this.$set(this, 'category', result.category)

    this.$set(this, 'subCategories', result.subCategories)
    if (this.category && this.category.id)
      this.$set(this.category, 'icon', getCategoryIcon(this.category.id))
  },
  data() {
    return {
      category: {
        id: null,
        name: null,
        title: null,
        parent: null,
        icon: null,
      },
      subCategories: [],
    }
  },
}

export const validateCategory = () => {}

export function getCategory(slug = null, categories = null) {
  const result = {}

  result.category = categories.find((item) => item.name === slug)

  result.subCategories = categories.filter(
    (item) => item.parent_id === result.id
  )

  return result
}

export function getCategorySlug(
  route = this.$route ? this.$route : null,
  context
) {
  // console.log(route)
  // console.log(context)
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
    const categories = this.$store.state.categories.adCategoriesList

    const categoryName = categories.find(
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

export const getSubcategoriesMixin = {
  created() {
    console.log('getSubcategoriesMixin')
    console.log(this.category)
    if (!this.category) return
    const categories = this.$store.state.categories.adCategoriesList
    const subCategories = getSubcategories(this.category.id, categories)
    subCategories.forEach((item, index, array) => {
      array[index].icon = getCategoryIcon(item.id)
    })
    this.$set(this, 'subCategories', subCategories)
  },
}
