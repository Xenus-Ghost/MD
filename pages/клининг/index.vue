<template>
  <div class="grid-layout_building">
    <CategoryHeader>
      Клининг
      <template v-slot:right_column>
        <div class="icons">
          <img src="~assets/img/icon-sets/circles_cleaning.svg" alt="" />
          <img src="~assets/img/icon-sets/circles_desinfection.svg" alt="" />
        </div>
      </template>
    </CategoryHeader>
    <div class="container grid_cols_2 grid_cols_4_tablet buttons_grid">
      <Button
        to="клининг-2"
        shape="semi_rounded"
        borders="outline"
        class="grid__column_2"
        height="100%"
        >Клининг</Button
      >
      <Button
        to="санитарные-службы"
        shape="semi_rounded"
        borders="outline"
        class="grid__column_2"
        height="100%"
        >Санитарные службы</Button
      >
    </div>
  </div>
</template>

<script>
import CategoryHeader from '../../components/Category/Header/CategoryHeader'
export default {
  layout: 'Category',
  components: {
    CategoryHeader
  }
}
</script>

<style scoped lang="scss">
@import '~assets/scss/app/index.scss';
.grid-layout_building {
  max-height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  grid-row-gap: 10px;
  grid-column-gap: 20px;
  @include on_tablet() {
    height: calc(100vh - 65px);
  }
  padding-bottom: 0.5vw;
  /deep/ .header_category {
    grid-template-rows: minmax(200px, 1fr) auto;
    grid-template-columns: 1fr;
  }
}
.icons {
  display: grid;
  /*grid-template-columns: 1fr 1fr;*/
  align-content: center;
  align-items: center;
  justify-items: center;
  /*@include media_screen(desktop-wide) {
    max-height: 300px;
  }*/
  @include on_tablet() {
    max-height: 260px;
    grid-template-columns: 1fr 1fr;
  }
  img {
    max-width: 400px;
    object-fit: contain;
    padding: 10px;
  }
}
.buttons_grid {
  grid-gap: 15px;
  grid-auto-rows: 42px;
  align-content: center;
  @include media_screen(desktop-wide) {
    grid-auto-rows: 90px;
    grid-gap: 30px;
  }
}
</style>
