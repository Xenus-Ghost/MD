<template>
  <div class="a">
    <!--  <LoginForm></LoginForm>-->
  </div>
</template>

<script>
// import LoginForm from '@/components/Registration/LoginForm'
export default {
  // components: {
  //   LoginForm
  // },
  created() {
    this.$store.commit('redirectAdd', '/lk')
    this.$router.push('/')
    this.$store.commit('authFormOpen')
  },
}
</script>
