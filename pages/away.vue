<template>
  <div class="container">
    <span>Происходит переход на внешний ресурс</span>
    <span>{{ url }}</span>
  </div>
</template>

<script>
export default {
  name: 'Away',
  computed: {
    url() {
      let url = this.$route.query.url
      url = !(url.includes('https') || url.includes('http')) ? '//' + url : url
      return url
    },
  },
  mounted() {
    // console.log(this.$route.query.url)
    setTimeout((e) => {
      // console.log(this.url)
      window.location.replace(this.url)
    }, 1000)
  },
}
</script>

<style scoped></style>
