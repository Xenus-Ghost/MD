<template>
  <Modal v-if="isShow">
    <div v-if="formType === 'login'" class="login-form">
      <div class="login-form__title">Вход</div>
      <form action="">
        <label for="">
          <input type="email" placeholder="Электронная почта" />
        </label>
        <label for="">
          <input type="password" placeholder="Пароль" />
          <span>Забыли пароль?</span>
        </label>
        <Button shape="rounded" borders="neon">Войти</Button>
        <nuxt-link @click.prevent="formType = 'reg'"
          >Зарегистрироваться</nuxt-link
        >
      </form>
    </div>
    <div v-if="formType === 'reg'" class="login-form">
      <div class="login-form__title">Регистрация</div>
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
  </Modal>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      isLogged: false,
      isShow: false,
      formType: 'login'
    }
  }
}
</script>

<style scoped></style>
