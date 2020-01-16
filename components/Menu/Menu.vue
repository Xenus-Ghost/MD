<template>
  <div class="container menu__wrapper">
    <nuxt-link to="/" class="menu__logo">
      <div class="logo">MD</div>
      <span class="logo__title">Монтаж Демонтаж</span>
    </nuxt-link>
    <div class="menu__button_burger" @click="menuToggle">
      <span class="menu__button_burger-line"></span>
    </div>
    <nav :class="MenuClassList" class="menu__list" @click="menuToggle">
      <nuxt-link to="/" class="menu__item menu__item_mobile">
        Главная
      </nuxt-link>
      <span to="/" class="menu__item" @click.prevent="contactsModalOpen">
        О компании
      </span>
      <span to="/" class="menu__item" @click.prevent="aboutModalOpen">
        Контакты
      </span>
      <div v-if="this.$auth.loggedIn">
        <nuxt-link to="/lk">
          {{ this.$auth.user.name }}
        </nuxt-link>
        <span> / </span>
        <span @click="logout">
          Выйти
        </span>
      </div>
      <span class="menu__item menu__item_mobile" @click="authFormOpen">
        Личный кабинет
      </span>
      <span class="menu__item menu__item_mobile" @click="categoriesOpen">
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
    },
    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/scss/framework/basic.scss';
@import 'Menu.scss';
</style>
