<template>
  <ul class="banners">
    <li v-for="(banner, i) in banners" :key="i" class="banners__item banner">
      <span class="banner__id">{{ banner.id }}</span>
      <div class="banner__title">
        {{ banner.title }}
      </div>
      <div class="banner__url">
        {{ banner.path }}
      </div>
      <ul class="banner__categories">
        <li
          v-for="(cat, c) in banner.categories"
          :key="c"
          class="banner__category"
        >
          {{ cat.service_title }}
        </li>
      </ul>
      <div class="banner__date_created">
        {{ banner.created_at }}
      </div>
      <div class="banner__date_updated">
        {{ banner.updated_at }}
      </div>
      <div class="banner__actions">
        <nuxt-link :to="`${banner.id}`" append>Редактировать</nuxt-link>
        <span @click="deleteBanner(banner.id)">Удалить</span>
      </div>
    </li>
  </ul>
</template>

<script>
import { getUrl } from '@/assets/js/util'

export default {
  name: 'BannersTable',
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      banners: null
    }
  },
  /* computed: {
    banners() {
      return this.data
    }
  }, */
  async created() {
    // let banners = null
    const errors = null
    await this.$axios
      .get(getUrl('admin/banners'))
      .then((response) => this.$set(this, 'banners', response.data.data))
      .catch((e) => errors.push(e.response.data))
  },
  methods: {
    async deleteBanner(id) {
      await this.$axios
        .delete(getUrl(`admin/banners/${id}`))
        .then((response) => this.$forceUpdate())
        .catch((e) => console.error(e))
    },
    async refreshData() {
      await this.$axios
        .get(getUrl('admin/banners'))
        .then((response) => this.$set(this, 'banners', response.data.data))
        .catch((e) => console.error(e))
    }
  }
}
</script>

<style lang="scss">
.banners {
  &__item {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 30px;
    /*grid-template-rows: 100px;*/
    margin-bottom: 30px;
    padding: 10px;
    border-bottom: 2px solid var(--color-primary);
  }
}
</style>
