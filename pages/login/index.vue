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
    this.$router.push('/')
    this.$store.commit('authFormOpen')
    this.$store.commit('redirectAdd', '/lk')
  }
}
</script>

<style scoped></style>
