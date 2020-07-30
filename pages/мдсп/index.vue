<template>
  <div class="container_wide layout_category grid-layout_mdsp">
    <CategoryHeader class="category__header_mdsp" :right-col-need="false">
      Металлы. Дерево. Стекло. Пластмасса.
    </CategoryHeader>
    <div class="category">
      <CircleItem icon="metal" to="91" title="Металлы" />
      <Button to="91" shape="rounded" borders="outline">Подробнее</Button>
    </div>
    <div class="category">
      <CircleItem icon="mirror" to="93" title="Стекло" />
      <Button to="93" shape="rounded" borders="outline">Подробнее</Button>
    </div>
    <div class="category">
      <CircleItem to="92" icon="wood-board" title="Дерево" />
      <Button to="92" shape="rounded" borders="outline">Подробнее</Button>
    </div>
    <div class="category">
      <CircleItem icon="six-pack (1)" to="94" title="Пластмасса" />
      <Button to="94" shape="rounded" borders="outline">Подробнее</Button>
    </div>
    <div class="category">
      <CircleItem icon="tiles" to="95" title="Отделочные материалы" />
      <Button to="95" shape="rounded" borders="outline">Подробнее</Button>
    </div>
    <div class="category">
      <CircleItem icon="document" to="96" title="Бумага и картон" />
      <Button to="96" shape="rounded" borders="outline">Подробнее</Button>
    </div>
    <div class="category">
      <CircleItem icon="paint-bucket" to="97" title="Лакокрасочные материалы" />
      <Button to="97" shape="rounded" borders="outline">Подробнее</Button>
    </div>
    <div class="category">
      <CircleItem
        icon="brick"
        to="98"
        title="Гипсокартон, направляющие, крепежи"
      />
      <Button to="98" shape="rounded" borders="outline">Подробнее</Button>
    </div>
  </div>
</template>

<script>
import CategoryHeader from '../../components/Category/Header/CategoryHeader'
import CircleItem from '~/components/Home/Circle/CircleItem'
export default {
  layout: 'Category',
  components: {
    CategoryHeader,
    CircleItem,
  },
}
</script>

<style scoped lang="scss">
@import '~assets/scss/app/index.scss';
.grid-layout_mdsp {
  max-height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
  grid-row-gap: 10px;
  grid-column-gap: 20px;
  padding-bottom: 30px;
  @include on_tablet() {
    height: calc(100vh - 65px);
  }
  @include on_tablet() {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    padding-bottom: 0.5vw;
  }
}

.category__header_mdsp {
  grid-template-columns: 1fr;
  @include media_screen(desktop) {
    grid-column: 2/4 !important;
    grid-row: 1/3;
  }
}

.circle__item {
  width: 120px;
  height: 120px;
  margin-bottom: 15px;
  svg {
    height: 100%;
    object-fit: contain;
    padding: 10px;
  }
}
.category {
  grid-column: span 1;
  grid-row: span 1;
  display: flex;
  flex-direction: column;
}
.buttons_grid {
  grid-gap: 15px;
  grid-auto-rows: 42px;
  @include media_screen(desktop-wide) {
    grid-auto-rows: 90px;
    grid-gap: 30px;
  }
}
</style>
