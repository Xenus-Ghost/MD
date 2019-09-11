<template>
  <div class="container menu__wrapper">
    <div class="menu__logo">
      <div class="logo">MD</div>
      <span class="logo__title">Монтаж Демонтаж</span>
    </div>
    <nav class="menu__list">
      <nuxt-link to="/">О компании</nuxt-link>
      <nuxt-link to="/">Контакты</nuxt-link>
      <div>
        RU
        <img src="~assets/img/flags/ru.svg" alt="RU" />
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Menu'
}
</script>

<style lang="scss">
@import '../../assets/scss/framework/index.scss';
.menu {
  &__logo {
    display: flex;
    align-items: center;
    grid-area: logo;
  }
  &__wrapper {
    display: grid;
    grid-template-columns: 1fr auto auto;
    grid-template-areas: 'logo . menu';
    @include media_screen(desktop) {
      grid-template-areas: 'logo . menu';
      grid-template-columns: 365px auto auto;
    }
  }
  &__list {
    width: 100%;
    grid-area: menu;
    display: flex;
    justify-content: space-between;
    align-self: center;
    justify-self: flex-end;
  }
}
.logo {
  font-size: 1.375rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: rgba(14, 36, 62, 0.4);
  border: 2px solid #ffffff;
  box-shadow: 0 0 15px 4px white;
  /*filter: drop-shadow(0 0 2px white);*/
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.72),
    0 0 1em rgba(255, 255, 255, 0.71);
}
.logo__title {
  display: none;
  font-size: 1.625rem;
  font-weight: 300;
  padding: 10px 15px;
  @include media_screen(desktop) {
    display: block;
  }
}
</style>
