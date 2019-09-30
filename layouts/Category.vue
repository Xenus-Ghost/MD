<template>
  <div>
    <Menu></Menu>
    <CategoriesWidget></CategoriesWidget>
    <article class="container_wide layout_category">
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
<style scoped lang="scss">
@import '~assets/scss/app/index.scss';
.layout_category {
  /*max-height: 800px;*/
  @include media_screen(desktop) {
    height: 100%;
    max-height: 560px;
  }
  @include media_screen(desktop-wide) {
    height: 740px;
  }
  @include media_screen(desktop-fhd) {
    height: 900px;
  }
}
</style>
