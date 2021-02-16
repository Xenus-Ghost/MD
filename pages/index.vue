<template>
  <div class="home-page">
    <div class="container home-wrapper">
      <CircleContainer>
        <template v-slot:default>
          <CircleItem
            v-for="(cat, i) in categories"
            :key="i"
            :to="cat.path"
            :title="cat.title"
            :icon="cat.icon_url"
          />
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
              style="align-self: center"
              :class="['home-page__button', 'button_black-list']"
              @click.native="BlackListOpen"
            >
              <template v-slot:icon_left>
                <svg-icon name="list" />
              </template>
              Чёрный список
            </Button>
          </div>
        </template>
      </CircleContainer>
      <Button
        to="/события/выставки"
        style="grid-column: 1; grid-row: 1"
        shape="rounded"
        borders="neon"
        class="button_aside"
        >Выставки</Button
      >
      <Button
        to="/события/форумы"
        style="grid-column: 3; grid-row: 1; justify-self: right"
        shape="rounded"
        borders="neon"
        class="button_aside"
        >Форумы</Button
      >
      <Button
        to="/доставка"
        style="grid-column: 1; grid-row: 3"
        shape="rounded"
        borders="neon"
        class="button_aside"
        >Доставка</Button
      >
      <Button
        to="/видео"
        style="grid-column: 1; grid-row: 4"
        shape="rounded"
        borders="neon"
        class="button_aside"
        >Видео</Button
      >
      <Button
        to="/мастер-на-час"
        style="grid-column: 3; grid-row: 3; justify-self: right"
        shape="rounded"
        borders="neon"
        class="button_aside"
        >Мастер на час</Button
      >
      <Button
        to="/клининг"
        style="grid-column: 3; grid-row: 4; justify-self: right"
        shape="rounded"
        borders="neon"
        class="button_aside"
        >Клининг</Button
      >
      <div class="home-page__categories">
        <div class="home-page__category">
          <img src="/img/categories/house.svg" alt="" />
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
          <img src="/img/categories/materials.svg" alt="" />
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
          <img src="/img/categories/mixer.svg" alt="" />
          <div class="home-page__category-title">ЖБИ и заводы</div>
          <Button to="/жби" width="100%" borders="outline" shape="rounded">
            Подробнее</Button
          >
          <img class="divider" src="~assets/img/divider.svg" alt="" />
        </div>
        <div class="home-page__category">
          <img src="/img/categories/digger.svg" alt="" />
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
          <img src="/img/categories/hook.svg" alt="" />
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
          <img src="/img/categories/builder.svg" alt="" />
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
          icon_url: '1',
        },
        building: {
          path: '/строительство',
          title: 'Строительство',
          icon_url: '2',
        },
        renovation: {
          path: '/ремонт',
          title: 'Ремонт',
          icon_url: '3',
        },
        electric: {
          path: '/электрика',
          title: 'Электрика',
          icon_url: '4',
        },
        plumbing: {
          path: '/сантехника',
          title: 'Сантехника',
          icon_url: '5',
        },
        welding: {
          path: '/сварка',
          title: 'Сварка',
          icon_url: '6',
        },
        designing: {
          path: '/проектирование',
          title: 'Проектирование',
          icon_url: '8',
        },
        roads: {
          path: '/дороги',
          title: 'Дороги',
          icon_url: '9',
        },
        gas: {
          path: '/газификация',
          title: 'Газификация',
          icon_url: '10',
        },
        landscape: {
          path: '/ландшафтный-дизайн',
          title: 'Ландшафтный дизайн',
          icon_url: '12',
        },
        beautification: {
          path: '/благоустройство',
          title: 'Благоустройство',
          icon_url: '13',
        },
        tools: {
          path: '/инструменты-и-оборудование',
          title: 'Инструменты и оборудование',
          icon_url: '14',
        },
        stoves: {
          path: '/печи-и-камины',
          title: 'Печи и камины',
          icon_url: '15',
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
  created() {
    const query = this.$route.query
    console.log(this.$route.query)
    // console.log(this.route.params)
    if (query.OutSum && query.InvId && query.SignatureValue) {
      this.$axios
        .$get('me/payments/confirm', { params: query })
        .then((response) => {
          // this.$toast.success('Услуга успешно оплачена')
          // console.log(response, response.data)
          if (response.data && response.data.is_payment_correct) {
            this.$router.push('/payment/success/')
          } else {
            this.$router.push('/payment/fail/')
          }
        })
    }
    // this.$toast.success('Услуга успешно оплачена')
  },
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
