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
              style="display: flex; justify-content: space-between; margin-bottom: 15px"
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
              style="align-self: center"
              class="home-page__button button_black-list"
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
        to="/выставки"
        style="grid-column: 1;grid-row: 1"
        shape="rounded"
        borders="neon"
        class="button_aside"
        >Выставки</Button
      >
      <Button
        to="/форумы"
        style="grid-column: 3;grid-row: 1;justify-self: right"
        shape="rounded"
        borders="neon"
        class="button_aside"
        >Форумы</Button
      >
      <Button
        to="/доставка"
        style="grid-column: 1;grid-row: 3"
        shape="rounded"
        borders="neon"
        class="button_aside"
        >Доставка</Button
      >
      <Button
        to="/видео"
        style="grid-column: 1;grid-row: 4"
        shape="rounded"
        borders="neon"
        class="button_aside"
        >Видео</Button
      >
      <Button
        to="/мастер_на_час"
        style="grid-column: 3;grid-row: 3; justify-self: right"
        shape="rounded"
        borders="neon"
        class="button_aside"
        >Мастер на час</Button
      >
      <Button
        to="/клининг"
        style="grid-column: 3;grid-row: 4; justify-self: right"
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
    BlackList
  },
  data() {
    return {
      categories: {
        monolith: {
          path: '/монолит',
          title: 'Монолит',
          icon_url: 'img/categories/1.svg'
        },
        building: {
          path: '/строительство',
          title: 'Строительство',
          icon_url: 'img/categories/2.svg'
        },
        renovation: {
          path: '/ремонт',
          title: 'Ремонт',
          icon_url: 'img/categories/3.svg'
        },
        electric: {
          path: '/электрика',
          title: 'Электрика',
          icon_url: 'img/categories/4.svg'
        },
        plumbing: {
          path: '/сантехника',
          title: 'Сантехника',
          icon_url: 'img/categories/5.svg'
        },
        welding: {
          path: '/сварка',
          title: 'Сварка',
          icon_url: 'img/categories/6.svg'
        },
        designing: {
          path: '/проектирование',
          title: 'Проектирование',
          icon_url: 'img/categories/8.svg'
        },
        roads: {
          path: '/дороги',
          title: 'Дороги',
          icon_url: 'img/categories/9.svg'
        },
        gas: {
          path: '/газификация',
          title: 'Газификация',
          icon_url: 'img/categories/10.svg'
        },
        landscape: {
          path: '/ландшафтный_дизайн',
          title: 'Ландшафтный дизайн',
          icon_url: 'img/categories/12.svg'
        },
        beautification: {
          path: '/благоустройство',
          title: 'Благоустройство',
          icon_url: 'img/categories/13.svg'
        },
        tools: {
          path: '/инструменты',
          title: 'Инструменты и оборудование',
          icon_url: 'img/categories/14.svg'
        },
        stoves: {
          path: '/печи_и_камины',
          title: 'Печи и камины',
          icon_url: 'img/categories/15.svg'
        }
      },
      isBlackListShow: false
    }
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
    ...mapMutations({})
  }
}
</script>

<style lang="scss">
@import '~assets/scss/framework/basic';
/*body {
  $bg-opacity: 0.8;
  min-height: 100vh;
  height: 100%;
  background: linear-gradient(
      to bottom,
      rgba(35, 150, 255, (0.12 * $bg-opacity)) 0%,
      rgba(0, 55, 106, (0.8 * $bg-opacity)) 73.34%,
      rgba(0, 0, 0, (0.8 * $bg-opacity)) 100%
    ),
    linear-gradient(
      to top,
      rgba(0, 110, 213, (0.8 * $bg-opacity)),
      rgba(0, 110, 213, (0.8 * $bg-opacity))
    ),
    url('../assets/img/bg/1.jpg') center no-repeat / cover;
  background-attachment: fixed;
}*/
.home-wrapper {
  display: grid;
  grid-row-gap: 10px;
  margin-top: 10px;
  /*height: 620px;*/
  height: calc(100vh - 85px);
  @include media_screen(desktop) {
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: 40px 2fr 40px 40px auto;
  }
  @include media_screen(desktop-wide) {
    grid-template-columns: 1fr 3fr 1fr;
  }
  /*
  @include media_screen(desktop-fhd) {
    height: 900px;
  }*/
  .button_aside {
    width: 70%;
    @include media_screen(desktop-wide) {
      width: 100%;
    }
  }
}
.circle__wrapper {
  @include media_screen(desktop) {
    grid-column: 2;
    grid-row: 1/-2;
  }
}
.site__logo {
  /*width: 7vw;*/
  width: 116px;
  /*max-width: 6.5vw;*/
  align-self: center;
  @include media_screen(desktop) {
    max-width: 6.5vw;
  }
}
.site-title {
  /*margin-top: 0;*/
  font-size: 1.65rem;
  text-align: center;
  font-weight: 300;
  margin: 0 0 0.25vw 0 !important;
  @include media_screen(desktop-wide) {
    font-size: 2.4rem;
    margin-bottom: 0.5vw;
  }
}
.site__link {
  font-size: 1.625rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 0.25vw;
  @include media_screen(desktop-wide) {
    font-size: 2rem;
    margin-bottom: 0.5vw;
  }
  @include media_screen(desktop-fhd) {
    font-size: 2.25rem;
  }
}
.site__link_mirror {
  font-size: 1.375rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5vw;
  @include media_screen(desktop-wide) {
    font-size: 1.625rem;
    margin-bottom: 1vw;
  }
  @include media_screen(desktop-fhd) {
    font-size: 1.75rem;
  }
}
.home-page__button {
  font-size: 0.875rem !important;
  /*font-size: 0.7rem;*/
  height: 30px;
  width: 115px;
  /*width: 130px;*/
  margin-bottom: 15px;
  @include media_screen(desktop-wide) {
    font-size: 1.125rem;
    height: 35px;
    width: 140px;
  }
  @include media_screen(desktop-fhd) {
    font-size: 1.375rem;
    height: 55px;
    width: 190px;
  }
}
.button_black-list {
  width: 150px;
  /*margin-top: 15px;*/
  /*width: 190px;*/
  @include media_screen(desktop-wide) {
    width: 215px;
  }
  @include media_screen(desktop-fhd) {
    width: 235px;
    height: 45px;
  }
}
.home-page__categories {
  display: grid;
  grid-column: 1/-1;
  grid-row: 2;
  grid-template-columns: 1fr;
  @include media_screen(tablet) {
    grid-template-columns: repeat(2, 1fr);
  }
  @include media_screen(tablet-wide) {
    grid-template-columns: repeat(3, 1fr);
  }
  @include media_screen(desktop) {
    grid-row: -1;
    grid-template-columns: repeat(6, 1fr);
  }
}
.home-page__category {
  padding: 0.15vw 20px;
  position: relative;
  @include media_screen(desktop) {
    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
    }
  }
  & > .divider {
    display: none;
    @include media_screen(desktop) {
      display: block;
      position: absolute;
      top: 0;
      right: -8px;
      bottom: 0;
      height: 100%;
      width: 15px;
    }
  }
  & > img {
    width: 100%;
    object-fit: contain;
    /*height: 50px;*/
    height: 35px;
    /*margin-bottom: 0.25vw;*/
    @include media_screen(desktop-wide) {
      /*height: 60px;*/
      margin-bottom: 10px;
      height: 50px;
    }
  }
  & > .button {
    font-size: 0.9rem;
    font-weight: normal;
    /*max-width: 150px;*/
    @include media_screen(desktop) {
      font-size: 0.75rem;
      height: calc(5px + 1.5vw);
    }
    @include media_screen(desktop-wide) {
      font-size: 1rem;
      /*height: 35px;*/
    }
  }
}
.home-page__category-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  width: 95%;
  margin: 0 auto 0.25vw auto;
  height: calc(34px - 0.25vw);
  @include media_screen(desktop) {
    font-size: 0.8rem;
  }
  @include media_screen(desktop-wide) {
    font-size: 1.15rem;
    height: 55px;
  }
}

.circle__item .button__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /*flex-wrap: wrap;*/
  @include media_screen(desktop, max) {
    transform: scale(0.85);
  }
}
.cat-button__image {
  width: 60px;
  height: 50px;
  object-fit: contain;
  @include media_screen(notebook) {
    width: 35px;
    height: 30px;
  }
}
.cat-button__title {
  font-size: 0.8rem;
  /*font-size: 0.6em;*/
  text-align: center;
  line-height: 1;
  @include media_screen(notebook) {
    font-size: 0.5rem;
  }
  @include media_screen(desktop-wide) {
    font-size: 0.65rem;
  }
  @include media_screen(desktop-fhd) {
    font-size: 0.8rem;
  }
  &:hover {
    @include text-neon(2);
  }
}
.button_aside {
  @include media_screen(tablet, max) {
    grid-column: 1 !important;
    grid-row: unset !important;
    justify-self: center !important;
  }
}
</style>
