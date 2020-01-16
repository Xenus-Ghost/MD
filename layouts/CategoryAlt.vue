<template>
  <div>
    <Menu
      @contactsModalOpen="contactsModalOpen"
      @aboutModalOpen="aboutModalOpen"
    ></Menu>
    <CategoriesWidget></CategoriesWidget>
    <ProfileWidget></ProfileWidget>
    <article class="container_full layout_category">
      <nuxt />
    </article>
    <Modal v-show="aboutModalShow" @close="aboutModalShow = false">
      <template v-slot:header>
        О компании
      </template>
      <template v-slot:body>
        <strong>
          «СОТКА» — Справочник мебельных компаний. Все мебельные фабрики для
          Вашего розничного бизнеса. Ежедневная публикация новинок и регистрация
          новых компаний.
        </strong>
        <p>
          Наши операторы постоянно собирают и проверяют информацию о мебельных
          организациях. Ассортимент продукции, товаров, фото-презентации фабрик
          и салонов продаж, рекламные материалы, адреса, телефоны, время работы
          и другие подробности, отличающих одну компанию от другой.
        </p>
        <strong>
          Чем мы отличаемся от других справочников?
        </strong>
        <p>
          Мы профессионально разбираемся в специфике мебельного бизнеса. В
          отличии от других справочников не дублируем информацию, превращая наш
          сайт в дубликат другого сайта. Совершаем уникальную работу, полезную
          для представителей мебельного бизнеса и частных покупателей,
          обрабатываем доступные контакты мебельных компаний. Мы единственные,
          кто разделяет мебельные компании на сегменты B2B и В2С, вручную
          сортирует все фото-материалы на полезные и бесполезные, публикует
          новинки мебели текущего года.
        </p>
        <p>
          В 40% случаях публикация мебельных новинок на нашем сайте происходит
          быстрее на 1-2 месяца, чем на официальных сайтах фабрик! Это
          объясняется более эффективной работой операторов нашего call-центра и
          контент-менеджеров, заполняющих справочник свежей информацией, чем
          собственные маркетологи и программисты сайтов мебельных фабрик.
        </p>
        <strong>
          Чем наш сайт полезен для посетителей?
        </strong>
        <ul style="list-style: none">
          <li>
            самый крупный справочник мебельной тематики для посетителей из
            России, республик Беларусь и Казахстана
          </li>
          <li>постоянная актуальность публикуемой информации</li>
          <li>разделение всех компаний на сегменты B2B и В2С</li>
          <li>публикация подробной информации</li>
        </ul>
      </template>
    </Modal>
    <Modal v-show="contactsModalShow" @close="contactsModalShow = false">
      <template v-slot:header>
        Контактная информация
      </template>
      <template v-slot:body>
        <div class="grid_cols_2" style="grid-gap: 30px">
          <div>
            <strong>Адрес офиса</strong>
            <p>
              432072, г. Ульяновск, 1-й проезд Инженерный (проспект Генерала
              Маргелова), дом 12, пятый этаж.
            </p>
            <p>
              ИНН 7328064833, КПП 732801001, ОГРН 1117328003033
            </p>
          </div>
          <div>
            <strong>С нами можно связаться:</strong>
            <p>
              <a href="tel:+78007755320"
                >Тел. 8-800-775-53-20 - бесплатный звонок</a
              >
            </p>
            <p>
              <a href="tel:+79272730270">Тел. 8-927-273-02-70 - сотовый</a>
            </p>
            <p>
              <a href="mailto:meb105@mail.ru">E-mail: meb105@mail.ru</a>
            </p>
          </div>
        </div>
      </template>
    </Modal>
    <LoginForm />
  </div>
</template>

<script>
import Menu from './../components/Menu/Menu'
import CategoriesWidget from './../components/Widgets/CategoriesWidget/CategoriesWidget'
import ProfileWidget from './../components/Widgets/ProfileWidget/ProfileWidget'

export default {
  components: {
    Menu,
    CategoriesWidget,
    ProfileWidget
  },
  data() {
    return {
      aboutModalShow: false,
      contactsModalShow: false
    }
  },
  methods: {
    contactsModalOpen() {
      this.aboutModalShow = true
      document.querySelector('body').classList.add('body-scroll_lock')
    },
    aboutModalOpen() {
      this.contactsModalShow = true
      document.querySelector('body').classList.add('body-scroll_lock')
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: 'background_1'
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import '~assets/scss/app/index.scss';
.layout_category {
  /*max-height: 800px;*/
  @include on_mobile() {
    padding-bottom: 15px;
  }
  @include media_screen(desktop) {
    height: calc(100% - #{$menu-height});
    max-height: 560px;
  }
  @include media_screen(desktop-wide) {
    max-height: 800px - $menu-height;
  }
  @include media_screen(desktop-fhd) {
    max-height: 960px - $menu-height;
  }
}
</style>
