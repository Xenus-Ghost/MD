<template>
  <div>
    <Menu></Menu>
    <CategoriesWidget></CategoriesWidget>
    <nuxt />
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

<style lang="scss">
/*body {
  $bg-opacity: 0.8;
  min-height: 100vh;
  height: 100%;
  background: linear-gradient(
      to bottom,
      rgba(35, 150, 255, (0.12 * $bg-opacity)) 0%,
      rgba(0, 55, 106, (0.8 * $bg-opacity)) 73.34%,
      rgba(0, 0, 0, (0.8 * $bg-opacity)) 100%
    ),
    linear-gradient(
      to top,
      rgba(0, 110, 213, (0.8 * $bg-opacity)),
      rgba(0, 110, 213, (0.8 * $bg-opacity))
    ),
    url('../assets/img/bg/3.jpg') center no-repeat / cover;
  background-attachment: fixed;
}*/
</style>
