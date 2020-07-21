<template>
  <div class="grid-layout_profile">
    <CategoryHeader back-title="Назад к добавлению">
      Тарифы
      <template v-slot:right_column>
        <img
          class="header_category__image"
          src="~/assets/img/icons/coins.svg"
          alt=""
        />
      </template>
    </CategoryHeader>
    <div class="container">
      <Card class="price__card" outline>
        <template #header>
          <h1 class="price__title">Бесплатная публикация</h1>
          <p class="price__title_sm">
            Размещение одного объявление в одной категории на один месяц.
          </p>
        </template>
        <div class="grid_cols_1 grid_cols_2_desktop">
          <div class="grid__column_1 price__column">
            <p class="price__title_md">Частник</p>
            <List :items="items.free.private" class="price__list" />
            <Button shape="semi_rounded" borders="neon" class="price__button">
              Стать нашим партнером
            </Button>
          </div>
          <div class="grid__column_1 price__column">
            <p class="price__title_md">Фирма</p>
            <List :items="items.free.firm" class="price__list" />
            <Button
              shape="semi_rounded"
              borders="neon"
              class="price__button price__button_partner"
            >
              Стать нашим партнером
            </Button>
          </div>
        </div>
      </Card>
      <Card class="price__card" outline>
        <template #header>
          <h1 class="price__title">Бесплатная публикация</h1>
          <p class="price__title_sm">
            Размещение одного объявление в одной категории на один месяц.
          </p>
        </template>
        <div class="grid_cols_1 grid_cols_2_desktop">
          <div class="grid__column_1 price__column">
            <p class="price__title_md">Частник</p>
            <List :items="items.pro.private" class="price__list" />
            <Button shape="semi_rounded" borders="neon" class="price__button">
              Стать нашим партнером
            </Button>
            <Button
              shape="semi_rounded"
              borders="outline"
              class="price__button"
            >
              Стоимость услуги
            </Button>
          </div>
          <div class="grid__column_1 price__column">
            <p class="price__title_md">Фирма</p>
            <List :items="items.pro.firm" class="price__list" />
            <Button
              shape="semi_rounded"
              borders="neon"
              class="price__button price__button_partner"
            >
              Стать нашим партнером
            </Button>
            <Button
              shape="semi_rounded"
              borders="outline"
              class="price__button"
            >
              Стоимость услуги
            </Button>
          </div>
        </div>
      </Card>
      <Card class="price__card price__card_premium" outline>
        <template #header>
          <h1 class="price__title">Бесплатная публикация</h1>
          <p class="price__title_sm">
            Размещение одного объявление в одной категории на один месяц.
          </p>
        </template>
        <div class="grid_cols_1 grid_cols_2_desktop">
          <div class="grid__column_1 price__column">
            <p class="price__title_md">Частник</p>
            <List :items="items.premium.private" class="price__list" />
            <Button shape="semi_rounded" borders="neon" class="price__button">
              Стать нашим партнером
            </Button>
            <Button
              shape="semi_rounded"
              borders="outline"
              class="price__button"
            >
              Стоимость услуги
            </Button>
          </div>
          <div class="grid__column_1 price__column">
            <p class="price__title_md">Фирма</p>
            <List :items="items.premium.firm" class="price__list" />
            <Button
              shape="semi_rounded"
              borders="neon"
              class="price__button price__button_partner"
            >
              Стать нашим партнером
            </Button>
            <Button
              shape="semi_rounded"
              borders="outline"
              class="price__button"
            >
              Стоимость услуги
            </Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import CategoryHeader from '@/components/Category'

import List from '@/components/List/List'
export default {
  middleware: ['auth'],
  layout: 'Cabinet',
  components: {
    List,
    CategoryHeader,
  },
  data() {
    return {
      items: {
        free: {
          private: [
            'Описание объявления',
            'Адрес, метро',
            '5 фотографий',
            'Номер телефона',
          ],
          firm: [
            'Описание объявления',
            'Название фирмы',
            'Адрес, метро',
            '5 фотографий',
            'Номер телефона',
          ],
        },
        pro: {
          private: [
            'Описание объявления',
            '10 фотографий',
            'Адрес, метро',
            '5 фотографий',
            'Номер телефона',
            'Ссылка на видео',
            'Ссылки на социальные сети',
          ],
          firm: [
            'Название фирмы',
            '10 фотографий',
            'Описание объявления',
            'Адрес, метро',
            '5 фотографий',
            'Номер телефона',
            'Логотип',
            'Ссылка на видео',
            'Ссылки на социальные сети',
          ],
        },
        premium: {
          private: [
            'Топ первых мест',
            'Подсветка аккаунта',
            'Лидогенерация аккаунта и его продвижения',
            'Может выложить видео',
            'Адрес и метро',
            '15 фотографий',
            'Телефон и почта',
            'Может добавить 7 категорий',
          ],
          firm: [
            'Размещение одного объявление в пяти категориях',
            'Название фирмы',
            'Ссылки на социльные сети',
            'Ссылка на видео',
            'Логотип',
            'Описание объявления',
            '15 фотографий',
            'Прайс лист',
            'Виды лидогенерации с контролем технилогии продаж',
            'Размещение объявления в топе первых мест',
            'Подсветка аккаунта',
            'Может выложить видео',
            'Телефон и почта',
            'Адрес и метро',
            'Бегущая строка',
          ],
        },
      },
    }
  },
}
</script>

<style lang="scss">
@import '~assets/scss/framework/basic.scss';

.price__card {
  margin-bottom: 2rem;
  border-radius: 50px;
  &_premium {
    --card-border-color: #ffb800;
  }
  .card__header {
    @include on_desktop() {
      width: 90%;
    }
  }
  .card__body {
    @include on_desktop() {
      width: 70%;
    }
  }
}
.price__title {
  font-weight: bold;
  font-size: 29px;
  line-height: 35px;
  text-align: center;
  margin: 0;
  &_sm {
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    margin: 0;
  }
  &_md {
    font-weight: bold;
    font-size: 22px;
    line-height: 26px;
    text-align: center;
    margin: 0;
  }
}
.price__column {
  padding: 1rem 1rem;
  display: grid;
  grid-template-rows: 26px auto 35px;
  grid-auto-rows: 35px;
  grid-gap: 1rem;
  justify-self: center;
  position: relative;
  @include on_desktop() {
    width: 400px;
    &:first-of-type {
      &:after {
        position: absolute;
        content: '';
        top: 20%;
        right: 0;
        width: 1px;
        height: 60%;
        background-color: white;
        filter: blur(6px);
      }
    }
  }
}
.price__list {
  height: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  @include on_desktop() {
    max-height: 330px;
    max-width: 330px;
  }
}
.price__button {
  align-self: end;
  width: 100%;
  justify-self: center;
  @include on_desktop() {
    width: 330px;
  }
}
</style>
