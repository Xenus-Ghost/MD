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
            <div style="display: flex; justify-content: space-between;">
              <Button
                borders="outline"
                shape="rounded"
                class="home-page__button"
              >
                Регистрация
              </Button>
              <Button
                borders="outline"
                shape="rounded"
                class="home-page__button"
              >
                Вход
              </Button>
            </div>
            <Button
              borders="outline"
              shape="rounded"
              style="align-self: center"
              class="home-page__button button_black-list"
            >
              <template v-slot:icon_left>
                <img src="~assets/img/icons/list.svg" alt="list" />
              </template>
              Чёрный список
            </Button>
          </div>
        </template>
      </CircleContainer>
      <Button
        to="/"
        style="grid-column: 1;grid-row: 1"
        shape="rounded"
        borders="neon"
        >Выставки</Button
      >
      <Button
        to="/"
        style="grid-column: 3;grid-row: 1"
        shape="rounded"
        borders="neon"
        >Форумы</Button
      >
      <Button
        to="/"
        style="grid-column: 1;grid-row: 3"
        shape="rounded"
        borders="neon"
        >Доставка</Button
      >
      <Button
        to="/"
        style="grid-column: 1;grid-row: 4"
        shape="rounded"
        borders="neon"
        >Видео</Button
      >
      <Button
        to="/"
        style="grid-column: 3;grid-row: 3"
        shape="rounded"
        borders="neon"
        >Мастер на час</Button
      >
      <Button
        to="/"
        style="grid-column: 3;grid-row: 4"
        shape="rounded"
        borders="neon"
        >Клининг</Button
      >
      <div class="home-page__categories">
        <div class="home-page__category">
          <img src="~assets/img/icons/house.svg" alt="" />
          <div class="home-page__category-title">Готовые дома, бани, дачи</div>
          <Button to="/" width="100%" borders="outline" shape="rounded">
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
          <Button to="/" width="100%" borders="outline" shape="rounded">
            Подробнее</Button
          >
          <img class="divider" src="~assets/img/divider.svg" alt="" />
        </div>
        <div class="home-page__category">
          <img src="~assets/img/icons/mixer.svg" alt="" />
          <div class="home-page__category-title">ЖБИ и заводы</div>
          <Button to="/" width="100%" borders="outline" shape="rounded">
            Подробнее</Button
          >
          <img class="divider" src="~assets/img/divider.svg" alt="" />
        </div>
        <div class="home-page__category">
          <img src="~assets/img/icons/digger.svg" alt="" />
          <div class="home-page__category-title">Механизация, спецтехника</div>
          <Button to="/" width="100%" borders="outline" shape="rounded">
            Подробнее</Button
          >
          <img class="divider" src="~assets/img/divider.svg" alt="" />
        </div>
        <div class="home-page__category">
          <img src="~assets/img/icons/hook.svg" alt="" />
          <div class="home-page__category-title">Снос, демонтаж</div>
          <Button to="/" width="100%" borders="outline" shape="rounded">
            Подробнее</Button
          >
          <img class="divider" src="~assets/img/divider.svg" alt="" />
        </div>
        <div class="home-page__category">
          <img src="~assets/img/icons/builder.svg" alt="" />
          <div class="home-page__category-title">Фрилансеры</div>
          <Button to="/" width="100%" borders="outline" shape="rounded">
            Подробнее</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CircleContainer from '~/components/Home/Circle/CircleContainer'
import CircleItem from '~/components/Home/Circle/CircleItem'
export default {
  layout: 'Home',
  components: {
    CircleContainer,
    CircleItem
  },
  data() {
    return {
      categories: {
        monolith: {
          path: '/monolith',
          title: 'Монолит',
          icon_url: 'img/categories/1.svg'
        },
        building: {
          path: '/building',
          title: 'Строительство',
          icon_url: 'img/categories/2.svg'
        },
        renovation: {
          path: '/renovation',
          title: 'Ремонт',
          icon_url: 'img/categories/3.svg'
        },
        electric: {
          path: '/electric',
          title: 'Электрика',
          icon_url: 'img/categories/4.svg'
        },
        plumbing: {
          path: '/plumbing',
          title: 'Сантехника',
          icon_url: 'img/categories/5.svg'
        },
        welding: {
          path: '/welding',
          title: 'Сварка',
          icon_url: 'img/categories/6.svg'
        },
        designing: {
          path: '/designing',
          title: 'Проектирование',
          icon_url: 'img/categories/8.svg'
        },
        roads: {
          path: '/roads',
          title: 'Дороги',
          icon_url: 'img/categories/9.svg'
        },
        gas: {
          path: '/gas',
          title: 'Газификация',
          icon_url: 'img/categories/10.svg'
        },
        landscape: {
          path: '/landscape',
          title: 'Ландшафтный дизайн',
          icon_url: 'img/categories/12.svg'
        },
        beautification: {
          path: '/beautification',
          title: 'Благоустройство',
          icon_url: 'img/categories/13.svg'
        },
        tools: {
          path: '/tools',
          title: 'Инструменты и оборудование',
          icon_url: 'img/categories/14.svg'
        },
        stoves: {
          path: '/stoves',
          title: 'Печи и камины',
          icon_url: 'img/categories/15.svg'
        }
      }
    }
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
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 40px 2fr 40px 40px auto;
  grid-row-gap: 10px;
  /*height: 620px;*/
  height: calc(100vh - 75px);
  /*@include media_screen(desktop-wide) {
    height: 780px;
  }
  @include media_screen(desktop-fhd) {
    height: 900px;
  }*/
}
.circle__wrapper {
  grid-column: 2;
  grid-row: 1/-2;
}
.site__logo {
  /*width: 7vw;*/
  width: 116px;
  max-width: 6.5vw;
  align-self: center;
}
.site-title {
  margin-top: 0;
  font-size: 1.65rem;
  text-align: center;
  font-weight: 300;
  margin-bottom: 0.5vw;
  @include media_screen(desktop-wide) {
    font-size: 2.4rem;
  }
  @include media_screen(desktop-fhd) {
  }
}
.site__link {
  font-size: 1.625rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 0.5vw;
  @include media_screen(desktop-wide) {
    font-size: 2rem;
  }
  @include media_screen(desktop-fhd) {
    font-size: 2.25rem;
  }
}
.site__link_mirror {
  font-size: 1.375rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1vw;
  @include media_screen(desktop-wide) {
    font-size: 1.625rem;
  }
  @include media_screen(desktop-fhd) {
    font-size: 1.75rem;
  }
}
.home-page__button {
  font-size: 0.875rem;
  height: 30px;
  width: 130px;
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
  width: 190px;
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
  grid-template-columns: repeat(6, 1fr);
  grid-column: 1/-1;
  grid-row: -1;
}
.home-page__category {
  padding: 10px;
  padding: 0.15vw 20px;
  position: relative;
  & > .divider {
    position: absolute;
    top: 0;
    right: -8px;
    bottom: 0;
    height: 100%;
    width: 15px;
  }
  & > img {
    width: 100%;
    object-fit: contain;
    height: 50px;
    height: calc(32px + 1.28vw);
    /*margin-bottom: 0.25vw;*/
    @include media_screen(desktop-wide) {
      /*height: 60px;*/
      margin-bottom: 10px;
    }
  }
  & > .button {
    font-size: 0.75rem;
    font-weight: normal;
    height: calc(5px + 1.5vw);
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
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
  width: 95%;
  margin: 0 auto 0.25vw auto;
  height: calc(34px - 0.25vw);
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
}
.cat-button__image {
  width: 35px;
  height: 30px;
  object-fit: contain;
}
.cat-button__title {
  font-size: 0.45rem;
  text-align: center;
  line-height: 1;
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
</style>
