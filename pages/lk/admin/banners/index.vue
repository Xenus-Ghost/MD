<template>
  <div class="banner-admin">
    <ul class="banners">
      <li v-for="(banner, i) in banners" :key="i" class="banners"></li>
    </ul>
    <div v-if="errors" class="error">Произошла ошибка</div>
    <Button>Добавить</Button>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
import { getUrl } from '@/assets/js/util'

export default {
  name: 'BannerAd',
  layout: 'admin',
  async asyncData(context) {
    let banners = null
    const errors = []
    await context.$axios
      .get(getUrl('/admin/banners'))
      .then((response) => (banners = response.data))
      .catch((e) => errors.push(e.response.data))
    return { banners, errors }
  },
  data() {
    return {
      banners: null,
      errors: null
    }
  },
  created() {
    console.log(getUrl('admin/banners'))
  }
}
</script>

<style scoped></style>
