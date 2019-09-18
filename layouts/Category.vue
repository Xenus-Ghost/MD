<template>
  <div>
    <Menu></Menu>
    <CategoriesWidget></CategoriesWidget>
    <article class="container">
      <nuxt />
    </article>
  </div>
</template>

<script>
import Menu from './../components/Menu/Menu'
import CategoriesWidget from './../components/Widgets/CategoriesWidget/CategoriesWidget'

export default {
  components: {
    Menu,
    CategoriesWidget
  },
  head() {
    return {
      bodyAttrs: {
        class: 'background_1'
      }
    }
  }
}
</script>
