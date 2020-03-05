<template>
  <div class="banner-admin">
    <bannersTable :data="banners" />
    <div v-if="!!errors" class="error">Произошла ошибка</div>
    <Button to="add">Добавить</Button>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
import { bannersTable } from '@/components/lk/admin'
// import { getUrl } from '@/assets/js/util'

export default {
  name: 'BannerAd',
  layout: 'admin',
  components: {
    bannersTable
  },
  /* async asyncData(context) {
    let banners = null
    const errors = null
    await context.$axios
      .get(getUrl('admin/banners'))
      .then((response) => (banners = response.data.data))
      .catch((e) => errors.push(e.response.data))
    return { banners, errors }
  }, */
  data() {
    return {
      banners: null,
      errors: null
    }
  }
}
</script>

<style scoped></style>
