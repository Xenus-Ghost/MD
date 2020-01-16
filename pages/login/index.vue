<template>
  <LoginForm></LoginForm>
</template>

<script>
import LoginForm from '@/components/Registration/LoginForm'
export default {
  components: {
    LoginForm
  },
  created() {
    this.$store.commit('redirectAdd', '/lk')
    this.$router.push('/')
    this.$store.commit('authFormOpen')
  }
}
</script>

<style scoped></style>
