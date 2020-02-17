import { getAuthorType } from './index'

export const getCategoryIDByUrl = {
  created() {
    const slug =
      this.$route.params.subCategory ||
      this.$route.params.category ||
      this.$route.fullPath.replace('/', '')

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
        parent: null
      },
      subCategories: []
    }
  }
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

export function getCategorySlug(route = this.$route ? this.$route : null) {
  return (
    route.params.subCategory ||
    route.params.category ||
    route.fullPath.replace('/', '')
  )
}

export const getCategoryMeta = {
  created() {
    const categories = this.$store.state.categories
    const categoryName = categories.adCategoriesList.find(
      (result) => result.name === getCategorySlug(this.$route)
    ).service_title
    console.log(this.$route)
    const params = this.$route.params
    const storeAdvert = this.$store.state.advert
    let headTitle = categoryName
    let authorType = null
    // const category = null
    let parentCategory = null
    if (params.author_type) {
      authorType = storeAdvert.authorType.find(
        (result) => result.id === getAuthorType(this.$route)
      )
        ? storeAdvert.authorType.find(
            (result) => result.id === getAuthorType(this.$route)
          ).name
        : params.author_type === 'заказчики'
        ? storeAdvert.adType.find((result) => result.id === 3).name
        : null
      headTitle += ' - ' + authorType
    }

    if (params.category) {
      parentCategory = getCategory(params.category, categories).category
        .service_title
      headTitle += ' - ' + parentCategory
    }
    this.$set(this.head, 'title', headTitle)
    this.$set(this.body, 'title', authorType || categoryName || headTitle)
  },
  data() {
    return {
      head: { title: '' },
      body: {
        title: ''
      }
    }
  },
  head() {
    return { title: this.head.title }
  }
}

export const getCustomCategoryMeta = {
  // this.$route.path
  created() {
    const categories = this.$store.state.categories
    const categoryName = categories.adCategoriesList.find(
      (result) => result.name === this.$route.path.replace('/', '')
    ).service_title
    const headTitle = categoryName
    this.$set(this.head, 'title', headTitle)
    this.$set(this.body, 'title', categoryName || headTitle)
  },
  data() {
    return {
      head: { title: '' },
      body: {
        title: ''
      }
    }
  },
  head() {
    return { title: this.head.title }
  }
}
