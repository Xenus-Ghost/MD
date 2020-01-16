<template>
  <Modal v-if="isAuthFormShow" @close="authFormClose">
    <template v-slot:header>
      <div v-if="formType === 'login'" class="login-form__title">Вход</div>
      <div v-if="formType === 'reg'" class="login-form__title">Регистрация</div>
    </template>
    <template v-slot:body>
      <form v-if="formType === 'login'" action="" class="login-form">
        <label for="" class="grid__column_2">
          <input
            v-model="email"
            type="email"
            placeholder="Электронная почта"
            autocomplete="current-username"
          />
        </label>
        <label for="" class="grid__column_2">
          <input
            v-model="password"
            type="password"
            placeholder="Пароль"
            autocomplete="current-password"
          />
          <span class="login-form__pass-forgot">Забыли пароль?</span>
        </label>
        <Button
          shape="rounded"
          borders="neon"
          class="grid__column_2"
          @click.native="login"
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
      <form
        v-if="formType === 'reg'"
        action=""
        class="login-form"
        @submit.prevent="registrationSubmit"
      >
        <label for="" class="grid__column_2">
          <input v-model="firstName" type="text" placeholder="Имя" />
        </label>
        <label for="" class="grid__column_2">
          <input v-model="lastName" type="text" placeholder="Фамилия" />
        </label>
        <label for="" class="grid__column_2">
          <input v-model="phone" type="tel" placeholder="Телефон" />
        </label>
        <label for="" class="grid__column_2">
          <input v-model="name" type="text" placeholder="Имя пользователя" />
        </label>
        <label for="" class="grid__column_full">
          <input
            v-model="email"
            type="email"
            placeholder="Электронная почта"
            autocomplete="new-username"
          />
        </label>
        <label for="" class="grid__column_2">
          <input
            v-model="password"
            type="password"
            placeholder="Пароль"
            autocomplete="new-password"
          />
        </label>
        <label for="" class="grid__column_2">
          <input
            v-model="password_confirmation"
            type="password"
            placeholder="Повторите пароль"
            autocomplete="new-password"
          />
        </label>
        <label for="" class="login-form__politics">
          <input type="radio" class="login-form__radio" checked />
          <span>Согласен с политикой обработки персональных данных</span>
        </label>
        <Button
          type="submit"
          shape="rounded"
          borders="neon"
          class="grid__column_2"
          >Зарегистрироваться</Button
        >
      </form>
    </template>
  </Modal>
</template>

<script>
export default {
  middleware: ['auth'],
  name: 'LoginForm',
  data() {
    return {
      isLogged: false,
      email: '',
      name: '',
      password: '',
      password_confirmation: '',
      firstName: '',
      lastName: '',
      phone: '',
      error: null
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
    },
    login() {
      /* const formData = {
        email: this.email,
        password: this.password,
        crossDomain: true
      }
      const { user } = await this.$axios.$post(
        'https://admin.монтаждемонтаж.рф/api/auth/login',
        JSON.stringify(formData),
        {
          crossDomain: true
        }
      )
      this.$store.commit('authSaveToken', user) */
      this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then((e) => {
          this.email = ''
          this.password = ''
          this.authFormClose()
          if (this.$store.state.redirectTo !== '') {
            this.$router.push(this.$store.state.redirectTo)
          }
        })
        .catch((e) => {
          this.error = e + ''
        })
    },
    async registrationSubmit() {
      const formData = {
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
        name: this.name,
        first_name: this.firstName,
        last_name: this.lastName,
        phone: this.phone
      }
      await this.$axios
        .$post(
          'https://admin.монтаждемонтаж.рф/api/auth/registration',
          formData
        )
        .then(this.formToggle('login'))
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/scss/framework/basic.scss';
.login-form {
  /*padding: 30px;*/
  margin: 0 auto;
  display: grid;
  /*flex-direction: column;*/
  grid-template-columns: repeat(2, 1fr);
  /*grid-auto-rows: 1fr;*/
  height: 100%;
  grid-gap: 25px;
  @include on_tablet() {
    width: 80%;
    grid-template-columns: repeat(4, 1fr);
  }
  /deep/ .button {
    @include on_tablet() {
      grid-column: 2/4;
    }
  }
  &__pass-forgot {
    display: block;
    text-align: right;
    width: 100%;
    text-decoration: underline dashed;
    padding: 5px;
  }
  &__link_reg {
    grid-column: 1/-1;
    @include on_tablet() {
      grid-column: 2/4;
    }
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
    background: none;
    border: 1px solid white;
  }
}
</style>
