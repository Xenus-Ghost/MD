<template>
  <Modal v-if="isAuthFormShow" @close="authFormClose">
    <template v-slot:header>
      <div v-if="formType === 'login'" class="login-form__title">Вход</div>
      <div v-if="formType === 'reg'" class="login-form__title">Регистрация</div>
    </template>
    <template v-slot:body>
      <form v-if="formType === 'login'" action="" class="login-form">
        <label for="" class="grid__column_2">
          <input type="email" placeholder="Электронная почта" />
        </label>
        <label for="" class="grid__column_2">
          <input type="password" placeholder="Пароль" />
          <span class="login-form__pass-forgot">Забыли пароль?</span>
        </label>
        <Button shape="rounded" borders="neon" class="grid__column_2"
          >Войти</Button
        >
        <nuxt-link
          to="/"
          class="login-form__link_reg"
          @click.native="formToggle('reg')"
        >
          Зарегистрироваться
        </nuxt-link>
      </form>
      <form v-if="formType === 'reg'" action="" class="login-form">
        <label for="" class="grid__column_2">
          <input type="text" placeholder="Имя" />
        </label>
        <label for="" class="grid__column_2">
          <input type="text" placeholder="Фамилия" />
        </label>
        <label for="" class="grid__column_4">
          <input type="tel" placeholder="Телефон" />
        </label>
        <label for="" class="grid__column_2">
          <input type="email" placeholder="Электронная почта" />
        </label>
        <label for="" class="grid__column_2">
          <input type="password" placeholder="Пароль" />
        </label>
        <label for="" class="login-form__politics">
          <input type="radio" class="login-form__radio" />
          <span>Согласен с политикой обработки персональных данных</span>
        </label>
        <Button shape="rounded" borders="neon" class="grid__column_2"
          >Зарегистрироваться</Button
        >
      </form>
    </template>
  </Modal>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      isLogged: false
      // formType: 'login'
    }
  },
  computed: {
    isAuthFormShow() {
      return this.$store.state.isAuthFormShow
    },
    formType() {
      return this.$store.state.authFormType
    }
  },
  mounted() {
    this.$root.$on('authFormOpen', function() {
      this.authFormShow()
    })
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
    },
    formToggle(type = 'reg') {
      // console.log(type)
      // this.formType = type
      this.$store.commit('authFormOpen', type)
    }
  }
}
</script>

<style scoped lang="scss">
.login-form {
  /*padding: 30px;*/
  width: 80%;
  margin: 0 auto;
  display: grid;
  /*flex-direction: column;*/
  grid-template-columns: repeat(4, 1fr);
  /*grid-auto-rows: 1fr;*/
  height: 100%;
  grid-gap: 25px;
  /deep/ .button {
    grid-column: 2/4;
  }
  &__pass-forgot {
    display: block;
    text-align: right;
    width: 100%;
    text-decoration: underline dashed;
    padding: 5px;
  }
  &__link_reg {
    grid-column: 2/4;
    text-align: center;
  }
  &__politics {
    grid-column: 2/4;
    display: flex;
    span {
      /*font-size: 14px;*/
      text-align: center;
    }
  }
  &__radio {
    width: 15px;
  }
}
input {
  width: 100%;
  background: rgba(14, 36, 62, 0.4);
  border: 1.5px solid #ffffff;
  border-radius: 10px;
  padding: 8px 15px;
  color: white;
}
</style>
