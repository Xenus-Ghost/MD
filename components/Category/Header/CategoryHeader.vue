<template>
  <header class="header_category">
    <div class="header__col_left">
      <div class="header__logo">
        <div class="logo">MD</div>
        <div class="logo__title">Монтаж Демонтаж</div>
      </div>
      <h1>
        <slot>Монолит</slot>
      </h1>
      <Button
        :to="retutnBackUrl"
        shape="rounded"
        borders="neon"
        class="header_category__button_back"
      >
        Назад
      </Button>
    </div>
    <div class="header__col_right">
      <slot name="right_column"></slot>
    </div>
  </header>
</template>

<script>
export default {
  name: 'CategoryHeader',
  props: {
    backURL: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      back: this.$store.state.route.from.fullPath
        ? this.$store.state.route.from.fullPath
        : '',
    }
  },
  computed: {
    retutnBackUrl() {
      // return this.backURL ? this.backURL : this.$store.state.route.from.fullPath
      const url = this.$route.path.replace(/ /g, '').split('/')
      url.pop()
      if (url[url.length - 1] === 'продажа') url.pop()
      return url.length > 1 ? url.join('/') : '/'
    },
  },
}
</script>

<style lang="scss">
@import '~assets/scss/app/index.scss';
@import 'category_header';
</style>
