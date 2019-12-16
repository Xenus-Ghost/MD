<template>
  <div class="container menu__wrapper">
    <nuxt-link to="/" class="menu__logo">
      <div class="logo">MD</div>
      <span class="logo__title">Монтаж Демонтаж</span>
    </nuxt-link>
    <div @click="menuToggle" class="menu__button_burger">
      <span class="menu__button_burger-line"></span>
    </div>
    <nav :class="MenuClassList" @click="menuToggle" class="menu__list">
      <nuxt-link to="/" class="menu__item menu__item_mobile">
        Главная
      </nuxt-link>
      <span @click.prevent="contactsModalOpen" to="/" class="menu__item">
        О компании
      </span>
      <span @click.prevent="aboutModalOpen" to="/" class="menu__item">
        Контакты
      </span>
      <span @click="authFormOpen" class="menu__item menu__item_mobile">
        Личный кабинет
      </span>
      <span @click="categoriesOpen" class="menu__item menu__item_mobile">
        Категории
      </span>
      <div style="font-size: 0.9rem">
        RU
        <img src="~assets/img/flags/ru.svg" alt="RU" />
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  directives: {
    clickoutside: {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
          // here I check that click was outside the el and his childrens
          if (!(el === event.target || el.contains(event.target))) {
            // and if it did, call method provided in attribute value
            vnode.context[binding.expression](event)
          }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
        document.body.addEventListener('touchstart', el.clickOutsideEvent)
      },
      unbind(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
        document.body.removeEventListener('touchstart', el.clickOutsideEvent)
      },
      stopProp(event) {
        event.stopPropagation()
      }
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    MenuClassList() {
      const obj = []
      if (this.isShow) obj.push('menu__list_show')
      return obj
    }
  },
  methods: {
    contactsModalOpen() {
      this.$emit('contactsModalOpen')
    },
    aboutModalOpen() {
      this.$emit('aboutModalOpen')
    },
    menuToggle() {
      // this.isSHow = !this.isSHow
      this.isShow = !this.isShow
    },
    authFormOpen() {
      this.$store.commit('authFormOpen')
    },
    categoriesOpen() {
      // this.$emit('categoriesOpen')
      this.$store.commit('categoriesWidgetOpen')
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/scss/framework/basic.scss';
@import 'Menu.scss';
</style>
