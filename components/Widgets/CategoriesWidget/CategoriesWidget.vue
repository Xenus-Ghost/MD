<template>
  <aside
    v-clickoutside="widgetClose"
    :class="{ 'cat-widget_active': isCategoriesWidgetShow }"
    class="cat-widget"
  >
    <!--    <transition name=" cat-widget-fade">-->
    <div class="cat-widget__list-wrapper">
      <Button to="/" class="cat-widget__button_home">
        <template v-slot:icon_left>
          <svg-icon name="home_small" />
        </template>
        Перейти на главную
      </Button>
      <ul class="cat-widget__list">
        <li class="cat-widget__el">
          <NuxtLink to="/строительство" class="cat-widget__link">
            Строительство
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/ремонт" class="cat-widget__link"> Ремонт </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/электрика" class="cat-widget__link">
            Электрика
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/сантехника" class="cat-widget__link">
            Сантехника
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/сварка" class="cat-widget__link"> Сварка </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/проектирование" class="cat-widget__link">
            Проектирование
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/дороги" class="cat-widget__link"> Дороги </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/газификация" class="cat-widget__link">
            Газификация
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/ландшафтный_дизайн" class="cat-widget__link">
            Ландшафтный дизайн
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/благоустройство" class="cat-widget__link">
            Благоустройство
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/инструменты" class="cat-widget__link">
            Инструменты и оборудование
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/печи_и_камины" class="cat-widget__link">
            Печи и камины
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/монолит" class="cat-widget__link"> Монолит </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/" class="cat-widget__link">
            Готовые дома, бани, дачи
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/" class="cat-widget__link">
            Металлы. Дерево. Стекло. Пластмасса.
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/" class="cat-widget__link"> ЖБИ и заводы </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/" class="cat-widget__link">
            Механизация, спецтехника
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/" class="cat-widget__link"> Снос, демонтаж </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/" class="cat-widget__link"> Фрилансеры </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/доставка" class="cat-widget__link">
            Доставка
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/видео" class="cat-widget__link"> Видео </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/мастер_на_час" class="cat-widget__link">
            Мастер на час
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/клининг" class="cat-widget__link"> Клининг </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/выставки" class="cat-widget__link">
            Выставки
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/форумы" class="cat-widget__link"> Форумы </NuxtLink>
        </li>
      </ul>
      <Button
        class="cat-widget__button_close"
        @click.prevent.native="widgetToggle"
      ></Button>
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
  directives: {
    clickoutside: {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
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
      },
    },
  },
  data() {
    return {
      isShow: false,
    }
  },
  computed: {
    isCategoriesWidgetShow() {
      return this.$store.state.isCategoriesWidgetShow
    },
  },
  methods: {
    widgetToggle() {
      this.isShow = !this.isShow
      if (this.isCategoriesWidgetShow === false) {
        this.$store.commit('categoriesWidgetOpen')
        this.isShow = true
      } else {
        this.$store.commit('categoriesWidgetClose')
        this.isShow = false
      }
    },
    widgetClose() {
      if (this.isShow) {
        this.isShow = false
        this.$store.commit('categoriesWidgetClose')
      }
      /* if (this.isCategoriesWidgetShow === true) {
        this.$store.commit('categoriesWidgetClose')
      } else {
        this.$store.commit('categoriesWidgetOpen')
      } */
    },
  },
}
</script>

<style scoped lang="scss">
@import '~assets/scss/app/index';
@import 'CategoriesWidget';
</style>
