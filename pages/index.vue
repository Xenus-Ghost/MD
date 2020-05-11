<template>
  <div class="home-page">
    <div class="container home-wrapper">
      <CircleContainer>
        <template v-slot:default>
          <CircleItem v-for="(cat, i) in categories" :key="i" :to="cat.path">
            <!--            <div class="circle__item">-->
            <img :src="cat.icon_url" alt="" class="cat-button__image" />
            <span class="cat-button__title">{{ cat.title }}</span>
            <!--            </div>-->
          </CircleItem>
        </template>
        <template v-slot:circle_center>
          <div class="circle__center">
            <img
              src="~assets/img/icons/MD_logo.svg"
              class="site__logo"
              alt="MD"
            />
            <h1 class="site-title">Монтаж Демонтаж</h1>
            <a class="text_neon site__link" href="//montazhdemontazh.ru">
              montazhdemontazh.ru
            </a>
            <a class="text_neon site__link_mirror" href="//монтаждемонтаж.рф">
              монтаждемонтаж.рф</a
            >
            <div
              v-if="!isLogged"
              style="
                display: flex;
                justify-content: space-between;
                margin-bottom: 15px;
              "
            >
              <Button
                borders="outline"
                shape="rounded"
                class="home-page__button"
                @click.native="$store.commit('authFormOpen', 'reg')"
              >
                Регистрация
              </Button>
              <Button
                borders="outline"
                shape="rounded"
                class="home-page__button"
                @click.native="$store.commit('authFormOpen', 'login')"
              >
                Вход
              </Button>
            </div>
            <Button
              borders="outline"
              shape="rounded"
              style="align-self: center;"
              :class="['home-page__button', 'button_black-list']"
              @click.native="BlackListOpen"
            >
              <template v-slot:icon_left>
                <img src="~/assets/img/icons/list.svg" alt="list" />
              </template>
              Чёрный список
            </Button>
          </div>
        </template>
      </CircleContainer>
      <Button
        to="/события/выставки"
        style="grid-column: 1; grid-row: 1;"
        shape="rounded"
        borders="neon"
        class="button_aside"
        >Выставки</Button
      >
      <Button
        to="/события/форумы"
        style="grid-column: 3; grid-row: 1; justify-self: right;"
        shape="rounded"
        borders="neon"
        class="button_aside"
        >Форумы</Button
      >
      <Button
        to="/доставка"
        style="grid-column: 1; grid-row: 3;"
        shape="rounded"
        borders="neon"
        class="button_aside"
        >Доставка</Button
      >
      <Button
        to="/видео"
        style="grid-column: 1; grid-row: 4;"
        shape="rounded"
        borders="neon"
        class="button_aside"
        >Видео</Button
      >
      <Button
        to="/мастер-на-час"
        style="grid-column: 3; grid-row: 3; justify-self: right;"
        shape="rounded"
        borders="neon"
        class="button_aside"
        >Мастер на час</Button
      >
      <Button
        to="/клининг"
        style="grid-column: 3; grid-row: 4; justify-self: right;"
        shape="rounded"
        borders="neon"
        class="button_aside"
        >Клининг</Button
      >
      <div class="home-page__categories">
        <div class="home-page__category">
          <img src="~assets/img/icons/house.svg" alt="" />
          <div class="home-page__category-title">Готовые дома, бани, дачи</div>
          <Button
            to="/дома-бани-дачи"
            width="100%"
            borders="outline"
            shape="rounded"
          >
            Подробнее</Button
          >
          <img class="divider" src="~assets/img/divider.svg" alt="" />
        </div>
        <div class="home-page__category">
          <img src="~assets/img/icons/materials.svg" alt="" />
          <div class="home-page__category-title">
            Металлы. Дерево. <br />
            Стекло. Пластмасса.
          </div>
          <Button to="/мдсп" width="100%" borders="outline" shape="rounded">
            Подробнее</Button
          >
          <img class="divider" src="~assets/img/divider.svg" alt="" />
        </div>
        <div class="home-page__category">
          <img src="~assets/img/icons/mixer.svg" alt="" />
          <div class="home-page__category-title">ЖБИ и заводы</div>
          <Button to="/жби" width="100%" borders="outline" shape="rounded">
            Подробнее</Button
          >
          <img class="divider" src="~assets/img/divider.svg" alt="" />
        </div>
        <div class="home-page__category">
          <img src="~assets/img/icons/digger.svg" alt="" />
          <div class="home-page__category-title">Механизация, спецтехника</div>
          <Button
            to="/механизация-спецтехника"
            width="100%"
            borders="outline"
            shape="rounded"
          >
            Подробнее</Button
          >
          <img class="divider" src="~assets/img/divider.svg" alt="" />
        </div>
        <div class="home-page__category">
          <img src="~assets/img/icons/hook.svg" alt="" />
          <div class="home-page__category-title">Снос, демонтаж</div>
          <Button
            to="/снос-демонтаж"
            width="100%"
            borders="outline"
            shape="rounded"
          >
            Подробнее</Button
          >
          <img class="divider" src="~assets/img/divider.svg" alt="" />
          <img class="divider" src="~assets/img/divider.svg" alt="" />
        </div>
        <div class="home-page__category">
          <img src="~assets/img/icons/builder.svg" alt="" />
          <div class="home-page__category-title">Фрилансеры</div>
          <Button
            to="/фрилансеры"
            width="100%"
            borders="outline"
            shape="rounded"
          >
            Подробнее</Button
          >
        </div>
      </div>
    </div>
    <BlackList
      v-if="isBlackListShow"
      :is-show="isBlackListShow"
      @close="isBlackListShow = false"
    >
    </BlackList>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import CircleContainer from '~/components/Home/Circle/CircleContainer'
import CircleItem from '~/components/Home/Circle/CircleItem'
import BlackList from '~/components/BlackList/BlackList'
export default {
  layout: 'Home',
  components: {
    CircleContainer,
    CircleItem,
    BlackList,
  },
  data() {
    return {
      categories: {
        monolith: {
          path: '/монолит',
          title: 'Монолит',
          icon_url: 'img/categories/1.svg',
        },
        building: {
          path: '/строительство',
          title: 'Строительство',
          icon_url: 'img/categories/2.svg',
        },
        renovation: {
          path: '/ремонт',
          title: 'Ремонт',
          icon_url: 'img/categories/3.svg',
        },
        electric: {
          path: '/электрика',
          title: 'Электрика',
          icon_url: 'img/categories/4.svg',
        },
        plumbing: {
          path: '/сантехника',
          title: 'Сантехника',
          icon_url: 'img/categories/5.svg',
        },
        welding: {
          path: '/сварка',
          title: 'Сварка',
          icon_url: 'img/categories/6.svg',
        },
        designing: {
          path: '/проектирование',
          title: 'Проектирование',
          icon_url: 'img/categories/8.svg',
        },
        roads: {
          path: '/дороги',
          title: 'Дороги',
          icon_url: 'img/categories/9.svg',
        },
        gas: {
          path: '/газификация',
          title: 'Газификация',
          icon_url: 'img/categories/10.svg',
        },
        landscape: {
          path: '/ландшафтный-дизайн',
          title: 'Ландшафтный дизайн',
          icon_url: 'img/categories/12.svg',
        },
        beautification: {
          path: '/благоустройство',
          title: 'Благоустройство',
          icon_url: 'img/categories/13.svg',
        },
        tools: {
          path: '/инструменты-и-оборудование',
          title: 'Инструменты и оборудование',
          icon_url: 'img/categories/14.svg',
        },
        stoves: {
          path: '/печи-и-камины',
          title: 'Печи и камины',
          icon_url: 'img/categories/15.svg',
        },
      },
      isBlackListShow: false,
    }
  },
  computed: {
    isLogged() {
      return this.$store.state.auth.loggedIn
    },
  },
  /* mounted() {
    this.$root.$on('authFormOpen', function (id) {})
  }, */
  methods: {
    authFormOpen() {
      // this.isAuthFormShow = false
      this.$store.commit('authFormOpen')
    },
    BlackListOpen() {
      this.isBlackListShow = true
    },
    ...mapMutations({}),
  },
}
</script>

<style lang="scss">
@import '~assets/scss/app/index';
</style>
<style lang="scss" scoped>
@import '~assets/scss/app/index';
.home-page__button {
  font-size: 0.875rem !important;
  height: 30px;
  width: 115px;
  margin-bottom: 15px;
  @include media_screen(desktop-wide) {
    font-size: 1.125rem;
    height: 35px;
    width: 140px;
  }
  @include media_screen(desktop-fhd) {
    font-size: 1.375rem;
    /*height: 55px;*/
    width: 190px;
  }
}
.button_black-list {
  width: 150px;
  @include media_screen(desktop-wide) {
    width: 215px;
  }
  @include media_screen(desktop-fhd) {
    width: 235px;
    height: 45px;
  }
}
</style>
