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
    height: calc(100% - #{$menu-height});
    max-height: 560px;
  }
  @include media_screen(desktop-wide) {
    max-height: 800px - $menu-height;
  }
  @include media_screen(desktop-fhd) {
    max-height: 960px - $menu-height;
  }
}
</style>
