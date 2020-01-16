<template>
  <div class="grid-layout_profile">
    <CategoryHeader>
      Личный кабинет
      <template v-slot:right_column>
        <div class="profile__card">
          <div class="profile__header">
            <img
              src="../../assets/img/icons/user_no_avatar.jpg"
              alt=""
              class="profile__photo"
            />
            <div class="profile__title">
              <span v-if="user.phone && user.lastName" class="profile__name">
                {{ user.phone }} {{ user.lastName }}
              </span>
              <span v-else-if="user.email" class="profile__name">
                {{ user.email }}
              </span>
              <span v-if="user.phone" class="profile__phone">
                {{ user.phone }}
              </span>
            </div>
          </div>
          <div class="profile__prop-table">
            <span class="profile__prop-name">Логин</span>
            <span class="profile__prop-value">{{ user.name }}</span>
            <span class="profile__prop-name">Дата регистрации:</span>
            <span class="profile__prop-value">{{ user.created_at }}</span>
            <span class="profile__prop-name">ID-номер:</span>
            <span class="profile__prop-value">{{ user.id }}</span>
          </div>
        </div>
      </template>
    </CategoryHeader>
    <div class="container">
      <h2 class="profile__title">
        Объявления
      </h2>
      <div class="profile__grid_actions">
        <Button borders="neon" shape="semi_rounded" class="profile__button">
          Поиск объявлений
        </Button>
        <Button borders="neon" shape="semi_rounded" class="profile__button">
          Избранное
        </Button>
        <Button borders="neon" shape="semi_rounded" class="profile__button"
          >Мои объявления</Button
        >
        <Button
          to="/lk/ads/new/"
          borders="neon"
          shape="semi_rounded"
          class="profile__button"
          >Подать объявление</Button
        >
        <Button borders="neon" shape="semi_rounded" class="profile__button"
          >Выставки</Button
        >
        <Button borders="neon" shape="semi_rounded" class="profile__button"
          >Баннерная реклама</Button
        >
        <Button borders="neon" shape="semi_rounded" class="profile__button"
          >Видео</Button
        >
        <Button borders="neon" shape="semi_rounded" class="profile__button"
          >Форумы</Button
        >
      </div>
    </div>
    <Modal v-if="showAdList">

    </Modal>
  </div>
</template>

<script>
import CategoryHeader from '@/components/Category/Header/CategoryHeader'
export default {
  middleware: ['auth'],
  name: 'Index',
  layout: 'Cabinet',
  components: {
    CategoryHeader
  },
  data() {
    return {
      data: this.$auth,
      user: this.$auth.user,
      showAdList: false
    }
  },
  methods: {
    getAdList() {}
  }
}
</script>

<style lang="scss">
@import '~assets/scss/framework/basic.scss';
.profile {
  &__card {
    @include neon_borders(8);
    border-radius: 3rem;
    padding: 50px 100px;
    max-width: 570px;
  }
  &__header {
    border-bottom: 1px solid #ffffff;
    padding: 20px 0;
    display: grid;
    grid-template-columns: 70px 1fr;
    grid-gap: 20px;
  }
  &__photo {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 50%;
  }
  &__name {
    font-weight: bold;
    font-size: 20px;
  }
  &__phone {
    font-weight: 500;
    font-size: 20px;
    &::before {
      content: '';
      display: block;
      float: left;
      background: url('~assets/img/icons/phone-call.svg') center no-repeat;
      background-size: contain;
      padding: 8px;
    }
  }
  &__prop-table {
    padding: 15px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 12px 28px;
    font-size: 16px;
  }
  &__prop-name {
    text-align: right;
  }
  &__prop-value {
    font-weight: bold;
    text-align: left;
  }
  &__grid_actions {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 31px 20px;
  }
}
</style>
