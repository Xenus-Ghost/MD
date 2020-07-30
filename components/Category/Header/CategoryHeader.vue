<template>
  <header class="header_category container">
    <div class="header__col_left">
      <div class="header__logo">
        <div class="logo">MD</div>
        <div class="logo__title">Монтаж Демонтаж</div>
      </div>
      <h1 class="header__title_category">
        <slot>Монолит</slot>
      </h1>
      <Button
        :to="returnBackUrl"
        shape="rounded"
        borders="neon"
        class="header_category__button_back"
      >
        <template #icon_left>
          <svg-icon name="arrow-back" />
        </template>
        {{ backTitle || 'Назад' }}
      </Button>
    </div>
    <div v-if="rightColNeed" class="header__col_right">
      <slot v-if="!logoSrc" name="right_column"></slot>
      <div v-if="!$slots.right_column" class="header__circle">
        <img
          v-if="!!logoSrc"
          class="header__logo_right"
          :src="logoSrc"
          alt=""
        />
        <img
          v-if="!logoSrc && !$slots.right_column"
          class="header__logo_right"
          :src="icon"
          alt=""
        />
      </div>
    </div>
  </header>
</template>

<script>
import { getCategoryIcon } from '~/assets/js/util/ads'

export default {
  name: 'CategoryHeader',
  props: {
    backUrl: {
      type: String,
      default: null,
    },
    backTitle: {
      type: String,
      default: null,
    },
    logoSrc: {
      type: String,
      default: null,
    },
    categoryId: {
      type: Number || String,
      default: 0,
    },
    rightColNeed: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      back: this.$store.state.route.from.fullPath
        ? this.$store.state.route.from.fullPath
        : '',
      icon: null,
    }
  },
  computed: {
    returnBackUrl() {
      // return this.backURL ? this.backURL : this.$store.state.route.from.fullPath
      const url = this.$route.path.replace(/ /g, '').split('/')
      url.pop()
      if (url[url.length - 1] === 'продажа') url.pop()
      return this.backUrl || (url.length > 1 ? url.join('/') : '/')
    },
  },
  mounted() {
    this.icon = this.categoryId
      ? `/img/categories/${getCategoryIcon(this.categoryId)}.svg`
      : null
  },
}
</script>

<style lang="scss">
@import '~assets/scss/app/index.scss';
@import 'category_header';
</style>
