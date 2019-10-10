<template>
  <aside
    v-clickoutside="widgetClose"
    class="cat-widget"
    :class="{ 'cat-widget_active': isShow }"
  >
    <!--    <transition name=" cat-widget-fade">-->
    <div class="cat-widget__list-wrapper">
      <Button to="/" class="cat-widget__button_home">
        <template v-slot:icon_left>
          <img src="~assets/img/icons/home_small.svg" alt="home" />
        </template>
        Перейти на главную
      </Button>
      <ul class="cat-widget__list">
        <li class="cat-widget__el">
          <NuxtLink to="/building" class="cat-widget__link">
            Строительство
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/renovation" class="cat-widget__link">
            Ремонт
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/electric" class="cat-widget__link">
            Электрика
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/plumbing" class="cat-widget__link">
            Сантехника
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/welding" class="cat-widget__link">
            Сварка
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/designing" class="cat-widget__link">
            Проектирование
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/roads" class="cat-widget__link">
            Дороги
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/gas" class="cat-widget__link">
            Газификация
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/landscape" class="cat-widget__link">
            Ландшафтный дизайн
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/beautification" class="cat-widget__link">
            Благоустройство
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/tools" class="cat-widget__link">
            Инструменты и оборудование
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/stoves" class="cat-widget__link">
            Печи и камины
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/monolith" class="cat-widget__link">
            Монолит
          </NuxtLink>
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
          <NuxtLink to="/" class="cat-widget__link">
            ЖБИ и заводы
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/" class="cat-widget__link">
            Механизация, спецтехника
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/" class="cat-widget__link">
            Снос, демонтаж
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/" class="cat-widget__link">
            Фрилансеры
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/" class="cat-widget__link">
            Доставка
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/" class="cat-widget__link">
            Видео
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/" class="cat-widget__link">
            Мастер на час
          </NuxtLink>
        </li>
        <li class="cat-widget__el">
          <NuxtLink to="/" class="cat-widget__link">
            Клининг
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
  methods: {
    widgetToggle() {
      this.isShow = !this.isShow
    },
    widgetClose() {
      if (this.isShow) {
        this.isShow = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/scss/app/index';
@import 'CategoriesWidget';
</style>
