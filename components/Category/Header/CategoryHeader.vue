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
        to="/"
        shape="rounded"
        borders="neon"
        width="430px"
        margin="0 auto"
      >
        Вернуться на главную
      </Button>
    </div>
    <div class="header__col_right">
      <slot name="right_column"></slot>
    </div>
  </header>
</template>

<script>
export default {
  name: 'CategoryHeader'
}
</script>

<style scoped lang="scss">
@import '../../../assets/scss/app/index';
@import 'category_header';
</style>
