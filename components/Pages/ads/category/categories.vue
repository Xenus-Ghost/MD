<template>
  <article class="container_full layout_category">
    <div class="grid-layout_sub-category">
      <CategoryHeader :category-id="category.id">
        {{ meta.title }}
      </CategoryHeader>
      <div
        class="grid_cols_2_tablet container grid__column_12 grid_cols_6 buttons_grid"
        style="grid-gap: 3vw;"
      >
        <Button
          v-for="(cat, i) in categories"
          :key="i"
          :to="`${cat.id}`"
          shape="semi_rounded"
          borders="outline"
          :class="[
            'grid__column_2',
            {
              'grid-cats__button_last':
                i === categories.length - 1 && categories.length % 3,
            },
          ]"
          height="100%"
          >{{
            cat.title
              ? cat.title
              : cat.meta.find((result) => result.title).title
          }}</Button
        >
      </div>
    </div>
  </article>
</template>

<script>
import CategoryHeader from '@/components/Category/Header/CategoryHeader'
import { getCategoryIcon } from '~/assets/js/util/ads'

export default {
  layout: 'Category',
  components: {
    CategoryHeader,
  },
  props: {
    meta: {
      type: Object,
      default: null,
    },
    category: {
      type: Object,
      default: null,
    },
    categories: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      a: 'a',
      icon: null,
    }
  },
  created() {
    this.icon = `/img/categories/${getCategoryIcon(this.categoryId)}.svg`
  },
}
</script>

<style lang="scss">
@import '~assets/scss/app/index.scss';
.grid-layout_sub-category {
  max-height: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr 1fr auto;
  grid-row-gap: 10px;
  grid-column-gap: 20px;
  @include media_screen(desktop-fhd) {
    grid-template-rows: 2fr 2fr auto;
  }
}
.grid-cats__button_last {
  grid-column: 3 / span 2 !important;
}
</style>
