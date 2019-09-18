<template>
  <aside class="cat-widget" :class="{ 'cat-widget_active': isShow }">
    <!--    <transition name=" cat-widget-fade">-->
    <div class="cat-widget__list-wrapper">
      <Button to="/" class="cat-widget__button_home">
        <template v-slot:icon_left>
          <img src="~assets/img/icons/home_small.svg" alt="home" />
        </template>
        Перейти на главную
      </Button>
      <ul class="cat-widget__list">
        <li v-for="(n, j) in 30" :key="j" class="cat-widget__el">
          <NuxtLink to="/" class="cat-widget__link">
            Готовые дома, бани, дачи
          </NuxtLink>
        </li>
      </ul>
    </div>
    <!--    </transition>-->
    <Button
      color="red"
      class="cat-widget__button"
      @click.prevent.native="widgetToggle"
    >
      Категории фирм
    </Button>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    widgetToggle() {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/scss/app/index';
@import 'CategoriesWidget';
</style>
