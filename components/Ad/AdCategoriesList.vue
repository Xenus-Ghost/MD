<template>
  <div class="adCategories">
    <h3>Категории работ:</h3>
    <ul class="adCategories__list">
      <li v-for="(item, i) in catList" :key="i" class="adCategories__item">
        {{ item.service_title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AdCategoriesList',
  props: {
    categories: {
      type: Array,
      default: null
    }
  },
  computed: {
    catList() {
      // const data = this.$store.categories.adCategoriesList.map(
      //   (result) => result.id === this.categories.id
      // )
      /* const data = this.categories.map((x) =>
        this.$store.state.categories.adCategoriesList.find(
          (result) => result.id === x
        )
      ) */
      return this.categories
    }
  }
}
</script>

<style lang="scss">
.adCategories__list {
  list-style: disc;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.adCategories__item {
}
</style>
