<template>
  <Modal v-if="isAuthFormShow" @close="authFormClose">
    <template v-slot:header>
      <div v-if="formType === 'login'" class="login-form__title">Вход</div>
      <div v-if="formType === 'reg'" class="login-form__title">Регистрация</div>
    </template>
    <template v-slot:body>
      <div v-if="formType === 'login'" class="login-form">
        <form action="">
          <label for="">
            <input type="email" placeholder="Электронная почта" />
          </label>
          <label for="">
            <input type="password" placeholder="Пароль" />
            <span>Забыли пароль?</span>
          </label>
          <Button shape="rounded" borders="neon">Войти</Button>
          <nuxt-link to="/" @click.prevent="formType = 'reg'">
            Зарегистрироваться
          </nuxt-link>
        </form>
      </div>
      <div v-if="formType === 'reg'" class="login-form">
        <form action="">
          <label for="">
            <input type="text" placeholder="Имя" />
          </label>
          <label for="">
            <input type="text" placeholder="Фамилия" />
          </label>
          <label for="">
            <input type="tel" placeholder="Телефон" />
          </label>
          <label for="">
            <input type="email" placeholder="Электронная почта" />
          </label>
          <label for="">
            <input type="password" placeholder="Пароль" />
          </label>
          <label for="">
            <input type="radio" />
            Согласен с политикой обработки персональных данных
          </label>
          <Button shape="rounded" borders="neon">Зарегистрироваться</Button>
        </form>
      </div>
    </template>
  </Modal>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      isLogged: false,
      // isAuthFormShow: this.$store.state.isAuthFormShow,
      formType: 'login'
    }
  },
  computed: {
    isAuthFormShow() {
      return this.$store.state.isAuthFormShow
    }
  },
  methods: {
    authFormShow() {
      // $store.commit('')
      // this.isAuthFormShow = true
      this.$store.commit('authFormOpen')
    },
    authFormClose() {
      // this.isAuthFormShow = false
      this.$store.commit('authFormClose')
    }
  }
}
</script>

<style scoped></style>
