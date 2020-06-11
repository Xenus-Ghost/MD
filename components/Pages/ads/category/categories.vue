<template>
  <article class="container_full layout_category">
    <div class="grid-layout_sub-category">
      <CategoryHeader>
        {{ meta.title }}
        <template v-slot:right_column> </template>
      </CategoryHeader>
      <div
        class="grid_cols_2_tablet container grid__column_12 grid_cols_6 buttons_grid"
        style="grid-gap: 3vw;"
      >
        <Button
          v-for="(cat, i) in categories"
          :key="i"
          :to="cat.name"
          shape="semi_rounded"
          borders="outline"
          class="grid__column_2"
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
    categories: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      a: 'a',
    }
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
/*.сustomers {
  align-self: center;
  padding: 5% 10%;
  display: flex;
  align-items: center;
  @include on_tablet() {
    justify-content: flex-end;
    background: rgba(14, 36, 62, 0.3);
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
    border-top-right-radius: 120px;
    border-bottom-right-radius: 120px;
  }
  @include on_desktop() {
    grid-column: 1 span;
  }
  &__lines {
    @include on_mobile() {
      display: none;
    }
  }
  &__buttons {
    display: grid;
    grid-template-rows: 1fr 1fr;
    padding: 2%;
    height: 80%;
    margin-left: 15px;
    & > span {
      font-size: 1.1rem;
      text-align: left;
    }
  }
}
.performers {
  align-self: center;
  padding: 5% 10%;
  display: flex;
  align-items: center;
  @include on_tablet() {
    background: rgba(14, 36, 62, 0.3);
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    border-top-left-radius: 120px;
    border-bottom-left-radius: 120px;
  }
  @include on_desktop() {
    grid-column: 1 span;
  }
  &__lines {
    @include on_mobile() {
      display: none;
    }
  }
  &__buttons {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: 1fr 1fr;
    padding: 2%;
    height: 80%;
    margin-left: 15px;
    margin-right: 15px;
    & > span {
      font-size: 1.1rem;
      text-align: left;
      grid-column: 1/-1;
    }
  }
}*/
</style>
