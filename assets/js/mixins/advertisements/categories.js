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
    const categoryName = this.$store.state.categories.adCategoriesList.find(
      (result) => result.name === getCategorySlug(this.$route)
    ).service_title
    const authorType = getAuthorType(this.$route)
      ? this.$store.state.advert.authorType.find(
          (result) => result.id === getAuthorType(this.$route)
        ).name
      : this.$store.state.advert.adType.find((result) => result.id === 3).name
    const headTitle = categoryName + ' - ' + authorType

    this.$set(this.head, 'title', headTitle)
    this.$set(this.body, 'title', authorType || headTitle)
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
